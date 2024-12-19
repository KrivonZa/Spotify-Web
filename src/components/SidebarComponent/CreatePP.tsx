import React from "react";
import "../../layouts/UserLayout/styles.css";

const CreatePP: React.FC = () => {
  return (
    <div className="flex-grow mr-4 h-full overflow-hidden select-none">
      <div className="h-64 overflow-y-auto custom-scrollbar py-2 px-3">
        <div className="bg-[#292929] py-4 px-2 rounded-xl mb-5">
          <p className="font-bold text-lg leading-8">
            Tạo danh sách phát đầu tiên của bạn
          </p>
          <p className="leading-8">Rất dễ! Chúng tôi sẽ giúp bạn</p>
          <button className="bg-white rounded-full px-4 py-2 my-2 transform hover:scale-105 hover:bg-slate-200 duration-200">
            <div className="text-black font-bold text-base">
              Tạo danh sách phát
            </div>
          </button>
        </div>

        <div className="bg-[#292929] py-4 px-2 rounded-xl mt-5">
          <p className="font-bold text-lg leading-8">
            Hãy cùng tìm và theo dõi một số postcast
          </p>
          <p className="leading-8">
            Chúng tôi sẽ cập nhật cho bạn thông tin về các tập mới
          </p>
          <button className="bg-white rounded-full px-4 py-2 my-2 transform hover:scale-105 hover:bg-slate-200 duration-200">
            <div className="text-black font-bold text-base">
              Duyệt xem postcast
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePP;
