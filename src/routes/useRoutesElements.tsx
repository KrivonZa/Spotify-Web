import { useRoutes, useLocation } from "react-router-dom";
import HomePage from "../modules/UserModule/homePageLayout/HomePage";
import UserLayout from "../layouts/UserLayout";
import AuthLayout from "../layouts/AuthLayout";
import DetailArtists from "../modules/UserModule/detailArtists/DetailArtists";
import Playlist from "../modules/UserModule/playList/Playlist";
import Genre from "../modules/UserModule/genre/Genre";
import GenreAndSong from "../modules/UserModule/genreAndSong/GenreAndSong";
import { Login, Signup, ForgotPass } from "../modules/UserModule/authorize";
import { useEffect } from "react";

const useRoutesElements = () => {
  const location = useLocation();

  useEffect(() => {
    let title = "";

    if (location.pathname === "/") {
      title = "Spotify";
    } else if (location.pathname.startsWith("/detail-artists")) {
      title = "Chi Tiết Nghệ Sĩ";
    } else if (location.pathname.startsWith("/play-list")) {
      title = "Danh Sách Phát";
    } else if (location.pathname === "/genre") {
      title = "Thể Loại";
    } else if (location.pathname.startsWith("/genre")) {
      title = "Thể Loại và Bài Hát";
    } else if (location.pathname === "/login") {
      title = "Đăng Nhập";
    } else if (location.pathname.includes("/signup")) {
      title = "Đăng Ký";
    } else if (location.pathname === "/forgot") {
      title = "Quên Mật Khẩu";
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
          element: <Signup />,
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
