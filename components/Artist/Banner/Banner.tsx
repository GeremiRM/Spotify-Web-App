import Image from "next/image";
import { useEffect, useState } from "react";

// styling
import styles from "./Banner.module.scss";

import { useBannerImage } from "../../../hooks/useBannerImage";

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
        backgroundImage: `url(${bannerBg}) `,
      }}
    >
      {/* Banner image */}
      <div className={styles.cover}>
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
      <div className={styles.info}>
        {/* Title */}
        <div className={styles.name}>
          <h1
            style={{
              fontSize: `clamp(2.75rem,calc(8vw - ${artist.name.length}px), 96px)`,
            }}
          >
            {artist.name}
          </h1>
        </div>

        {/* Description */}
        <div className={styles.desc}>
          <p>{artist.followers.total.toLocaleString()} followers</p>
        </div>
      </div>
    </div>
  );
};
