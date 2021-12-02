import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

// styling
import styles from "./PlayBar.module.scss";
import { ImPlay3 } from "react-icons/im";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

// hooks
import { useSpotify } from "../../hooks/useSpotify";
import { usePlay } from "../../hooks/usePlay";

interface PlaybarProps {
  id: string;
  uri: string;
}

export const PlayBar: React.FC<PlaybarProps> = ({ id, uri }) => {
  const [isFollowingPlaylist, setisFollowingPlaylist] = useState(false);

  const spotifyApi = useSpotify();
  const { status } = useSession();

  const play = usePlay(uri);

  useEffect(() => {
    const getData = async () => {
      const playlist = await spotifyApi.getPlaylist(id);
      const user = await spotifyApi.getMe();
      const data = await spotifyApi.areFollowingPlaylist(
        playlist.body.owner.id,
        id,
        [user.body.id]
      );

      setisFollowingPlaylist(data.body[0]);
    };
    if (status === "authenticated") getData();
  }, [id, spotifyApi, status]);

  const changeSavedState = async () => {
    if (isFollowingPlaylist) spotifyApi.unfollowPlaylist(id!);
    else spotifyApi.followPlaylist(id!);
    setisFollowingPlaylist(!isFollowingPlaylist);
  };

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
