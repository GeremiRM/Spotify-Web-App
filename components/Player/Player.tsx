import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import SpotifyPlayer from "react-spotify-web-playback";

// styling
import styles from "./Player.module.scss";

// hook
import { useSpotify } from "../../hooks/useSpotify";

import { Context } from "../../context/context";

export const Player: React.FC<{}> = ({}) => {
  const spotifyApi = useSpotify();
  const { status } = useSession();

  const [currentTrack, setCurrentTrack] = useState<string>("");
  const { playingTrack, setPlayingTrack } = useContext(Context);

  // Get the full data of the currently playing tack
  useEffect(() => {
    const fetchPlayingTrackData = async () => {
      const data = await spotifyApi.getTrack(currentTrack);
      setPlayingTrack(data.body);
    };

    if (
      currentTrack !== "" &&
      currentTrack !== playingTrack.id &&
      status === "authenticated"
    )
      fetchPlayingTrackData();
  }, [currentTrack, playingTrack, setPlayingTrack, spotifyApi, status]);

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
        callback={(state) => {
          setCurrentTrack(state.track.id);
        }}
      />
    </div>
  );
};
