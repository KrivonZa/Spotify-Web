import { message, Modal } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import FormLogin from "../../../components/login";
import { useModal } from "../../../globalContext/ModalContext";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import DropdownProfile from "../../../components/HeaderComponent/DropdownProfile";
import { useUser } from "../../../hooks/useUser";
import { userInfoThunk } from "../../../stores/userManager/thunk";
import { searchArtistThunk } from "../../../stores/artistManager/thunk";
import { searchMusicThunk } from "../../../stores/musicManager/thunk";
import { resetSearchArtist } from "../../../stores/artistManager/slice";
import { resetSearchMusic } from "../../../stores/musicManager/slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../stores";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isModalOpen, closeModal } = useModal();
  const dispatch = useDispatch<AppDispatch>();
  const [isFocused, setIsFocused] = useState(false);
  const [isSearch, setIsSearch] = useState("");
  const { t } = useTranslation();
  const { userInfo } = useUser();

  const user = localStorage.getItem("user");

  useEffect(() => {
    if (user) {
      dispatch(userInfoThunk());
    }
  }, []);

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleButtonClick = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleSearch = () => {
    if (!isSearch) return;
    dispatch(searchArtistThunk(isSearch));
    dispatch(searchMusicThunk(isSearch));
  };

  const handleReset = () => {
    dispatch(resetSearchArtist());
    dispatch(resetSearchMusic());
    setIsSearch("");
    window.location.reload();
  };

  return (
    <div>
      <header className="h-16 w-full flex justify-between items-center">
        <div className="w-12 ml-10 flex-1">
          <img
            src="/vite.svg"
            alt="Logo Spotify"
            className="w-10 h-10 cursor-pointer"
            onClick={() => {
              navigate("/");
              setDropdownVisible(false);
            }}
          />
        </div>

        <div className="flex justify-between items-center w-full flex-1">
          <button
            className="px-3 py-2 hover:bg-[#414141] rounded-full flex items-center justify-center duration-200 mr-3"
            onClick={() => {
              navigate("/");
              setDropdownVisible(false);
              handleReset();
            }}
          >
            <i className="fa-solid fa-home text-xl"></i>
          </button>
          {location.pathname === "/" && (
            <div
              className={`flex items-center border-2 hover:bg-[#414141] duration-200 rounded-full px-4 py-2 w-full bg-[#292929] ${
                isFocused ? "border-white bg-[#414141]" : "border-[#141414]"
              }`}
            >
              <i
                className={`fa-solid fa-search duration-150 cursor-pointer hover:text-white transform hover:scale-110 ${
                  isFocused ? "text-white" : "text-[#a0a0a0]"
                }`}
                onClick={handleSearch}
              ></i>
              <input
                type="text"
                className="bg-transparent border-r-2 focus:outline-none w-full px-3 mr-3 placeholder-[#a0a0a0]"
                value={isSearch}
                onChange={(e) => setIsSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder={t("header.search")}
                onFocus={() => {
                  setIsFocused(true);
                  setDropdownVisible(false);
                }}
                onBlur={() => setIsFocused(false)}
              />
              <i className="fa-solid fa-layer-group duration-200 text-[#a0a0a0] hover:text-white cursor-pointer transform hover:scale-110"></i>
            </div>
          )}
        </div>

        <div className="mx-8 font-bold flex-1">
          {user ? (
            <div className="flex justify-end items-center gap-x-6">
              <button
                className="py-2 px-3 font-bold text-sm text-black bg-white transform hover:scale-105 hover:bg-slate-200 duration-200 rounded-full"
                onClick={() => {
                  message.warning(t("setting.useless"));
                  setDropdownVisible(false);
                }}
              >
                {t("header.premium")}
              </button>
              <button
                className="py-2 px-3 font-bold text-sm text-white transform hover:scale-105 hover:text-gray-300 duration-200 flex justify-center items-center"
                onClick={() => {
                  message.warning(t("setting.useless"));
                  setDropdownVisible(false);
                }}
              >
                <i className="fa-regular fa-circle-down mr-2 text-lg"></i>
                {t("header.download")}
              </button>
              <button
                className="hover:text-white duration-200 text-gray-400 text-lg"
                onClick={() => {
                  message.warning(t("setting.useless"));
                  setDropdownVisible(false);
                }}
              >
                <i className="fa-regular fa-bell"></i>
              </button>
              <div>
                <button
                  className="bg-gray-400 bg-opacity-30 px-2 py-2 rounded-full transform hover:scale-105 duration-200"
                  onClick={handleButtonClick}
                >
                  <img
                    src={
                      userInfo?.avatar ||
                      "https://media.istockphoto.com/id/1305665241/vector/anonymous-gender-neutral-face-avatar-incognito-head-silhouette-stock-illustration.jpg?s=612x612&w=0&k=20&c=qA6GUTalFyrBCRVUzQgp2B5zODxmOA4NXTBcw9notYY="
                    }
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </button>
                {isDropdownVisible && (
                  <motion.div
                    className="absolute right-4 mt-2 z-10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <DropdownProfile
                      onClose={() => setDropdownVisible(false)}
                    />
                  </motion.div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex justify-end items-center gap-x-6">
              <button
                className="py-2 px-4 font-bold text-gray-400 transform hover:scale-105 hover:text-gray-300 duration-200"
                onClick={() => navigate("signup")}
              >
                {t("header.signup")}
              </button>
              <button
                className="py-2 px-4 font-bold rounded-full bg-white text-black hover:bg-gray-200 duration-200 transform hover:scale-105 ease-in-out"
                // onClick={openModal}
                onClick={() => navigate("login")}
              >
                {t("header.login")}
              </button>
            </div>
          )}
        </div>
        <Modal
          width={360}
          title="Login"
          open={isModalOpen}
          onOk={closeModal}
          onCancel={closeModal}
        >
          <FormLogin propsHiddenModal={closeModal} />
        </Modal>
      </header>
    </div>
  );
}
