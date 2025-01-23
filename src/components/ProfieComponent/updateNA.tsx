import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useEffect, useState } from "react";

interface UpdateNAProps {
  onClose: () => void;
  userInfo: any;
}

const UpdateNA: React.FC<UpdateNAProps> = ({ onClose, userInfo }) => {
  const [animate, setAnimate] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleClose = () => {
    setAnimate(false);
    onClose();
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10"
      onClick={handleClose}
    >
      <div
        className={`px-5 py-3 bg-[#1e1e1e] min-h-[25%] w-[40%] rounded-xl transform transition-transform duration-200 ${
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

        <p className="text-xl font-bold py-5">{t("updateProfile.detail")}</p>

        <div className="flex items-center mb-5">
          <div className="relative w-72 h-48 group cursor-pointer">
            <img
              src={userInfo.avatar}
              className="w-48 h-48 rounded-full object-cover shadow-xl"
            />
            <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full">
              <p className="hover:underline duration-100 text-lg">
                Choose Photo
              </p>
              <i className="fa-solid fa-pen text-2xl"></i>
              <p className="hover:underline duration-100 text-lg">
                Remove Photo
              </p>
            </div>
          </div>
          <div className="w-full pl-8">
            <p className="font-bold mb-1">{t("updateProfile.name")}</p>
            <div className="flex flex-col items-end">
              <div
                className={`border border-gray-500 rounded-lg mt-2 hover:bg-[#414141] duration-150 w-full ${
                  isFocused ? "border-white bg-[#414141]" : "border-[#141414]"
                }`}
              >
                <input
                  type="text"
                  placeholder={userInfo.nickName}
                  className="bg-transparent focus:outline-none px-3 py-1 placeholder-[#a0a0a0]"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  // onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button className="text-center text-[#121212] font-bold bg-white hover:bg-slate-200 transform hover:scale-105 duration-200 py-3 px-10 rounded-full mt-2">
                {t("updateProfile.save")}
              </button>
            </div>
          </div>
        </div>
        <p className="font-semibold text-xs">{t("updateProfile.policy")}</p>
      </div>
    </div>
  );
};

export default UpdateNA;
