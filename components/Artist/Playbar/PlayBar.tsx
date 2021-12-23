import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

// styling
import styles from "./PlayBar.module.scss";
import { FaPlay } from "react-icons/fa";
import { GiPauseButton } from "react-icons/gi";

// hooks
import { usePlay } from "../../../hooks/usePlay";
import { useSpotify } from "../../../hooks/useSpotify";

import { Context } from "../../../context/context";

interface PlaybarProps {
  id?: string;
  uri: string;
  isFollowing: boolean;
}

export const PlayBar: React.FC<PlaybarProps> = ({ id, uri, isFollowing }) => {
  const { playingTrack } = useContext(Context);

  const [isFollowingArtist, setisFollowingArtist] = useState(false);
  const [isPlayingArtist, setIsPlayingArtist] = useState(false);

  const spotifyApi = useSpotify();

  const play = usePlay(uri);

  // Is a track from the artist currently playing
  useEffect(() => {
    if (Object.keys(playingTrack).length > 0)
      setIsPlayingArtist(playingTrack.artists[0].id === id);
  }, [id, playingTrack]);

  // Is the user following the artist?
  useEffect(() => {
    if (id && uri) {
      setisFollowingArtist(isFollowing);
    }
  }, [id, isFollowing, uri]);

  // Change follow state
  const changeSavedState = async () => {
    if (isFollowingArtist) {
      spotifyApi.unfollowArtists([id!]);
      toast.error(`Removed from your library`, {
        position: "bottom-center",
        style: {
          background: "rgb(100,0,0)",
          color: "white",
        },
      });
    } else {
      spotifyApi.followArtists([id!]);
      toast.success("Saved to your library", {
        position: "bottom-center",
        style: { color: "white", background: "green" },
      });
    }
    setisFollowingArtist(!isFollowingArtist);
  };

  return (
    <div className={styles.playbar}>
      {/* Play button */}
      <div className={styles.playbar__button}>
        {isPlayingArtist ? (
          <GiPauseButton onClick={() => spotifyApi.pause()} />
        ) : (
          <FaPlay onClick={play} />
        )}
      </div>

      {/* Follow button */}
      <div
        onClick={() => changeSavedState()}
        className={`${styles.playbar__follow} ${
          isFollowingArtist ? styles.playbar__following : ""
        }`}
      >
        <p>{isFollowingArtist ? "Following" : "Follow"}</p>
      </div>
    </div>
  );
};
