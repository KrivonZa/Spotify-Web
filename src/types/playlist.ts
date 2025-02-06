export interface userPlaylist {
  playlistId: string;
  backgroundImage: string;
  title: string;
}

export interface playlistDetail {
  playlistId: string;
  backgroundImage: string;
  title: string;
  lengthOfTime: number;
  songCount: number;
  description: string;
  musics: music[];
}

export interface music {
  id: string;
  musicName: string;
  uploadTime: string;
  thumbnail: string;
  artistCollaboration: artistCollaboration[];
}

export interface artistCollaboration {
  account: {
    id: string;
    nickname: string;
  };
  thumbnail: string;
}
