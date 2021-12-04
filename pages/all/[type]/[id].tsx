// libraries
import router, { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useArtistInfo } from "../../../hooks/useArtistInfo";
import { Header } from "../../../components/Header/Header";
import { Cards } from "../../../components/Common/Cards";

// components

// types
import { CardsData } from "../../../types/types";

interface Data {
  albums: { title: string; data: CardsData };
  singles: { title: string; data: CardsData };
  appears_on: { title: string; data: CardsData };
  related: { title: string; data: CardsData };
}

export const Artist: React.FC<{}> = ({}) => {
  const router = useRouter();
  const { type, id } = router.query;

  const { albums, appears_on, otherArtists, singles, artist } = useArtistInfo(
    id as string
  );

  const Data: Data = {
    // See all for albums and artists
    albums: { title: `${artist?.name} - Discography`, data: albums },
    singles: { title: `${artist?.name} - Singles`, data: singles },
    appears_on: { title: `${artist?.name} appears on`, data: appears_on },
    related: { title: `Artists like ${artist?.name}`, data: otherArtists },
  };

  if (!albums) return <></>;

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

export default Artist;
