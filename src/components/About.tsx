import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonInput,
  IonItem,
  IonList,
  IonRow,
} from '@ionic/react';

import './Menu'
import { Browser } from '@capacitor/browser';
import { discogs } from '../services/discogs';

const About: React.FC = () => {
  

  return (
    <IonContent>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonCard>
              <IonCardHeader><IonCardTitle>Description</IonCardTitle></IonCardHeader>
              <IonCardContent><p>This app was developed as an assignment for my Web and Mobile Technologies (B9IS126) CA1: Develop a hybrid mobile application as part of my MSc in Information Systems with Computing at Dublin Business School.</p><br></br><p>For more information, please visit:</p>
            <ul>
              <li><a onClick={async () => await Browser.open({url: 'https://www.dbs.ie/'})}>Dublin Business School</a></li>
              <li><a onClick={async () => await Browser.open({url: 'https://github.com/20095949-mateus-campos/album-collection'})}>Project's GitHub</a></li>
            </ul>
            </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonCard>
              <IonCardHeader><IonCardTitle>Frontend</IonCardTitle></IonCardHeader>
            <IonCardContent><p>This application was developed using Ionic as a framework and UI toolkit, paired with React and Capacitor for native integration.</p><br></br><p>For more information, please visit:</p>
            <ul>
              <li><a onClick={async () => await Browser.open({url: 'https://ionicframework.com/'})}>Ionic Framework</a></li>
              <li><a onClick={async () => await Browser.open({url: 'https://react.dev/'})}>React</a></li>
              <li><a onClick={async () => await Browser.open({url: 'https://capacitorjs.com/'})}>Capacitor</a></li>
            </ul>
            </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonCard>
              <IonCardHeader><IonCardTitle>Backend</IonCardTitle></IonCardHeader>
              <IonCardContent>
            <p>This application uses Firebase as a backend provider. Specifically, the Authentication service is used to manage user accounts, credentials, and auth processes such as sign-ins, sign-outs, and sign-ups, while Cloud Firestore is used to store user documents containing their album collection data.</p>
            <br></br><p>For more information, please visit:</p>
            <ul>
              <li><a onClick={async () => await Browser.open({url: 'https://firebase.google.com/'})}>Firebase</a></li>
              <li><a onClick={async () => await Browser.open({url: 'https://firebase.google.com/docs/auth'})}>Firebase's Authentication</a></li>
              <li><a onClick={async () => await Browser.open({url: 'https://firebase.google.com/docs/firestore'})}>Firebase's Cloud Firestore</a></li>
            </ul>
            </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonCard>
              <IonCardHeader><IonCardTitle>Logo</IonCardTitle></IonCardHeader>
            <IonCardContent><p>Application logo 'Audio Melody Music 33 SVG Vector' by Ruslan Mullakaev, under CC Attribution License, via SVG Repo. The original logo's colors were altered to match the dark theme of the application.</p><br></br><p>For more information, please visit:</p>
            <ul>
              <li><a onClick={async () => await Browser.open({url: 'https://dribbble.com/ruslan_design?ref=svgrepo.com'})}>Author's website</a></li>
              <li><a onClick={async () => await Browser.open({url: 'https://www.svgrepo.com/'})}>SVG Repo's website</a></li>
              <li><a onClick={async () => await Browser.open({url: 'https://www.svgrepo.com/svg/419725/audio-melody-music-33'})}>Original logo</a></li>
              <li><a onClick={async () => await Browser.open({url: 'https://creativecommons.org/share-your-work/cclicenses/'})}>CC Attribution Lincese</a></li>
            </ul>
            </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonCard>
              <IonCardHeader><IonCardTitle>Data Source</IonCardTitle></IonCardHeader>
              <IonCardContent>
            <p>This application uses Discogs' API but is not affiliated with, sponsored or endorsed by Discogs. 'Discogs' is a trademark of Zink Media, LLC.</p>
            <br></br><p>For more information, please visit:</p>
            <ul>
              <li><a onClick={async () => await Browser.open({url: discogs.tou})}>Discogs' API Terms of Use</a></li>
              <li><a onClick={async () => await Browser.open({url: discogs.docs})}>Discogs' API Documentation</a></li>
              <li><a onClick={async () => await Browser.open({url: discogs.website})}>Discogs' official website</a></li>
            </ul>
            </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default About;
