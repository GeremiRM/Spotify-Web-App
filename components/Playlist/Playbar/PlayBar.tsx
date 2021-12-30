import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// styling
import styles from "./PlayBar.module.scss";
import { FaPlay } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

// hooks
import { useSpotify } from "../../../hooks/useSpotify";
import { usePlay } from "../../../hooks/usePlay";

interface PlaybarProps {
  id: string;
  uri: string;
  isFollowing: boolean;
}

export const PlayBar: React.FC<PlaybarProps> = ({ id, uri, isFollowing }) => {
  const [isFollowingPlaylist, setisFollowingPlaylist] = useState(false);

  const spotifyApi = useSpotify();

  const play = usePlay(uri);

  // Change playlist's followed state
  const changeSavedState = async () => {
    if (isFollowingPlaylist) {
      spotifyApi.unfollowPlaylist(id!);
      toast.error(`Removed playlist from your library`, {
        position: "bottom-center",
        style: {
          background: "rgb(100,0,0)",
          color: "white",
        },
      });
    } else {
      spotifyApi.followPlaylist(id!);
      toast.success("Saved playlist to your library", {
        position: "bottom-center",
        style: { color: "white", background: "green" },
      });
    }
    setisFollowingPlaylist(!isFollowingPlaylist);
  };

  // Is the user following the playlist?
  useEffect(() => {
    if (id && uri) {
      setisFollowingPlaylist(isFollowing);
    }
  }, [id, isFollowing, uri]);

  return (
    <div className={styles.playbar}>
      <div className={styles.button}>
        <FaPlay onClick={play} />
      </div>
      <div onClick={() => changeSavedState()} className={styles.heart}>
        {isFollowingPlaylist ? (
          <AiFillHeart style={{ color: "#1db954" }} />
        ) : (
          <AiOutlineHeart />
        )}
      </div>
    </div>
  );
};
