import Link from "next/link";

// styling
import styles from "./LikedSongs.module.scss";

interface LikedSongsProps {
  tracks: SpotifyApi.TrackObjectFull[];
}

export const LikedSongs: React.FC<LikedSongsProps> = ({ tracks }) => {
  return (
    <Link href={`/collection/tracks`} passHref>
      <div className={styles.likedSongs}>
        <div className={styles.likedSongs__body}>
          <div className={styles.likedSongs__body__title}>
            <h2>Liked Songs</h2>
          </div>
          <div className={styles.likedSongs__body__desc}>
            {tracks.length} liked songs
          </div>
        </div>
      </div>
    </Link>
  );
};
