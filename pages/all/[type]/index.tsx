// libraries
import router, { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useArtistInfo } from "../../../hooks/useArtistInfo";
import { Header } from "../../../components/Header/Header";
import { Cards } from "../../../components/Common/Cards";
import { useLibraryInfo } from "../../../hooks/useLibraryInfo";
import { useHomeInfo } from "../../../hooks/useHomeInfo";

import { CardsData } from "../../../types/types";

interface Data {
  featured: { title: string; data: CardsData };
  newReleases: { title: string; data: CardsData };
  recentlyPlayed: { title: string; data: CardsData };
  topArtists: { title: string; data: CardsData };
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

  if (!featuredPlaylists || !newReleases || !recentlyPlayed || !topArtists)
    return <></>;

  return (
    <>
      <Header />
      <div style={{ padding: "5rem 2rem 2rem" }}>
        <div>
          <h1 style={{ color: "white", fontSize: "2.5rem" }}>
            {Data[type as keyof Data].title}
          </h1>
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
