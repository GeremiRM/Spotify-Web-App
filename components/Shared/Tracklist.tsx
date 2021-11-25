import React from "react";

import styles from "./Tracklist.module.scss";
import { BsClock } from "react-icons/bs";
import { Track } from "./Track";

interface TracklistProps {
  tracks: SpotifyApi.TrackObjectSimplified[];
  hideAlbum?: boolean;
}

export const Tracklist: React.FC<TracklistProps> = ({ tracks }) => {
  const renderTracks = () => {
    return tracks.map((track, idx) => {
      return <Track track={track} key={track.id} idx={idx + 1} />;
    });
  };

  if (Object.keys(tracks).length === 0) return <></>;

  return (
    <div className={styles.tracklist}>
      <div className={`${styles.tracklist__header}`}>
        <div className={`${styles.tracklist__title}`}>
          <p>#</p>
          <p>Title</p>
        </div>
        <div className={styles.tracklist__album}>Album</div>
        <div className={styles.tracklist__duration}>
          <BsClock />
        </div>
      </div>
      <div className={styles.tracklist__body}>{renderTracks()}</div>
    </div>
  );
};
