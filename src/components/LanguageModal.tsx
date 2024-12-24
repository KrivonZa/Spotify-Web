import React, { useState, useEffect } from "react";

const LanguageModal = ({ onClose }: { onClose: () => void }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleClose = () => {
    setAnimate(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10"
      onClick={handleClose}
    >
      <div
        className={`bg-blue-500 h-[30%] w-[30%] rounded transform transition-transform duration-200 ${
          animate ? "translate-y-0" : "translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="close cursor-pointer absolute top-2 right-2" onClick={handleClose}>
          &times;
        </span>
        <p className="p-4">Select your language</p>
        {/* Add language options here */}
      </div>
    </div>
  );
};

export default LanguageModal;
