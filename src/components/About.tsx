import {
  IonButton,
  IonCard,
  IonCardContent,
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
              <IonCardContent>This app was developed as an assignment for my Web and Mobile Technologies (B9IS126) CA1: Develop a hybrid mobile application as part of my MSc in Information Systems with Computing at Dublin Business School.</IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <p>Ionic with React...</p>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <p>Application logo 'Audio Melody Music 33 SVG Vector' by Ruslan Mullakaev, under CC Attribution License, via SVG Repo. The original logo's colors were altered to match the dark theme of the application.</p>
            <p>For more information, please visit:</p>
            <ul>
              <li><a onClick={async () => await Browser.open({url: 'https://dribbble.com/ruslan_design?ref=svgrepo.com'})}>Author's website</a></li>
              <li><a onClick={async () => await Browser.open({url: 'https://www.svgrepo.com/'})}>SVG Repo's website</a></li>
              <li><a onClick={async () => await Browser.open({url: 'https://www.svgrepo.com/svg/419725/audio-melody-music-33'})}>Original logo</a></li>
              <li><a onClick={async () => await Browser.open({url: 'https://creativecommons.org/share-your-work/cclicenses/'})}>CC Attribution Lincese</a></li>
            </ul>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <p>This application uses Discogs' API but is not affiliated with, sponsored or endorsed by Discogs. 'Discogs' is a trademark of Zink Media, LLC.</p>
            <p>For more information, please visit:</p>
            <ul>
              <li><a onClick={async () => await Browser.open({url: discogs.tou})}>Discogs' API Terms of Use</a></li>
              <li><a onClick={async () => await Browser.open({url: discogs.docs})}>Discogs' API Documentation</a></li>
              <li><a onClick={async () => await Browser.open({url: discogs.website})}>Discogs' official website</a></li>
            </ul>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default About;
