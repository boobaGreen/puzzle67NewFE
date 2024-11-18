// FILE: components/CTAButton.tsx
import React from "react";

interface CTAButtonProps {
  onClick: () => void;
}

const CTAButton = ({ onClick }: CTAButtonProps) => {
  return (
    <div className="flex justify-center">
      <button
        className="bg-black text-white font-bold py-2 px-4 rounded hover:bg-amber-600 transition duration-300"
        onClick={onClick}
      >
        Win 6.7 BTC Now
      </button>
    </div>
  );
};

export default CTAButton;
