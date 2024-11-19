"use client";

import { FC, useEffect, useState } from "react";
import { Input } from "@nextui-org/react";


interface IProps {
  isLengthChecked: boolean;
  errorMessage: string;
}
const NextCustomInput:FC<IProps> = ({isLengthChecked,errorMessage}) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [checked, setChecked] = useState(true);
  const maxLength = 10;
  const color = "default";
  let description

  useEffect(() => {
    if(value.length >= maxLength){
      setError(true)
    }else{
      setError(false)
    }
  }, [value]);

  useEffect(() => {
    setChecked(false)
  }, [value]);

  return (
    <div className="flex flex-col">
      <Input
        isClearable
        color={color}
        isInvalid={error}
        errorMessage={errorMessage}
        variant={"underlined"}
        value={value}
        onValueChange={setValue}
        description={description}
        startContent={
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
            <circle cx="11" cy="11.5" r="6" stroke="#313131" strokeWidth="2" />
            <path d="M16 16.5L19 19.5" stroke="#313131" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        } >
      test123
      </Input>
      <span className="self-end">{value.length} / {maxLength}</span>
    </div>
  );
};

export default NextCustomInput;