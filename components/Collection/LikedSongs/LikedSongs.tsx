import Link from "next/link";

// styling
import styles from "./LikedSongs.module.scss";

interface LikedSongsProps {
  numberOfTracks: number;
}

export const LikedSongs: React.FC<LikedSongsProps> = ({ numberOfTracks }) => {
  console.log("hola");

  return (
    <Link href={`/collection/tracks`} passHref>
      <div className={styles.likedSongs}>
        <div className={styles.likedSongs__body}>
          <div className={styles.likedSongs__body__title}>
            <h2>Liked Songs</h2>
          </div>
          <div className={styles.likedSongs__body__desc}>
            {numberOfTracks} liked songs
          </div>
        </div>
      </div>
    </Link>
  );
};
