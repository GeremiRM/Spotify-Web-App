import { useRef } from "react";
import { useRouter } from "next/router";

// components
import { Header } from "../Header/Header";
import { HeaderPlayer } from "../Header/HeaderPlayer/HeaderPlayer";
import { Banner } from "./Banner/Banner";
import { Tracklist } from "../Common/Tracklist";
import { PlayBar } from "./PlayBar";

// styling
import styles from "./Playlist.module.scss";

// hooks
import { usePlaylistInfo } from "../../hooks/usePlaylistInfo";
import { useImageColor } from "../../hooks/useImageColor";

export const Playlist: React.FC<{}> = ({}) => {
  // playlist id
  const router = useRouter();
  const { id } = router.query;

  const { playlist, tracks } = usePlaylistInfo(id as string);
  const background = useImageColor(playlist?.images[0]?.url);

  const playbarRef = useRef<HTMLDivElement>(null);

  if (!playlist || !tracks) return <> </>;

  return (
    <div>
      {/* header */}
      <Header bg={background} activateDistance={playbarRef.current?.offsetTop}>
        <HeaderPlayer
          title={playlist.name}
          activateDistance={playbarRef.current?.offsetTop}
          uri={playlist.uri}
        />
      </Header>
      <div className={styles.playlist}>
        <div>
          <div
            style={{
              background: `linear-gradient(
      0deg,
      #121212 0%,
      ${background} 100%)`,
            }}
          >
            <Banner
              playlist={playlist}
              tracks={tracks.slice(0, tracks.length > 50 ? 50 : tracks.length)}
            />

            <div ref={playbarRef}>
              <PlayBar uri={playlist.uri} id={playlist.id} />
            </div>
          </div>
        </div>
        <div className={styles.body}>
          <Tracklist
            tracks={tracks.slice(0, tracks.length > 50 ? 50 : tracks.length)}
            stickyHeader
            tracklistUri={playlist.uri}
          />
        </div>
      </div>
    </div>
  );
};
