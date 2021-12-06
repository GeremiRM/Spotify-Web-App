import Image from "next/image";
import { useEffect, useState } from "react";
import { useBannerImage } from "../../../hooks/useBannerImage";

// styling
import styles from "./Banner.module.scss";

interface BannerProps {
  artist: SpotifyApi.ArtistObjectFull;
}

export const Banner: React.FC<BannerProps> = ({ artist }) => {
  const [bannerBg, setBannerBg] = useState("");
  const bannerImage = useBannerImage(artist.name ?? "");

  useEffect(() => {
    if (bannerImage) setBannerBg(bannerImage);
  }, [bannerImage]);

  if (!artist) return <></>;

  return (
    <div
      className={styles.banner}
      style={{
        background: `url(${bannerBg}) center/cover no-repeat `,
      }}
    >
      {/* Banner image */}
      <div className={styles.banner__cover}>
        <Image
          src={artist?.images[0]?.url ?? "/music-placeholder.png"}
          width="100%"
          height="100%"
          layout="responsive"
          alt={artist.name}
          objectFit="cover"
        />
      </div>

      {/* Banner info */}
      <div className={styles.banner__info}>
        {/* Title */}
        <div className={styles.banner__name}>
          <h1
            style={{
              fontSize: `clamp(2.75rem,calc(8vw - ${artist.name.length}px), 96px)`,
            }}
          >
            {artist.name}
          </h1>
        </div>

        {/* Description */}
        <div className={styles.banner__desc}>
          <p>{artist.followers.total.toLocaleString()} followers</p>
        </div>
      </div>
    </div>
  );
};
