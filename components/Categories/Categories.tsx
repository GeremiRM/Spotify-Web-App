import React from "react";
import { useSpotify } from "../../hooks/useSpotify";

interface CategoriesProps {}

export const Categories: React.FC<CategoriesProps> = ({}) => {
  const spotifyApi = useSpotify();

  return (
    <div>
      <div></div>
    </div>
  );
};
