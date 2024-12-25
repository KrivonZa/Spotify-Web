import { useState, useEffect } from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";

const LanguageModal = ({ onClose }: { onClose: () => void }) => {
  const [animate, setAnimate] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleClose = () => {
    setAnimate(false);
    onClose();
  };

  const handleChange = (lang: string) => {
    onClose();
    i18n.changeLanguage(lang);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10"
      onClick={handleClose}
    >
      <div
        className={`bg-[#1e1e1e] min-h-[85%] w-[70%] rounded-xl transform transition-transform duration-200 ${
          animate ? "translate-y-0" : "translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="cursor-pointer absolute top-5 right-4 rounded-full bg-[#414141] hover:bg-[#707070] duration-200 w-9 h-9 flex items-center justify-center"
          onClick={handleClose}
        >
          <i className="fa-solid fa-x text-white"></i>
        </div>

        <div className="px-4 py-5 border-b border-[#414141]">
          <p className="text-xl font-bold">{t("languageSelection.title")}</p>
          <p className="font-semibold">{t("languageSelection.description")}</p>
        </div>

        <div className="px-4 py-4 grid grid-cols-2 leading-7">
          <div
            className="px-5 py-4 hover:bg-[#414141] duration-150 cursor-pointer"
            onClick={() => handleChange("en")}
          >
            <p>English</p>
            <p className="text-[#a0a0a0]">English</p>
          </div>
          <div
            className="px-5 py-4 hover:bg-[#414141] duration-150 cursor-pointer"
            onClick={() => handleChange("vi")}
          >
            <p>Tiếng Việt</p>
            <p className="text-[#a0a0a0]">Vietnamese</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageModal;
