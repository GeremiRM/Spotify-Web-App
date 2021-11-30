import Image from "next/image";

// styling
import styles from "./Artist.module.scss";

// interface
interface BannerProps {
  artist: SpotifyApi.ArtistObjectFull;
}

export const Banner: React.FC<BannerProps> = ({ artist }) => {
  if (!artist) return <></>;
  return (
    <div className={styles.artist__banner}>
      <div className={styles.artist__cover}>
        <Image
          src={artist.images[0].url || "/placeholder.png"}
          width="100%"
          height="100%"
          layout="responsive"
          alt={artist.name}
          objectFit="cover"
        />
      </div>
      <div className={styles.artist__info}>
        <div className={styles.artist__name}>
          <h1
            style={{
              fontSize: `clamp(2.75rem,calc(5.75vw - ${artist.name.length}px), 7rem)`,
            }}
          >
            {artist.name}
          </h1>
        </div>
        <div className={styles.artist__desc}>
          {artist.followers.total.toLocaleString()} followers
        </div>
      </div>
    </div>
  );
};
