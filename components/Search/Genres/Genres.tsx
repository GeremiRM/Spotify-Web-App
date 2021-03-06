import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

// components
import { Card } from "./GenreCard";

// styling
import styles from "./Genres.module.scss";

// hook
import { useSpotify } from "../../../hooks/useSpotify";

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

  // Get Genres
  useEffect(() => {
    const getData = async () => {
      const categories = await spotifyApi.getCategories({ limit: 30 });
      setCategories(categories.body.categories.items);
    };

    if (status === "authenticated") getData();
  }, [status, spotifyApi]);

  return (
    <div className={styles.genres}>
      {/* Title */}

      <h2>Browse All</h2>

      {/* Genres Cards */}
      <div className={styles.cards}>{renderCards()}</div>
    </div>
  );
};
