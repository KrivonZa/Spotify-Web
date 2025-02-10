import { apiPrivateInstance } from "../constants/privateAPI";
import { apiInstance } from "../constants/publicAPI";

export const manageArtist = {
  becomeArtist: () => apiPrivateInstance().patch(`artist/become-artist`),
  searchArtist: (req: string) =>
    apiInstance().get(`artist/get-all-filter?name=${req}`),
  getAllArtist: () => apiInstance().get(`artist/get-all`),
};
