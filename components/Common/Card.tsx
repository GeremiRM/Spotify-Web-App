// libraries
import React from "react";
import Image from "next/image";
import Link from "next/link";

// styling
import styles from "./Card.module.scss";

// types
type Artist = SpotifyApi.ArtistObjectFull;
type Album = SpotifyApi.AlbumObjectSimplified;
type Playlist = SpotifyApi.PlaylistObjectSimplified;
type Track = SpotifyApi.TrackObjectFull;

type Info = Artist | Album | Playlist | Track;

// interface
interface CardProps {
  info: Info;
}

const Card: React.FC<CardProps> = ({ info }) => {
  const cardImage = () => {
    switch (info?.type) {
      case "artist":
        return info?.images[1]?.url;
      case "album":
        return info?.images[1]?.url;
      case "track":
        return info?.album?.images[1]?.url;
      default:
        return "/placeholder.png";
    }
  };

  const cardDesc = () => {
    switch (info?.type) {
      case "artist":
        return "Artist";
      case "album":
        return info.release_date.substring(0, 4);
      case "playlist":
        return "By " + info.owner.display_name;
      case "track":
        return <Link href={`/album/${info.album.id}`}>{info.album.name}</Link>;
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
        <div className={styles.card__body}>
          <p className={styles.card__body__title}>{info?.name}</p>
          <p className={`${styles.card__body__desc} ${info?.type === "track"}`}>
            {cardDesc()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
