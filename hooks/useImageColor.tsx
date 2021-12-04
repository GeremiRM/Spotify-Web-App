import { useEffect, useState } from "react";
import { usePalette } from "react-palette";

export const useImageColor = (image: string) => {
  const [palette, setPalette] = useState("");
  const { data } = usePalette(image);

  useEffect(() => {
    if (image) setPalette(data.darkVibrant ?? "");
  }, [data, image]);

  return palette;
};
