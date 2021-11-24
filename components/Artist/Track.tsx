import React from "react";
import Image from "next/image";

import styles from "./Tracks.module.scss";

import { Track as TrackType } from "../../types/types";

interface TrackProps {
  track: TrackType;
  idx: number;
}

export const Track: React.FC<TrackProps> = ({ track, idx }) => {
  const getArtists = (artistsList: SpotifyApi.ArtistObjectSimplified[]) => {
    let artists: string[] = [];
    artistsList?.map((artist: any) => artists.push(artist.name));
    return artists.join(", ");
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
      <div className={styles.track__index}>
        <p>{idx}</p>
      </div>
      <div className={styles.track__img}>
        <Image
          src={track.album.images[2].url}
          alt={track.name}
          width="100%"
          height="100%"
          objectFit="cover"
        />
      </div>
      <div className={styles.track__body}>
        <div className={styles.track__desc}>
          <div className={styles.track__desc__title}>{track.name}</div>
          <div className={styles.track__desc_artists}>
            {getArtists(track.artists)}
          </div>
        </div>
        <div className={styles.track__album}>{track.album.name}</div>
        <div className={styles.track__duration}>
          <p>{convertDuration(track.duration_ms)}</p>
        </div>
      </div>
    </div>
  );
};
