import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import FormLogin from "../../../components/login";
import { useAppSelector } from "../../../redux/hooks";
import { useModal } from "../../../globalContext/ModalContext";
import { useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const { isModalOpen, closeModal, openModal } = useModal();
  const { currentUser } = useAppSelector((state) => state.currentUser);
  const [isFocused, setIsFocused] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate(0);
  };

  return (
    <div>
      <header className="h-16 w-full flex justify-between items-center">
        <div
          className="w-12 ml-10 cursor-pointer flex-1"
          onClick={() => navigate("/")}
        >
          <img
            src="/src/public/spotify.svg"
            alt="Logo Spotify"
            className="w-10 h-10"
          />
        </div>

        <div className="flex justify-between items-center w-full flex-1">
          <button
            className="px-3 py-2 hover:bg-[#414141] rounded-full flex items-center justify-center duration-200 mr-3"
            onClick={() => navigate("/")}
          >
            <i className="fa-solid fa-home text-xl"></i>
          </button>
          <div
            className={`flex items-center border-2 hover:bg-[#414141] duration-200 rounded-full px-4 py-2 w-full bg-[#292929] ${
              isFocused ? "border-white bg-[#414141]" : "border-[#141414]"
            }`}
          >
            <i
              className={`fa-solid fa-search duration-150 cursor-pointer hover:text-white transform hover:scale-110 ${
                isFocused ? "text-white" : "text-[#a0a0a0]"
              }`}
            ></i>
            <input
              type="text"
              className="bg-transparent border-r-2 focus:outline-none w-full px-3 mr-3 placeholder-[#a0a0a0]"
              placeholder="Bạn muốn phát nội dung gì?"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <i
              className="fa-solid fa-layer-group duration-200 text-[#a0a0a0] hover:text-white cursor-pointer transform hover:scale-110"
            ></i>
          </div>
        </div>

        <div className="mx-8 font-bold flex-1">
          {currentUser ? (
            <div onClick={handleLogout} className="">
              Log out
            </div>
          ) : (
            <div className="flex justify-end items-center gap-x-6">
              <button className="py-2 px-4 font-bold text-gray-400 transform hover:scale-105 hover:text-gray-300 duration-200">
                Đăng kí
              </button>
              <button
                className="py-2 px-4 font-bold rounded-full bg-white text-black hover:bg-gray-200 duration-200 transform hover:scale-105 ease-in-out"
                onClick={openModal}
              >
                Đăng nhập
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
