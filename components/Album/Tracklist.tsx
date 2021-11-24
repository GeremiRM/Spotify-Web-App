import React from "react";

import styles from "./Album.module.scss";
import { BsClock } from "react-icons/bs";
import { Track } from "./Track";

interface TracklistProps {
  tracks: SpotifyApi.TrackObjectSimplified[];
}

export const Tracklist: React.FC<TracklistProps> = ({ tracks }) => {
  const renderTracks = () => {
    return tracks.map((track, idx) => {
      return <Track track={track} key={track.id} idx={idx + 1} />;
    });
  };

  return (
    <div className={styles.tracklist}>
      <div className={`${styles.tracklist__header}`}>
        <div className={styles.tracklist__header__number}>
          <p>#</p>
        </div>
        <div className={styles.tracklist__header__title}>Title</div>
        <div className={styles.tracklist__header__duration}>
          <BsClock />
        </div>
      </div>
      <div className={styles.tracklist__body}>{renderTracks()}</div>
    </div>
  );
};
