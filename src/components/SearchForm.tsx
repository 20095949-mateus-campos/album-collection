import {
  IonButton,
  IonCard,
  IonContent,
  IonInput,
  IonItem,
  IonList,
} from '@ionic/react';

import './Menu.css';
import { getAlbums, getTracks } from '../services/discogs';
import { useRef, useState } from 'react';
import AlbumList from './AlbumList';
import { Album } from '../models/Album';

interface ChildProps {
  onSelectAlbum?: (album: Album) => void;
  albums?: Album[]
}

const SearchForm: React.FC<ChildProps> = ({onSelectAlbum}) => {
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

  return (
    <IonContent>
      {data ? 
        <AlbumList unmountMe={unMount} onSelectAlbum={(childData: Album) => {
          onSelectAlbum!(childData)
        }} albums={data}/>
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
