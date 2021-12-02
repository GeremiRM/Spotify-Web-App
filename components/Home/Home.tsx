// components
import { Header } from "../Header/Header";
import { Cards } from "../Common/Cards";

// styling
import styles from "./Home.module.scss";

// hook
import { useHomeInfo } from "../../hooks/useHomeInfo";

export const Home: React.FC<{}> = ({}) => {
  const {
    newReleases,
    featuredPlaylists,
    recentlyPlayed,
    recommendations,
    topArtists,
  } = useHomeInfo();

  // if data hasn't finished fetching, return nothing

  if (
    !newReleases ||
    !featuredPlaylists ||
    !recentlyPlayed ||
    !recommendations ||
    !topArtists
  )
    return <></>;

  return (
    <div>
      <Header />

      <div className={styles.home}>
        <div className={styles.home__body}>
          <div className={styles.home__results}>
            {/* <Posters data={newReleases} /> */}
            <Cards data={featuredPlaylists} title="Featured Playlists" />
            <Cards data={newReleases} title="New Releases" />
            <Cards data={topArtists} title="Your Favorite Artists" />
            <Cards data={recentlyPlayed} title="Recently Played" />
          </div>
        </div>
      </div>
    </div>
  );
};
