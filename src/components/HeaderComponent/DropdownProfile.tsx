import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

interface DropdownProfileProps {
  onClose: () => void;
}

const DropdownProfile: React.FC<DropdownProfileProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate(0);
    onClose();
  };
  return (
    <div className="bg-[#414141] rounded-md flex flex-col min-w-56 max-w-64 p-4 space-y-5 text-sm">
      <button
        className="text-left hover:text-gray-300 duration-100 flex justify-between items-center"
        onClick={onClose}
      >
        {t("header.account")}
        <i className="fa-solid fa-up-right-from-square"></i>
      </button>
      <button
        className="text-left hover:text-gray-300 duration-100"
        onClick={() => {
          navigate("/user");
          onClose();
        }}
      >
        {t("header.profile")}
      </button>
      <button
        className="text-left hover:text-gray-300 flex justify-between items-center duration-100"
        onClick={() => {
          message.warning(t("header.upgrade1"));
          onClose();
        }}
      >
        {t("header.upgrade")}
        <i className="fa-solid fa-up-right-from-square"></i>
      </button>
      <button
        className="text-left hover:text-gray-300 duration-100"
        onClick={() => {
          navigate("/setting");
          onClose();
        }}
      >
        {t("header.setting")}
      </button>
      <div className="border border-white border-opacity-10"></div>
      <button
        className="text-left hover:text-gray-300 duration-100"
        onClick={handleLogout}
      >
        {t("header.logout")}
      </button>
    </div>
  );
};

export default DropdownProfile;
