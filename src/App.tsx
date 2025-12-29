/* Ionic imports */
import { getPlatforms, IonApp, IonContent, IonPage, IonRouterOutlet, IonSpinner, IonSplitPane, isPlatform, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* React imports */
import { Redirect, Route } from 'react-router-dom';
import { useActionState, useContext, useEffect, useRef, useState } from 'react';

/* Firebase imports */
import { app, db } from './services/firebase'

/* Local imports */
import Page from './pages/Page';
import Menu from './components/Menu';
import SignIn from './components/SignIn';
import { User } from './models/User';
import { Album } from './models/Album';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

import '@ionic/react/css/palettes/dark.always.css';
/* import '@ionic/react/css/palettes/dark.class.css'; */
/* import '@ionic/react/css/palettes/dark.system.css'; */

/* Theme variables */
import './theme/variables.css';
import { StatusBar, Style } from '@capacitor/status-bar';
import { UserContext } from './contexts/UserContext';

setupIonicReact();

export const user: User = {
  id: '',
  username: '',
  email: '',
  collection: []
}

export let currentAlbum: Album = {
  id: 0,
  title: '',
  artist: '',
  year: '',
  genre: [],
  country: '',
  tracklist: [],
  coverUrl: '',
  uri: ''
}

const App: React.FC = () => {
  if (isPlatform('mobile')) {
    useEffect(() => {
      const init = async () => {
        try {
          await StatusBar.setOverlaysWebView({ overlay: false })
          await StatusBar.setBackgroundColor({ color: '#1e1e1e' })
          await StatusBar.setStyle({ style: Style.Dark })
          await StatusBar.show()
        } catch (e) {
          console.error('Failed to update status bar: ', e)
        }
      }
      init()
    }, [])
  }

  const [loggedIn, setLoggedIn] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)
  
  const album = useRef({} as Album)

  const onMessage = async (childData: Album) => {
    setLoading(true)
    
    album.current = childData

    setLoading(false)
  }

  const userLoggedIn = useContext(UserContext);

  useEffect(() => {

    app.auth().onAuthStateChanged(async (fb) => {
      if (fb) {
        await db.collection("users").doc(fb?.uid).get()
          .then((doc) => {
            user.id = fb?.uid
            user.username = doc.data()?.username
            user.email = doc.data()?.email
            user.collection = doc.data()?.collection
          })
          .catch((error) => {
            console.error("Error retrieving user details: ", error);
          })
        setLoggedIn(true)
        userLoggedIn.setLog(userLoggedIn.log, true)
      } else {
        // userLoggedIn.setLog(userLoggedIn.log, false)
        setLoggedIn(false)
      }
    })
  }, [])

  let name = 'search'

  
  let test = 0

  return (
    // <IonApp>
    //   <IonReactRouter>
    //       {loggedIn ? (
    //         <IonSplitPane contentId="main">
    //           <Menu />
    //           <IonRouterOutlet id="main">
    //             <Route exact path="/:name(collection|search)/:model(album)/:id">
    //               {loading ? (
    //                 <Page onMessage={onMessage} album={album.current}/>
    //               ) : (
    //                 <Page onMessage={onMessage} album={album.current}/>
    //               )}
    //             </Route>
    //             <Route exact path="/:name(collection|search|account|about)">
    //               <Page onMessage={onMessage} setLoggedIn={setLoggedIn} />
    //             </Route>
    //             <Route>
    //               <Redirect to="/collection" />
    //             </Route>
    //             {/* <Route exact path="/">
    //               <Redirect to="/collection" />
    //             </Route> */}
    //             {/* <Route exact path="/collection"> */}
    //               {/* {() => { return <p>collection</p> }} */}
    //               {/* <Page onMessage={onMessage} /> */}
    //             {/* </Route> */}
    //           </IonRouterOutlet>
    //         </IonSplitPane>
    //       ) : (
    //         <IonRouterOutlet id="main">
    //           <Route exact path="/sign-in">
    //             <SignIn setLoggedIn={setLoggedIn} />
    //           </Route>
    //           <Route>
    //             {loggedIn === null ? (<IonSpinner></IonSpinner>):(<Redirect to={loggedIn ? "/collection" : "/sign-in"} />)}
    //           </Route>
    //         </IonRouterOutlet>
    //       )}
    //   </IonReactRouter>
    // </IonApp>

    <IonApp>
      <IonReactRouter>
        {loggedIn === null ? (
          <div className='spinner-wrapper'>
            <IonSpinner color='secondary'/>
          </div>
        ) : (
          loggedIn === true ? (
            <IonSplitPane contentId="main">
              <Menu />
              <IonRouterOutlet id='main'>
                <Route exact path="/:name(collection|search)/:model(album)/:id">
                  <Page onMessage={onMessage} album={album.current}/>
                </Route>
                <Route exact path="/:name(collection|search|account|about)">
                  <Page onMessage={onMessage} setLoggedIn={setLoggedIn} />
                </Route>
                <Redirect exact from="/:name(sign-in)?" to="/collection" />
              </IonRouterOutlet>
            </IonSplitPane>
          ) : (
            <IonRouterOutlet>
              <Route exact path="/sign-in">
                <SignIn setLoggedIn={setLoggedIn} />
              </Route>
              <Redirect exact to="/sign-in" />
            </IonRouterOutlet>
          )
        )}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
