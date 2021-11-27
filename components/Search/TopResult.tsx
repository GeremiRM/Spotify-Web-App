import React from "react";
import Image from "next/image";

import styles from "./TopResult.module.scss";
import Link from "next/link";

type TopResult =
  | SpotifyApi.AlbumObjectSimplified
  | SpotifyApi.ArtistObjectFull
  | SpotifyApi.PlaylistObjectSimplified;

interface TopResultProps {
  data: TopResult;
}

export const TopResult: React.FC<TopResultProps> = ({ data }) => {

  if(!data) return <></>

  return (
    <Link href={`/${data?.type}/${data?.id}`} passHref>
      <div className={styles.card}>
        <div className={styles.card__image}>
          <div
            className={`${data?.type === "artist" ? styles.artist : ""} ${
              styles.card__img
            } `}
          >
            <Image
              src={data?.images[1]?.url || "/placeholder.png"}
              width="100%"
              height="100%"
              alt={data?.name}
              layout="responsive"
              objectFit="cover"
            />
          </div>
          <div className={styles.card__info}>
            <h2 className={styles.card__title}>{data?.name}</h2>
            <p className={`${styles.card__desc}`}>{data.type}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
