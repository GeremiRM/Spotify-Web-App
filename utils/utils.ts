export const convertMillisToMinutes = (millis: number) => {
  let minutes = Math.floor(millis / 60000);
  let seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${Number(seconds) < 10 ? "0" : ""}${seconds}`;
};

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
