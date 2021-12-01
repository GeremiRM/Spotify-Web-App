import { useContext, useRef } from "react";
import { Context } from "../../context/context";
import { useRouter } from "next/router";

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
import { useImageColor } from "../../hooks/useImageColor";
import { HeaderPlayer } from "../Common/HeaderPlayer";

export const Album: React.FC<{}> = () => {
  const playbarRef = useRef<HTMLDivElement>(null);

  // album id
  const router = useRouter();
  const { id } = router.query;

  // album data
  const {
    album,
    artists,
    artistsAlbums: otherAlbums,
  } = useAlbumInfo(id as string);

  const background = useImageColor(album?.images[2]?.url);

  // if data hasn't finished fetching, return nothing
  if (!album || !artists || !otherAlbums) return <></>;

  return (
    <div>
      {/* Header */}
      <Header bg={background} activateDistance={playbarRef.current?.offsetTop}>
        <HeaderPlayer
          title={album.name}
          activateDistance={playbarRef.current?.offsetTop}
          uri={album.uri}
        />
      </Header>
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
          <div ref={playbarRef}>
            {/* Playbar */}
            <PlayBar bg={background} id={album.id} uri={album.uri} />
          </div>
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
    </div>
  );
};
