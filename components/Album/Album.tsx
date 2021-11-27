import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styles from "./Album.module.scss";
import { Header } from "../Header/Header";
import { Layout } from "../Layout/Layout";

import { Banner } from "./Banner";
import { Tracklist } from "../Shared/Tracklist";
import { Cards } from "../Shared/Cards";

// functions
import {
  getAlbum,
  getAlbumArtists,
  getArtistAlbums,
} from "../../Spotify/SpotifyApi";
import { GetServerSideProps } from "next";

// types
type AlbumType = SpotifyApi.AlbumObjectFull;
type Artists = SpotifyApi.ArtistObjectFull[];
type OtherAlbums = SpotifyApi.AlbumObjectSimplified[];

export const Album: React.FC<{}> = () => {
  const [album, setAlbum] = useState<AlbumType>({} as AlbumType);
  const [artists, setArtists] = useState<Artists>({} as Artists);
  const [otherAlbums, setOtherAlbums] = useState<OtherAlbums>([]);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const getData = async () => {
      const data = await getAlbum(id as string);
      const artists = await getAlbumArtists(data.artists);
      const artistsAlbums = await getArtistAlbums(artists[0].id);

      setAlbum(data);
      setArtists(artists);
      setOtherAlbums(artistsAlbums);
    };
    if (id) getData();
  }, [id]);

  return (
    <div>
      <Header />
      {Object.keys(album).length !== 0 && (
        <div className={styles.album}>
          <Banner album={album} artists={artists} />

          <Tracklist tracks={album.tracks.items} />

          <div className={styles.album__copyright}>
            &copy; {album?.copyrights[0]?.text}
          </div>

          <div className={styles.album__otherAlbums}>
            <Cards
              data={otherAlbums}
              title={`More by ${artists[0]?.name}`}
              ignoreCard={album.id}
            />
          </div>
        </div>
      )}
    </div>
  );
};
