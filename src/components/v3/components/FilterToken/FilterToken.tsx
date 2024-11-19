import { FC } from "react";

interface IProps{
  text: string;
  onClick?: () => void;
}
const FilterToken:FC<IProps> = ({ text,onClick })  => {

  if(text){
    return(
      <div
        className="border border-[#E8E8E8] bg-[#F8F8F8] rounded-[4px] p-1 inline-flex gap-1 justify-center items-center whitespace-nowrap">
      <span className="text-xs text-[#71717A]">
      {text}
      </span>
        <button onClick={onClick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M11.3081 12.6919C11.5521 12.936 11.9479 12.936 12.1919 12.6919C12.436 12.4479 12.436 12.0521 12.1919 11.8081L8.88388 8.5L12.1919 5.19194C12.436 4.94786 12.436 4.55214 12.1919 4.30806C11.9479 4.06398 11.5521 4.06398 11.3081 4.30806L8 7.61612L4.69194 4.30806C4.44786 4.06398 4.05214 4.06398 3.80806 4.30806C3.56398 4.55214 3.56398 4.94786 3.80806 5.19194L7.11612 8.5L3.80806 11.8081C3.56398 12.0521 3.56398 12.4479 3.80806 12.6919C4.05214 12.936 4.44786 12.936 4.69194 12.6919L8 9.38388L11.3081 12.6919Z"
                  fill="#6F6F6F" />
          </svg>
        </button>
      </div>
    )
  } else {
    return null
  }

}

export default FilterToken