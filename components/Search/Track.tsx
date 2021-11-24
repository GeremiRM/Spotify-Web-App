import React from "react";
import Image from "next/image";

import styles from "./Tracks.module.scss";
import { convertMillisToMinutes } from "../../utils/utils";

interface TrackProps {
  track: SpotifyApi.TrackObjectFull;
}

export const Track: React.FC<TrackProps> = ({ track }) => {
  const trackDuration = convertMillisToMinutes(track.duration_ms);

  const renderArtists = (artistsList: any) => {
    let artists: string[] = [];
    artistsList.map((artist: any) => artists.push(artist.name));
    return artists.join(", ");
  };

  return (
    <div className={styles.track}>
      <div className={styles.track__img}>
        <Image
          src={track.album.images[0].url}
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
            {renderArtists(track.artists)}
          </div>
        </div>
        <div className={styles.track__duration}>
          <p>{trackDuration}</p>
        </div>
      </div>
    </div>
  );
};
