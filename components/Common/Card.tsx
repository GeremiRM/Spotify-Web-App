import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

// styling and icons
import styles from "./Card.module.scss";
import { ImPlay3 } from "react-icons/im";

// hook
import { usePlay } from "../../hooks/usePlay";

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

  const play = usePlay(info.uri);

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
        return info?.album?.images[1]?.url ?? "/music-placeholder.png";
      case "artist":
      case "album":
        return info?.images[1]?.url ?? "/music-placeholder.png";
      case "playlist":
        return info?.images[0]?.url ?? "/music-placeholder.png";
      default:
        return "/music-placeholder.png";
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

  if (Object.keys(info).length === 0) return <></>;

  // If the card is a track, on click send the user to the track's album page
  // otherwise, simply go to the artist/track/album page

  const cardLink =
    info?.type === "track"
      ? `/album/${info.album.id}`
      : `/${info?.type}/${info?.id}`;

  return (
    <Link href={cardLink} passHref>
      <div className={styles.card} onClick={() => saveSearch()}>
        <div
          className={`${styles.card__img} ${
            info?.type === "artist" ? styles.artist : ""
          }  `}
        >
          {info?.type !== "playlist" ? (
            <Image
              src={cardImage() ?? "/music-placeholder.png"}
              width="100%"
              height="100%"
              alt={info?.name}
              layout="responsive"
              objectFit="cover"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cardImage() || "/music-placeholder.png"}
              alt={info.name}
              className={styles.playlist}
            />
          )}
          <div className={styles.card__play} onClick={play}>
            <ImPlay3 />
          </div>
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
