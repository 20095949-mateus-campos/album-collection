import {
  IonContent,
  IonFooter,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonText,
  useIonRouter,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { informationCircleOutline, informationCircleSharp, informationOutline, informationSharp, musicalNotesOutline, musicalNotesSharp, personOutline, personSharp, searchOutline, searchSharp } from 'ionicons/icons';
import './Menu.css';
import { user } from '../App';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Collection',
    url: '/collection',
    iosIcon: musicalNotesOutline,
    mdIcon: musicalNotesSharp
  },
  {
    title: 'Search',
    url: '/search',
    iosIcon: searchOutline,
    mdIcon: searchSharp
  },
  {
    title: 'Account',
    url: '/account',
    iosIcon: personOutline,
    mdIcon: personSharp
  },
  {
    title: 'About',
    url: '/about',
    iosIcon: informationCircleOutline,
    mdIcon: informationCircleSharp
  }
];

import { menuController } from '@ionic/core';


const Menu: React.FC = () => {
  const location = useLocation();

    const router = useIonRouter();


  const handleImageClick = async () => {
    // Custom logic here
    router.push('/', 'root');
    
  };

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonMenuToggle key={-1} autoHide={false}>
            <IonImg className='menu-logo' src='/menu_logo.png' onClick={handleImageClick}></IonImg>
          </IonMenuToggle>
          <br></br>
          <IonListHeader>Album Collection</IonListHeader>
          <IonNote>{user.username}</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
