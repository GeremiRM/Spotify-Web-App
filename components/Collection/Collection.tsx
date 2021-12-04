import { useState } from "react";

// components
import { Header } from "../Header/Header";
import { Selector } from "./Selector";
import { Cards } from "../Common/Cards";
import { LikedSongs } from "./LikedSongs/LikedSongs";

// styling
import styles from "./Collection.module.scss";

// hooks
import { useLibraryInfo } from "../../hooks/useLibraryInfo";
import { Loading } from "../Common/Loading";

export const Collection: React.FC<{}> = ({}) => {
  const [selector, setSelector] = useState(0);

  const { library, likedSongs } = useLibraryInfo();

  if (!library || !likedSongs) return <></>;

  return (
    <div>
      {/* header */}
      <Header bg="rgba(0,0,0,0.75)">
        <Selector selector={selector} setSelector={setSelector} />
      </Header>

      {/* playlists, artists or albums cards */}
      <div className={styles.collection}>
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
        >
          {/* liked songs card */}
          {selector === 0 && <LikedSongs numberOfTracks={likedSongs.length} />}
        </Cards>
      </div>
    </div>
  );
};
