import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// styling and icons
import styles from "./Track.module.scss";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { GiPauseButton } from "react-icons/gi";

import { BiDotsHorizontalRounded } from "react-icons/bi";

// util
import { convertMillisTracks } from "../../utils/utils";

// hooks
import { useSpotify } from "../../hooks/useSpotify";
import { usePlay } from "../../hooks/usePlay";
import { useSongInfo } from "../../hooks/useSongInfo";
import { Context } from "../../context/context";

interface TrackProps {
  id: string;
  idx: number;
  tracklistUri?: string;
  hideAlbum?: boolean;
  saved: boolean;
}

export const Track: React.FC<TrackProps> = ({
  id,
  idx,
  hideAlbum,
  tracklistUri,
  saved,
}) => {
  const { playingTrack } = useContext(Context);

  const { track } = useSongInfo(id);
  const [isPlayingTrack, setIsPlayingTrack] = useState(false);
  const [trackSaved, setTrackSaved] = useState<boolean>(false);
  const trackDuration = convertMillisTracks(track?.duration_ms!);

  const spotifyApi = useSpotify();
  const play = usePlay([track?.uri], tracklistUri);

  const renderArtists = () => {
    return track.artists.map((artist, idx, array) => (
      <Link key={artist.id} href={`/artist/${artist.id}`}>
        {`${artist.name}${idx === array.length - 1 ? "" : ", "}`}
      </Link>
    ));
  };

  const renderSoundBars = () => {
    let bars = [];
    for (let i = 0; i < 6; i++) {
      bars.push(<div className={styles.track__soundbars__bar}></div>);
    }
    return <div className={styles.track__soundbars}>{bars}</div>;
  };
  useEffect(() => {
    if (Object.keys(playingTrack).length > 0 && track)
      setIsPlayingTrack(playingTrack.id === id);
  }, [id, playingTrack, track]);

  useEffect(() => {
    setTrackSaved(saved);
  }, [saved]);

  const changeSavedState = async () => {
    if (trackSaved) spotifyApi.removeFromMySavedTracks([track.id]);
    else spotifyApi.addToMySavedTracks([track.id]);
    setTrackSaved(!trackSaved);
  };

  if (!track) return <></>;

  return (
    <div
      className={`${styles.track} ${hideAlbum ? styles.track__noAlbum : ""} `}
      onDoubleClick={play}
    >
      <div className={styles.track__header}>
        {/* index */}
        <div className={styles.track__index}>
          {isPlayingTrack ? renderSoundBars() : <p>{idx}</p>}
        </div>

        {/* image */}
        <div className={styles.track__img}>
          <Image
            src={
              track.album.images[1]?.url ??
              track.album.images[0]?.url ??
              track.album.images[2]?.url ??
              "/music-placeholder.png"
            }
            alt={track.name}
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </div>

        {/* name and artists*/}
        <div className={styles.track__desc}>
          <div
            className={styles.track__desc__title}
            style={{ color: `${isPlayingTrack ? "#1db954" : "white"}` }}
          >
            <p>{track.name}</p>
          </div>
          <div className={styles.track__desc__artists}>
            <p>{renderArtists()}</p>
          </div>

          {/* album name desktop. Can be hidden*/}
          {!hideAlbum && (
            <div
              className={`${styles.track__album} ${styles.track__album__mobile}`}
            >
              <Link href={`/album/${track.album.id}`} passHref>
                <p>{track.album.name}</p>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* album name. Can be hidden*/}
      {!hideAlbum && (
        <div
          className={`${styles.track__album} ${styles.track__album__desktop}`}
        >
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
