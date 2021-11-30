import Vibrant from "node-vibrant";
import { useState } from "react";

export const useImageColor = async (image: string) => {
  const [palette, setPalette] = useState<any>();

  const colors = await Vibrant.from(image).getPalette();
  setPalette(colors);

  return palette;
};
