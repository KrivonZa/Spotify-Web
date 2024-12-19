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

export default function Sidebar() {
  // const navigate = useNavigate();

  const [sidebarWidth, setSidebarWidth] = useState<string | null>(null);

  useEffect(() => {
    setSidebarWidth(`${window.innerWidth * 0.25}px`);
  }, []);

  const handleMouseMove = (e: any) => {
    const newWidth = Math.max(
      window.innerWidth * 0.25,
      Math.min(e.clientX, window.innerWidth * 0.3)
    );
    setSidebarWidth(`${newWidth}px`);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown = () => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="flex h-full select-none">
      <div
        className="text-white bg-[#121212] leading-10 py-5 rounded-xl"
        style={{ width: sidebarWidth || "25%" }}
      >
        <div className="flex justify-between items-center px-8">
          <div className="cursor-pointer hover:text-white text-gray-400 duration-200 flex items-center">
            <i className="fa-solid fa-lines-leaning mr-3 text-2xl"></i>
            <div className="text-lg font-semibold">Your Library</div>
          </div>
          <div className="cursor-pointer hover:text-white text-gray-400 duration-200 hover:bg-gray-500 bg-opacity-10 hover:rounded-full w-10 h-10 flex justify-center items-center">
            <i className="fa-solid fa-plus text-2xl"></i>
          </div>
        </div>

        <div className="my-10">
          <CreatePP />
        </div>

        <div className="text-xs px-8 flex flex-wrap gap-2 my-8">
          {[
            "Pháp lý",
            "Trung tâm an toàn và quyền riêng tư",
            "Chính sách quyền riêng tư",
            "Cookie",
            "Giới thiệu Quảng cáo",
            "Hỗ trợ tiếp cận",
          ].map((item, index) => (
            <div
              key={index}
              className="cursor-pointer hover:text-gray-300 flex-auto duration-150"
            >
              {item}
            </div>
          ))}
        </div>

        <div className="ml-8 inline-flex justify-center items-center rounded-full border-gray-500 hover:border-white border px-4 cursor-pointer transform hover:scale-105 duration-200">
          <i className="fa-solid fa-globe mr-3"></i>
          <div>Tiếng Việt</div>
        </div>
      </div>

      <div
        className="py-5 mb-4 w-1 cursor-grab flex justify-center mx-1 opacity-0 duration-200 hover:opacity-45 active:opacity-100"
        onMouseDown={handleMouseDown}
      >
        <div className="w-[2px] bg-white"></div>
      </div>
    </div>
  );
}
