import "../../layouts/UserLayout/styles.css";
import { useTranslation } from "react-i18next";

const CreatePP = () => {
  const { t } = useTranslation();
  return (
    <div className="flex-grow mr-4 h-full overflow-hidden select-none">
      <div className="h-64 overflow-y-auto custom-scrollbar py-2 px-3">
        <div className="bg-[#292929] py-4 px-2 rounded-xl mb-5">
          <p className="font-bold text-lg leading-8">
            {t("sidebar.CPlaylist")}
          </p>
          <p className="leading-8">{t("sidebar.CPlaylistDes")}</p>
          <button className="bg-white rounded-full px-4 py-2 my-2 transform hover:scale-105 hover:bg-slate-200 duration-200">
            <div className="text-black font-bold text-base">
              {t("sidebar.CPlaylistButton")}
            </div>
          </button>
        </div>

        <div className="bg-[#292929] py-4 px-2 rounded-xl mt-5">
          <p className="font-bold text-lg leading-8">{t("sidebar.SPodcast")}</p>
          <p className="leading-8">{t("sidebar.SPodcaseDes")}</p>
          <button className="bg-white rounded-full px-4 py-2 my-2 transform hover:scale-105 hover:bg-slate-200 duration-200">
            <div className="text-black font-bold text-base">
              {t("sidebar.SPodcastButton")}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePP;
