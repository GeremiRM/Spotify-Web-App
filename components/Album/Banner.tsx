import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// styling
import styles from "./Album.module.scss";

// functions
import { getAlbumDuration } from "../../Spotify/SpotifyApi";
import { convertMillisToMinutes } from "../../utils/utils";

interface BannerProps {
  album: SpotifyApi.AlbumObjectFull;
  artists: SpotifyApi.ArtistObjectFull[];
}

export const Banner: React.FC<BannerProps> = ({ album, artists }) => {
  const bannerRef = useRef<HTMLDivElement>(null);

  const albumDuration = convertMillisToMinutes(getAlbumDuration(album));

  const renderArtists = () => {
    return artists?.map((artist, idx, array) => (
      <Link href={`/artist/${artist.id}`} key={artist.id}>{`${artist.name}${
        idx !== array.length - 1 ? "," : ""
      }`}</Link>
    ));
  };

  if (Object.keys(album).length === 0 || Object.keys(artists).length === 0)
    return <></>;

  return (
    <div className={styles.album__banner}>
      <div className={styles.album__cover} ref={bannerRef}>
        <Image
          src={album?.images[0]?.url || "/placeholder.png"}
          width="100%"
          height="100%"
          layout="responsive"
          alt={album.name}
        />
      </div>
      <div className={styles.album__info}>
        <div className={styles.album__name}>
          <h1
            style={{
              fontSize: `clamp(2.75rem,calc(5.75vw - ${album.name.length}px), 7rem)`,
            }}
          >
            {album.name}
          </h1>
        </div>
        <div className={styles.album__desc}>
          {/* if there's only one artist, display image */}
          <div className={styles.album__desc__artist}>
            {artists?.length === 1 && (
              <div className={styles.album__desc__artist__image}>
                <Image
                  src={artists[0]?.images[2]?.url}
                  alt={album?.artists[0]?.name}
                  width="100%"
                  height="100%"
                  layout="responsive"
                />
              </div>
            )}
            <p>{renderArtists()}</p>
            <div className={styles.album__separator}></div>
          </div>
          <div className={styles.album__year}>
            {album.release_date.substring(0, 4)}
          </div>
          <div className={styles.album__separator}></div>
          <div className={styles.album__tracks}>
            {album.total_tracks} songs,{" "}
          </div>
          <div className={styles.album__duration}>{albumDuration}</div>
        </div>
      </div>
    </div>
  );
};
