import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { AppDispatch } from "../../../redux/store";
import { becomeArtistThunk } from "../../../stores/artistManager/thunk";
import { useArtist } from "../../../hooks/useArtist";

export function BecomeArtist() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { loading } = useArtist();

  const [checkStates, setCheckStates] = useState({
    rule1: false,
    rule2: false,
    rule3: false,
  });

  const handleCheckboxChange = (name: "rule1" | "rule2" | "rule3") => {
    setCheckStates((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const isFormValid = Object.values(checkStates).every((checked) => checked);

  const handleBecome = async () => {
    await dispatch(becomeArtistThunk());
  };

  return (
    <div className="bg-[#121212] w-full h-full flex justify-center">
      <div className="my-20 mx-28 w-[50%] flex flex-col gap-y-5">
        <div
          className="bg-[#292929] hover:bg-[#414141] cursor-pointer duration-200 transform hover:scale-105 px-2 py-2 flex justify-center items-center h-10 w-10 rounded-full"
          onClick={() => navigate("/account")}
        >
          <i className="fa-solid fa-chevron-left text-xl"></i>
        </div>
        <p className="text-5xl font-bold">{t("becomeArtist.title")}</p>
        <p className="text-lg text-[#a0a0a0]">
          {t("becomeArtist.description")}
        </p>

        {/* Các ô checkbox cho luật lệ */}
        <div className="flex flex-col gap-y-3">
          <label
            className="text-white flex items-center cursor-pointer group"
            onClick={() => handleCheckboxChange("rule1")}
          >
            <i
              className={`fa-regular ${
                checkStates.rule1
                  ? "fa-solid fa-square-check text-green-400"
                  : "fa-square"
              } group-hover:text-green-400 duration-200 mr-2`}
            ></i>
            {t("becomeArtist.rule1")}
          </label>

          <label
            className="text-white flex items-center cursor-pointer group"
            onClick={() => handleCheckboxChange("rule2")}
          >
            <i
              className={`fa-regular ${
                checkStates.rule2
                  ? "fa-solid fa-square-check text-green-400"
                  : "fa-square"
              } group-hover:text-green-400 duration-200 mr-2`}
            ></i>
            {t("becomeArtist.rule2")}
          </label>

          <label
            className="text-white flex items-center cursor-pointer group"
            onClick={() => handleCheckboxChange("rule3")}
          >
            <i
              className={`fa-regular ${
                checkStates.rule3
                  ? "fa-solid fa-square-check text-green-400"
                  : "fa-square"
              } group-hover:text-green-400 duration-200 mr-2`}
            ></i>
            {t("becomeArtist.rule3")}
          </label>
        </div>

        <p className="text-white mt-4 text-lg">{t("becomeArtist.continue")}</p>

        <div className="flex justify-end items-center gap-x-4">
          <button
            className="text-center text-[#a0a0a0] font-bold transform hover:scale-105 duration-200 py-2 px-6 rounded-full mt-2"
            onClick={() => navigate("/account")}
          >
            {t("becomeArtist.cancel")}
          </button>
          <button
            onClick={handleBecome}
            disabled={!isFormValid}
            className={`text-center text-[#121212] font-bold transform hover:scale-105 duration-200 py-3 px-3 w-52 rounded-full mt-2 ${
              !isFormValid
                ? "bg-gray-400 cursor-not-allowed"
                : "hover:bg-green-400 bg-green-500"
            }`}
          >
            {loading ? (
              <Spin
                indicator={<LoadingOutlined spin className="text-white" />}
              />
            ) : (
              t("becomeArtist.title")
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
