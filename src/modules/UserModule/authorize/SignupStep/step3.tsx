import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Step1Props {
  nextStep: () => void;
}

export function Step3({ nextStep }: Step1Props) {
  const navigate = useNavigate();
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [dataSharingConsent, setDataSharingConsent] = useState(false);

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
              marketingConsent ? "fa-solid fa-square-check text-green-400" : "fa-square"
            } hover:text-green-400 duration-200 mr-2`}
          ></i>
          <p>Tôi không muốn nhận tin nhắn tiếp thị từ Spotify</p>
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
          <p>
            Chia sẻ dữ liệu đăng ký của tôi với các nhà cung cấp nội dung của
            Spotify cho mục đích tiếp thị.
          </p>
        </div>

        {/* Terms and Privacy */}
        <p className="my-3">
          Bằng việc nhấp vào nút Đăng ký, bạn đồng ý với{" "}
          <span className="underline text-green-500 hover:text-green-400 cursor-pointer">
            Điều khoản và điều kiện sử dụng
          </span>{" "}
          của Spotify.
        </p>
        <p className="my-3">
          Để tìm hiểu thêm về cách thức Spotify thu thập, sử dụng, chia sẻ và
          bảo vệ dữ liệu cá nhân của bạn, vui lòng xem{" "}
          <span className="underline text-green-500 hover:text-green-400 cursor-pointer">
            Chính sách quyền riêng tư của Spotify.
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
        Đăng ký
      </button>
    </div>
  );
}
