import Image from "next/image";

// styling
import styles from "./Banner.module.scss";

// interface
interface BannerProps {
  artist: SpotifyApi.ArtistObjectFull;
}

export const Banner: React.FC<BannerProps> = ({ artist }) => {
  if (!artist) return <></>;

  return (
    <div className={styles.banner}>
      <div className={styles.banner__cover}>
        <Image
          src={artist.images[0].url || "/placeholder.png"}
          width="100%"
          height="100%"
          layout="responsive"
          alt={artist.name}
          objectFit="cover"
        />
      </div>
      <div className={styles.banner__info}>
        <div className={styles.banner__name}>
          <h1
            style={{
              fontSize: `clamp(2.75rem,calc(5.75vw - ${artist.name.length}px), 7rem)`,
            }}
          >
            {artist.name}
          </h1>
        </div>
        <div className={styles.banner__desc}>
          <p>{artist.followers.total.toLocaleString()} followers</p>
        </div>
      </div>
    </div>
  );
};
