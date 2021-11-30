import { useState } from "react";
import { useRouter } from "next/router";

import { usePalette } from "react-palette";

// components
import { Header } from "../Header/Header";
import { Banner } from "./Banner";
import { Tracklist } from "../Common/Tracklist";
import { Cards } from "../Common/Cards";
import { PlayBar } from "./PlayBar";

// styling
import styles from "./Album.module.scss";

// hook
import { useAlbumInfo } from "../../hooks/useAlbumInfo";

export const Album: React.FC<{}> = () => {
  // album id
  const router = useRouter();
  const { id } = router.query;

  // album data
  const {
    album,
    artists,
    artistsAlbums: otherAlbums,
  } = useAlbumInfo(id as string);
  const [background, setBackground] = useState("");

  // if data hasn't finished fetching, return nothing
  if (!album || !artists || !otherAlbums) return <></>;

  return (
    <div>
      `{/* Header */}
      <Header />
      {Object.keys(album).length !== 0 && (
        <div
          className={styles.album}
          style={{
            background: `linear-gradient(
      0deg,
      #121212 65%,
      ${background} 100%)`,
          }}
        >
          {/* Banner */}
          <Banner album={album} artists={artists} />

          <div className={styles.album__body}>
            {/* Playbar */}
            <PlayBar bg={background} id={album.id} />
            {/* Tracklist */}
            <Tracklist tracks={album.tracks.items} hideAlbum stickyHeader />

            {/* Copyright */}
            <div className={styles.album__copyright}>
              &copy; {album?.copyrights[0]?.text}
            </div>
            {/* Cards */}
            <div className={styles.album__otherAlbums}>
              <Cards
                data={otherAlbums}
                title={`More by ${artists[0]?.name}`}
                ignoreCard={album.id}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
