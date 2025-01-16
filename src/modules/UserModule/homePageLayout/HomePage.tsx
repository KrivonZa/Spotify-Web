import { useState } from "react";
import { useColor } from "../../../globalContext/ColorContext";
import { useTranslation } from "react-i18next";
import data from "./data.json";
import { processImageAndSetBackground } from "../../../tools/dominantColor";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const { t } = useTranslation();
  const { setPrimaryColor } = useColor();
  const navigate = useNavigate();

  // const user = localStorage.getItem("user");

  // if (user) {
  //   const userInfo = JSON.parse(user);
  //   console.log(userInfo);
  //   console.log("Token:", userInfo.token);
  //   console.log("Authen:", userInfo.authenticated);
  // } else {
  //   console.log("Không tìm thấy thông tin người dùng trong localStorage.");
  // }

  const handleMouseEnter = async (imageUrl: string) => {
    const calculatedRgb = await processImageAndSetBackground(imageUrl);
    if (calculatedRgb) {
      setPrimaryColor(
        `rgb(${calculatedRgb.r}, ${calculatedRgb.g}, ${calculatedRgb.b})`
      );
    }
  };

  const handleMouseLeave = () => {
    setPrimaryColor("#383838");
  };

  return (
    <section className="min-h-screen">
      <div className="px-7 py-5">
        <div className="flex gap-x-3 font-medium">
          <button className="px-4 py-1 rounded-full bg-white bg-opacity-15 hover:bg-opacity-25 duration-200">
            {t("homepage.all")}
          </button>
          <button className="px-4 py-1 rounded-full bg-white bg-opacity-15 hover:bg-opacity-25 duration-200">
            {t("homepage.music")}
          </button>
          <button className="px-4 py-1 rounded-full bg-white bg-opacity-15 hover:bg-opacity-25 duration-200">
            {t("homepage.podcast")}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-15 hover:bg-opacity-25 duration-200 h-12 flex items-center rounded overflow-hidden cursor-pointer"
              onMouseEnter={() => handleMouseEnter(item.image)}
              onMouseLeave={handleMouseLeave}
            >
              <img
                className="w-12 h-full object-cover"
                src={item.image}
                alt={item.name}
              />
              <p className="font-medium px-2 py-1 text-sm text-pretty">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
