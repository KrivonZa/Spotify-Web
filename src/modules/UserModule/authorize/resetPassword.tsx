import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/hooks";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { AppDispatch } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { resetPassThunk } from "../../../stores/authManager/thunk";
import { useAuth } from "../../../hooks/useAuth";
import { toast } from "react-toastify";

export function ResetPassword() {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading } = useAuth();
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const toggleNewPasswordVisibility = () => {
    setIsNewPasswordVisible((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prevState) => !prevState);
  };

//   const handleReset = async () => {
//     if ( email && newPassword && confirmPassword) {
//         const resetData = {email, newPassword, confirmPassword};
//         const response = await dispatch((resetData));
//     }
//   }

  return (
    <div className="bg-[#121212] w-full h-full flex justify-center">
      <div className="my-10 mx-28 max-w-sm">
        <div className="flex flex-col">
          <i
            className="fa-brands fa-spotify text-5xl text-center"
            onClick={() => navigate("/")}
          ></i>
          <div className="text-3xl font-bold mt-4 mb-2">{t("reset.title")}</div>
          <div className="">{t("reset.description")}</div>
        </div>
        <div className="mb-3 mt-5">
          <p className="font-bold">{t("reset.email")}</p>
          <div
            className={`border border-gray-500 rounded-lg mt-2 hover:bg-[#414141] duration-150 ${
              isFocused === "email"
                ? "border-white bg-[#414141]"
                : "border-[#141414]"
            }`}
          >
            <input
              type="text"
              className="bg-transparent focus:outline-none w-full px-3 py-3 placeholder-[#a0a0a0]"
              placeholder="name@domain.com"
              onFocus={() => setIsFocused("email")}
              onBlur={() => setIsFocused(null)}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <p className="font-bold mt-5">{t("reset.password")}</p>
          <div
            className={`border border-gray-500 rounded-lg mt-2 hover:bg-[#414141] duration-150 flex justify-between pr-3 items-center ${
              isFocused === "newPass"
                ? "border-white bg-[#414141]"
                : "border-[#141414]"
            }`}
          >
            <input
              type={isNewPasswordVisible ? "text" : "password"}
              className="bg-transparent focus:outline-none w-full px-3 py-3 placeholder-[#a0a0a0]"
              placeholder={t("reset.password")}
              onFocus={() => setIsFocused("newPass")}
              onBlur={() => setIsFocused(null)}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <i
              className={`fa-regular text-lg cursor-pointer text-[#a0a0a0] duration-150 hover:text-white ${
                isNewPasswordVisible ? "fa-eye" : "fa-eye-slash"
              }`}
              onClick={toggleNewPasswordVisibility}
            ></i>
          </div>

          <p className="font-bold mt-5">{t("reset.confirmPassword")}</p>
          <div
            className={`border border-gray-500 rounded-lg mt-2 hover:bg-[#414141] duration-150 flex justify-between pr-3 items-center ${
              isFocused === "confirmPass"
                ? "border-white bg-[#414141]"
                : "border-[#141414]"
            }`}
          >
            <input
              type={isConfirmPasswordVisible ? "text" : "password"}
              className="bg-transparent focus:outline-none w-full px-3 py-3 placeholder-[#a0a0a0]"
              placeholder={t("reset.confirmPassword")}
              onFocus={() => setIsFocused("confirmPass")}
              onBlur={() => setIsFocused(null)}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <i
              className={`fa-regular text-lg cursor-pointer text-[#a0a0a0] duration-150 hover:text-white ${
                isConfirmPasswordVisible ? "fa-eye" : "fa-eye-slash"
              }`}
              onClick={toggleConfirmPasswordVisibility}
            ></i>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <button
            className={`text-center text-[#121212] font-bold transform hover:scale-105 duration-200 py-3 w-full rounded-full mt-2 ${
              false
                ? "bg-gray-400 cursor-not-allowed"
                : "hover:bg-green-400 bg-green-500 "
            }`}
          >
            {loading ? (
              <Spin
                indicator={<LoadingOutlined spin className="text-white" />}
              />
            ) : (
              t("reset.title")
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
