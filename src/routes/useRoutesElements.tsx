import { useRoutes, useLocation } from "react-router-dom";
import HomePage from "../modules/UserModule/homePageLayout/HomePage";
import UserLayout from "../layouts/UserLayout";
import AuthLayout from "../layouts/AuthLayout";
import SignupStepIndex from "../layouts/AuthLayout/SignupStepIndex";
import DetailArtists from "../modules/UserModule/detailArtists/DetailArtists";
import Playlist from "../modules/UserModule/playList/Playlist";
import Genre from "../modules/UserModule/genre/Genre";
import GenreAndSong from "../modules/UserModule/genreAndSong/GenreAndSong";
import {
  Login,
  Signup,
  ForgotPass,
  SignupStep,
} from "../modules/UserModule/authorize";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const useRoutesElements = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    let title = "";

    if (location.pathname === "/") {
      title = "Spotify";
    } else if (location.pathname.startsWith("/detail-artists")) {
      title = t("routes.artists");
    } else if (location.pathname.startsWith("/play-list")) {
      title = t("routes.playlist");
    } else if (location.pathname === "/genre") {
      title = t("routes.genre");
    } else if (location.pathname.startsWith("/genre")) {
      title = t("routes.genreDetail");
    } else if (location.pathname === "/login") {
      title = t("routes.login");
    } else if (location.pathname.includes("/signup")) {
      title = t("routes.signup");
    } else if (location.pathname === "/forgot") {
      title = t("routes.forgot");
    }

    document.title = title;
  }, [location]);

  const element = useRoutes([
    {
      path: "",
      element: <UserLayout />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
        {
          path: "detail-artists/:id",
          element: <DetailArtists />,
        },
        {
          path: "play-list/:id",
          element: <Playlist />,
        },
        {
          path: "genre",
          element: <Genre />,
        },
        {
          path: "genre/:id",
          element: <GenreAndSong />,
        },
      ],
    },
    {
      path: "",
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <SignupStepIndex />,
          children: [
            { path: "", element: <Signup /> },
            { path: "1", element: <SignupStep step={1} /> },
            { path: "2", element: <SignupStep step={2} /> },
            { path: "3", element: <SignupStep step={3} /> },
          ],
        },
        {
          path: "forgot",
          element: <ForgotPass />,
        },
      ],
    },
  ]);
  return element;
};
export default useRoutesElements;
