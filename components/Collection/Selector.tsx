import React, { Dispatch, SetStateAction } from "react";

import styles from "./Collection.module.scss";

interface SelectorProps {
  selector: number;
  setSelector: Dispatch<SetStateAction<number>>;
}

export const Selector: React.FC<SelectorProps> = ({
  selector,
  setSelector,
}) => {
  return (
    <div className={styles.selector}>
      <div
        className={`${styles.selection} ${selector === 0 ? styles.active : ""}`}
        onClick={() => setSelector(0)}
      >
        <p>Playlists</p>
      </div>
      <div
        className={`${styles.selection} ${selector === 1 ? styles.active : ""}`}
        onClick={() => setSelector(1)}
      >
        <p>Artists</p>
      </div>
      <div
        className={`${styles.selection} ${selector === 2 ? styles.active : ""}`}
        onClick={() => setSelector(2)}
      >
        <p>Artists</p>
      </div>
    </div>
  );
};
