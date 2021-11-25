import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./Track.module.scss";

import { convertMillisToMinutes } from "../../utils/utils";
import { getTrackAlbum } from "../../Spotify/SpotifyApi";

type Track = SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified;
type TrackAlbum = SpotifyApi.AlbumObjectSimplified;

interface TrackProps {
  track: Track;
  idx: number;
}

export const Track: React.FC<TrackProps> = ({ track, idx }) => {
  const [trackAlbum, setTrackAlbum] = useState<TrackAlbum>({} as TrackAlbum);
  const trackDuration = convertMillisToMinutes(track!.duration_ms);

  // if track doesn't include track album
  // search for it manually
  useEffect(() => {
    const getAlbum = async () => {
      const album = await getTrackAlbum(track.id);
      setTrackAlbum(album);
    };

    if (track.hasOwnProperty("album")) setTrackAlbum(track.album);
    else getAlbum();
  }, [track]);

  const renderArtists = () => {
    return track.artists.map((artist, idx, array) => (
      <Link key={artist.id} href={`/artist/${artist.id}`}>
        {`${artist.name}${idx === array.length - 1 ? "" : ", "}`}
      </Link>
    ));
  };

  if (Object.keys(track).length === 0 || Object.keys(trackAlbum).length === 0)
    return <></>;

  return (
    <div className={styles.track}>
      <div className={styles.track__header}>
        <div className={styles.track__index}>
          <p>{idx}</p>
        </div>
        <div className={styles?.track__img}>
          <Image
            src={trackAlbum.images[2].url}
            alt={track.name}
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </div>
        <div className={styles.track__desc}>
          <div className={styles.track__desc__title}>
            <p>{track.name}</p>
          </div>
          <div className={styles.track__desc__artists}>
            <p>{renderArtists()}</p>
          </div>
        </div>
      </div>
      <div className={styles.track__album}>
        <Link href={`/album/${trackAlbum.id}`} passHref>
          <p>{trackAlbum.name}</p>
        </Link>
      </div>
      <div className={styles.track__duration}>
        <p>{trackDuration}</p>
      </div>
    </div>
  );
};
