// FILE: NormalMode.tsx
import React, { useState } from "react";
import HexBox from "../components/HexBox";
import HexBoxNoArrow from "../components/HexBoxNoArrow";
import CTAButton from "../components/CTAButton";

const hexValues = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
];

const xValues = ["X"];

const NormalMode = () => {
  const [values, setValues] = useState(Array(13).fill("0"));
  values[0] = "4";

  const handleChange = (index: number, newValue: string) => {
    const newValues = [...values];
    newValues[index] = newValue;
    setValues(newValues);
  };

  return (
    <div className="flex flex-col justify-center items-center p-10 space-y-4">
      <div className="flex justify-center custom-lg:justify-start space-x-4">
        <HexBox
          initial={values[0]}
          range={["4", "5", "6", "7"]}
          onChange={(value: string) => handleChange(0, value)}
        />
      </div>
      <div className="grid grid-cols-4 gap-4 custom-lg:flex custom-lg:space-x-4">
        {[...Array(12)].map((_, i) => (
          <HexBox
            key={i + 1}
            initial={values[i + 1]}
            range={hexValues}
            onChange={(value: string) => handleChange(i + 1, value)}
          />
        ))}
        {[...Array(4)].map((_, i) => (
          <HexBoxNoArrow
            key={i + 13}
            initial="X"
            range={xValues}
            onChange={() => {}}
          />
        ))}
      </div>
      {/* <CTAButton /> */}
    </div>
  );
};

export default NormalMode;
