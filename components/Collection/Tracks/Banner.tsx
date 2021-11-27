import React from "react";
import Image from "next/image";

// styling
import styles from "./Tracks.module.scss";

interface BannerProps {
  amountSongs: number;
}

export const Banner: React.FC<BannerProps> = ({ amountSongs }) => {
  return (
    <div
      className={styles.playlist__banner}
      style={{
        background: `linear-gradient(
      0deg,
      #121212 0%,
      rgb(80, 56, 160) 95%)`,
      }}
    >
      <div className={styles.playlist__cover}>
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
      <div className={styles.playlist__info}>
        <div className={styles.playlist__name}>
          <h1
            style={{
              fontSize: `clamp(4rem,5vw, 7rem)`,
            }}
          >
            Liked Songs
          </h1>
        </div>
        <div className={styles.playlist__desc}>
          <div className={styles.playlist__tracks}>{amountSongs} songs </div>
        </div>
      </div>
    </div>
  );
};
