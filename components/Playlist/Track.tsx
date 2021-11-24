import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./Playlist.module.scss";
import { getTrackAlbum, getTrackImage } from "../../Spotify/SpotifyApi";
import { convertMillisToMinutes } from "../../utils/utils";

type Album = SpotifyApi.AlbumObjectSimplified;

interface TrackProps {
  track: SpotifyApi.TrackObjectSimplified;
  idx: number;
}

export const Track: React.FC<TrackProps> = ({ track, idx }) => {
  const [trackAlbum, setTrackAlbum] = useState<Album>({} as Album);
  const trackDuration = convertMillisToMinutes(track.duration_ms);

  const getAlbum = async () => {
    const album = await getTrackAlbum(track.id);
    setTrackAlbum(album);
  };

  useEffect(() => {
    getAlbum();
  });

  const renderArtists = () => {
    return track.artists?.map((artist, idx, array) => (
      <p key={artist.id}>
        <Link href={`/artist/${artist.id}`}>{`${artist.name}${
          idx !== array.length - 1 ? "," : ""
        }`}</Link>
      </p>
    ));
  };

  if (Object.keys(track).length === 0 || Object.keys(trackAlbum).length === 0)
    return <></>;

  return (
    <div className={styles.track}>
      <div className={styles.track__number}>
        <p>{idx}</p>
      </div>
      <div className={styles.track__img}>
        <Image
          src={trackAlbum?.images[2].url || "/placeholder.png"}
          alt={track.name}
          width="100%"
          height="100%"
          layout="responsive"
        />
      </div>
      <div className={styles.track__body}>
        <div className={styles.track__desc}>
          <div className={styles.track__title}>{track.name}</div>
          <div className={styles.track__artists}>{renderArtists()}</div>
        </div>
        <div className={styles.track__album}>
          {<Link href={`/album/${trackAlbum?.id}`}>{trackAlbum?.name}</Link>}
        </div>
        <div className={styles.track__duration}>
          <p>{trackDuration}</p>
        </div>
      </div>
    </div>
  );
};
