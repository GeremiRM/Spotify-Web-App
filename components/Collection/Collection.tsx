import React, { useState, useEffect } from "react";

import { Header } from "../Header/Header";
import { Selector } from "./Selector";
import { SongsCard } from "./SongsCard";

import styles from "./Collection.module.scss";
import { Cards } from "./Playlists";
import { useSession } from "next-auth/react";
import { useSpotify } from "../../hooks/useSpotify";

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

  const { status } = useSession();
  const spotifyApi = useSpotify();

  useEffect(() => {
    const getData = async () => {
      const playlists = await spotifyApi.getUserPlaylists();
      const artists = await spotifyApi.getFollowedArtists();
      const albums = await (
        await spotifyApi.getMySavedAlbums()
      ).body.items.map((item) => item.album);

      const test = await spotifyApi.getMySavedAlbums();
      console.log(test.body.total);

      const data = {
        playlists: playlists.body.items,
        artists: artists.body.artists.items,
        albums: albums,
      };
      const tracks = await (
        await spotifyApi.getMySavedTracks()
      ).body.items.map((item) => item.track);

      setUserLibrary(data);
      setLikedSongs(tracks);
    };
    if (status === "authenticated") getData();
  }, [spotifyApi, status]);

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
