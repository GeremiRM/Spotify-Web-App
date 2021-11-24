import React from "react";
import Link from "next/link";

import styles from "./Album.module.scss";

interface TrackProps {
  track: SpotifyApi.TrackObjectSimplified;
  idx: number;
}

export const Track: React.FC<TrackProps> = ({ track, idx }) => {
  const getArtists = () => {
    return track.artists?.map((artist, idx, array) => (
      <p key={artist.id}>
        <Link href={`/artist/${artist.id}`}>{`${artist.name}${
          idx !== array.length - 1 ? "," : ""
        }`}</Link>
      </p>
    ));
  };

  // the duration of a track is in milliseconds
  // as such, it needs to be transformed into minutes:seconds
  const convertDuration = (millis: number) => {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${Number(seconds) < 10 ? "0" : ""}${seconds}`;
  };

  if (!track) return <></>;

  return (
    <div className={styles.track}>
      <div className={styles.track__number}>
        <p>{idx}</p>
      </div>
      <div className={styles.track__body}>
        <div className={styles.track__desc}>
          <div className={styles.track__title}>{track.name}</div>
          <div className={styles.track__artists}>{getArtists()}</div>
        </div>
        <div className={styles.track__duration}>
          <p>{convertDuration(track.duration_ms)}</p>
        </div>
      </div>
    </div>
  );
};
