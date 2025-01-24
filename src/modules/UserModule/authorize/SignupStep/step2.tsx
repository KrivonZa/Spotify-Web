import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSignupContext } from "../../../../globalContext/SignupContext";
import "../styles.css";

interface Step1Props {
  nextStep: () => void;
}

export function Step2({ nextStep }: Step1Props) {
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const [isSelected, setIsSelected] = useState<boolean | null>(null);
  const [nameInput, setNameInput] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isValid, setIsValid] = useState(false);
  const [hasInput, setHasInput] = useState(false);
  const { t } = useTranslation();
  const { setName, setDateOfBirth, setGender } = useSignupContext();

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
      setIsValid(validateDate() && nameInput.trim() !== "" && isSelected !== null); // Kiểm tra tên và lựa chọn giới tính
    }
  }, [day, month, year, hasInput, nameInput, isSelected]);

  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string
  ) => {
    if (!hasInput) setHasInput(true);
    setter(value);
  };

  const handleNext = () => {
    if (isValid) {
      setName(nameInput);
      setDateOfBirth(`${day}/${month}/${year}`);
      setGender(isSelected);
      nextStep();
    }
  };

  return (
    <div className="w-full h-full">
      <div className="mt-3">
        <p className="font-bold">{t("signup.name")}</p>
        <p className="text-[#a0a0a0] text-sm">{t("signup.descriptionName")}</p>
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
            value={nameInput}
            onChange={(e) => handleInputChange(setNameInput, e.target.value)}
          />
        </div>
      </div>

      <div className="mt-3">
        <p className="font-bold">{t("signup.birth")}</p>
        <p className="text-[#a0a0a0] text-sm">{t("signup.descriptionBirth")}</p>
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
        <p className="font-bold">{t("signup.gender")}</p>
        <p className="text-[#a0a0a0] text-sm">
          {t("signup.descriptionGender")}
        </p>
        <div className="mt-2">
          <div
            className="mt-2 flex items-center text-sm cursor-default hover:text-green-400 duration-200"
            onClick={() => setIsSelected(true)}
          >
            {isSelected === true ? (
              <i className="fa-solid fa-circle-dot text-green-400"></i>
            ) : (
              <i className="fa-regular fa-circle"></i>
            )}
            <p className="ml-2">{t("signup.male")}</p>
          </div>
          <div
            className="mt-2 flex items-center text-sm cursor-default hover:text-green-400 duration-200"
            onClick={() => setIsSelected(false)}
          >
            {isSelected === false ? (
              <i className="fa-solid fa-circle-dot text-green-400"></i>
            ) : (
              <i className="fa-regular fa-circle"></i>
            )}
            <p className="ml-2">{t("signup.female")}</p>
          </div>
        </div>
      </div>
      <button
        className={`text-center text-[#121212] font-bold transform hover:scale-105 duration-200 py-3 w-full rounded-full mt-5 ${
          isValid
            ? "hover:bg-green-400 bg-green-500"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        onClick={handleNext}
        disabled={!isValid}
      >
        {t("signup.next")}
      </button>
    </div>
  );
}
