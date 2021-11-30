// components
import Card from "./Card";

// styling
import styles from "./Cards.module.scss";

// func
import { filterRepeated } from "../../utils/utils";

// types
import { CardsData } from "../../types/types";

interface Cards {
  data: CardsData;
  title: string;
  ignoreCard?: string;
  hideLink?: boolean;
  multirow?: boolean;
}

export const Cards: React.FC<Cards> = ({
  data,
  title,
  ignoreCard,
  hideLink,
  multirow,
}) => {
  const renderCards = () => {
    return data?.map((info, idx) => {
      if (info.id === ignoreCard) return "";
      return <Card info={info} key={info.id + idx} />;
    });
  };

  if (Object.keys(data!).length === 0) return <></>;

  // if data are albums, filter repeated albums
  if (data![0]?.type === "album") data = filterRepeated(data!);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__header}>
        <div className={styles.wrapper__title}>
          <h2>{title}</h2>
        </div>
        {!hideLink && (
          <div className={styles.wrapper__link}>
            <p>See All</p>
          </div>
        )}
      </div>
      <div
        className={`${styles.wrapper__cards} ${
          multirow ? styles.multirow : ""
        }`}
      >
        {renderCards()}
      </div>
    </div>
  );
};
