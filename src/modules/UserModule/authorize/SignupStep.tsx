import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Step1, Step2, Step3 } from "./SignupStep/index";

interface SignupStepProps {
  step: number;
}

export function SignupStep({ step }: SignupStepProps) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(step);

  useEffect(() => {
    setCurrentStep(step);
  }, [step]);

  const nextStep = () => {
    if (currentStep < 3) {
      navigate(`/signup/${currentStep + 1}`);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      navigate(`/signup/${currentStep - 1}`);
    } else {
      navigate(`/signup`);
    }
  };

  return (
    <div className="w-[90%] mx-auto">
      <div className="flex items-start gap-x-5">
        <button
          className="text-[#a0a0a0] hover:text-white duration-150 mt-2"
          onClick={prevStep}
        >
          <i className="fa-solid fa-chevron-left text-2xl"></i>
        </button>
        {currentStep === 1 && (
          <div className="w-full">
            <div className="mb-6">
              <div className="text-[#a0a0a0]">Bước 1/3</div>
              <div className="font-bold">Tạo mật khẩu</div>
            </div>
            <Step1 nextStep={nextStep} />
          </div>
        )}
        {currentStep === 2 && (
          <div className="w-full">
            <div className="mb-6">
              <div className="text-[#a0a0a0]">Bước 2/3</div>
              <div className="font-bold">
                Giới thiệu thông tin về bản thân bạn
              </div>
            </div>
            <Step2 nextStep={nextStep} />
          </div>
        )}
        {currentStep === 3 && (
          <div className="w-full">
            <div className="mb-6">
              <div className="text-[#a0a0a0]">Bước 3/3</div>
              <div className="font-bold">Điều khoản & Điều kiện</div>
            </div>
            <Step3 nextStep={nextStep} />
          </div>
        )}
      </div>
    </div>
  );
}
