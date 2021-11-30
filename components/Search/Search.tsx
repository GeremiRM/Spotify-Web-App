import { useState, useEffect, useCallback } from "react";

// styling and icons
import styles from "./Search.module.scss";
import { FiSearch } from "react-icons/fi";

// components
import { Header } from "../Header/Header";
import { TopResult } from "./TopResult";
import { Tracklist } from "../Common/Tracklist";
import { Cards } from "../Common/Cards";
import { Genres } from "./Genres";

// hook
import { useSpotify } from "../../hooks/useSpotify";

// types
import { Results } from "../../types/types";
import { PastSearches } from "./PastSearches";
import { useSession } from "next-auth/react";
type Tracks = SpotifyApi.TrackObjectFull[];
type Event = React.ChangeEvent<HTMLInputElement>;

// max amount of tracks to be displayed
const LIMIT = 4;

export const Search: React.FC<{}> = ({}) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<Results>({} as Results);
  const [trackResults, setTrackResults] = useState<Tracks>({} as Tracks);

  const spotifyApi = useSpotify();
  const { data, status } = useSession();

  console.log(data, status);

  // Get albums, artists and playlists results
  const searchAll = useCallback(async () => {
    const data = await spotifyApi.search(searchInput, [
      "album",
      "artist",
      "playlist",
    ]);
    return {
      albums: data.body.albums?.items,
      artists: data.body.artists?.items,
      playlists: data.body.playlists?.items,
    };
  }, [searchInput, spotifyApi]);

  // Get tracks results
  const searchTracks = useCallback(async () => {
    const data = await spotifyApi.searchTracks(searchInput, { limit: LIMIT });
    return data.body.tracks?.items;
  }, [searchInput, spotifyApi]);

  useEffect(() => {
    const search = async () => {
      if (searchInput === "") return "";

      const results = await searchAll();
      const tracks = await searchTracks();

      setSearchResults(results);
      setTrackResults(tracks!.slice(0, LIMIT));
    };

    // debounce
    const timeOutId = setTimeout(() => search(), 250);

    return () => clearTimeout(timeOutId);
  }, [searchInput, searchAll, searchTracks]);

  const handleInputChange = (e: Event) => {
    setSearchInput(e.target.value);
  };

  const renderCards = () => {
    return Object.values(searchResults).map((result) => (
      <Cards data={result!} title={result![0].type} key={result![0].type} />
    ));
  };

  return (
    <div>
      <Header>
        {/* Search Bar */}
        <div className={styles.searchBar}>
          <FiSearch className={styles.searchBar__icon} />
          <input
            type="search"
            className={styles.searchBar__input}
            placeholder="Artists, albums, or songs"
            onChange={handleInputChange}
            value={searchInput}
          />
        </div>
      </Header>
      <div className={styles.search}>
        {searchInput === "" && (
          <div>
            <PastSearches />
            <Genres />
          </div>
        )}
        {/* Query empty? */}
        {searchInput !== "" && Object.keys(searchResults).length !== 0 && (
          <div className={styles.search__body}>
            {/* Tracks Results */}
            <div className={styles.search__tracks}>
              {/* Top result Card */}
              <div className={styles.search__topResult}>
                <h2 className={styles.search__topResult__title}>Top Result</h2>
                <TopResult data={searchResults.artists![0]} />
              </div>
              {/* Tracklist */}
              <div className={styles.search__tracklist}>
                <Tracklist tracks={trackResults} hideAlbum />
              </div>
            </div>

            {/* Albums, Artists, Playlists Results */}
            <div className={styles.search__results}>{renderCards()}</div>
          </div>
        )}
      </div>
    </div>
  );
};
