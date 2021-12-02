// styling
import styles from "./PlayBar.module.scss";
import { ImPlay3 } from "react-icons/im";
import { useSpotify } from "../../hooks/useSpotify";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { usePlay } from "../../hooks/usePlay";

interface PlaybarProps {
  id?: string;
  uri: string;
}

export const PlayBar: React.FC<PlaybarProps> = ({ id, uri }) => {
  const [isFollowing, setisFollowing] = useState(false);

  const spotifyApi = useSpotify();
  const { status } = useSession();

  const play = usePlay(uri);

  useEffect(() => {
    const getData = async () => {
      const isFollowingArtist = await spotifyApi.isFollowingArtists([id!]);
      setisFollowing(isFollowingArtist.body[0]);
    };
    if (status === "authenticated") getData();
  }, [id, spotifyApi, status]);

  const changeSavedState = async () => {
    if (isFollowing) spotifyApi.unfollowArtists([id!]);
    else spotifyApi.followArtists([id!]);
    setisFollowing(!isFollowing);
  };

  return (
    <div className={styles.playbar}>
      <div className={styles.playbar__button}>
        <ImPlay3 />
      </div>
      <div
        onClick={() => changeSavedState()}
        className={`${styles.playbar__follow} ${
          isFollowing ? styles.playbar__following : ""
        }`}
      >
        <p>{isFollowing ? "Following" : "Follow"}</p>
      </div>
    </div>
  );
};
