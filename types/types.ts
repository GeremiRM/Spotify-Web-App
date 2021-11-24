// Results from a spotifyApi.search
export type Results = SpotifyApi.SearchResponse | undefined;

// Tracks
export type Tracks =
  | SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull>
  | undefined;
export type TracksList = SpotifyApi.TrackObjectFull[] | undefined;
export type Track = SpotifyApi.TrackObjectFull | undefined;

// Albums
export type Albums =
  | SpotifyApi.PagingObject<SpotifyApi.AlbumObjectSimplified>
  | undefined;
export type AlbumList = SpotifyApi.AlbumObjectSimplified[] | undefined;
export type Album = SpotifyApi.AlbumObjectSimplified | undefined;

// Artists
export type Artists =
  | SpotifyApi.PagingObject<SpotifyApi.ArtistObjectFull>
  | undefined;
export type ArtistsList = SpotifyApi.ArtistObjectFull[] | undefined;
export type Artist = SpotifyApi.ArtistObjectFull | undefined;

// Playlists
export type Playlists =
  | SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectSimplified>
  | undefined;
export type PlaylistsList = SpotifyApi.PlaylistObjectSimplified[] | undefined;
export type Playlist = SpotifyApi.PlaylistObjectSimplified | undefined;
