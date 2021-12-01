import { useRouter } from "next/router";

// components
import { Header } from "../Header/Header";
import { Banner } from "./Banner";
import { Tracklist } from "../Common/Tracklist";

// styling
import styles from "./Playlist.module.scss";

// hooks
import { usePlaylistInfo } from "../../hooks/usePlaylistInfo";
import { useImageColor } from "../../hooks/useImageColor";

export const Playlist: React.FC<{}> = ({}) => {
  const router = useRouter();
  const { id } = router.query;

  const { playlist, tracks } = usePlaylistInfo(id as string);
  const background = useImageColor(playlist?.images[0]?.url);

  if (!playlist || !tracks) return <></>;

  return (
    <div>
      <Header />
      {Object.keys(playlist).length !== 0 && (
        <div
          className={styles.playlist}
          style={{
            background: `linear-gradient(
      0deg,
      #121212 65%,
      ${background} 100%)`,
          }}
        >
          <Banner playlist={playlist} tracks={tracks} />
          <Tracklist tracks={tracks} stickyHeader />
        </div>
      )}
    </div>
  );
};
