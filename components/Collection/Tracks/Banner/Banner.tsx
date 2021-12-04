import Image from "next/image";

// styling
import styles from "./Banner.module.scss";

interface BannerProps {
  amountSongs: number;
}

export const Banner: React.FC<BannerProps> = ({ amountSongs }) => {
  return (
    <div className={styles.banner}>
      <div className={styles.banner__cover}>
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
      <div className={styles.banner__info}>
        <div className={styles.banner__title}>
          <h1
            style={{
              fontSize: `clamp(4rem,5vw, 7rem)`,
            }}
          >
            Liked Songs
          </h1>
        </div>
        <div className={styles.banner__desc}>
          <div className={styles.banner__tracks}>{amountSongs} songs </div>
        </div>
      </div>
    </div>
  );
};
