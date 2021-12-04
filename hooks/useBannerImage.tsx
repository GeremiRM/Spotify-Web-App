import { useEffect, useState } from "react";

const DB_URL = "https://www.theaudiodb.com/api/v1/json/2/search.php?s=";

export const useBannerImage = (query: string) => {
  const [bannerImage, setBannerImage] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      const data = await fetch(DB_URL + query);

      const image = await data.json();
      setBannerImage(
        image.artists && image.artists[0].hasOwnProperty("strArtistFanart")
          ? image.artists[0].strArtistFanart
          : "no image"
      );
    };
    if (query) fetchImage();
  }, [query]);
  return bannerImage;
};
