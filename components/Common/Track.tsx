import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

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

  // Check if the track is the one currently playing
  useEffect(() => {
    if (Object.keys(playingTrack).length > 0 && track)
      setIsPlayingTrack(playingTrack.id === id);
  }, [id, playingTrack, track]);

  // Set if the track is saved or not
  useEffect(() => {
    setTrackSaved(saved);
  }, [saved]);

  const changeSavedState = async () => {
    if (trackSaved) {
      spotifyApi.removeFromMySavedTracks([track.id]);
      toast.error("Track removed from saved", {
        position: "bottom-center",
        style: {
          background: "rgb(100,0,0)",
          color: "white",
        },
      });
    } else {
      spotifyApi.addToMySavedTracks([track.id]);
      toast.success("Track saved", {
        position: "bottom-center",
        style: { color: "white", background: "green" },
      });
    }
    setTrackSaved(!trackSaved);
  };

  if (!track) return <></>;

  return (
    <div
      className={`${styles.track} ${hideAlbum ? styles.track__noAlbum : ""} `}
      onDoubleClick={play}
    >
      <div className={styles.header}>
        {/* index */}
        <div className={styles.idx}>
          {isPlayingTrack ? renderSoundBars() : <p>{idx}</p>}
        </div>

        {/* image */}
        <div className={styles.header__img}>
          <Image
            src={
              track.album.images[2]?.url ??
              track.album.images[1]?.url ??
              track.album.images[0]?.url ??
              "/music-placeholder.png"
            }
            alt={track.name}
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </div>

        {/* name and artists*/}
        <div className={styles.desc}>
          <div
            className={styles.title}
            style={{ color: `${isPlayingTrack ? "#1db954" : "white"}` }}
          >
            <p>{track.name}</p>
          </div>
          <div className={styles.artists}>
            <p>{renderArtists()}</p>
          </div>

          {/* album name desktop. Can be hidden*/}
          {!hideAlbum && (
            <div className={`${styles.album} ${styles.album__mobile}`}>
              <Link href={`/album/${track.album.id}`} passHref>
                <p>{track.album.name}</p>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* album name. Can be hidden*/}
      {!hideAlbum && (
        <div className={`${styles.album} ${styles.album__desktop}`}>
          <Link href={`/album/${track.album.id}`} passHref>
            <p>{track.album.name}</p>
          </Link>
        </div>
      )}

      {/* save icon and duration */}
      <div className={styles.duration}>
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
