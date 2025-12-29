import {
  IonBackButton,
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
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonSearchbar,
  IonText,
  RefresherCustomEvent,
  useIonRouter,
} from '@ionic/react';

import { useLocation, useParams } from 'react-router-dom';
import { musicalNotesOutline, musicalNotesSharp, personOutline, personSharp, searchOutline, searchSharp } from 'ionicons/icons';
import './Menu.css';
import { useState } from 'react';
import { currentAlbum, user } from '../App';
import { Album } from '../models/Album';
import { db } from '../services/firebase';

interface ChildProps {
  // We define a function that expects a string
  onMessage?: (album: Album) => void;
  albums?: Album[],
  unmountMe?: () => void
}

const AlbumList: React.FC<ChildProps> = ({onMessage, albums, unmountMe}) => {

  const location = useLocation();

  // albums = user.collection

  const [display, setDisplay] = useState(albums)


  

  function filterInput(event: Event) {
    const input = (event.target as HTMLIonSearchbarElement).value?.toLowerCase()
    setDisplay(albums!.filter(album => {
      return (
        album.artist.toLowerCase().includes(input as string) ||
        album.title.toLowerCase().includes(input as string)
      )
    }))
  }

  const router = useIonRouter();

  async function handleRefresh(event: RefresherCustomEvent) {
    await db.collection("users").doc(user.id).get()
      .then((doc) => {
        user.collection = doc.data()?.collection
        setDisplay(user.collection)
        event.detail.complete();
      })
      .catch((error) => {
        console.error("Error retrieving user details: ", error);
      })
  }

  

  return (
      <IonContent>
        {location.pathname.startsWith('/collection') ? (
          <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
        ) : (
          null
        )}

        <IonGrid fixed={true}>
            <IonRow>
              <IonCol>
                <IonSearchbar placeholder='Filter' onIonInput={(event) => filterInput(event)}></IonSearchbar>
              </IonCol>
            </IonRow>
            {display && display?.length > 0 ? (
              <>
                <IonRow>
                  {display.map(album => (
                      <IonCol key={album.id} sizeLg='3' sizeMd='3' sizeSm='6' sizeXs='6'>
                          <IonCard routerDirection='none' routerLink={`${location.pathname}/album/${album.id}`} onClick={(e: React.MouseEvent) => {
                            // e.preventDefault()
                            // routerLink={`${location.pathname}/album/${album.id}`}
                            // e.stopPropagation()
                            
                            onMessage!(album)
                            Object.assign(currentAlbum, album)
                            // router.push(`${location.pathname}/album/${album.id}`)
                            }}>
                              <IonImg src={album.coverUrl}></IonImg>
                          </IonCard>
                      </IonCol>
                  ))}
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
              </>
            ) : (
              location.pathname == '/collection' ? (
                <IonButton onClick={() => router.push('/search', 'root')}>Add an album</IonButton>
              ) : (
                <IonText>Your search did not return any results. Try again with different search terms.</IonText>
              )
            )}
            <IonRow>
              {location.pathname == '/search' ? (
                <IonCol>
                  <IonButton onClick={() => unmountMe!()}>Back to form</IonButton>
                </IonCol>
              ) : (
                null
              )}
            </IonRow>
        </IonGrid>
      </IonContent>
  );
};

export default AlbumList;
