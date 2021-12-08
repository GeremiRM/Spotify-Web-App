import { useState } from "react";

// components
import { Header } from "../Header/Header";
import { Selector } from "./Selector";
import { Cards } from "../Common/Cards";
import { SavedTracksCard } from "./SavedTracksCard/SavedTracksCard";
import { Loading } from "../Common/Loading";

// styling
import styles from "./Collection.module.scss";

// hooks
import { useLibraryInfo } from "../../hooks/useLibraryInfo";

export const Collection: React.FC<{}> = ({}) => {
  const [selector, setSelector] = useState(0);

  const { library, likedSongs } = useLibraryInfo();

  if (!library || !likedSongs) return <Loading />;

  return (
    <div>
      {/* header */}
      <Header bg="rgba(0,0,0,0.75)">
        <div className={styles.selector__desktop}>
          <Selector selector={selector} setSelector={setSelector} />
        </div>
      </Header>

      {/* playlists, artists or albums cards */}
      <div className={styles.collection}>
        <div className={styles.selector__mobile}>
          <Selector selector={selector} setSelector={setSelector} />
        </div>
        <Cards
          data={
            selector === 0
              ? library!.playlists
              : selector === 1
              ? library!.artists
              : library!.albums
          }
          title={
            selector === 0 ? "Playlists" : selector === 1 ? "Artists" : "Albums"
          }
          multirow
          hideLink
        ></Cards>
        {/* liked songs card */}
        {/* {selector === 0 && <LikedSongs numberOfTracks={likedSongs.length} />} */}
      </div>
    </div>
  );
};
