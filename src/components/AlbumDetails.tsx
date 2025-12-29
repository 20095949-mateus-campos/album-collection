import { Browser } from '@capacitor/browser';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonItem,
  IonList,
  IonRow,
  IonToast,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import './Menu.css';
import { useState } from 'react';
import { currentAlbum, user } from '../App';
import { Album } from '../models/Album';
import { app, db } from '../services/firebase';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

interface Props {
  album?: Album
}

const AlbumDetails: React.FC<Props> = () => {
  const [inlib, setInLib] = useState(user.collection.filter(album => album.id == currentAlbum?.id).length != 0)

  async function addAlbum() {
    user.collection.push(currentAlbum)
    setInLib(true)
    db.collection('users').doc(app.auth().currentUser?.uid).update({
      collection: firebase.firestore.FieldValue.arrayUnion(currentAlbum)
    })
  }

  async function removeAlbum() {
    user.collection = user.collection.filter(album => album.id != currentAlbum?.id)
    setInLib(false)
    db.collection('users').doc(app.auth().currentUser?.uid).update({
      collection: firebase.firestore.FieldValue.arrayRemove(currentAlbum)
    })
  }

  return (
    <IonContent>
      <IonGrid fixed={true}>
          <IonRow>
            <IonCol sizeLg='6' sizeMd='6' sizeSm='12' sizeXs='12'>
              <IonCard>
                <IonImg src={currentAlbum?.coverUrl}></IonImg>
              </IonCard>
            </IonCol>
            <IonCol sizeLg='6' sizeMd='6' sizeSm='12' sizeXs='12'>
              <IonCard>
                <IonList>
                <IonItem>Title: {currentAlbum?.title}</IonItem>
                <IonItem>Artist: {currentAlbum?.artist}</IonItem>
                <IonItem>Year: {currentAlbum?.year}</IonItem>
                {currentAlbum?.genre ? <IonItem>Genre: {currentAlbum?.genre.join(', ')}</IonItem>: null}
                <IonItem>Country: {currentAlbum?.country}</IonItem>
              </IonList>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
              <IonCol size='12'>
                <IonCard>
                  {currentAlbum?.tracklist ? <IonList>
                    <IonItem key={-1}>
                      <IonGrid>
                        <IonRow>
                          <IonCol size='auto'>#</IonCol>
                          <IonCol>Title</IonCol>
                          <IonCol className='ion-text-end' size='auto'>Duration</IonCol>
                        </IonRow>
                  </IonGrid>
                    </IonItem>
                  {currentAlbum?.tracklist.map(track => (
                    <IonItem key={track.position}>
                      <IonGrid>
                        <IonRow>
                          <IonCol size='auto'>{track.position}</IonCol>
                          <IonCol>{track.title}</IonCol>
                          <IonCol className='ion-text-end' size='auto'>{track.duration}</IonCol>
                        </IonRow>
                      </IonGrid>
                    </IonItem>                    
                  ))}
                </IonList>: null}
                </IonCard>
              </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard>
                  <IonCardContent className='ion-text-end'>
                    Data provided by Discogs.
                  </IonCardContent>
                  </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              {inlib ? <IonButton id='open-toast' onClick={() => removeAlbum()}>Remove</IonButton>
              : <IonButton id='open-toast' onClick={() => addAlbum()}>Add</IonButton>}
              <IonButton onClick={async () => await Browser.open({url: currentAlbum.uri})}>Open on Discogs</IonButton>
            </IonCol>
          </IonRow>
      </IonGrid>
      <IonToast trigger="open-toast" message={`This album was ${inlib ? 'added' : 'removed'}!`} duration={5000} position='top' buttons={[{text: 'Dismiss', role: 'cancel'}]}></IonToast>
    </IonContent>
  );
};

export default AlbumDetails;
