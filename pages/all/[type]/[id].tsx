import { useRouter } from "next/router";

// components
import { Header } from "../../../components/Header/Header";
import { Cards } from "../../../components/Common/Cards";

//styling
import styles from "../../../styles/All.module.scss";

// hook
import { useArtistInfo } from "../../../hooks/useArtistInfo";

// types
import { CardsData } from "../../../types/types";
import { useImageColor } from "../../../hooks/useImageColor";

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
    albums: {
      title: `${artist?.name} - Discography`,
      data: albums,
    },
    singles: { title: `${artist?.name} - Singles`, data: singles },
    appears_on: { title: `${artist?.name} appears on`, data: appears_on },
    related: { title: `Artists like ${artist?.name}`, data: otherArtists },
  };

  if (!albums) return <></>;

  return (
    <>
      <Header />
      <div className={styles.all}>
        <div className={styles.all__title}>
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

export default Artist;
