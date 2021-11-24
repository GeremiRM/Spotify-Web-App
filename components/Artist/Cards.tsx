// libraries
import React from "react";
import Card from "../Shared/Card";

// styling
import styles from "./Cards.module.scss";

// types
import {
  TracksList as Tracks,
  ArtistsList as Artists,
  AlbumList as Albums,
} from "../../types/types";
type Data = Tracks | Artists | Albums;

// interface
interface Cards {
  data: Data;
  title: string;
  ignoreCard?: string;
}

export const Cards: React.FC<Cards> = ({ data, title, ignoreCard }) => {
  const renderCards = () => {
    return data?.map((info) => {
      if (info.id === ignoreCard) return "";
      return <Card info={info} key={info.id} />;
    });
  };
  const filterRepeated = (list: Albums) => {
    return list?.filter(
      (v, i, a) => a.findIndex((t) => t.name === v.name) === i
    );
  };

  if (data?.length === 0 || typeof data === "undefined") return <></>;

  // if data are albums, filter repeated albums
  if (data[0].type === "album") data = filterRepeated(data as Albums);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__header}>
        <div className={styles.wrapper__title}>
          <h2>{title === "relatedArtists" ? "Fans also like" : title}</h2>
        </div>
        <div className={styles.wrapper__link}>
          <p>See All</p>
        </div>
      </div>

      <div className={styles.wrapper__cards}>{renderCards()}</div>
    </div>
  );
};
