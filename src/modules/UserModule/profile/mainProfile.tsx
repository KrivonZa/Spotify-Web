import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export function MainProfile() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="min-h-screen">
      <div className="flex items-end px-6 pb-6 pt-24">
        <div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaV47rPuoPjE81cDeRTBsRyos0_WablNntEQ&s"
            className="w-52 h-52 rounded-full object-cover shadow-xl"
          />
        </div>
        <div className="ml-6 flex flex-col gap-y-2">
          <p className="text-sm font-semibold">{t("profile.profile")}</p>
          <p className="text-7xl font-extrabold">Kevin Truong</p>
          <p className="flex text-gray-400">
            &bull;&nbsp;
            <p className="font-semibold hover:underline cursor-pointer text-white">
              5 {t("profile.following")}
            </p>
          </p>
        </div>
      </div>
      <div className="px-4 py-10">
        <i className="fa-solid fa-ellipsis text-2xl text-gray-400 hover:text-white duration-200 transform hover:scale-105 cursor-pointer"></i>
        <div className="mt-6">
          <div>
            <p className="text-xl font-bold">{t("profile.topArtists")}</p>
            <p className="text-gray-400 font-semibold text-sm">
              {t("profile.visible")}
            </p>
          </div>
          <div className="flex items-center gap-x-4 py-6">
            <div className="group relative hover:bg-slate-700 bg-opacity-15 p-4 rounded-lg cursor-pointer duration-200">
              <img
                src="https://i.scdn.co/image/ab676161000051741ba8fc5f5c73e7e9313cc6eb"
                className="w-44 h-44 rounded-full mb-3"
              />
              <p className="text-lg font-medium">Coldplay</p>
              <p className="text-gray-400 text-sm font-medium">
                {t("profile.artist")}
              </p>
              <div className="absolute top-full left-[80%] -translate-x-1/2 bg-green-500 p-2 rounded-full text-white opacity-0 group-hover:top-1/2 group-hover:opacity-100 transition-all duration-300 w-12 h-12 flex justify-center items-center">
                <i className="fa-solid fa-play text-lg text-black"></i>
              </div>
            </div>

            <div className="group relative hover:bg-slate-700 bg-opacity-15 p-4 rounded-lg cursor-pointer duration-200">
              <img
                src="https://i.scdn.co/image/ab67616100005174c64c5f001dc3957cf5651460"
                className="w-44 h-44 rounded-full mb-3"
              />
              <p className="text-lg font-medium">TheFatRat</p>
              <p className="text-gray-400 text-sm font-medium">
                {t("profile.artist")}
              </p>
              <div className="absolute top-full left-[80%] -translate-x-1/2 bg-green-500 p-2 rounded-full text-white opacity-0 group-hover:top-1/2 group-hover:opacity-100 transition-all duration-300 w-12 h-12 flex justify-center items-center">
                <i className="fa-solid fa-play text-lg text-black"></i>
              </div>
            </div>

            <div className="group relative hover:bg-slate-700 bg-opacity-15 p-4 rounded-lg cursor-pointer duration-200">
              <img
                src="https://i.scdn.co/image/ab67616100005174066a018bd314d9db8a155d71"
                className="w-44 h-44 rounded-full mb-3"
              />
              <p className="text-lg font-medium">Pianella Piano</p>
              <p className="text-gray-400 text-sm font-medium">
                {t("profile.artist")}
              </p>
              <div className="absolute top-full left-[80%] -translate-x-1/2 bg-green-500 p-2 rounded-full text-white opacity-0 group-hover:top-1/2 group-hover:opacity-100 transition-all duration-300 w-12 h-12 flex justify-center items-center">
                <i className="fa-solid fa-play text-lg text-black"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div>
            <p className="text-xl font-bold">{t("profile.topTracks")}</p>
            <div className="flex justify-between items-center text-gray-400 font-semibold text-sm">
              <p className="">{t("profile.visible")}</p>
              <p className="hover:underline cursor-pointer hover:text-white duration-100">
                {t("profile.all")}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-y-1 py-6">
            <div className="py-2 px-4 grid grid-cols-[20px_1fr_1fr_100px] items-center text-gray-400 gap-x-6 w-full hover:bg-slate-700 bg-opacity-15 duration-150 rounded-lg group">
              <p className="text-center">
                <span className="group-hover:hidden">1</span>
                <i className="fa-solid fa-play hidden group-hover:inline text-white text-sm"></i>
              </p>
              <div className="flex items-center gap-x-2">
                <img
                  src="https://i.scdn.co/image/ab67616d00004851de09e02aa7febf30b7c02d82"
                  className="h-12 w-12 rounded-lg"
                />
                <div>
                  <p className="font-semibold text-white">Politik</p>
                  <p className="hover:underline cursor-pointer duration-150 group-hover:text-white">
                    Coldplay
                  </p>
                </div>
              </div>
              <p className="hover:underline cursor-pointer duration-150 group-hover:text-white">
                A Rush of Blood to the Head
              </p>
              <div className="flex items-center justify-end gap-x-3">
                <i className="fa-solid fa-circle-plus hover:text-white duration-150 cursor-pointer opacity-0 group-hover:opacity-100 transform hover:scale-105"></i>
                <p>5:18</p>
                <i className="fa-solid fa-ellipsis hover:text-white duration-150 cursor-pointer opacity-0 group-hover:opacity-100 transform hover:scale-105"></i>
              </div>
            </div>

            <div className="py-2 px-4 grid grid-cols-[20px_1fr_1fr_100px] items-center text-gray-400 gap-x-6 w-full hover:bg-slate-700 bg-opacity-15 duration-150 rounded-lg group">
              <p className="text-center">
                <span className="group-hover:hidden">2</span>
                <i className="fa-solid fa-play hidden group-hover:inline text-white text-sm"></i>
              </p>
              <div className="flex items-center gap-x-2">
                <img
                  src="https://i.scdn.co/image/ab67616d00004851de09e02aa7febf30b7c02d82"
                  className="h-12 w-12 rounded-lg"
                />
                <div>
                  <p className="font-semibold text-white">Politik</p>
                  <p className="hover:underline cursor-pointer duration-150 group-hover:text-white">
                    Coldplay
                  </p>
                </div>
              </div>
              <p className="hover:underline cursor-pointer duration-150 group-hover:text-white">
                A Rush of Blood to the Head
              </p>
              <div className="flex items-center justify-end gap-x-3">
                <i className="fa-solid fa-circle-plus hover:text-white duration-150 cursor-pointer opacity-0 group-hover:opacity-100 transform hover:scale-105"></i>
                <p>5:18</p>
                <i className="fa-solid fa-ellipsis hover:text-white duration-150 cursor-pointer opacity-0 group-hover:opacity-100 transform hover:scale-105"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
