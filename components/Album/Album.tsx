import { useRef } from "react";
import { useRouter } from "next/router";

// components
import { Header } from "../Header/Header";
import { HeaderPlayer } from "../Header/HeaderPlayer/HeaderPlayer";
import { Banner } from "./Banner/Banner";
import { Tracklist } from "../Common/Tracklist";
import { Cards } from "../Common/Cards";
import { PlayBar } from "./Playbar/PlayBar";
import { Loading } from "../Common/Loading";

// styling
import styles from "./Album.module.scss";

// hook
import { useAlbumInfo } from "../../hooks/useAlbumInfo";
import { useImageColor } from "../../hooks/useImageColor";

export const Album: React.FC<{}> = () => {
  // album id
  const router = useRouter();
  const { id } = router.query;

  // album data
  const { album, artists, otherAlbums, isSavedAlbum } = useAlbumInfo(
    id as string
  );
  const background = useImageColor(album?.images[2]?.url);

  // playbar ref
  const playbarRef = useRef<HTMLDivElement>(null);

  // if data hasn't finished fetching
  if (!album || !artists || !otherAlbums) return <Loading />;

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

        {/* Body  */}
        <div className={styles.body}>
          {/* Playbar */}
          <div ref={playbarRef}>
            <PlayBar
              bg={background}
              id={album.id}
              uri={album.uri}
              isSaved={isSavedAlbum}
            />
          </div>

          {/* Tracklist */}
          <Tracklist
            tracks={album.tracks.items}
            hideAlbum
            stickyHeader
            tracklistUri={album.uri}
          />

          {/* Copyright */}
          <div className={styles.album__copyright}>
            &copy; {album?.copyrights[0]?.text}
          </div>

          {/* Cards */}
          <div className={styles.otherAlbums}>
            <Cards
              data={otherAlbums}
              title={`More by ${artists[0]?.name}`}
              ignoreCard={album.id}
              linkId={album.artists[0].id}
              linkType="albums"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
