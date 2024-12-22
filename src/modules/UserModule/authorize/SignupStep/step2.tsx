import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css"

interface Step1Props {
  nextStep: () => void;
}

export function Step2({ nextStep }: Step1Props) {
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const [isSelected, setIsSelected] = useState<number | null>(null);

  return (
    <div className="w-full h-full">
      <div className="mt-3">
        <p className="font-bold">Tên</p>
        <p className="text-[#a0a0a0] text-sm">
          Tên này sẽ xuất hiện trên hồ sơ của bạn
        </p>
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
            onFocus={() => setIsFocused("email")}
            onBlur={() => setIsFocused(null)}
          />
        </div>
      </div>

      <div className="mt-3">
        <p className="font-bold">Ngày sinh</p>
        <p className="text-[#a0a0a0] text-sm">
          Ngày sinh của bạn giúp chúng tôi cung cấp nội dung đề xuất và quảng
          cáo phù hợp với bạn.
        </p>
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
            />
          </div>
        </div>
      </div>

      <div className="mt-3">
        <p className="font-bold">Giới tính</p>
        <p className="text-[#a0a0a0] text-sm">
          Giới tính của bạn giúp chúng tôi cung cấp nội dung đề xuất và quảng
          cáo phù hợp với bạn.
        </p>
        <div className="mt-2">
          <div
            className="mt-2 flex items-center text-sm cursor-default hover:text-green-400 duration-200"
            onClick={() => setIsSelected(1)}
          >
            {isSelected === 1 ? (
              <i className="fa-solid fa-circle-dot text-green-400"></i>
            ) : (
              <i className="fa-regular fa-circle"></i>
            )}
            <p className="ml-2">Nam</p>
          </div>
          <div
            className="mt-2 flex items-center text-sm cursor-default hover:text-green-400 duration-200"
            onClick={() => setIsSelected(2)}
          >
            {isSelected === 2 ? (
              <i className="fa-solid fa-circle-dot text-green-400"></i>
            ) : (
              <i className="fa-regular fa-circle"></i>
            )}
            <p className="ml-2">Nữ</p>
          </div>
          <div
            className="mt-2 flex items-center text-sm cursor-default hover:text-green-400 duration-200"
            onClick={() => setIsSelected(3)}
          >
            {isSelected === 3 ? (
              <i className="fa-solid fa-circle-dot text-green-400"></i>
            ) : (
              <i className="fa-regular fa-circle"></i>
            )}
            <p className="ml-2">Không phân biệt giới tính</p>
          </div>
          <div
            className="mt-2 flex items-center text-sm cursor-default hover:text-green-400 duration-200"
            onClick={() => setIsSelected(4)}
          >
            {isSelected === 4 ? (
              <i className="fa-solid fa-circle-dot text-green-400"></i>
            ) : (
              <i className="fa-regular fa-circle"></i>
            )}

            <p className="ml-2">Giới tính khác</p>
          </div>
          <div
            className="mt-2 flex items-center text-sm cursor-default hover:text-green-400 duration-200"
            onClick={() => setIsSelected(5)}
          >
            {isSelected === 5 ? (
              <i className="fa-solid fa-circle-dot text-green-400"></i>
            ) : (
              <i className="fa-regular fa-circle"></i>
            )}
            <p className="ml-2">Không muốn nêu cụ thể</p>
          </div>
        </div>
      </div>
      <button
        className="text-center text-[#121212] font-bold bg-green-500 hover:bg-green-400 transform hover:scale-105 duration-200 py-3 w-full rounded-full mt-5"
        onClick={nextStep}
      >
        Tiếp theo
      </button>
    </div>
  );
}
