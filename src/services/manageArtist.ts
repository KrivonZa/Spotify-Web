import { apiPrivateInstance } from "../constants/privateAPI";
import { apiInstance } from "../constants/publicAPI";

export const manageArtist = {
  becomeArtist: () => apiPrivateInstance().patch(`artist/become-artist`),
  searchArtist: (req: string) =>
    apiInstance().get(`artist/get-all?name=${req}`),
  // searchArtist: (req: string) => apiInstance().get(`artist/get-all?name=${req}`),
};
