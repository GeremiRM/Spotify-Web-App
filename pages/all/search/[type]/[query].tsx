import { useRouter } from "next/router";

// components
import { Header } from "../../../../components/Header/Header";
import { Cards } from "../../../../components/Common/Cards";

//styling
import styles from "../../../../styles/All.module.scss";

// types
import { CardsData } from "../../../../types/types";
import { useEffect, useState } from "react";
import { useSpotify } from "../../../../hooks/useSpotify";
import { useSession } from "next-auth/react";

export const All: React.FC<{}> = ({}) => {
  const [searchResults, setSearchResults] = useState<CardsData | null>(
    {} as CardsData
  );

  const router = useRouter();
  const { type, query } = router.query;

  const spotifyApi = useSpotify();
  const { status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      switch (type) {
        case "album": {
          const data = await spotifyApi.searchAlbums(query as string, {
            limit: 50,
          });

          setSearchResults(data.body.albums?.items);
          break;
        }
        case "artist": {
          const data = await spotifyApi.searchArtists(query as string, {
            limit: 50,
          });
          setSearchResults(
            data.body.artists?.items ? data.body.artists.items : null
          );
          break;
        }

        case "playlist": {
          const data = await spotifyApi.searchPlaylists(query as string, {
            limit: 50,
          });
          setSearchResults(
            data.body.playlists?.items ? data.body.playlists.items : null
          );
          break;
        }
        default:
          setSearchResults(null);
      }
    };
    if (status === "authenticated") fetchData();
  }, [query, spotifyApi, status, type]);

  return (
    <>
      <Header />
      <div className={styles.all}>
        <div className={styles.all__title}>
          <h1>
            <span style={{ textTransform: "capitalize" }}>{type}</span> results
            for {query}
          </h1>
        </div>
        <div className={styles.all__cards}>
          {searchResults && (
            <Cards data={searchResults} title="" multirow hideLink />
          )}
        </div>
      </div>
    </>
  );
};

export default All;
