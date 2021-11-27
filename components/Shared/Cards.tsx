// libraries
import React from "react";
import Card from "./Card";

// styling
import styles from "./Cards.module.scss";

// types
import {
  TracksList as Tracks,
  ArtistsList as Artists,
  AlbumList as Albums,
} from "../../types/types";
import { filterRepeated } from "../../utils/utils";
type Data = Tracks | Artists | Albums;

// interface
interface Cards {
  data: Data;
  title: string;
  ignoreCard?: string;
  hideLink?: boolean;
}

export const Cards: React.FC<Cards> = ({
  data,
  title,
  ignoreCard,
  hideLink,
}) => {
  const renderCards = () => {
    return data?.map((info) => {
      if (info.id === ignoreCard) return "";
      return <Card info={info} key={info.id} />;
    });
  };

  if (Object.keys(data!).length === 0) return <></>;

  // if data are albums, filter repeated albums
  if (data![0].type === "album") data = filterRepeated(data! as Albums);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__header}>
        <div className={styles.wrapper__title}>
          <h2>{title === "relatedArtists" ? "Fans also like" : title}</h2>
        </div>
        {!hideLink && (
          <div className={styles.wrapper__link}>
            <p>See All</p>
          </div>
        )}
      </div>
      <div className={styles.wrapper__cards}>{renderCards()}</div>
    </div>
  );
};
