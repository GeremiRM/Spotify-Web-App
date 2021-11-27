import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styles from "./Playlist.module.scss";
import { Header } from "../Header/Header";

import { Banner } from "./Banner";
import { Tracklist } from "../Common/Tracklist";
import { useSpotify } from "../../hooks/useSpotify";
import { useSession } from "next-auth/react";

// types
type PlaylistType = SpotifyApi.PlaylistObjectFull;
type Tracks = SpotifyApi.TrackObjectFull[];

export const Playlist: React.FC<{}> = ({}) => {
  const [playlist, setPlaylist] = useState<PlaylistType>({} as PlaylistType);
  const [tracks, setTracks] = useState<Tracks>([] as Tracks);

  const { status } = useSession();
  const spotifyApi = useSpotify();

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const getData = async () => {
      const data = await spotifyApi.getPlaylist(id as string);
      const tracks = data.body.tracks.items.map((item) => item.track);

      setPlaylist(data.body);
      setTracks(tracks);
    };
    if (id && status === "authenticated") getData();
  }, [id, spotifyApi, status]);

  return (
    <div>
      <Header />
      {Object.keys(playlist).length !== 0 && (
        <div className={styles.playlist}>
          <Banner playlist={playlist} tracks={tracks} />
          <Tracklist tracks={tracks!} />
        </div>
      )}
    </div>
  );
};
