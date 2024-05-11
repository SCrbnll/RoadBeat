interface Channel {
    id: string;
    name: string;
    isVerified: boolean;
    isVerifiedArtist: boolean;
  }
  
  interface Audio {
    url: string;
    durationMs: number;
    durationText: string;
    mimeType: string;
    format: string;
    lastModified: number;
    size: number;
    sizeText: string;
  }
  
  interface YoutubeVideo {
    searchTerm: string;
    id: string;
    title: string;
    channel: Channel;
    audio: Audio[];
  }
  
  interface Artist {
    type: string;
    id: string;
    name: string;
    shareUrl: string;
  }
  
  interface AlbumCover {
    url: string;
    width: number;
    height: number;
  }
  
  interface Album {
    type: string;
    id: string;
    name: string;
    shareUrl: string;
    cover: AlbumCover[];
  }
  
  interface SpotifyTrack {
    type: string;
    id: string;
    name: string;
    shareUrl: string;
    durationMs: number;
    durationText: string;
    artists: Artist[];
    album: Album;
  }
  
  interface Data {
    status: boolean;
    youtubeVideo: YoutubeVideo;
    spotifyTrack: SpotifyTrack;
  }
  