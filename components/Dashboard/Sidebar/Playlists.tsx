import React, { useContext } from "react";
import { Context } from "../../../context/context";

import styles from "./Sidebar.module.scss";

export const Playlists: React.FC<{}> = ({}) => {
  const { playlists } = useContext(Context);

  const renderPlaylists = () => {
    return playlists.items.map((playlist) => (
      <p key={playlist.id}>{playlist.name}</p>
    ));
  };

  renderPlaylists();

  return <div className={styles.sidebar__playlists}>{renderPlaylists()}</div>;
};
