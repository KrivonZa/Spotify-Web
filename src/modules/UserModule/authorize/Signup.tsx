import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/hooks";
import { AppDispatch } from "../../../redux/store";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="bg-[#121212] w-full flex items-center justify-center">
      <div className="my-10">
        <div className="mx-28">
          <div className="flex flex-col justify-center items-center">
            <i
              className="fa-brands fa-spotify text-5xl"
              onClick={() => navigate("/")}
            ></i>
            <div className="text-3xl font-bold mt-4 mb-10">
              Đăng ký để bắt đầu nghe
            </div>
          </div>
          <div className="mb-3">
            <p className="font-bold">Địa chỉ email</p>
            <div
              className={`border border-gray-500 rounded-lg mt-2 hover:bg-[#414141] duration-150 ${
                isFocused ? "border-white bg-[#414141]" : "border-[#141414]"
              }`}
            >
              <input
                type="text"
                className="bg-transparent focus:outline-none w-full px-3 py-3 placeholder-[#a0a0a0]"
                placeholder="name@domain.com"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <button className="text-center text-[#121212] font-bold bg-green-500 hover:bg-green-400 transform hover:scale-105 duration-200 py-3 w-full rounded-full mt-2">
              Tiếp theo
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center my-6 mx-28">
          <div className="border-t border-[#292929] flex-1"></div>
          <p className="mx-4">hoặc</p>
          <div className="border-t border-[#292929] flex-1"></div>
        </div>

        <div className="mx-28 flex flex-col justify-center items-center">
          <div className="w-full grid grid-flow-row gap-y-4">
            <button className="py-3 px-6 flex items-center rounded-full border border-white relative duration-200 hover:bg-[#414141]">
              <i className="fa-brands fa-google text-xl"></i>
              <p className="font-bold mx-auto">Đăng ký bằng Google</p>
            </button>
            <button className="py-3 px-6 flex items-center rounded-full border border-white relative duration-200 hover:bg-[#414141]">
              <i className="fa-brands fa-facebook text-xl"></i>
              <p className="font-bold mx-auto">Đăng ký bằng Facebook</p>
            </button>
            <button className="py-3 px-6 flex items-center rounded-full border border-white relative duration-200 hover:bg-[#414141]">
              <i className="fa-brands fa-apple text-xl"></i>
              <p className="font-bold mx-auto">Đăng ký bằng Apple</p>
            </button>
          </div>
        </div>

        <div className="border border-[#292929] my-8 mx-28"></div>

        <div className="text-[#a0a0a0] font-semibold text-center">
          Bạn đã có tài khoản?{" "}
          <button
            className="font-semibold text-white underline hover:text-green-600 duration-200"
            onClick={() => navigate("/login")}
          >
            Đăng nhập tại đây
          </button>
        </div>
      </div>
    </div>
  );
}
