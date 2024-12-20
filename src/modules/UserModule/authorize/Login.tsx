import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/hooks";
import { AppDispatch } from "../../../redux/store";
import { useNavigate } from "react-router-dom";

export function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState<string | null>(null);

  return (
    <div className=" bg-gradient-to-b from-[#292929] to-[#000000] h-screen w-full flex items-center justify-center">
      <div className="rounded-xl bg-[#121212]">
        <div className="mt-10 mx-64 flex flex-col justify-center items-center">
          <i className="fa-brands fa-spotify text-5xl"></i>
          <div className="text-3xl font-bold mt-4 mb-10">
            Đăng nhập vào Spotify
          </div>
          <div className="w-full">
            <div className="py-3 px-6 flex items-center rounded-full border border-white relative">
              <i className="fa-brands fa-google text-xl"></i>
              <button className="font-bold mx-auto">
                Tiếp tục bằng Google
              </button>
            </div>
          </div>
        </div>

        <div className="border border-[#292929] my-10 mx-16"></div>

        <div className="mb-10 mx-64">
          <div className="mb-3">
            <p className="font-bold">Email hoặc tên người dùng</p>
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
                placeholder="Email hoặc tên người dùng"
                onFocus={() => setIsFocused("email")}
                onBlur={() => setIsFocused(null)}
              />
            </div>
          </div>

          <div className="mt-3">
            <p className="font-bold">Mật khẩu</p>
            <div
              className={`border border-gray-500 rounded-lg mt-2 hover:bg-[#414141] duration-150 ${
                isFocused === "pass"
                  ? "border-white bg-[#414141]"
                  : "border-[#141414]"
              }`}
            >
              <input
                type="password"
                className="bg-transparent focus:outline-none w-full px-3 py-3 placeholder-[#a0a0a0]"
                placeholder="Mật khẩu"
                onFocus={() => setIsFocused("pass")}
                onBlur={() => setIsFocused(null)}
              />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <button className="text-center text-[#121212] font-bold bg-green-600 hover:bg-green-400 transform hover:scale-105 duration-200 py-3 w-full rounded-full mt-5">
              Đăng nhập
            </button>
            <button
              className="font-semibold underline hover:text-green-600 duration-200 my-7"
              onClick={() => navigate("/forgot")}
            >
              Quên mật khẩu của bạn?
            </button>
            <div className="text-[#a0a0a0] font-semibold">
              Bạn chưa có tài khoản?{" "}
              <button
                className="font-semibold text-white underline hover:text-green-600 duration-200"
                onClick={() => navigate("/signup")}
              >
                Đăng ký Spotify
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
