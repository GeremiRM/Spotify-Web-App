// libraries
import React, { useState, useEffect } from "react";

// styling
import styles from "./Search.module.scss";
import { FiSearch } from "react-icons/fi";

// components
import { Layout } from "../Layout/Layout";
import { Header } from "../Header/Header";
import { Cards } from "../Shared/Cards";

// types

type Tracks = SpotifyApi.TrackObjectFull[];
type Event = React.ChangeEvent<HTMLInputElement>;
type Results = {
  albums: SpotifyApi.AlbumObjectSimplified[] | undefined;
  artists: SpotifyApi.ArtistObjectFull[] | undefined;
  playlists: SpotifyApi.PlaylistObjectSimplified[] | undefined;
};

// spotify api
import { searchAll, searchTracks } from "../../Spotify/SpotifyApi";
import { Tracklist } from "../Shared/Tracklist";
import { TopResult } from "./TopResult";

// max amount of songs to be displayed
const LIMIT = 4;

export const Search: React.FC<{}> = ({}) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<Results>({} as Results);
  const [trackResults, setTrackResults] = useState<Tracks>({} as Tracks);

  useEffect(() => {
    const search = async () => {
      const results = await searchAll(searchInput);
      const tracks = await searchTracks(searchInput);

      setSearchResults(results);
      setTrackResults(tracks!.slice(0, LIMIT));
    };
    if (searchInput !== "") {
      search();
    }
  }, [searchInput]);

  const handleInputChange = (e: Event) => {
    setSearchInput(e.target.value);
  };

  const renderCards = () => {
    let cards = [];
    for (let type in searchResults) {
      // @ts-expect-error
      const data = searchResults[type];
      if (data?.length > 0) {
        cards.push(<Cards data={data} title={type} key={type} />);
      }
    }
    return cards;
  };

  return (
    <Layout>
      <Header>
        <div className={styles.searchBar}>
          <FiSearch className={styles.searchBar__icon} />
          <input
            type="text"
            className={styles.searchBar__input}
            placeholder="Artists, albums, or songs"
            onChange={handleInputChange}
            value={searchInput}
          />
        </div>
      </Header>
      <div className={styles.search}>
        {/* Query empty? */}
        {searchInput !== "" && Object.keys(searchResults).length !== 0 && (
          <div className={styles.search__body}>
            <div className={styles.search__tracks}>
              <div className={styles.search__topResult}>
                <h2 className={styles.search__topResult__title}>Top Result</h2>
                <TopResult data={searchResults.artists![0]} />
              </div>
              <Tracklist tracks={trackResults} />
            </div>
            <div className={styles.search__results}>{renderCards()}</div>
          </div>
        )}
      </div>
    </Layout>
  );
};
