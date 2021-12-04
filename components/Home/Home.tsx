// components
import { Header } from "../Header/Header";
import { Cards } from "../Common/Cards";
import { Loading } from "../Common/Loading";

// styling
import styles from "./Home.module.scss";

// hook
import { useHomeInfo } from "../../hooks/useHomeInfo";

const LIMIT = 10;

export const Home: React.FC<{}> = ({}) => {
  const {
    newReleases,
    featuredPlaylists,
    recentlyPlayed,
    // recommendations,
    topArtists,
  } = useHomeInfo();

  // if data hasn't finished fetching, return nothing

  if (
    !newReleases ||
    !featuredPlaylists ||
    !recentlyPlayed ||
    // !recommendations ||
    !topArtists
  )
    return <></>;

  return (
    <div>
      <Header />
      <div className={styles.home}>
        <div className={styles.home__body}>
          <div className={styles.home__results}>
            <Cards
              data={featuredPlaylists.slice(0, LIMIT)}
              title="Featured Playlists"
              linkType="featured"
            />
            <Cards
              data={newReleases.slice(0, LIMIT)}
              title="New Releases"
              linkType="newReleases"
            />
            <Cards
              data={topArtists.slice(0, LIMIT)}
              title="Your Favorite Artists"
              linkType="topArtists"
            />
            <Cards
              data={recentlyPlayed.slice(0, LIMIT)}
              title="Recently Played"
              linkType="recentlyPlayed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
