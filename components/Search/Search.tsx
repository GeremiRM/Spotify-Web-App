// libraries
import React, { useState, useEffect, useContext } from "react";
import SpotifyWebApi from "spotify-web-api-node";

// styling
import styles from "./Search.module.scss";

// components
import Layout from "../Layout/Layout";
import { Header } from "../Header/Header";
import { Cards } from "../Shared/Cards";

// context
import { Context } from "../../context/context";
import { TracksResult } from "./TracksResult";

// types
import { Results } from "../../types/types";
import { Tracks } from "../../types/types";
type Event = React.ChangeEvent<HTMLInputElement>;

// spotify api
import { searchAll, searchTracks } from "../../Spotify/SpotifyApi";

export const Search: React.FC<{}> = ({}) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<Results>({} as Results);
  const [trackResults, setTrackResults] = useState<Tracks>({} as Tracks);

  useEffect(() => {
    const search = async () => {
      const results = await searchAll(searchInput);
      const tracks = await searchTracks(searchInput);

      setSearchResults(results);
      setTrackResults(tracks);
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
      if (data?.items.length > 0) {
        cards.push(<Cards data={data} title={type} key={type} />);
      }
    }
    return cards;
  };

  return (
    <Layout>
      <Header input={searchInput} handleChange={handleInputChange} />
      <div className={styles.search}>
        {/* Query empty? */}
        {searchInput !== "" && (
          <div className={styles.search__body}>
            <TracksResult tracks={trackResults} />

            <div className={styles.search__results}>{renderCards()}</div>
          </div>
        )}
      </div>
    </Layout>
  );
};
