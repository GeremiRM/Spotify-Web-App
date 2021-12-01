import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// styling and icons
import styles from "./Track.module.scss";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";

// util
import { convertMillisToMinutes } from "../../utils/utils";

// hooks
import { useSpotify } from "../../hooks/useSpotify";
import { usePlay } from "../../hooks/usePlay";
import { useSongInfo } from "../../hooks/useSongInfo";

interface TrackProps {
  id: string;
  idx: number;
  hideAlbum?: boolean;
}

export const Track: React.FC<TrackProps> = ({ id, idx, hideAlbum }) => {
  const { track, isTrackSaved } = useSongInfo(id);
  const [trackSaved, setTrackSaved] = useState(isTrackSaved);
  const trackDuration = convertMillisToMinutes(track?.duration_ms);

  const spotifyApi = useSpotify();
  const play = usePlay([track?.uri]);

  const renderArtists = () => {
    return track.artists.map((artist, idx, array) => (
      <Link key={artist.id} href={`/artist/${artist.id}`}>
        {`${artist.name}${idx === array.length - 1 ? "" : ", "}`}
      </Link>
    ));
  };

  const changeSavedState = async () => {
    if (trackSaved) spotifyApi.removeFromMySavedTracks([track.id]);
    else spotifyApi.addToMySavedTracks([track.id]);

    setTrackSaved(!trackSaved);
  };

  if (!track) return <></>;

  return (
    <div
      className={`${styles.track} ${hideAlbum ? styles.track__noAlbum : ""}`}
      onDoubleClick={play}
    >
      <div className={styles.track__header}>
        {/* index */}
        <div className={styles.track__index}>
          <p>{idx}</p>
        </div>

        {/* image */}
        <div className={styles.track__img}>
          <Image
            src={track.album.images[2].url}
            alt={track.name}
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </div>

        {/* name and artists*/}
        <div className={styles.track__desc}>
          <div className={styles.track__desc__title}>
            <p>{track.name}</p>
          </div>
          <div className={styles.track__desc__artists}>
            <p>{renderArtists()}</p>
          </div>
        </div>
      </div>

      {/* album name. Can be hidden*/}
      {!hideAlbum && (
        <div className={styles.track__album}>
          <Link href={`/album/${track.album.id}`} passHref>
            <p>{track.album.name}</p>
          </Link>
        </div>
      )}

      {/* save icon and duration */}
      <div className={styles.track__duration}>
        <div onClick={() => changeSavedState()}>
          {trackSaved ? (
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
      {/* <BiDotsHorizontalRounded className={styles.track__options} /> */}
    </div>
  );
};
