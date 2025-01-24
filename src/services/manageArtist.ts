import { apiPrivateInstance } from "../constants/privateAPI";

export const manageArtist = {
  becomeArtist: () => apiPrivateInstance().patch(`artist/become-artist`),
};
