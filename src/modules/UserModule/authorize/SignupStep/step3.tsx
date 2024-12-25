import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Step1Props {
  nextStep: () => void;
}

export function Step3({ nextStep }: Step1Props) {
  const navigate = useNavigate();
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [dataSharingConsent, setDataSharingConsent] = useState(false);
  const { t } = useTranslation();

  const canSubmit = marketingConsent && dataSharingConsent;

  return (
    <div className="w-full h-full">
      <div className="mt-3 text-sm">
        <div
          className="flex items-center bg-[#414141] px-4 py-8 rounded-lg mb-3 cursor-pointer"
          onClick={() => setMarketingConsent((prev) => !prev)}
        >
          <i
            className={`fa-regular ${
              marketingConsent
                ? "fa-solid fa-square-check text-green-400"
                : "fa-square"
            } hover:text-green-400 duration-200 mr-2`}
          ></i>
          <p>{t("signup.term1")}</p>
        </div>

        <div
          className="flex items-center bg-[#414141] px-4 py-8 rounded-lg mt-3 cursor-pointer"
          onClick={() => setDataSharingConsent((prev) => !prev)}
        >
          <i
            className={`fa-regular ${
              dataSharingConsent
                ? "fa-solid fa-square-check text-green-400"
                : "fa-square"
            } hover:text-green-400 duration-200 mr-2`}
          ></i>
          <p>{t("signup.term2")}</p>
        </div>

        {/* Terms and Privacy */}
        <p className="my-3">
          {t("signup.agreeFirst1")}{" "}
          <span className="underline text-green-500 hover:text-green-400 cursor-pointer">
            {t("signup.agreeFirst2")}
          </span>
        </p>
        <p className="my-3">
          {t("signup.agreeSecond1")}{" "}
          <span className="underline text-green-500 hover:text-green-400 cursor-pointer">
            {t("signup.agreeSecond2")}
          </span>
        </p>
      </div>

      {/* Submit Button */}
      <button
        className={`text-center text-[#121212] font-bold py-3 w-full rounded-full mt-5 ${
          canSubmit
            ? "bg-green-500 hover:bg-green-400 transform hover:scale-105 duration-200"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        onClick={() => navigate("/")}
        disabled={!canSubmit}
      >
        {t("signup.signup")}
      </button>
    </div>
  );
}
