import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function NotFound() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="h-full flex flex-col justify-center items-center gap-y-4">
      <img src="/vite.svg" alt="Spotify" className="w-24 h-24" />
      <p className="text-4xl font-bold">{t("boundary.NFtitle")}</p>
      <p className="text-2xl font-semibold">{t("boundary.NFdescription")}</p>
      <div className="flex flex-col justify-center items-center mt-3">
        <button
          className="text-center text-[#121212] font-bold bg-green-500 hover:bg-green-400 duration-200 py-3 w-full rounded-full mt-2 px-5"
          onClick={() => navigate("/")}
        >
          {t("boundary.NFbutton")}
        </button>
      </div>
    </div>
  );
}
