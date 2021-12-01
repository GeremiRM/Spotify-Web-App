import styles from "./Player.module.scss";

import { Context } from "../../context/context";
import { useContext, useEffect, useState } from "react";
import { usePlaybackInfo } from "../../hooks/usePlaybackInfo";
import { useSession } from "next-auth/react";
import { useSpotify } from "../../hooks/useSpotify";

import SpotifyPlayer from "react-spotify-web-playback";

export const Player: React.FC<{}> = ({}) => {
  const playback = usePlaybackInfo();
  const { playingTrack } = useContext(Context);

  const { data } = useSession();
  const spotifyApi = useSpotify();

  let token = null;

  if (!token) return <></>;

  return (
    <div className={styles.player}>
      <SpotifyPlayer
        token={token}
        syncExternalDevice
        showSaveIcon
        persistDeviceSelection
      />
    </div>
  );
};
