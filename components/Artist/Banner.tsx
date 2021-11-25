// libraries
import React from "react";

// styling
import styles from "./Artist.module.scss";

// types
import { Artist } from "../../types/types";

// interface
interface BannerProps {
  artist: Artist;
}

const randomBackground = () => {
  return `rgb(${Math.floor(Math.random() * 255)},${Math.floor(
    Math.random() * 150 + 105
  )},${Math.floor(Math.random() * 255)})`;
};

export const Banner: React.FC<BannerProps> = ({ artist }) => {
  if (!artist) return <></>;
  return (
    <div
      className={styles.artist__banner}
      style={{
        background: `linear-gradient(
      0deg,
      #121212 30%,
      ${randomBackground()} 95%)`,
      }}
    >
      <div className={styles.artist__info}>
        <div className={styles.artist__info__verified}>Verified Artist</div>
        <div className={styles.artist__info__name}>
          <h1>{artist.name}</h1>
        </div>
        <div className={styles.artist__info__followers}>
          <p>{artist.followers?.total.toLocaleString()} followers</p>
        </div>
      </div>
    </div>
  );
};
