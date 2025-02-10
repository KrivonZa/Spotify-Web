export interface userPlaylist {
  account: Account;
  playlists: Playlist[];
}

export interface Account {
  id: string;
  email: string;
  gender: boolean;
  birthday: string;
  nickName: string;
  avatar: string;
  isSubcribe: boolean;
}

export interface Playlist {
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
  account: Account;
}

export interface music {
  id: string;
  musicName: string;
  uploadTime: string;
  thumbnail: string;
  musicUrl: string;
  artistCollaboration: artistCollaboration[];
}

export interface artistCollaboration {
  account: {
    id: string;
    nickname: string;
  };
  thumbnail: string;
}

export interface addToPlaylist {
  playlistId: string;
  musicId: string;
}

export interface updatePlaylist {
  playlistId: string;
  backgroundImage: string | null;
  title: string;
  description: string;
}
