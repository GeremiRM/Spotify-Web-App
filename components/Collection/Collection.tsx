import React, { useState, useEffect } from "react";

import { Layout } from "../Layout/Layout";
import { Header } from "../Header/Header";
import { Selector } from "./Selector";
import { SongsCard } from "./SongsCard";

import { getUserLibrary, getUserLikedSongs } from "../../Spotify/SpotifyApi";

import styles from "./Collection.module.scss";
import { Cards } from "./Playlists";

type Playlists = SpotifyApi.PlaylistObjectSimplified[];
type Artists = SpotifyApi.ArtistObjectFull[];
type Albums = SpotifyApi.AlbumObjectFull[];
type LikedSongs = SpotifyApi.TrackObjectFull[];

type Library = {
  playlists: Playlists;
  artists: Artists;
  albums: Albums;
};

export const Collection: React.FC<{}> = ({}) => {
  const [userLibrary, setUserLibrary] = useState<Library>({} as Library);
  const [likedSongs, setLikedSongs] = useState<LikedSongs>({} as LikedSongs);
  const [selector, setSelector] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const data = await getUserLibrary();
      const tracks = await getUserLikedSongs();

      setUserLibrary(data);
      setLikedSongs(tracks);
    };
    getData();
  }, []);

  return (
    <div>
      <Header>
        <Selector selector={selector} setSelector={setSelector} />
      </Header>
      {Object.keys(userLibrary!).length !== 0 &&
        Object.keys(likedSongs!).length !== 0 && (
          <div className={styles.collection}>
            <Cards
              data={
                selector === 0
                  ? userLibrary!.playlists
                  : selector === 1
                  ? userLibrary!.artists
                  : userLibrary!.albums
              }
            >
              {selector === 0 && <SongsCard tracks={likedSongs} />}
            </Cards>
          </div>
        )}
    </div>
  );
};
