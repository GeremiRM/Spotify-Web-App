// libraries
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

// components
import { Header } from "../Header/Header";
import { Layout } from "../Layout/Layout";
import { Banner } from "./Banner";
import { Cards } from "../Shared/Cards";

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
import { Tracklist } from "../Shared/Tracklist";

// interface
interface Data {
  albums: Albums;
  relatedArtists: Artists;
}

const cardsTitle = {
  albums: "Albums",
  relatedArtists: "Fans Also Like",
};

export const Artist: React.FC<{}> = ({}) => {
  const [artist, setArtist] = useState<ArtistType>({} as ArtistType);
  const [artistData, setArtistData] = useState<Data>({} as Data);
  const [artistTracks, setArtistTracks] = useState<Tracks>({} as Tracks);

  const [seeMore, setSeeMore] = useState(false);

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
  }, [id]);

  const renderCards = () => {
    let cards = [];
    for (let type in artistData) {
      // @ts-expect-error
      const data = artistData[type];
      if (data?.length > 0) {
        cards.push(
          // @ts-expect-error
          <Cards data={data} title={cardsTitle[type]} key={type} />
        );
      }
    }
    return cards;
  };

  return (
    <div>
      <Header />
      {Object.keys(artist!).length !== 0 &&
        Object.keys(artistTracks!).length !== 0 && (
          <div className={styles.artist}>
            <Banner artist={artist} />
            <div className={styles.body}>
              <div className={styles.tracks}>
                <h2 className={styles.tracks__title}>Popular</h2>
                <div className={styles.tracks__tracklist}>
                  <Tracklist
                    tracks={artistTracks!.slice(0, seeMore ? 10 : 5)}
                  />
                </div>
                <p
                  onClick={() => setSeeMore(!seeMore)}
                  className={styles.seeMore}
                >
                  {seeMore ? "See Less" : "See More"}
                </p>
              </div>
              <div className={styles.cards}>{renderCards()}</div>
            </div>
          </div>
        )}
    </div>
  );
};
