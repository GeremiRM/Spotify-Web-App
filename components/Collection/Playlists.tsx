import React from "react";
import Card from "../Common/Card";

import styles from "./Collection.module.scss";

type Playlists = SpotifyApi.PlaylistObjectSimplified[];
type Artists = SpotifyApi.ArtistObjectFull[];
type Albums = SpotifyApi.AlbumObjectFull[];

interface CardsProps {
  data: Playlists | Artists | Albums;
}

export const Cards: React.FC<CardsProps> = ({ children, data }) => {
  const renderCards = () => {
    return data?.map((info) => <Card info={info} key={info.id} />);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__header}>
        <h3 className={styles.wrapper__header__title}>
          {data[0].type === "playlist"
            ? "Playlists"
            : data[0].type === "album"
            ? "Albums"
            : "Artists"}
        </h3>
      </div>
      <div className={styles.wrapper__body}>
        {children}
        {renderCards()}
      </div>
    </div>
  );
};
