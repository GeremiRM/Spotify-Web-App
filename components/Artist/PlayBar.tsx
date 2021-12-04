import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

// styling
import styles from "./PlayBar.module.scss";
import { FaPlay } from "react-icons/fa";
import { GiPauseButton } from "react-icons/gi";

// hooks
import { usePlay } from "../../hooks/usePlay";
import { useSpotify } from "../../hooks/useSpotify";

import { Context } from "../../context/context";

interface PlaybarProps {
  id?: string;
  uri: string;
}

export const PlayBar: React.FC<PlaybarProps> = ({ id, uri }) => {
  const { playingTrack } = useContext(Context);

  const [isFollowing, setisFollowing] = useState(false);
  const [isPlayingArtist, setIsPlayingArtist] = useState(false);

  const spotifyApi = useSpotify();
  const { status } = useSession();

  const play = usePlay(uri);

  useEffect(() => {
    if (Object.keys(playingTrack).length > 0)
      setIsPlayingArtist(playingTrack.artists[0].id === id);
  }, [id, playingTrack]);

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
        {isPlayingArtist ? <GiPauseButton /> : <FaPlay onClick={play} />}
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
