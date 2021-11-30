// styling
import styles from "./PlayBar.module.scss";
import { ImPlay3 } from "react-icons/im";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useSpotify } from "../../hooks/useSpotify";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

interface PlaybarProps {
  id?: string;
  bg?: string;
}

export const PlayBar: React.FC<PlaybarProps> = ({ id }) => {
  const [isSavedAlbum, setisSavedAlbum] = useState(false);

  const spotifyApi = useSpotify();
  const { status } = useSession();

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
        <ImPlay3 />
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
