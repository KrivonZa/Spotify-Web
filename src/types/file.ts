export interface fileImage {
  file: File;
}

export interface dataImageFile {
  name: string;
  fileName: string;
  url: string;
  duration: number | null;
}

export interface fileAudio {
  file: File;
}

export interface dataAudioFile {
  name: string;
  fileName: string;
  url: string;
  duration: number | null;
}
