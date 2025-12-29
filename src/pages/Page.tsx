import { IonBackButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { useLocation, useParams } from 'react-router';
import './Page.css';
import AlbumList from '../components/AlbumList';
import { useState } from 'react';
import SearchForm from '../components/SearchForm';
import UserDetails from '../components/UserDetails';
import AlbumDetails from '../components/AlbumDetails';
import { user } from '../App';
import { Album } from '../models/Album';
import About from '../components/About';

interface ChildProps {
  onSelectAlbum?: (album: Album) => void;
  album?: Album,
  setLoggedIn?: (state: boolean) => void
}

const Page: React.FC<ChildProps> = ({onSelectAlbum, album, setLoggedIn}) => {
  const location = useLocation();
  const { name, model, id } = useParams<{ name: string, model?: string, id?: string }>();
  const [content, setContent] = useState<any>(null)

  // render different component depending on routing
  useIonViewWillEnter(() => {
    if (location.pathname == '/collection')
      setContent(<AlbumList onSelectAlbum={onSelectAlbum} albums={user.collection}/>)
    else if (location.pathname == `/${name}/${model}/${id}`)
      setContent(<AlbumDetails album={album}/>)
    else if (location.pathname == '/search')
      setContent(<SearchForm onSelectAlbum={onSelectAlbum} />)
    else if (location.pathname == '/account')
      setContent(<UserDetails setLoggedIn={setLoggedIn} />)
    else if (location.pathname == '/about')
      setContent(<About />) 
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
            {model ? <IonBackButton defaultHref={`/${name}`}></IonBackButton> : null}
          </IonButtons>
          {model ? <IonTitle>{model[0].toUpperCase() + model.slice(1) + ' Details'}</IonTitle> : <IonTitle>{name[0].toUpperCase() + name.slice(1)}</IonTitle>}
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            {model ? <IonTitle>{model[0].toUpperCase() + model.slice(1) + ' Details'}</IonTitle> : <IonTitle>{name[0].toUpperCase() + name.slice(1)}</IonTitle>}
          </IonToolbar>
        </IonHeader>

        {content}
      </IonContent>
    </IonPage>
  );
};

export default Page;
