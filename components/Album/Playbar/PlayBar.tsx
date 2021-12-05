import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

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
}

export const PlayBar: React.FC<PlaybarProps> = ({ id, uri }) => {
  const { playingTrack } = useContext(Context);

  const [isPlayingAlbum, setIsPlayingAlbum] = useState(false);
  const [isSavedAlbum, setisSavedAlbum] = useState(false);

  const spotifyApi = useSpotify();
  const { status } = useSession();

  const play = usePlay(uri);

  useEffect(() => {
    playingTrack.album?.id === id
      ? setIsPlayingAlbum(true)
      : setIsPlayingAlbum(false);
  }, [id, playingTrack]);

  useEffect(() => {
    const getData = async () => {
      const savedAlbum = await spotifyApi.containsMySavedAlbums([id!]);
      setisSavedAlbum(savedAlbum.body[0]);
    };
    if (status === "authenticated") getData();
  }, [id, spotifyApi, status]);

  const changeSavedState = async () => {
    if (isSavedAlbum) spotifyApi.removeFromMySavedAlbums([id!]);
    else spotifyApi.addToMySavedAlbums([id!]);
    setisSavedAlbum(!isSavedAlbum);
  };

  return (
    <div className={styles.playbar}>
      <div className={styles.playbar__button}>
        {isPlayingAlbum ? <GiPauseButton /> : <FaPlay onClick={play} />}
      </div>
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
