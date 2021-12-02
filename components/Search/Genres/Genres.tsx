import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSpotify } from "../../../hooks/useSpotify";
import { Card } from "./GenreCard";

import styles from "./Genres.module.scss";

// types
type Categories = SpotifyApi.CategoryObject[];

export const Genres: React.FC<{}> = ({}) => {
  const [categories, setCategories] = useState<Categories>([]);

  const spotifyApi = useSpotify();

  const { status } = useSession();

  const renderCards = () => {
    return categories.map((category) => (
      <Card
        key={category.id}
        id={category.id}
        title={category.name}
        cover={category.icons[0].url}
      />
    ));
  };

  useEffect(() => {
    const getData = async () => {
      const categories = await spotifyApi.getCategories({ limit: 30 });
      setCategories(categories.body.categories.items);
    };
    if (status === "authenticated") getData();
  }, [status, spotifyApi]);

  return (
    <div className={styles.genres}>
      <div className={styles.genres__title}>
        <h2>Browse All</h2>
      </div>
      <div className={styles.genres__cards}>{renderCards()}</div>
    </div>
  );
};
