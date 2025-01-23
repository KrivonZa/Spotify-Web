import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/hooks";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { AppDispatch } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  forgetPassThunk,
  forgetConfirmThunk,
} from "../../../stores/authManager/thunk";
import { useAuth } from "../../../hooks/useAuth";
import { toast } from "react-toastify";

export function ForgotPass() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [failConfirm, setFailConfirm] = useState(false);
  const { loading } = useAuth();

  const handleSubmit = async () => {
    const response = await dispatch(forgetPassThunk(email));
    if (response.payload.code === 200) {
      setIsCorrect(true);
      toast.success(t("forgot.success"));
      setFailConfirm(false);
    } else if (response.payload.code === 404) {
      toast.warning(t("forgot.authorizeFail"));
      setFailConfirm(true);
    } else {
      toast.error(t("forgot.fail"));
      setFailConfirm(true);
    }
  };

  const handleConfirm = async () => {
    if (email && code) {
      const confirmData = { email, code };
      const response = await dispatch(forgetConfirmThunk(confirmData));
      if (response.payload.code === 200) {
        toast.success(t("forgot.confirmSuccess"));
        navigate("/reset");
      } else if (response.payload.code === 404) {
        toast.warning(t("forgot.confirmExpired"));
        setFailConfirm(true);
      } else {
        toast.error(t("forgot.confirmFail"));
        setFailConfirm(true);
      }
    }
  };

  return (
    <div className="bg-[#121212] w-full h-full flex justify-center">
      <div className="my-10 mx-28 max-w-sm">
        <div className="flex flex-col">
          <i
            className="fa-brands fa-spotify text-5xl text-center"
            onClick={() => navigate("/")}
          ></i>
          <div className="text-3xl font-bold mt-4 mb-2">
            {t("forgot.title")}
          </div>
          <div className="">{t("forgot.description")}</div>
        </div>
        <div className="mb-3 mt-10">
          <p className="font-bold">{t("forgot.email")}</p>
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

          {failConfirm && (
            <div className="flex flex-col justify-center items-center mt-3">
              <button
                className="text-center text-[#121212] font-bold bg-green-500 hover:bg-green-400 transform hover:scale-105 duration-200 py-3 w-full rounded-full mt-2"
                onClick={handleSubmit}
              >
                {loading ? (
                  <Spin
                    indicator={<LoadingOutlined spin className="text-white" />}
                  />
                ) : (
                  t("forgot.sendAgain")
                )}
              </button>
            </div>
          )}

          {isCorrect && (
            <div className="mt-5">
              <p className="font-bold">{t("forgot.confirmCode")}</p>
              <div
                className={`border border-gray-500 rounded-lg mt-2 hover:bg-[#414141] duration-150 ${
                  isFocused === "code"
                    ? "border-white bg-[#414141]"
                    : "border-[#141414]"
                }`}
              >
                <input
                  type="text"
                  className="bg-transparent focus:outline-none w-full px-3 py-3 placeholder-[#a0a0a0]"
                  onFocus={() => setIsFocused("code")}
                  onBlur={() => setIsFocused(null)}
                  onChange={(e) => setCode(Number(e.target.value))}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center items-center">
          {!failConfirm && (
            <button
              disabled={failConfirm}
              className={`text-center text-[#121212] font-bold transform hover:scale-105 duration-200 py-3 w-full rounded-full mt-2 ${
                failConfirm
                  ? "bg-gray-400 cursor-not-allowed"
                  : "hover:bg-green-400 bg-green-500 "
              }`}
              onClick={isCorrect ? handleConfirm : handleSubmit}
            >
              {loading ? (
                <Spin
                  indicator={<LoadingOutlined spin className="text-white" />}
                />
              ) : isCorrect ? (
                t("forgot.confirm")
              ) : (
                t("forgot.send")
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
