import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Step1Props {
  nextStep: () => void;
}

export function Step1({ nextStep }: Step1Props) {
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className="w-full h-full">
      <div className="mt-3">
        <p className="font-bold">Mật khẩu</p>
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
            placeholder="Mật khẩu"
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

        <div className="mt-4">
          <p className="font-bold">Mật khẩu của bạn phải có ít nhất</p>
          <div className="mt-2 flex items-center gap-x-2">
            <i className="fa-solid fa-circle-check text-sm text-green-400"></i>
            <p className="text-sm">1 chữ cái</p>
          </div>
          <div className="mt-2 flex items-center gap-x-2">
            <i className="fa-solid fa-circle-check text-sm text-green-400"></i>
            <p className="text-sm">1 chữ số hoặc ký tự đặc biệt (ví dụ:#?!&)</p>
          </div>
          <div className="mt-2 flex items-center gap-x-2">
            <i className="fa-regular fa-circle"></i>
            <p className="text-sm">10 ký tự</p>
          </div>
        </div>
      </div>
      <button
        className="text-center text-[#121212] font-bold bg-green-500 hover:bg-green-400 transform hover:scale-105 duration-200 py-3 w-full rounded-full mt-8"
        onClick={nextStep}
      >
        Tiếp theo
      </button>
    </div>
  );
}
