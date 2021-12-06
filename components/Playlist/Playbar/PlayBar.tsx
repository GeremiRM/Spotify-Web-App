import { useEffect, useState } from "react";

// styling
import styles from "./PlayBar.module.scss";
import { ImPlay3 } from "react-icons/im";
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
    if (isFollowingPlaylist) spotifyApi.unfollowPlaylist(id!);
    else spotifyApi.followPlaylist(id!);
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
      <div className={styles.playbar__button}>
        <ImPlay3 onClick={play} />
      </div>
      <div onClick={() => changeSavedState()} className={styles.playbar__heart}>
        {isFollowingPlaylist ? (
          <AiFillHeart style={{ color: "#1db954" }} />
        ) : (
          <AiOutlineHeart />
        )}
      </div>
    </div>
  );
};
