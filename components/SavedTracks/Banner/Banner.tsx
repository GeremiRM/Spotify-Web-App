import Image from "next/image";

// styling
import styles from "./Banner.module.scss";

interface BannerProps {
  amountSongs: number;
}

export const Banner: React.FC<BannerProps> = ({ amountSongs }) => {
  return (
    <div className={styles.banner}>
      <div className={styles.cover}>
        <Image
          src="/likedSongs.png"
          alt="Liked songs"
          width="100%"
          height="100%"
          layout="responsive"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div className={styles.info}>
        <div className={styles.title}>
          <h1>Liked Songs</h1>
        </div>
        <div className={styles.desc}>
          <div className={styles.tracks}>
            <p>{amountSongs} songs </p>
          </div>
        </div>
      </div>
    </div>
  );
};
