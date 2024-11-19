"use client";

import { Button } from "@nextui-org/react";

interface IProps {
  direction: string;
}

export const CircleButton = ({ direction }: IProps) => {

  if (direction == "left") {
    return (
      <Button isIconOnly className="w-[82px] h-[82px] origin-top-left bg-white rounded-full shadow border border-gray-200 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="29" viewBox="0 0 18 29" fill="none">
            <path d="M14 26L3 15L15 3" stroke="black" strokeWidth="3" strokeLinecap="square" />
          </svg>
      </Button>

    )
      ;
  } else if (direction == "right") {
    return (
    <Button isIconOnly
            className="w-[82px] h-[82px] origin-top-left bg-white rounded-full shadow border border-gray-200 flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="29" viewBox="0 0 18 29" fill="none">
        <path d="M4 3L15 14L3 26" stroke="black" strokeWidth="3" strokeLinecap="square" />
      </svg>
    </Button>
  )
    ;
  }


};