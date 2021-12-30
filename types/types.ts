// Results from a spotifyApi.search
export type Results = {
  albums: SpotifyApi.AlbumObjectSimplified[] | undefined;
  artists: SpotifyApi.ArtistObjectFull[] | undefined;
  playlists: SpotifyApi.PlaylistObjectSimplified[] | undefined;
};

// The data passed to the cards wrapper
export type CardsData =
  | SpotifyApi.AlbumObjectSimplified[]
  | SpotifyApi.ArtistObjectFull[]
  | SpotifyApi.PlaylistObjectSimplified[]
  | SpotifyApi.TrackObjectFull[]
  | undefined
  | null;

// All the possible links for the /all page
export type LinkType =
  | "albums"
  | "singles"
  | "appears_on"
  | "playlists"
  | "related"
  | "featured"
  | "topArtists"
  | "recentlyPlayed"
  | "newReleases"
  | "search/album"
  | "search/artist"
  | "search/playlist"
  | "undefined";
