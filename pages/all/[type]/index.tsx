import { useRouter } from "next/router";

// components
import { Header } from "../../../components/Header/Header";
import { Cards } from "../../../components/Common/Cards";

// styling
import styles from "../../../styles/All.module.scss";

//types
import { CardsData } from "../../../types/types";

// hook
import { useHomeInfo } from "../../../hooks/useHomeInfo";

interface Data {
  featured: { title: string; data: CardsData };
  newReleases: { title: string; data: CardsData };
  recentlyPlayed: { title: string; data: CardsData };
  topArtists: { title: string; data: CardsData };
}

interface Test {
  title: string;
  data: CardsData;
}

// See all for home page
export const HomepageAll: React.FC<{}> = ({}) => {
  const router = useRouter();
  const { type } = router.query;

  const { featuredPlaylists, newReleases, recentlyPlayed, topArtists } =
    useHomeInfo();

  const Data: Data = {
    featured: { title: "Featured Playlists", data: featuredPlaylists },
    newReleases: { title: "New Releases", data: newReleases },
    recentlyPlayed: { title: "Recently played tracks", data: recentlyPlayed },
    topArtists: { title: "Your favorite artists", data: topArtists },
  };

  if (!Data || typeof Data[type as keyof Data] === "undefined") return <></>;

  return (
    <>
      <Header />
      <div className={styles.all}>
        <div className={styles.title}>
          <h1>{Data[type as keyof Data].title}</h1>
        </div>
        <div className={styles.all__cards}>
          <Cards
            data={Data[type as keyof Data].data}
            title=""
            multirow
            hideLink
          />
        </div>
      </div>
    </>
  );
};

export default HomepageAll;
