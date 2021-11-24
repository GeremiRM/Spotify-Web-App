// libraries
import React from "react";
import Card from "./Card";

// styling
import styles from "./Cards.module.scss";

// types
import { Tracks, Artists, Albums } from "../../types/types";
type Data = Tracks | Artists | Albums;

// interface
interface Cards {
  data: Data;
  title: string;
}

export const Cards: React.FC<Cards> = ({ data, title }) => {
  const renderCards = () => {
    return data?.items?.map((info) => <Card info={info} key={info.id} />);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__header}>
        <div className={styles.wrapper__title}>
          <h2>{title}</h2>
        </div>
        <div className={styles.wrapper__link}>
          <p>See All</p>
        </div>
      </div>

      <div className={styles.wrapper__cards}>{renderCards()}</div>
    </div>
  );
};
