import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

// components
import { Banner } from "./Banner";
import { Cards } from "../Common/Cards";

// styling
import styles from "./Category.module.scss";

// hook
import { useSpotify } from "../../hooks/useSpotify";

// types
type Playlists = SpotifyApi.PlaylistObjectSimplified[];

export const Category: React.FC<{}> = ({}) => {
  const [playlists, setPlaylists] = useState<Playlists>({} as Playlists);
  const [categoryTitle, setCategoryTitle] = useState("");

  const spotifyApi = useSpotify();
  const { status } = useSession();

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const getData = async () => {
      // get category name
      const category = await spotifyApi.getCategory(id as string);
      const data = await spotifyApi.getPlaylistsForCategory(id as string, {
        limit: 50,
      });

      setPlaylists(data.body.playlists.items);
      setCategoryTitle(category.body.name);
    };

    if (status === "authenticated") getData();
  }, [id, status, spotifyApi]);

  return (
    <div className={styles.category}>
      <div>
        <Banner title={categoryTitle} />
        <Cards data={playlists} title="Featured Playlists" multirow hideLink />
      </div>
    </div>
  );
};
