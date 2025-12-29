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
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { musicalNotesOutline, musicalNotesSharp, personOutline, personSharp, searchOutline, searchSharp } from 'ionicons/icons';
import './Menu.css';
import { getAlbums, getTracks } from '../services/discogs';
import { useRef, useState } from 'react';
import AlbumList from './AlbumList';
import { Album } from '../models/Album';

// const albums: Album[] = [
//   {
//     coverUrl: 'https://ionicframework.com/docs/img/demos/card-media.png',
//     title: 'Images and Words',
//     artist: 'Dream Theater'
//   },
//   {
//     coverUrl: 'https://ionicframework.com/docs/img/demos/card-media.png',
//     title: 'Focus',
//     artist: 'Cynic'
//   },
//   {
//     coverUrl: 'https://ionicframework.com/docs/img/demos/card-media.png',
//     title: 'Twilight in Olympus',
//     artist: 'Symphony X'
//   },
//   {
//     coverUrl: 'https://ionicframework.com/docs/img/demos/card-media.png',
//     title: 'Images and Words',
//     artist: 'Dream Theater'
//   },
//   {
//     coverUrl: 'https://ionicframework.com/docs/img/demos/card-media.png',
//     title: 'Focus',
//     artist: 'Cynic'
//   },
//   {
//     coverUrl: 'https://ionicframework.com/docs/img/demos/card-media.png',
//     title: 'Twilight in Olympus',
//     artist: 'Symphony X'
//   },
//   {
//     coverUrl: 'https://ionicframework.com/docs/img/demos/card-media.png',
//     title: 'Images and Words',
//     artist: 'Dream Theater'
//   },
//   {
//     coverUrl: 'https://ionicframework.com/docs/img/demos/card-media.png',
//     title: 'Focus',
//     artist: 'Cynic'
//   },
//   {
//     coverUrl: 'https://ionicframework.com/docs/img/demos/card-media.png',
//     title: 'Twilight in Olympus',
//     artist: 'Symphony X'
//   },
// ];

interface ChildProps {
  // We define a function that expects a string
  // onMessage(album: Album): void;
  onMessage?: (album: Album) => void;
  albums?: Album[]
}

const SearchForm: React.FC<ChildProps> = ({onMessage, albums}) => {
  const location = useLocation();
  const [ready, setReady] = useState(false)
  const [data, setData] = useState<any[] | null>(null)

  const titleRef = useRef<HTMLIonInputElement>(null);
  const artistRef = useRef<HTMLIonInputElement>(null);
  const yearRef = useRef<HTMLIonInputElement>(null);
  const genreRef = useRef<HTMLIonInputElement>(null);
  const countryRef = useRef<HTMLIonInputElement>(null);

  async function handleSubmit() {
    const title = titleRef.current?.value as string
    const artist = artistRef.current?.value as string
    const year = yearRef.current?.value as string
    const genre = genreRef.current?.value as string
    const country = countryRef.current?.value as string

    await Promise.all(await getAlbums(
      title,
      artist,
      year,
      genre,
      country
    ).then(albums => albums.map(async (album: any) => {
      return {
        id: album.id,
        title: album.title.split(' - ')[1],
        artist: album.title.split(' - ')[0],
        year: album.year,
        genre: album.genre.concat(album.style),
        country: album.country,
        tracklist: await getTracks(album.id).then(tracks => tracks.flatMap((track: any) => {
          return [{
              title: track.title,
              position: track.position,
              duration: track.duration
            }].concat(
              (Object.hasOwn(track, 'sub_tracks') ? (
                track.sub_tracks.map((sub_track: any) => {
                  return {
                    title: '\u21aa ' + sub_track.title,
                    position: sub_track.position,
                    duration: sub_track.duration
                  }
                })) : (null))
            ).filter(track => track)
        })).catch((error) => {
        console.error("Error adding document: ", error);
    }),
        coverUrl: album.cover_image,
        uri: 'https://www.discogs.com'+album.uri
      }
    })).catch((error) => {
        console.error("Error adding document: ", error);
    })).then(result => {
      setData(result)
    })
  }

  function unMount() {
    
    setData(null)
  }

  const [album, setAlbum] = useState({} as Album)

  

  return (
      <IonContent>
        {data ? 
          // `${data}`
          <AlbumList unmountMe={unMount} onMessage={(childData: Album) => {
            onMessage!(childData)
          }} albums={data}/>
          // <AlbumList onMessage={handleData} albums={data}/>
          :
          <IonCard>
        <IonList>
          <IonItem>
            <IonInput ref={titleRef} id='title' name='title' label="Title" placeholder="album title"></IonInput>
          </IonItem>

          <IonItem>
            <IonInput ref={artistRef} id='artist' name='artist' label="Artist" placeholder="album artist"></IonInput>
          </IonItem>

          <IonItem>
            <IonInput ref={yearRef} id='year' name='year' label="Year" type="number" placeholder='album year'></IonInput>
          </IonItem>

          <IonItem>
            <IonInput ref={genreRef} id='genre' name='genre' label="Genre" placeholder="album genre"></IonInput>
          </IonItem>

          <IonItem>
            <IonInput ref={countryRef} id='country' name='country' label="Country" placeholder="album country"></IonInput>
          </IonItem>

          <IonItem>
            <IonButton type='button' onClick={() => handleSubmit()}>Search</IonButton>
          </IonItem>
        </IonList>
        </IonCard>
        }
      </IonContent>
  );
};

export default SearchForm;
