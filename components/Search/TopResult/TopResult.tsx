import Image from "next/image";
import Link from "next/link";

// styling and icons
import styles from "./TopResult.module.scss";
import { FaPlay } from "react-icons/fa";
import { GiPauseButton } from "react-icons/gi";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../../context/context";
import { usePlay } from "../../../hooks/usePlay";

type TopResult =
  | SpotifyApi.AlbumObjectSimplified
  | SpotifyApi.ArtistObjectFull
  | SpotifyApi.PlaylistObjectSimplified;

interface TopResultProps {
  data: TopResult;
}

export const TopResult: React.FC<TopResultProps> = ({ data }) => {
  const { playingTrack } = useContext(Context);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = usePlay(data?.uri);

  useEffect(() => {
    if (Object.keys(playingTrack).length > 0 && data)
      playingTrack.artists[0]?.id === data.id
        ? setIsPlaying(true)
        : setIsPlaying(false);
  }, [data, playingTrack]);

  const saveSearch = () => {
    const search = data;

    // if searches doesn't exist in localStorage, intialize data
    if (!window.localStorage.getItem("searches"))
      window.localStorage.setItem("searches", JSON.stringify([search]));
    // otherwise, just get the data
    else {
      const oldSearches: any[] = JSON.parse(
        window.localStorage.getItem("searches")!
      );

      // if search is not already in pastSearches, add it
      if (oldSearches.findIndex((item) => item.id === search.id) === -1)
        window.localStorage.setItem(
          "searches",
          JSON.stringify([search, ...oldSearches])
        );
    }
  };

  if (!data) return <></>;

  return (
    <Link href={`/${data?.type}/${data?.id}`} passHref>
      <div className={styles.card} onClick={() => saveSearch()}>
        <div
          className={`${data?.type === "artist" ? styles.img__artist : ""} ${
            styles.img
          } `}
        >
          <Image
            src={data?.images[1]?.url || "/music-placeholder.png"}
            width="100%"
            height="100%"
            alt={data?.name}
            layout="responsive"
            objectFit="cover"
          />
        </div>

        <div className={styles.info}>
          <h2 className={styles.title}>{data?.name}</h2>
          <p className={`${styles.desc}`}>{data.type}</p>

          <div className={styles.button}>
            {isPlaying ? <GiPauseButton /> : <FaPlay onClick={play} />}
          </div>
        </div>
      </div>
    </Link>
  );
};
