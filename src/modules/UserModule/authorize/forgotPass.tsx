import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/hooks";
import { AppDispatch } from "../../../redux/store";
import { useNavigate } from "react-router-dom";

export function ForgotPass() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="bg-[#121212] w-full h-full flex justify-center">
      <div className="my-10 mx-28 max-w-sm">
          <div className="flex flex-col">
            <i
              className="fa-brands fa-spotify text-5xl text-center"
              onClick={() => navigate("/")}
            ></i>
            <div className="text-3xl font-bold mt-4 mb-2">Reset your password</div>
            <div className="">
              Enter the email address or username linked to your Spotify account
              and we'll send you an email.
            </div>
          </div>
          <div className="mb-3 mt-10">
            <p className="font-bold">Email address or username</p>
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
              Send link
            </button>
          </div>
        </div>
    </div>
  );
}
