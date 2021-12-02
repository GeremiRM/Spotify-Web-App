import styles from "./Player.module.scss";

import { Context } from "../../context/context";
import { useContext } from "react";
import { usePlaybackInfo } from "../../hooks/usePlaybackInfo";
import { useSession } from "next-auth/react";
import { useSpotify } from "../../hooks/useSpotify";

import SpotifyPlayer from "react-spotify-web-playback";

export const Player: React.FC<{}> = ({}) => {
  const spotifyApi = useSpotify();

  let token = spotifyApi.getAccessToken();

  if (!token) return <></>;

  return (
    <div className={styles.player}>
      <SpotifyPlayer
        token={token}
        syncExternalDevice
        showSaveIcon
        persistDeviceSelection
        magnifySliderOnHover
        styles={{
          bgColor: "#181818",
          color: "white",
          sliderColor: "#ccc",
          trackArtistColor: "white",
          trackNameColor: "white",
          sliderTrackColor: "gray",
        }}
      />
    </div>
  );
};
