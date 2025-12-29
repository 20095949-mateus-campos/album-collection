import {
  IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRow,
  IonSearchbar,
  useIonAlert,
  useIonRouter,
} from '@ionic/react';

import { Route, useLocation } from 'react-router-dom';
import { musicalNotesOutline, musicalNotesSharp, personOutline, personSharp, searchOutline, searchSharp } from 'ionicons/icons';
import './Menu'
import { app, db } from '../services/firebase'
import { Album } from '../models/Album';
import { user } from '../App';
import { useRef } from 'react';

interface ChildProps {
  // We define a function that expects a string
  onMessage?: (album: Album) => void;
  album?: Album,
  setLoggedIn?: (state: boolean | null) => void
}

const SignIn: React.FC<ChildProps> = ({setLoggedIn}) => {
  const usernameRef = useRef<HTMLIonInputElement>(null);
  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);

  const router = useIonRouter()
  const [alert] = useIonAlert()

  const signUp = async () => {
    const username = usernameRef.current?.value as string
    const email = emailRef.current?.value as string
    const password = passwordRef.current?.value as string

    try {
      const userCredential = await app.auth().createUserWithEmailAndPassword(email, password);
      const fb = userCredential.user;

      await db.collection("users").doc(fb?.uid).set({
        username: username,
        email: email,
        collection: []
      })
      .then(() => {
          console.log("Document added successfully!");
      })
      .catch((error) => {
          console.error("Error adding document: ", error);
      })
    } catch (error) {
      alert('Error: ' + error, [{ text: 'OK' }])

      return
    }
  };

  const signIn = async () => {
    const username = usernameRef.current?.value as string
    const email = emailRef.current?.value as string
    const password = passwordRef.current?.value as string

    try {
      const userCredential = await app.auth().signInWithEmailAndPassword(email, password).catch()
      const fb = userCredential?.user;

      await db.collection("users").doc(fb?.uid).get()
      .then((doc) => {
          user.username = doc.data()?.username
          user.email = doc.data()?.email
          user.collection = doc.data()?.collection
          setLoggedIn!(true)
      })
      .catch((error) => {
          console.error("Error adding document: ", error);
      })
    } catch (error) {
      alert('Error: ' + error, [{ text: 'OK' }])

      return
    }

    router.push('/', 'root')
  };

  return (
            <IonContent>
              <IonCard>
              <IonList>
                <IonItem>
                  <IonInput ref={usernameRef} id='username' name='username' label="Username" placeholder="username"></IonInput>
                </IonItem>
      
                <IonItem>
                  <IonInput ref={emailRef} id='email' name='email' label="Email" type="email" placeholder="example@email.com"></IonInput>
                </IonItem>
      
                <IonItem>
                  <IonInput ref={passwordRef} id='password' name='password' label="Password" type="password" placeholder="******"></IonInput>
                </IonItem>
      
                <IonItem>
                  <IonButton type='button' onClick={() => signIn()}>Sign In</IonButton>
                  <IonButton type='button' onClick={() => signUp()}>Sign Up</IonButton>
                </IonItem>
              </IonList>
              </IonCard>
            </IonContent>
  );
};

export default SignIn;
