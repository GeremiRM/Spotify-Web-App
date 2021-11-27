import SpotifyWebApi from "spotify-web-api-node";

// token
let token = null;
if (typeof window !== "undefined") token = localStorage.getItem("token");
const spotifyApi = new SpotifyWebApi({ accessToken: token! });

const orderByPopularity = (list: any[]) => {
  type popularity = { popularity: number };

  const compare = (a: popularity, b: popularity) => {
    if (a.popularity < b.popularity) {
      return 1;
    }
    if (a.popularity > b.popularity) {
      return -1;
    }
    return 0;
  };
  return list.sort(compare);
};

// Search

export const searchAll = async (query: string) => {
  const data = await spotifyApi.search(query, ["album", "artist", "playlist"]);
  return {
    albums: data.body.albums?.items,
    artists: data.body.artists?.items,
    playlists: data.body.playlists?.items,
  };
};

export const searchTracks = async (query: string) => {
  const data = await spotifyApi.searchTracks(query);
  return data.body.tracks?.items;
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

export const getUserTopArtists = async () => {
  const data = await spotifyApi.getMyTopArtists();
  return data.body.items;
};

export const getUserTopTracks = async () => {
  const data = await spotifyApi.getMyTopTracks();
  return data.body.items;
};

export const addToSaved = async (id: string) => {
  const response = await spotifyApi.addToMySavedTracks([id]);
  console.log(response.body);
};

export const removeFromSaved = async (id: string) => {
  const response = await spotifyApi.removeFromMySavedTracks([id]);
  console.log(response.body);
};

export const containedInSavedTrack = async (id: string) => {
  const data = await spotifyApi.containsMySavedTracks([id]);
  return data;
};

export const getUserRecommendations = async () => {
  const topArtists = await spotifyApi.getMyTopArtists({ limit: 5 });
  const topArtistsId = topArtists.body.items.map((artist) => artist.id);
  const data = await spotifyApi.getRecommendations({
    min_popularity: 40,
    seed_artists: topArtistsId,
  });
  return data.body.tracks;
};

export const getUserRecentlyPlayedTracks = async () => {
  const data = await spotifyApi.getMyRecentlyPlayedTracks();
  const tracks = data.body.items.map((item) => item.track);
  return tracks;
};

export const getUserPlaylists = async () => {
  const user = await spotifyApi.getMe();
  const data = await spotifyApi.getUserPlaylists(user.body.id);
  return data.body.items;
};

export const getUserLibrary = async () => {
  const playlists = await spotifyApi.getUserPlaylists();
  const artists = await spotifyApi.getFollowedArtists();
  const albumsData = await spotifyApi.getMySavedAlbums();
  const albums = albumsData.body.items.map((item) => item.album);

  return {
    playlists: playlists.body.items,
    artists: artists.body.artists.items,
    albums: albums,
  };
};

export const getUserLikedSongs = async () => {
  const data = await spotifyApi.getMySavedTracks({ limit: 50 });
  const tracks = data.body.items.map((item) => item.track);
  return tracks;
};

// Artists

export const getArtist = async (id: string) => {
  const data = await spotifyApi.getArtist(id);
  return data.body;
};

export const getArtistAlbums = async (id: string) => {
  const data = await spotifyApi.getArtistAlbums(id, { album_type: "album" });

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

export const getFeaturedPlaylists = async () => {
  const data = await spotifyApi.getFeaturedPlaylists();
  return data.body.playlists.items;
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
    totalDuration += album.tracks.items[i]?.duration_ms;
  }
  return totalDuration;
};

export const getNewReleases = async () => {
  const data = await spotifyApi.getNewReleases();
  return data.body.albums.items;
};
