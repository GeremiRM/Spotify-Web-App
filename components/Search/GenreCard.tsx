import Link from "next/link";
import Image from "next/image";

interface CardProps {
  id: string;
  title: string;
  cover: string;
}

import styles from "./Genres.module.scss";

export const Card: React.FC<CardProps> = ({ id, title, cover }) => {
  const randomBackground = () => {
    return `rgb(${Math.floor(Math.random() * 225)},${Math.floor(
      Math.random() * 175
    )},${Math.floor(Math.random() * 200)})`;
  };

  return (
    <Link href={`/category/${id}`} passHref>
      <div
        className={styles.card}
        style={{
          background: `${randomBackground()}`,
        }}
      >
        <div className={styles.card__title}>
          <h3>{title}</h3>
        </div>

        <div className={styles.card__image}>
          <Image src={cover} alt={title} width="100px" height="100px" />
        </div>
      </div>
    </Link>
  );
};
