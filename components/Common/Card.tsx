import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const { pathname } = router;

  // if the card is a search result, on click
  const saveSearch = () => {
    const search = info;
    if (pathname === "/search") {
      // if searches doesn't exist in localStorage, intialize data
      if (!window.localStorage.getItem("searches"))
        window.localStorage.setItem("searches", JSON.stringify([search]));
      // otherwise, just get the data the pre-existing data
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
    }
  };

  const cardImage = () => {
    switch (info?.type) {
      case "track":
        return info?.album?.images[0]?.url;
      case "artist":
        return info?.images[0]?.url;
      case "album":
        return info?.images[0]?.url;
      case "playlist":
        return info?.images[0]?.url;
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

  if (Object.keys(info).length === 0) return <></>;

  return (
    <Link href={`/${info?.type}/${info?.id}`} passHref>
      <div className={styles.card} onClick={() => saveSearch()}>
        <div
          className={`${info?.type === "artist" ? styles.artist : ""} ${
            styles.card__img
          } `}
        >
          {info?.type !== "playlist" ? (
            <Image
              src={cardImage() || "/placeholder.png"}
              width="100%"
              height="100%"
              alt={info?.name}
              layout="responsive"
              objectFit="cover"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cardImage() || "placeholder.png"}
              alt={info.name}
              className={styles.playlist}
            />
          )}
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
