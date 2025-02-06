import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUser } from "../../../hooks/useUser";

export function AccountMenu() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { userInfo } = useUser();

  return (
    <div className="bg-[#121212] w-full h-full flex justify-center">
      <div className="my-20 mx-28 w-[50%] flex flex-col gap-y-5">
        <div className="flex w-full gap-x-5 h-[20%]">
          <div className="w-2/3 bg-[#414141] rounded-lg px-3 py-3 hover:scale-105 transform duration-200">
            <p className="text-xs font-medium">{t("accountMenu.plan")}</p>
            <p className="text-3xl font-bold text-[#888888]">Spotify Free</p>
          </div>
          <div className="w-1/3 bg-gradient-to-bl from-blue-500 to-purple-500 rounded-lg flex flex-col justify-center items-center hover:scale-105 transform duration-200">
            <i className="fa-regular fa-gem text-xl font-bold"></i>
            <p className="text-xl font-bold">{t("accountMenu.premium")}</p>
          </div>
        </div>

        <div className="bg-[#414141] rounded-lg">
          <p className="text-2xl font-bold py-2 px-3">
            {t("accountMenu.account")}
          </p>
          <div
            className="flex items-center justify-between my-4 py-2 px-3 hover:bg-[#383838] duration-200 cursor-pointer group"
            onClick={() => navigate("/editProfile")}
          >
            <div className="flex items-center gap-2">
              <div className="px-2 py-2 bg-[#707070] h-8 w-8 flex justify-center items-center rounded-lg group-hover:bg-[#505050] duration-200">
                <i className="fa-solid fa-pen text-sm group-hover:text-white"></i>
              </div>
              <p className="font-semibold group-hover:text-gray-300 group-hover:translate-x-1 duration-200">
                {t("accountMenu.profile")}
              </p>
            </div>
            <i className="fa-solid fa-chevron-right text-sm group-hover:text-gray-300 group-hover:translate-x-1 duration-200"></i>
          </div>

          {userInfo && !userInfo.isSubcribe && (
            <div
              className="flex items-center justify-between my-4 py-2 px-3 hover:bg-[#383838] duration-200 cursor-pointer group"
              onClick={() => navigate("/becomeArtist")}
            >
              <div className="flex items-center gap-2">
                <div className="px-2 py-2 bg-[#707070] h-8 w-8 flex justify-center items-center rounded-lg group-hover:bg-[#505050] duration-200">
                  <i className="fa-brands fa-spotify text-sm group-hover:text-white"></i>
                </div>
                <p className="font-semibold group-hover:text-gray-300 group-hover:translate-x-1 duration-200">
                  {t("accountMenu.artist")}
                </p>
              </div>
              <i className="fa-solid fa-chevron-right text-sm group-hover:text-gray-300 group-hover:translate-x-1 duration-200"></i>
            </div>
          )}
        </div>

        <div className="bg-[#414141] rounded-lg">
          <p className="text-2xl font-bold py-2 px-3">
            {t("accountMenu.security")}
          </p>
          <div
            className="flex items-center justify-between my-4 py-2 px-3 hover:bg-[#383838] duration-200 cursor-pointer group"
            onClick={() => navigate("/changePassword")}
          >
            <div className="flex items-center gap-2">
              <div className="px-2 py-2 bg-[#707070] h-8 w-8 flex justify-center items-center rounded-lg group-hover:bg-[#505050] duration-200">
                <i className="fa-solid fa-lock text-sm group-hover:text-white"></i>
              </div>
              <p className="font-semibold group-hover:text-gray-300 group-hover:translate-x-1 duration-200">
                {t("accountMenu.change")}
              </p>
            </div>
            <i className="fa-solid fa-chevron-right text-sm group-hover:text-gray-300 group-hover:translate-x-1 duration-200"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
