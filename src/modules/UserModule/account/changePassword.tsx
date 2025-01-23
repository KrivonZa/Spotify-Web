import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/hooks";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { AppDispatch } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { changePassThunk } from "../../../stores/authManager/thunk";
import { useUser } from "../../../hooks/useUser";
import { useAuth } from "../../../hooks/useAuth";
import { toast } from "react-toastify";

export function ChangePassword() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { userInfo } = useUser();

  const [isFocused, setIsFocused] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading } = useAuth();
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
    useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [validations, setValidations] = useState({
    hasLetter: false,
    hasNumberOrSpecialChar: false,
    minLength: false,
    passwordsMatch: false,
  });

  useEffect(() => {
    setValidations({
      hasLetter: /[a-zA-Z]/.test(newPassword),
      hasNumberOrSpecialChar: /[0-9#?!&]/.test(newPassword),
      minLength: newPassword.length >= 10,
      passwordsMatch: newPassword === confirmPassword && confirmPassword !== "",
    });
  }, [newPassword, confirmPassword]);

  const isFormValid =
    validations.hasLetter &&
    validations.hasNumberOrSpecialChar &&
    validations.minLength &&
    validations.passwordsMatch &&
    password;

  const toggleCurrentPasswordVisibility = () => {
    setIsCurrentPasswordVisible((prevState) => !prevState);
  };

  const toggleNewPasswordVisibility = () => {
    setIsNewPasswordVisible((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prevState) => !prevState);
  };

  const handleChange = async () => {
    if (!password || !newPassword || !confirmPassword) {
      return;
    }

    if (newPassword !== confirmPassword) {
      return;
    }

    const email = userInfo?.email

    const changeData = { email, password, newPassword };

    try {
      const response = await dispatch(changePassThunk(changeData)).unwrap();
      if (response.status === 200) {
        toast.success(t("changePassword.success"));
        navigate("/account");
      } else {
        toast.error(t("changePassword.fail"));
      }
    } catch (error: any) {
      toast.error(t("changePassword.fail"));
    }
  };

  return (
    <div className="bg-[#121212] w-full h-full flex justify-center">
      <div className="my-12 mx-28 w-[50%] flex flex-col gap-y-5">
        <div
          className="bg-[#292929] hover:bg-[#414141] cursor-pointer duration-200 transform hover:scale-105 px-2 py-2 flex justify-center items-center h-10 w-10 rounded-full"
          onClick={() => navigate("/account")}
        >
          <i className="fa-solid fa-chevron-left text-xl"></i>
        </div>
        <p className="text-5xl font-bold">{t("changePassword.title")}</p>
        <div>
          <div className="mb-3 mt-5">
            <p className="font-bold">{t("changePassword.currentPass")}</p>
            <div
              className={`border border-gray-500 rounded-lg mt-2 hover:bg-[#414141] duration-150 flex justify-between pr-3 items-center ${
                isFocused === "currentPass"
                  ? "border-white bg-[#414141]"
                  : "border-[#141414]"
              }`}
            >
              <input
                type={isCurrentPasswordVisible ? "text" : "password"}
                className="bg-transparent focus:outline-none w-full px-3 py-3 placeholder-[#a0a0a0]"
                placeholder={t("changePassword.currentPass")}
                onFocus={() => setIsFocused("currentPass")}
                onBlur={() => setIsFocused(null)}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i
                className={`fa-regular text-lg cursor-pointer text-[#a0a0a0] duration-150 hover:text-white ${
                  isCurrentPasswordVisible ? "fa-eye" : "fa-eye-slash"
                }`}
                onClick={toggleCurrentPasswordVisibility}
              ></i>
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

          <div className="mt-4">
            <p className="font-bold">{t("signup.descriptionPass")}</p>
            <div className="mt-2 flex items-center gap-x-2">
              <i
                className={`fa-solid text-sm ${
                  validations.hasLetter
                    ? "fa-circle-check text-green-400"
                    : "fa-circle-xmark text-red-500"
                }`}
              ></i>
              <p className="text-sm">{t("signup.condition1")}</p>
            </div>
            <div className="mt-2 flex items-center gap-x-2">
              <i
                className={`fa-solid text-sm ${
                  validations.hasNumberOrSpecialChar
                    ? "fa-circle-check text-green-400"
                    : "fa-circle-xmark text-red-500"
                }`}
              ></i>
              <p className="text-sm">{t("signup.condition2")}</p>
            </div>
            <div className="mt-2 flex items-center gap-x-2">
              <i
                className={`fa-solid text-sm ${
                  validations.minLength
                    ? "fa-circle-check text-green-400"
                    : "fa-circle-xmark text-red-500"
                }`}
              ></i>
              <p className="text-sm">{t("signup.condition3")}</p>
            </div>
            <div className="mt-2 flex items-center gap-x-2">
              <i
                className={`fa-solid text-sm ${
                  validations.passwordsMatch
                    ? "fa-circle-check text-green-400"
                    : "fa-circle-xmark text-red-500"
                }`}
              ></i>
              <p className="text-sm">{t("reset.passwordsMatch")}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center gap-x-4">
          <button
            className="text-center text-[#a0a0a0] font-bold transform hover:scale-105 duration-200 py-2 px-6 rounded-full mt-2"
            onClick={() => navigate("/account")}
          >
            {t("changePassword.cancel")}
          </button>
          <button
            className={`text-center text-[#121212] font-bold transform hover:scale-105 duration-200 py-3 px-3 w-52 rounded-full mt-2 ${
              !isFormValid
                ? "bg-gray-400 cursor-not-allowed"
                : "hover:bg-green-400 bg-green-500"
            }`}
            onClick={handleChange}
            disabled={!isFormValid}
          >
            {loading ? (
              <Spin
                indicator={<LoadingOutlined spin className="text-white" />}
              />
            ) : (
              t("changePassword.set")
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
