import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./Track.module.scss";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { convertMillisToMinutes } from "../../utils/utils";
import {
  addToSaved,
  containedInSavedTrack,
  getTrackAlbum,
  removeFromSaved,
} from "../../Spotify/SpotifyApi";

type Track = SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified;
type TrackAlbum = SpotifyApi.AlbumObjectSimplified;

interface TrackProps {
  track: Track;
  idx: number;
}

export const Track: React.FC<TrackProps> = ({ track, idx }) => {
  const [trackAlbum, setTrackAlbum] = useState<TrackAlbum>({} as TrackAlbum);
  const [isSavedTrack, setIsSavedTrack] = useState(false);
  const trackDuration = convertMillisToMinutes(track!.duration_ms);

  // if track doesn't include track album
  // search for it manually
  useEffect(() => {
    const getData = async () => {
      const savedTrack = await containedInSavedTrack(track.id);
      const album = track.hasOwnProperty("album")
        ? track.album
        : await getTrackAlbum(track.id);

      setIsSavedTrack(savedTrack.body[0]);
      setTrackAlbum(album);
    };

    getData();
  }, [track]);

  const renderArtists = () => {
    return track.artists.map((artist, idx, array) => (
      <Link key={artist.id} href={`/artist/${artist.id}`}>
        {`${artist.name}${idx === array.length - 1 ? "" : ", "}`}
      </Link>
    ));
  };

  const changeSavedState = async () => {
    if (isSavedTrack) removeFromSaved(track.id);
    else addToSaved(track.id);
    setIsSavedTrack(!isSavedTrack);
  };

  if (Object.keys(track).length === 0 || Object.keys(trackAlbum).length === 0)
    return <></>;

  return (
    <div className={styles.track}>
      <div className={styles.track__header}>
        <div className={styles.track__index}>
          <p>{idx}</p>
        </div>
        <div className={styles.track__img}>
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
        <div onClick={() => changeSavedState()}>
          {isSavedTrack ? (
            <AiFillHeart
              className={`${styles.track__savedIcon} ${styles.track__savedSong}`}
            />
          ) : (
            <AiOutlineHeart
              className={`${styles.track__savedIcon} ${styles.track__unsavedSong}`}
            />
          )}
        </div>
        <p>{trackDuration}</p>
      </div>
    </div>
  );
};
