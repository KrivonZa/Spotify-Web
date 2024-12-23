import { Outlet, useLocation } from "react-router-dom";
import { Progress } from "antd";

export default function SignupStepIndex() {
  const location = useLocation();

  // Kiểm tra nếu đường dẫn là bước cụ thể (signup/1, signup/2, signup/3)
  const stepMatch = location.pathname.match(/\/signup\/(\d+)$/);
  const currentStep = stepMatch ? parseInt(stepMatch[1], 10) : null;

  // Tính phần trăm dựa trên bước hiện tại
  const totalSteps = 3;
  const percent = currentStep ? (currentStep / totalSteps) * 100 : 0;

  return (
    <div className="min-h-screen flex justify-center bg-[#121212]">
      <div className="w-[40%] mb-10">
        {currentStep && (
          <div className="flex flex-col justify-center items-center mt-10 mb-6">
            <div className="w-full text-center">
              <i className="fa-brands fa-spotify text-5xl"></i>
              <Progress
                percent={percent}
                status="active"
                strokeColor={"#22c55e"}
                trailColor={"#414141"}
                showInfo={false}
                size={"small"}
              />
            </div>
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
}
