import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSpotify } from "./useSpotify";

interface TrackData {
  track: SpotifyApi.TrackObjectFull;
  isTrackSaved: boolean;
}

export const useSongInfo = (id: string) => {
  const [trackData, setTrackData] = useState<TrackData>({} as TrackData);

  const spotifyApi = useSpotify();
  const { status } = useSession();

  useEffect(() => {
    const fetchTrackData = async () => {
      const track = await spotifyApi.getTrack(id);
      const isTrackSaved = await spotifyApi.containsMySavedTracks([id]);

      setTrackData({
        track: track.body,
        isTrackSaved: isTrackSaved.body[0],
      });
    };
    if (status === "authenticated" && id) fetchTrackData();
  }, [id, spotifyApi, status]);

  return trackData;
};
