export const convertMillisTracks = (millis: number) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${Number(seconds) < 10 ? "0" : ""}${seconds}`;
};

export function converMillisBanners(millis: number) {
  let sec: number | string = Math.floor(millis / 1000);
  let hrs: number | string = Math.floor(sec / 3600);
  sec -= hrs * 3600;
  let min: number | string = Math.floor(sec / 60);
  sec -= min * 60;

  sec = "" + sec;
  sec = ("00" + sec).substring(sec.length);

  if (hrs > 0) {
    min = "" + min;
    min = ("00" + min).substring(min.length);
    return hrs + ":" + min + ":" + sec;
  } else {
    return min + ":" + sec;
  }
}

export const filterRepeated = (list: any) => {
  return list?.filter(
    (v: { name: any }, i: any, a: any[]) =>
      a.findIndex(
        (t: { name: string }) =>
          t.name.toLocaleLowerCase() === v.name.toLocaleLowerCase()
      ) === i
  );
};
``;
