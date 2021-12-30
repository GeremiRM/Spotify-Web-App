// styling
import styles from "./Banner.module.scss";

//func
import { converMillisBanners } from "../../../utils/utils";

interface BannerProps {
  playlist: SpotifyApi.PlaylistObjectFull;
  tracks: SpotifyApi.TrackObjectFull[];
}

export const Banner: React.FC<BannerProps> = ({ playlist, tracks }) => {
  const getPlaylistDuration = () => {
    let totalDuration = 0;
    tracks.map((track) => (totalDuration += track.duration_ms));
    return converMillisBanners(totalDuration);
  };

  if (!Object.keys(playlist).length) return <></>;

  return (
    <div className={styles.banner}>
      <div className={styles.cover}>
        {/*eslint-disable-next-line @next/next/no-img-element  */}
        <img
          src={playlist.images[0]?.url ?? "/music-placeholder.png"}
          alt={playlist.name}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.name}>
          <h1
            style={{
              fontSize: `clamp(2.75rem,calc(8vw - ${playlist.name.length}px), 96px)`,
            }}
          >
            {playlist.name}
          </h1>
        </div>
        <div className={styles.desc}>
          <p>{playlist.description}</p>
        </div>
        <div className={styles.desc}>
          {/*  owner */}
          <div className={styles.owner}>
            <p>{playlist.owner.display_name}</p>
            <div className={styles.desc__separator}></div>
          </div>
          {/* likes */}
          {playlist.followers.total.toLocaleString()} likes
          <div className={styles.desc__separator}></div>
          {/* tracks */}
          {playlist.tracks.items.length} songs,
          {/* duration */}
          <div>{getPlaylistDuration()}</div>
        </div>
      </div>
    </div>
  );
};
