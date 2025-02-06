import { apiPrivateInstance } from "../constants/privateAPI";
import { apiInstance } from "../constants/publicAPI";

export const manageArtist = {
  becomeArtist: () => apiPrivateInstance().patch(`artist/become-artist`),
  getAllArtist: (req: string) =>
    apiInstance().get(`artist/get-all?name=${req}`),
};
