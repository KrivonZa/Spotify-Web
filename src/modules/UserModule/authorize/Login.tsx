import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/hooks";
import { AppDispatch } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./styles.css";

export function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { t } = useTranslation();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className="bg-gradient-to-b from-[#292929] to-[#000000] w-full flex items-center justify-center">
      <div className="rounded-xl bg-[#121212] my-10">
        <div className="mt-10 mx-64 flex flex-col justify-center items-center">
          <i
            className="fa-brands fa-spotify text-5xl"
            onClick={() => navigate("/")}
          ></i>
          <div className="text-3xl font-bold mt-4 mb-10">
            {t("login.title")}
          </div>
          <div className="w-full grid grid-flow-row gap-y-4">
            <button className="py-3 px-6 flex items-center rounded-full border border-white relative duration-200 hover:bg-[#414141]">
              <i className="fa-brands fa-google text-xl"></i>
              <p className="font-bold mx-auto">{t("login.google")}</p>
            </button>
            <button className="py-3 px-6 flex items-center rounded-full border border-white relative duration-200 hover:bg-[#414141]">
              <i className="fa-brands fa-facebook text-xl"></i>
              <p className="font-bold mx-auto">{t("login.facebook")}</p>
            </button>
            <button className="py-3 px-6 flex items-center rounded-full border border-white relative duration-200 hover:bg-[#414141]">
              <i className="fa-brands fa-apple text-xl"></i>
              <p className="font-bold mx-auto">{t("login.apple")}</p>
            </button>
          </div>
        </div>

        <div className="border border-[#292929] my-10 mx-16"></div>

        <div className="mb-10 mx-64">
          <div className="mb-3">
            <p className="font-bold">{t("login.email")}</p>
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
                placeholder={t("login.email")}
                onFocus={() => setIsFocused("email")}
                onBlur={() => setIsFocused(null)}
              />
            </div>
          </div>

          <div className="mt-3">
            <p className="font-bold">{t("login.password")}</p>
            <div
              className={`border border-gray-500 rounded-lg mt-2 hover:bg-[#414141] duration-150 flex justify-between pr-3 items-center ${
                isFocused === "pass"
                  ? "border-white bg-[#414141]"
                  : "border-[#141414]"
              }`}
            >
              <input
                type={isPasswordVisible ? "text" : "password"}
                className="bg-transparent focus:outline-none w-full px-3 py-3 placeholder-[#a0a0a0]"
                placeholder={t("login.password")}
                onFocus={() => setIsFocused("pass")}
                onBlur={() => setIsFocused(null)}
              />
              <i
                className={`fa-regular text-lg cursor-pointer text-[#a0a0a0] duration-150 hover:text-white ${
                  isPasswordVisible ? "fa-eye" : "fa-eye-slash"
                }`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <button className="text-center text-[#121212] font-bold bg-green-500 hover:bg-green-400 transform hover:scale-105 duration-200 py-3 w-full rounded-full mt-5">
              {t("login.login")}
            </button>
            <button
              className="font-semibold underline hover:text-green-600 duration-200 my-7"
              onClick={() => navigate("/forgot")}
            >
              {t("login.forgot")}
            </button>
            <div className="text-[#a0a0a0] font-semibold">
              {t("login.signup1")}{" "}
              <button
                className="font-semibold text-white underline hover:text-green-600 duration-200"
                onClick={() => navigate("/signup")}
              >
                {t("login.signup2")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
