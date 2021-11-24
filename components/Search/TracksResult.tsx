// libraries
import React from "react";

// components
import { Track } from "./Track";

// styling
import styles from "./Tracks.module.scss";

// types
import { Tracks } from "../../types/types";

// interface
interface TopResultProps {
  tracks: Tracks;
}

// max amount of songs to be displayed
const LIMIT = 4;

export const TracksResult: React.FC<TopResultProps> = ({ tracks }) => {
  const renderTracks = () => {
    return tracks?.items
      ?.slice(0, LIMIT)
      .map((track) => <Track track={track} key={track.id} />);
  };

  // if there are no tracks, return nothing
  if (tracks?.items?.length === 0) return <></>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__header}>
        <div className={styles.wrapper__title}>
          <h2>Songs</h2>
        </div>
        <div className={styles.wrapper__link}>
          <p>See All</p>
        </div>
      </div>
      <div className={styles.wrapper__tracks}>{renderTracks()}</div>
    </div>
  );
};
