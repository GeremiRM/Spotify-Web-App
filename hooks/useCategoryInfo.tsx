import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSpotify } from "./useSpotify";

interface CategoryData {
  category: SpotifyApi.SingleCategoryResponse;
  categoryPlaylists: SpotifyApi.PlaylistObjectSimplified[];
}

export const useCategoryInfo = (id: string) => {
  const [categoryData, setCategoryData] = useState<CategoryData>(
    {} as CategoryData
  );

  const spotifyApi = useSpotify();
  const { status } = useSession();

  useEffect(() => {
    const fetchCategoryData = async () => {
      const category = await spotifyApi.getCategory(id);
      const categoryPlaylists = await spotifyApi.getPlaylistsForCategory(
        category.body.id
      );

      setCategoryData({
        category: category.body,
        categoryPlaylists: categoryPlaylists.body.playlists.items,
      });
    };

    if (status === "authenticated") fetchCategoryData();
  }, [id, spotifyApi, status]);

  return categoryData;
};
