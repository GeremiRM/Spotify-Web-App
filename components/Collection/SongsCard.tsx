import React from "react";

import styles from "./Collection.module.scss";

interface SongsCardProps {
  tracks: SpotifyApi.TrackObjectFull[];
}

export const SongsCard: React.FC<SongsCardProps> = ({ tracks }) => {
  return (
    <div className={styles.saved}>

      <div className={styles.saved__body}>
        <div className={styles.saved__body__title}>
          <h2>Liked Songs</h2>
        </div>
        <div className={styles.saved__body__desc}>
          {tracks.length} liked songs
        </div>
      </div>
    </div>
  );
};