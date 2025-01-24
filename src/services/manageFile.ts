import { apiFileInstance } from "../constants/fileAPI";
import { fileImage, fileAudio } from "../types/file";

export const manageFile = {
  fileImage: (file: fileImage) => {
    const formData = new FormData();
    formData.append("file", file.file);
    return apiFileInstance().post(`v1/file/image`, formData);
  },
  fileAudio: (file: fileAudio) => {
    const formData = new FormData();
    formData.append("file", file.file);
    return apiFileInstance().post(`v1/file/audio`, formData);
  },
};
