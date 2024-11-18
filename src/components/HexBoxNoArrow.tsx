import { useState } from "react";

// Componente per una singola casella
interface HexBoxNoArrowProps {
  initial: string;
  range: string[];
  onChange: (value: string) => void;
}

const HexBoxNoArrow = ({ initial, range, onChange }: HexBoxNoArrowProps) => {
  const [index, setIndex] = useState(range.indexOf(initial));

  const increment = () => {
    const newIndex = (index + 1) % range.length;
    setIndex(newIndex);
    onChange(range[newIndex]);
  };

  const decrement = () => {
    const newIndex = (index - 1 + range.length) % range.length;
    setIndex(newIndex);
    onChange(range[newIndex]);
  };

  return (
    <div className="flex flex-col items-center m-2 ">
      <div className="bg-amber-300 p-1 rounded font-bold text-amber-300 cursor-not-allowed">
        ↑
      </div>
      <div className="bg-black text-center py-2 px-4 rounded w-12  font-bold text-amber-400 my-2">
        {range[index]}
      </div>
      <div className="bg-amber-300 p-1 rounded font-bold text-amber-300 cursor-">
        ↓
      </div>
    </div>
  );
};

export default HexBoxNoArrow;
