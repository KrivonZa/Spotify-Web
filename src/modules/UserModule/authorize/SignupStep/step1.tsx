import { useState, useEffect } from "react";

interface Step1Props {
  nextStep: () => void;
}

export function Step1({ nextStep }: Step1Props) {
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [validations, setValidations] = useState({
    hasLetter: false,
    hasNumberOrSpecialChar: false,
    minLength: false,
  });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  useEffect(() => {
    setValidations({
      hasLetter: /[a-zA-Z]/.test(password), // Ít nhất 1 chữ cái
      hasNumberOrSpecialChar: /[0-9#?!&]/.test(password), // Ít nhất 1 chữ số hoặc ký tự đặc biệt
      minLength: password.length >= 10, // Tối thiểu 10 ký tự
    });
  }, [password]);

  const isFormValid =
    validations.hasLetter &&
    validations.hasNumberOrSpecialChar &&
    validations.minLength;

  return (
    <div className="h-full">
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            <i
              className={`fa-solid text-sm ${
                validations.hasLetter
                  ? "fa-circle-check text-green-400"
                  : "fa-circle-xmark text-red-500"
              }`}
            ></i>
            <p className="text-sm">1 chữ cái</p>
          </div>
          <div className="mt-2 flex items-center gap-x-2">
            <i
              className={`fa-solid text-sm ${
                validations.hasNumberOrSpecialChar
                  ? "fa-circle-check text-green-400"
                  : "fa-circle-xmark text-red-500"
              }`}
            ></i>
            <p className="text-sm">
              1 chữ số hoặc ký tự đặc biệt (ví dụ: #?!&)
            </p>
          </div>
          <div className="mt-2 flex items-center gap-x-2">
            <i
              className={`fa-solid text-sm ${
                validations.minLength
                  ? "fa-circle-check text-green-400"
                  : "fa-circle-xmark text-red-500"
              }`}
            ></i>
            <p className="text-sm">10 ký tự</p>
          </div>
        </div>
      </div>
      <button
        className={`text-center text-[#121212] font-bold bg-green-500 transform hover:scale-105 duration-200 py-3 w-full rounded-full mt-8 ${
          isFormValid ? "hover:bg-green-400" : "bg-gray-400 cursor-not-allowed"
        }`}
        onClick={isFormValid ? nextStep : undefined}
        disabled={!isFormValid}
      >
        Tiếp theo
      </button>
    </div>
  );
}
