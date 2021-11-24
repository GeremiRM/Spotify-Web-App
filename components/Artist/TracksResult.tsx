// libraries
import React, { useState } from "react";

// components
import { Track } from "./Track";

// styling
import styles from "./Tracks.module.scss";

// types
import { TracksList as Tracks } from "../../types/types";

// interface
interface TopResultProps {
  tracks: Tracks;
}

export const TracksResult: React.FC<TopResultProps> = ({ tracks }) => {
  const [seeMore, setSeeMore] = useState(false);
  const limit = seeMore ? 10 : 5;

  const renderTracks = () => {
    return tracks
      ?.slice(0, limit)
      .map((track, idx) => (
        <Track track={track} key={track.id} idx={idx + 1} />
      ));
  };

  // if there are no tracks, return nothing
  if (!Array.isArray(tracks)) return <></>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__header}>
        <div className={styles.wrapper__title}>
          <h2>Popular</h2>
        </div>
      </div>
      <div className={styles.wrapper__tracks}>{renderTracks()}</div>
      {tracks.length > 5 && (
        <div className={styles.wrapper__seemore}>
          <p onClick={() => setSeeMore(!seeMore)}>
            {seeMore ? "See Less" : "See More"}
          </p>
        </div>
      )}
    </div>
  );
};
