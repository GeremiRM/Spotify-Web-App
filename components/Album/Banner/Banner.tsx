import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// styling
import styles from "./Banner.module.scss";

import { converMillisBanners, getAlbumDuration } from "../../../utils/utils";

interface BannerProps {
  album: SpotifyApi.AlbumObjectFull;
  artists: SpotifyApi.ArtistObjectFull[];
}

export const Banner: React.FC<BannerProps> = ({ album, artists }) => {
  const bannerRef = useRef<HTMLDivElement>(null);

  const albumDuration = converMillisBanners(getAlbumDuration(album));

  const renderArtists = () => {
    return artists?.map((artist, idx, array) => (
      <Link href={`/artist/${artist.id}`} key={artist.id}>{`${artist.name}${
        idx !== array.length - 1 ? "," : ""
      }`}</Link>
    ));
  };

  if (!Object.keys(album).length || !Object.keys(artists).length) return <></>;

  return (
    <div className={styles.banner} ref={bannerRef}>
      {/* Banner image */}
      <div className={styles.cover}>
        <Image
          src={album?.images[0]?.url || "/music-placeholder.png"}
          width="100%"
          height="100%"
          layout="responsive"
          alt={album.name}
        />
      </div>

      {/* Banner info */}
      <div className={styles.info}>
        {/* Title */}
        <div className={styles.name}>
          <h1
            style={{
              fontSize: `clamp(2.75rem,calc(8vw - ${album.name.length}px), 96px)`,
            }}
          >
            {album.name}
          </h1>
        </div>

        {/* Description */}
        <div className={styles.desc}>
          {/* if there's only one artist, display image */}
          <div className={styles.artist}>
            {artists?.length === 1 && (
              <div className={styles.artist__img}>
                <Image
                  src={artists[0]?.images[2]?.url}
                  alt={album?.artists[0]?.name}
                  width="100%"
                  height="100%"
                  layout="responsive"
                />
              </div>
            )}

            {/* Render all artists */}
            <p>{renderArtists()}</p>
            <div className={styles.desc__separator}></div>
          </div>

          {/* Year of release */}
          <p>{album.release_date.substring(0, 4)}</p>
          <div className={styles.desc__separator}></div>

          {/* Number of tracks */}
          <p>{album.total_tracks} songs, </p>

          {/* Album Duration */}
          <p>{albumDuration}</p>
        </div>
      </div>
    </div>
  );
};
