import Link from "next/link";

// styling
import styles from "./SavedTracksCard.module.scss";

interface LikedSongsProps {
  numberOfTracks: number;
}

export const SavedTracksCard: React.FC<LikedSongsProps> = ({
  numberOfTracks,
}) => {
  return (
    <Link href={`/collection/tracks`} passHref>
      <div className={styles.likedSongs}>
        <div className={styles.likedSongs__body}>
          {/* Title */}
          <div className={styles.likedSongs__body__title}>
            <h2>Liked Songs</h2>
          </div>

          {/* Number of songs */}
          <div className={styles.likedSongs__body__desc}>
            {numberOfTracks} liked songs
          </div>
        </div>
      </div>
    </Link>
  );
};
