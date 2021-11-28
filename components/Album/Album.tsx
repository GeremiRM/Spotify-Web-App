import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

// components
import { Header } from "../Header/Header";
import { Banner } from "./Banner";
import { Tracklist } from "../Common/Tracklist";
import { Cards } from "../Common/Cards";

// styling
import styles from "./Album.module.scss";

// hook
import { useSpotify } from "../../hooks/useSpotify";

// types
type AlbumType = SpotifyApi.AlbumObjectFull;
type Artists = SpotifyApi.ArtistObjectFull[];
type OtherAlbums = SpotifyApi.AlbumObjectSimplified[];

export const Album: React.FC<{}> = () => {
  const [album, setAlbum] = useState<AlbumType>({} as AlbumType);
  const [artists, setArtists] = useState<Artists>({} as Artists);
  const [otherAlbums, setOtherAlbums] = useState<OtherAlbums>([]);

  const spotifyApi = useSpotify();
  const { status } = useSession();

  // album id
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const getData = async () => {
      const data = await spotifyApi.getAlbum(id as string);

      // need the full artist object to get the artist image
      const artists = await spotifyApi.getArtists(
        data.body.artists.map((artist) => artist.id)
      );

      const artistsAlbums = await spotifyApi.getArtistAlbums(
        artists.body.artists[0].id,
        { album_type: "album" }
      );

      setAlbum(data.body);
      setArtists(artists.body.artists);
      setOtherAlbums(artistsAlbums.body.items);
    };
    if (id && status === "authenticated") getData();
  }, [id, spotifyApi, status]);

  return (
    <div>
      <Header />
      {Object.keys(album).length !== 0 && (
        <div className={styles.album}>
          {/* Banner */}
          <Banner album={album} artists={artists} />

          {/* Tracklist */}
          <Tracklist tracks={album.tracks.items} />

          {/* Copyright */}
          <div className={styles.album__copyright}>
            &copy; {album?.copyrights[0]?.text}
          </div>
          {/* Cards */}
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
