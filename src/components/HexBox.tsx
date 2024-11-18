// FILE: HexBox.tsx
import { useState, useEffect } from "react";

// Componente per una singola casella
interface HexBoxProps {
  initial: string;
  range: string[];
  onChange: (value: string) => void;
}

const HexBox = ({ initial, range, onChange }: HexBoxProps) => {
  const [index, setIndex] = useState(range.indexOf(initial));

  useEffect(() => {
    setIndex(range.indexOf(initial));
  }, [initial, range]);

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
    <div className="flex flex-col items-center m-2">
      <button
        className="bg-black p-1 rounded font-bold text-amber-400"
        onClick={increment}
      >
        ↑
      </button>
      <div className="bg-black text-center py-2 px-4 rounded w-12 font-bold text-amber-400 my-2">
        {range[index]}
      </div>
      <button
        className="bg-black p-1 rounded font-bold text-amber-400"
        onClick={decrement}
      >
        ↓
      </button>
    </div>
  );
};

export default HexBox;
