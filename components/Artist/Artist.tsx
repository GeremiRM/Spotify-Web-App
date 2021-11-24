// libraries
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

// components
import { Header } from "../Header/Header";
import Layout from "../Layout/Layout";
import { Banner } from "./Banner";
import { Cards } from "./Cards";
import { TracksResult } from "./TracksResult";

// styling
import styles from "./Artist.module.scss";

// types
import {
  Artist as ArtistType,
  AlbumList as Albums,
  TracksList as Tracks,
  ArtistsList as Artists,
} from "../../types/types";
import {
  getArtist,
  getArtistAlbums,
  getArtistTopTracks,
  getRelatedArtists,
} from "../../Spotify/SpotifyApi";

// interface
interface Data {
  albums: Albums;
  relatedArtists: Artists;
}

export const Artist: React.FC<{}> = ({}) => {
  const [artist, setArtist] = useState<ArtistType>({} as ArtistType);
  const [artistData, setArtistData] = useState<Data>({} as Data);
  const [artistTracks, setArtistTracks] = useState<Tracks>({} as Tracks);

  // get artist id
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const getData = async () => {
      const data = await getArtist(id as string);
      const albums = await getArtistAlbums(id as string);
      const tracks = await getArtistTopTracks(id as string);
      const relatedArts = await getRelatedArtists(id as string);

      // artist info
      setArtist(data);
      setArtistData({
        albums: albums,
        relatedArtists: relatedArts,
      });
      setArtistTracks(tracks);
    };
    if (id) getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (Object.keys(artist!).length === 0 || typeof id === "undefined")
    return <></>;

  const renderCards = () => {
    let cards = [];
    for (let type in artistData) {
      // @ts-expect-error
      const data = artistData[type];
      if (data?.length > 0) {
        cards.push(<Cards data={data} title={type} key={type} />);
      }
    }
    return cards;
  };

  return (
    <Layout>
      <Header />
      <div className={styles.artist}>
        <Banner artist={artist} />
        <div className={styles.body}>
          <TracksResult tracks={artistTracks} />
          {renderCards()}
        </div>
      </div>
    </Layout>
  );
};
