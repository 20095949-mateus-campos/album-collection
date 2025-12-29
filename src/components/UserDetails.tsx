/* Ionic imports */
import {
  IonAlert,
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonInput,
  IonItem,
  IonList,
  useIonAlert,
  useIonRouter,
} from '@ionic/react';

/* Firebase imports */
import { app, db } from '../services/firebase'
import { EmailAuthProvider } from "firebase/auth"

/* Local imports */
import { user } from '../App';
import { useRef, useState } from 'react';
import { Album } from '../models/Album';

interface ChildProps {
  onMessage?: (album: Album) => void;
  album?: Album,
  setLoggedIn?: (state: boolean) => void
}

const UserDetails: React.FC<ChildProps> = ({setLoggedIn}) => {
  const [update, setUpdate] = useState(false)
  const usernameRef = useRef<HTMLIonInputElement>(null);
  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);
  const router = useIonRouter()
  const [alert] = useIonAlert()
  const fb = app.auth().currentUser

  function signOut() {
    app.auth().signOut().then(() => {
      console.log('User signed out successfully!')
      setLoggedIn!(false)
    }).catch((err) => {
      console.error('Something went wrong: ' + err)
    });

    router.push('/', 'root')
  }

  function toggleButton() {
    setUpdate(!update)
  }

  function deleteUser() {
    const fb = app.auth().currentUser

    db.collection("users").doc(fb?.uid).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
    
    fb?.delete().then(() => {
      console.log('User deleted successfully!')
      setLoggedIn!(false)
    }).catch((err) => {
      console.error('Something went wrong: ' + err)
    });

    router.push('/', 'root')
  }

  function updateUser() {
    const username = usernameRef.current?.value as string
    const email = emailRef.current?.value as string
    const password = passwordRef.current?.value as string

    try {
      if (username != user.username) {
        fb?.updateProfile({displayName: username})
          .then(() => {
            user.username = username
            db.collection('users').doc(fb.uid).update({ username: username })
              .then(() => console.log('All good!'))
          })
      }

      if (email != user.email) {
        fb?.updateEmail(email)
          .then(() => {
            user.email = email
            db.collection('users').doc(fb.uid).update({ email: email })
              .then(() => console.log('All good!'))
          })
      }

      if (password != '************') {
        fb?.updatePassword(password)
          .then(() => console.log('All good!'))
      }

      toggleButton()
    } catch (error) {
      alert('Error: ' + error, [{ text: 'OK' }])

      return
    }
  }

  return (
    <IonContent>
      <IonCard>
        <IonList>
          <IonItem>
            <IonInput ref={usernameRef} disabled={!update} id='username' name='username' label="Username" placeholder="username" value={user.username}></IonInput>
          </IonItem>

          <IonItem>
            <IonInput ref={emailRef} disabled={!update} id='email' name='email' label="Email" type="email" placeholder="example@email.com" value={user.email}></IonInput>
          </IonItem>

          <IonItem>
            <IonInput ref={passwordRef} disabled={!update} id='password' name='password' label="Password" type="password" placeholder="password" value='************'></IonInput>
          </IonItem>

          <IonItem>
            {update ?
              <IonButtons>
                <IonButton onClick={() => toggleButton()}>Cancel</IonButton>
                <IonButton id='update-alert'>Save</IonButton>

                <IonAlert
                  header='Reauthenticate'
                  message='This action requires reauthentication. Please, provide your current credentials before proceeding:'
                  trigger="update-alert"
                  inputs={[
                    {
                      name: 'email',
                      type: 'email',
                      placeholder: 'email',
                    },
                    {
                      name: 'password',
                      type: 'password',
                      placeholder: 'password',
                    },
                  ]}
                  buttons={[
                    {
                      text: 'Cancel',
                      role: 'cancel',
                    },
                    {
                      text: 'Confirm',
                      role: 'confirm',
                      handler: (data) => {
                        const credential = EmailAuthProvider.credential(data.email, data.password)

                        fb?.reauthenticateWithCredential(credential)
                          .then(() => {
                            updateUser()
                            console.log('All good!')
                          })
                          .catch((error) => { alert('Error: ' + error, [{ text: 'OK' }]) })
                      },
                    },
                  ]}
                />
              </IonButtons>
            :
              <IonButtons>
                <IonButton onClick={() => toggleButton()}>Update</IonButton>
                <IonButton id='delete-alert'>Delete</IonButton>
                <IonButton onClick={() => signOut()}>Sign Out</IonButton>
              
                <IonAlert
                  header="Wait!"
                  message="Are you sure you want to delete your user account? This action cannot be undone."
                  trigger="delete-alert"
                  buttons={[
                    {
                      text: 'Cancel',
                      role: 'cancel',
                    },
                    {
                      text: 'Delete',
                      role: 'confirm',
                      handler: () => {
                        deleteUser()
                      },
                    },
                  ]}
                />
              </IonButtons>
            }
          </IonItem>
        </IonList>
        </IonCard>
    </IonContent>
  );
};

export default UserDetails;
