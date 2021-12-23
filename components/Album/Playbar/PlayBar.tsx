import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

// styling
import styles from "./PlayBar.module.scss";
import { FaPlay } from "react-icons/fa";
import { GiPauseButton } from "react-icons/gi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

// hooks
import { usePlay } from "../../../hooks/usePlay";
import { useSpotify } from "../../../hooks/useSpotify";

import { Context } from "../../../context/context";

interface PlaybarProps {
  id?: string;
  bg?: string;
  uri: string;
  isSaved: boolean;
}

export const PlayBar: React.FC<PlaybarProps> = ({ id, uri, isSaved }) => {
  const { playingTrack } = useContext(Context);

  const [isPlayingAlbum, setIsPlayingAlbum] = useState(false);
  const [isSavedAlbum, setIsSavedAlbum] = useState(false);

  const spotifyApi = useSpotify();

  const play = usePlay(uri);

  // Change album's save state
  const changeSavedState = async () => {
    if (isSavedAlbum) {
      spotifyApi.removeFromMySavedAlbums([id!]);
      toast.error(`Removed album from your library`, {
        position: "bottom-center",
        style: {
          background: "rgb(100,0,0)",
          color: "white",
        },
      });
    } else {
      spotifyApi.addToMySavedAlbums([id!]);
      toast.success("Saved album to your library", {
        position: "bottom-center",
        style: { color: "white", background: "green" },
      });
    }
    setIsSavedAlbum(!isSavedAlbum);
  };

  // Is a track from the album currently playing?
  useEffect(() => {
    setIsPlayingAlbum(playingTrack.album?.id === id);
  }, [id, playingTrack]);

  // Is the album saved in the User's library?
  useEffect(() => {
    if (id && uri) {
      setIsSavedAlbum(isSaved);
    }
  }, [id, isSaved, uri]);

  return (
    <div className={styles.playbar}>
      {/* Play button */}
      <div className={styles.playbar__button}>
        {isPlayingAlbum ? <GiPauseButton /> : <FaPlay onClick={play} />}
      </div>

      {/* Save button */}
      <div onClick={() => changeSavedState()} className={styles.playbar__heart}>
        {isSavedAlbum ? (
          <AiFillHeart style={{ color: "#1db954" }} />
        ) : (
          <AiOutlineHeart />
        )}
      </div>
    </div>
  );
};
