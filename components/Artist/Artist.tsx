import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

// components
import { Header } from "../Header/Header";
import { Banner } from "./Banner";
import { Tracklist } from "../Common/Tracklist";
import { Cards } from "../Common/Cards";

// styling
import styles from "./Artist.module.scss";

// hook
import { useSpotify } from "../../hooks/useSpotify";

// types
type ArtistType = SpotifyApi.SingleArtistResponse;
type Albums = SpotifyApi.AlbumObjectSimplified[];
type Tracks = SpotifyApi.TrackObjectFull[];
type Artists = SpotifyApi.ArtistObjectFull[];

// interface
interface Data {
  albums: Albums;
  relatedArtists: Artists;
}

const cardsTitles = {
  albums: "Albums",
  relatedArtists: "Fans Also Like",
};

export const Artist: React.FC<{}> = ({}) => {
  const [artist, setArtist] = useState<ArtistType>({} as ArtistType);
  const [artistData, setArtistData] = useState<Data>({} as Data);
  const [artistTracks, setArtistTracks] = useState<Tracks>({} as Tracks);

  const spotifyApi = useSpotify();
  const { status } = useSession();

  const [seeMore, setSeeMore] = useState(false);

  // artist id
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const getData = async () => {
      const data = await spotifyApi.getArtist(id as string);
      const albums = await spotifyApi.getArtistAlbums(id as string);
      const topTracks = await spotifyApi.getArtistTopTracks(id as string, "US");
      const relatedArts = await spotifyApi.getArtistRelatedArtists(
        id as string
      );

      setArtist(data.body);
      setArtistData({
        albums: albums.body.items,
        relatedArtists: relatedArts.body.artists,
      });
      setArtistTracks(topTracks.body.tracks);
    };
    if (id && status === "authenticated") getData();
  }, [id, spotifyApi, status]);

  const renderCards = () => {
    console.log(Object.entries(artistData));

    return Object.entries(artistData).map((data) => (
      <Cards
        data={data[1]}
        //@ts-expect-error
        title={cardsTitles[data[0]]}
        key={data[0]}
      />
    ));
  };

  return (
    <div>
      <Header />
      {Object.keys(artist!).length !== 0 &&
        Object.keys(artistTracks!).length !== 0 && (
          <div className={styles.artist}>
            {/* Banner */}
            <Banner artist={artist} />

            <div className={styles.body}>
              {/* Tracklist */}
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

              {/* Cards */}
              <div className={styles.cards}>{renderCards()}</div>
            </div>
          </div>
        )}
    </div>
  );
};
