export interface addMusic {
  musicName: string;
  thumbnail: string;
  musicUrl: string;
}

export interface getMusic {
  id: string;
  musicName: string;
  artistCollaboration: ArtistCollaboration[];
  uploadTime: string;
  thumbnail: string;
  musicurl?: string;
}

export interface ArtistCollaboration {
  account: Account;
  thumbnail: string;
}

export interface Account {
  id: string;
  nickname: string;
}