// import { NavLink, useNavigate } from "react-router-dom";
// import { Avatar, Button, Col, Popover, Row, Space, Typography } from "antd";
// import { useModal } from "../../../globalContext/ModalContext";
// import { useAppSelector } from "../../../redux/hooks";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../../redux/store";
// import { useEffect, useState } from "react";
// const { Title, Text } = Typography;
import CreatePP from "../../../components/SidebarComponent/CreatePP";
import { useState, useEffect } from "react";
import LanguageModal from "../../../components/LanguageModal";
import { useTranslation } from "react-i18next";

export default function Sidebar() {
  const { t } = useTranslation();
  const [sidebarWidth, setSidebarWidth] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpand, setIsExpand] = useState(false);
  const [isMinimize, setIsMinimize] = useState(false);

  const user = localStorage.getItem("user");

  useEffect(() => {
    setSidebarWidth(`${window.innerWidth * 0.25}px`);
  }, []);

  const handleMouseMove = (e: any) => {
    const maxWidth = user ? window.innerWidth * 0.4 : window.innerWidth * 0.3;
    const newWidth = Math.max(
      window.innerWidth * 0.25,
      Math.min(e.clientX, maxWidth)
    );
    if (newWidth === maxWidth) {
      setIsExpand(true);
    } else {
      setIsExpand(false);
    }
    setSidebarWidth(`${newWidth}px`);
  };

  const handleIncreaseWidth = () => {
    setSidebarWidth(`${window.innerWidth * 0.4}px`);
    setIsExpand(true);
  };

  const handleDecreaseWidth = () => {
    setSidebarWidth(`${window.innerWidth * 0.25}px`);
    setIsExpand(false);
  };

  const minimizeWidth = () => {
    setIsMinimize(true);
    setSidebarWidth(`${window.innerWidth * 0.05}px`);
  };

  const maximumWidth = () => {
    setIsMinimize(false);
    setSidebarWidth(`${window.innerWidth * 0.25}px`);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown = () => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const toggleLanguageModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const modal = document.getElementById("language-modal");
    if (modal && !modal.contains(event.target as Node)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const footerLinks = [
    t("sidebar.legal"),
    t("sidebar.safetyCenter"),
    t("sidebar.privacyPolicy"),
    t("sidebar.cookies"),
    t("sidebar.about"),
    t("sidebar.accessibility"),
  ];

  return (
    <div className="flex h-full select-none">
      {isMinimize ? (
        <div className="flex h-full select-none">
          <div
            className="flex flex-col items-center gap-y-3 text-white bg-[#121212] leading-10 py-5 rounded-xl"
            style={{ width: sidebarWidth || "5%" }}
          >
            <div
              className={`cursor-pointer hover:text-white text-gray-400 duration-200 flex items-center ${
                user ? "clickable" : ""
              }`}
              onClick={user ? maximumWidth : () => {}}
            >
              <i className="fa-solid fa-lines-leaning text-2xl"></i>
            </div>
            <div className="cursor-pointer hover:text-white text-gray-400 duration-200 hover:bg-gray-500 bg-opacity-10 hover:rounded-full w-10 h-10 flex justify-center items-center">
              <i className="fa-solid fa-plus text-2xl"></i>
            </div>
          </div>
          <div className="py-5 mb-4 w-1 mx-1"></div>
        </div>
      ) : (
        <div className="flex h-full select-none">
          <div
            className="text-white bg-[#121212] leading-10 py-5 rounded-xl"
            style={{ width: sidebarWidth || "25%" }}
          >
            <div className="flex justify-between items-center px-8">
              <div
                className={`cursor-pointer hover:text-white text-gray-400 duration-200 flex items-center ${
                  user ? "clickable" : ""
                }`}
                onClick={user ? minimizeWidth : () => {}}
              >
                <i className="fa-solid fa-lines-leaning mr-3 text-2xl"></i>
                <div className="text-lg font-semibold">
                  {t("sidebar.yourLibrary")}
                </div>
              </div>
              <div className="flex justify-center items-center gap-x-5">
                <div className="cursor-pointer hover:text-white text-gray-400 duration-200 hover:bg-gray-500 bg-opacity-10 hover:rounded-full w-10 h-10 flex justify-center items-center">
                  <i className="fa-solid fa-plus text-2xl"></i>
                </div>

                {user && (
                  <div
                    className="cursor-pointer hover:text-white text-gray-400 duration-200 hover:bg-gray-500 bg-opacity-10 hover:rounded-full w-10 h-10 flex justify-center items-center"
                    onClick={
                      isExpand ? handleDecreaseWidth : handleIncreaseWidth
                    }
                  >
                    {isExpand ? (
                      <i className="fa-solid fa-arrow-left text-2xl"></i>
                    ) : (
                      <i className="fa-solid fa-arrow-right text-2xl"></i>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="my-10">
              <CreatePP />
            </div>

            <div className="text-xs px-8 flex flex-wrap leading-6 gap-x-4 my-5">
              {footerLinks.map((item, index) => (
                <div
                  key={index}
                  className="cursor-pointer hover:text-gray-300 duration-150"
                >
                  {item}
                </div>
              ))}
            </div>

            <div
              className="ml-8 inline-flex justify-center items-center rounded-full border-gray-500 hover:border-white border px-4 cursor-pointer transform hover:scale-105 duration-200"
              onClick={toggleLanguageModal}
            >
              <i className="fa-solid fa-globe mr-3"></i>
              <div>{t("sidebar.language")}</div>
            </div>

            {isModalOpen && <LanguageModal onClose={toggleLanguageModal} />}
          </div>

          <div
            className="py-5 mb-4 w-1 cursor-grab flex justify-center mx-1 opacity-0 duration-200 hover:opacity-45 active:opacity-100"
            onMouseDown={handleMouseDown}
          >
            <div className="w-[2px] bg-white"></div>
          </div>
        </div>
      )}
    </div>
  );
}
