// styling
import styles from "./Playlist.module.scss";
import { ImMusic } from "react-icons/im";

//func
import { convertMillisToMinutes } from "../../utils/utils";

interface BannerProps {
  playlist: SpotifyApi.PlaylistObjectFull;
  tracks: SpotifyApi.TrackObjectFull[];
}

export const Banner: React.FC<BannerProps> = ({ playlist, tracks }) => {
  const getPlaylistDuration = () => {
    let totalDuration = 0;
    tracks.map((track) => (totalDuration += track.duration_ms));
    return convertMillisToMinutes(totalDuration);
  };

  if (Object.keys(playlist).length === 0) return <></>;

  return (
    <div className={styles.playlist__banner}>
      <div className={styles.playlist__cover}>
        {playlist.images.length === 0 ? (
          <ImMusic className={styles.playlist__cover__placeholder} />
        ) : (
          /*eslint-disable-next-line @next/next/no-img-element  */
          <img
            src={playlist.images[0]?.url ?? "/placeholder.png"}
            alt={playlist.name}
          />
        )}
      </div>
      <div className={styles.playlist__info}>
        <div className={styles.playlist__name}>
          <h1
            style={{
              fontSize: `clamp(2.75rem,calc(5.75vw - ${playlist.name.length}px), 7rem)`,
            }}
          >
            {playlist.name}
          </h1>
        </div>
        <div className={styles.playlist__desc}>
          <p>{playlist.description}</p>
        </div>
        <div className={styles.playlist__desc}>
          <div className={styles.playlist__desc__owner}>
            <p>{playlist.owner.display_name}</p>
            <div className={styles.playlist__separator}></div>
          </div>
          <div className={styles.playlist__year}>
            {playlist.followers.total.toLocaleString()} likes
          </div>
          <div className={styles.playlist__separator}></div>
          <div className={styles.playlist__tracks}>
            {playlist.tracks.items.length} songs,{" "}
          </div>
          <div className={styles.playlist__duration}>
            {getPlaylistDuration()}
          </div>
        </div>
      </div>
    </div>
  );
};
