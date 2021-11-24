// libraries
import React from "react";
import Image from "next/image";
import Link from "next/link";

// styling
import styles from "./Card.module.scss";

// types
import { Track, Artist, Album } from "../../types/types";
type Info = Track | Artist | Album;

// interface
interface CardProps {
  info: Info;
}

const Card: React.FC<CardProps> = ({ info }) => {
  // the image is located at different attributes
  // depending on the type.

  const cardImage = () => {
    switch (info?.type) {
      case "artist":
        return info?.images[0]?.url;
      case "album":
        return info?.images[0]?.url;
      default:
        return "/placeholder.png";
    }
  };
  //

  const cardDesc = () => {
    switch (info?.type) {
      case "artist":
        return "Artist";
      case "album":
        return info.release_date.substring(0, 4);
      default:
        return "";
    }
  };

  if (info?.type === "album" && info.album_type === "single") return <></>;

  return (
    <Link href={`/${info?.type}/${info?.id}`} passHref>
      <div className={styles.card}>
        <div
          className={`${info?.type === "artist" ? styles.artist : ""} ${
            styles.card__img
          } `}
        >
          <Image
            src={cardImage() || "/placeholder.png"}
            width="100%"
            height="100%"
            alt={info?.name}
            layout="responsive"
            objectFit="cover"
          />
        </div>
        <div className={styles.card__desc}>
          <p className={styles.card__desc__title}>{info?.name}</p>
          <p>{cardDesc()}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
