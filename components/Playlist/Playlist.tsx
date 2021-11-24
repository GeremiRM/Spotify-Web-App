import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styles from "./Playlist.module.scss";
import { Header } from "../Header/Header";
import Layout from "../Layout/Layout";

import { Banner } from "./Banner";
import { Tracklist } from "./Tracklist";

// functions
import { getPlaylist, getPlaylistTracks } from "../../Spotify/SpotifyApi";

// types
type PlaylistType = SpotifyApi.PlaylistObjectFull;
type Tracks = SpotifyApi.TrackObjectFull[];

export const Playlist: React.FC<{}> = ({}) => {
  const [playlist, setPlaylist] = useState<PlaylistType>({} as PlaylistType);
  const [tracks, setTracks] = useState<Tracks>([] as Tracks);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const getData = async () => {
      const data = await getPlaylist(id as string);
      const tracks = await getPlaylistTracks(id as string);

      setPlaylist(data);
      setTracks(tracks);
    };
    if (id) getData();
  }, [id]);

  if (Object.keys(playlist).length === 0 || tracks.length === 0) return <></>;

  return (
    <Layout>
      <Header />
      <div className={styles.playlist}>
        <Banner playlist={playlist} />
        <Tracklist tracks={tracks} />
        {/* <div className={styles.album__copyright}>
          &copy; {album?.copyrights[0]?.text}
        </div>
        <div className={styles.album__otherAlbums}>
          <Cards
            data={otherAlbums}
            title={`More by ${artists[0]?.name}`}
            ignoreCard={album.id}
          />
        </div> */}
      </div>
    </Layout>
  );
};
