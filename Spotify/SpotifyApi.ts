import SpotifyWebApi from "spotify-web-api-node";

// token
let token = null;
if (typeof window !== "undefined") token = localStorage.getItem("token");
const spotifyApi = new SpotifyWebApi({ accessToken: token! });

// Search

export const searchAll = async (query: string) => {
  const data = await spotifyApi.search(query, ["album", "artist", "playlist"]);
  return data.body;
};

export const searchTracks = async (query: string) => {
  const data = await spotifyApi.searchTracks(query);
  return data.body.tracks;
};

// User

export const getUser = async () => {
  const data = await spotifyApi.getMe();
  return data.body;
};

export const getUserId = async () => {
  const data = await spotifyApi.getMe();
  return data.body.id;
};

export const getUserPlaylists = async () => {
  const user = await spotifyApi.getMe();
  const data = await spotifyApi.getUserPlaylists(user.body.id);
  return data.body.items;
};

// Artists

export const getArtist = async (id: string) => {
  const data = await spotifyApi.getArtist(id);
  return data.body;
};

export const getArtistAlbums = async (id: string) => {
  const data = await spotifyApi.getArtistAlbums(id);
  return data.body.items;
};

export const getArtistTopTracks = async (id: string) => {
  const data = await spotifyApi.getArtistTopTracks(id, "US");
  return data.body.tracks;
};

export const getRelatedArtists = async (id: string) => {
  const data = await spotifyApi.getArtistRelatedArtists(id);
  return data.body.artists;
};

// Playlists

export const getPlaylist = async (id: string) => {
  const data = await spotifyApi.getPlaylist(id);
  return data.body;
};

export const getPlaylistTracks = async (id: string) => {
  const data = await spotifyApi.getPlaylistTracks(id);
  return data.body?.items?.map((item) => item.track);
};

export const getPlaylistDuration = (
  playlist: SpotifyApi.PlaylistObjectFull
) => {
  let totalDuration = 0;
  playlist.tracks.items.map(
    (item) => (totalDuration += item.track.duration_ms)
  );
  return totalDuration;
};

// Tracks

export const getTracks = async (id: string) => {
  const data = await spotifyApi.searchTracks(id);
  return data.body;
};

export const getTrackAlbum = async (id: string) => {
  const data = await spotifyApi.getTrack(id);
  return data.body.album;
};

export const getTrackImage = async (id: string) => {
  const data = await spotifyApi.getTrack(id);
  return data.body.album.images[2].url;
};

// Albums

export const getAlbum = async (id: string) => {
  const data = await spotifyApi.getAlbum(id);
  return data.body;
};

export const getAlbumArtists = async (
  artists: SpotifyApi.ArtistObjectSimplified[]
) => {
  let artistsId = artists.map((artist) => artist.id);
  const data = await spotifyApi.getArtists(artistsId);
  return data.body.artists;
};

export const getAlbumDuration = (album: SpotifyApi.AlbumObjectFull) => {
  let totalDuration = 0;
  for (let i = 0; i < album.total_tracks; i++) {
    totalDuration += album.tracks.items[i].duration_ms;
  }
  return totalDuration;
};
