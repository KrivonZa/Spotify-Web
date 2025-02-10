import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUser } from "../../../hooks/useUser";
import {
  updateInfo1Thunk,
  updateInfo2Thunk,
} from "../../../stores/userManager/thunk";

export function EditProfile() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo, loading } = useUser();
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const [gender, setGender] = useState<boolean | null>(null);
  const [name, setName] = useState("");
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isValid, setIsValid] = useState(true);
  const [hasInput, setHasInput] = useState(false);

  const user = localStorage.getItem("user");

  useEffect(() => {
    if (!user) navigate("/");
  }, [user]);

  useEffect(() => {
    if (
      userInfo?.gender !== undefined &&
      userInfo?.birthday &&
      userInfo?.nickName
    ) {
      setGender(userInfo.gender);
      const [birthYear, birthMonth, birthDay] = userInfo.birthday.split("-");
      setYear(birthYear);
      setMonth(birthMonth);
      setDay(birthDay);
      setName(userInfo.nickName);
    }
  }, [userInfo]);

  const isLeapYear = (year: number) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const validateDate = () => {
    const currentYear = new Date().getFullYear();
    const numericDay = parseInt(day);
    const numericMonth = parseInt(month);
    const numericYear = parseInt(year);

    if (
      isNaN(numericDay) ||
      isNaN(numericMonth) ||
      isNaN(numericYear) ||
      numericDay <= 0 ||
      numericMonth <= 0 ||
      numericYear <= 0
    ) {
      setError(t("signup.error1"));
      return false;
    }

    if (numericYear > currentYear || currentYear - numericYear > 130) {
      setError(t("signup.error2"));
      return false;
    }

    const daysInMonth = [
      31,
      isLeapYear(numericYear) ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];
    if (numericMonth > 12 || numericDay > daysInMonth[numericMonth - 1]) {
      setError(t("signup.error3"));
      return false;
    }

    setError("");
    return true;
  };

  useEffect(() => {
    if (hasInput) {
      setIsValid(validateDate() && name.trim() !== "" && gender !== null);
    }
  }, [day, month, year, hasInput, gender, name]);

  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string
  ) => {
    if (!hasInput) setHasInput(true);
    setter(value);
  };

  const handleEdit = async () => {
    if (isValid && userInfo && gender) {
      const dateOfBirth = `${day}/${month}/${year}`;
      const avatar = userInfo.avatar;
      const editData1 = { dateOfBirth, gender };
      const editData2 = { name, avatar };
      await dispatch(updateInfo1Thunk(editData1));
      await dispatch(updateInfo2Thunk(editData2));
    }
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
        <p className="text-5xl font-bold">{t("editProfile.title")}</p>

        <div className="mt-3">
          <p className="font-bold">{t("editProfile.nickname")}</p>
          <div
            className={`border border-gray-500 rounded-lg mt-2 hover:bg-[#414141] duration-150 ${
              isFocused === "name"
                ? "border-white bg-[#414141]"
                : "border-[#141414]"
            }`}
          >
            <input
              type="text"
              className="bg-transparent focus:outline-none w-full px-3 py-3 placeholder-[#a0a0a0]"
              onFocus={() => setIsFocused("name")}
              onBlur={() => setIsFocused(null)}
              value={name}
              onChange={(e) => handleInputChange(setName, e.target.value)}
            />
          </div>
        </div>

        <div className="mt-3">
          <p className="font-bold">{t("editProfile.dob")}</p>
          <div className="mt-2 grid grid-cols-[3fr_5fr_4fr] gap-x-3">
            <div
              className={`border border-gray-500 rounded-lg hover:bg-[#414141] duration-150 ${
                isFocused === "day"
                  ? "border-white bg-[#414141]"
                  : "border-[#141414]"
              }`}
            >
              <input
                type="number"
                className="bg-transparent focus:outline-none w-full px-3 py-3 placeholder-[#a0a0a0]"
                placeholder="dd"
                onFocus={() => setIsFocused("day")}
                onBlur={() => setIsFocused(null)}
                value={day}
                onChange={(e) => handleInputChange(setDay, e.target.value)}
              />
            </div>
            <div
              className={`border border-gray-500 rounded-lg hover:bg-[#414141] duration-150 ${
                isFocused === "month"
                  ? "border-white bg-[#414141]"
                  : "border-[#141414]"
              }`}
            >
              <input
                type="number"
                className="bg-transparent focus:outline-none w-full px-3 py-3 placeholder-[#a0a0a0]"
                placeholder="mm"
                onFocus={() => setIsFocused("month")}
                onBlur={() => setIsFocused(null)}
                value={month}
                onChange={(e) => handleInputChange(setMonth, e.target.value)}
              />
            </div>
            <div
              className={`border border-gray-500 rounded-lg hover:bg-[#414141] duration-150 ${
                isFocused === "year"
                  ? "border-white bg-[#414141]"
                  : "border-[#141414]"
              }`}
            >
              <input
                type="number"
                className="bg-transparent focus:outline-none w-full px-3 py-3 placeholder-[#a0a0a0]"
                placeholder="yyyy"
                onFocus={() => setIsFocused("year")}
                onBlur={() => setIsFocused(null)}
                value={year}
                onChange={(e) => handleInputChange(setYear, e.target.value)}
              />
            </div>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        <div className="mt-3">
          <p className="font-bold">{t("editProfile.gender")}</p>
          <div className="mt-2">
            <div
              className="mt-2 flex items-center text-sm cursor-default hover:text-green-400 duration-200"
              onClick={() => setGender(true)}
            >
              {gender === true ? (
                <i className="fa-solid fa-circle-dot text-green-400"></i>
              ) : (
                <i className="fa-regular fa-circle"></i>
              )}
              <p className="ml-2">{t("signup.male")}</p>
            </div>
            <div
              className="mt-2 flex items-center text-sm cursor-default hover:text-green-400 duration-200"
              onClick={() => setGender(false)}
            >
              {gender === false ? (
                <i className="fa-solid fa-circle-dot text-green-400"></i>
              ) : (
                <i className="fa-regular fa-circle"></i>
              )}
              <p className="ml-2">{t("signup.female")}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center gap-x-4">
          <button
            className="text-center text-[#a0a0a0] font-bold transform hover:scale-105 duration-200 py-2 px-6 rounded-full mt-2"
            onClick={() => navigate("/account")}
          >
            {t("editProfile.cancel")}
          </button>
          <button
            className={`text-center text-[#121212] font-bold transform hover:scale-105 duration-200 py-3 px-3 w-52 rounded-full mt-2 ${
              !isValid
                ? "bg-gray-400 cursor-not-allowed"
                : "hover:bg-green-400 bg-green-500"
            }`}
            onClick={handleEdit}
            disabled={!isValid}
          >
            {loading ? (
              <Spin
                indicator={<LoadingOutlined spin className="text-white" />}
              />
            ) : (
              t("editProfile.save")
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
