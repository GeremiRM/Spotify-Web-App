import { useEffect, useState } from "react";
import { usePalette } from "react-palette";

export const useImageColor = (image: string) => {
  const [palette, setPalette] = useState("");
  const { data } = usePalette(image);

  useEffect(() => {
    setPalette(data.darkVibrant ?? "");
  }, [data.darkVibrant]);

  return palette;
};
