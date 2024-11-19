import React, { FC } from "react";

interface IProps{
  children: React.ReactNode
}


const BannerLayout:FC<IProps> = ({children}) => {
  return(
    <div className="flex flex-col py-10 w-full">
      <div className="p-4 xl:p-[30px] text-[#2A2A2A] text-[20px] font-bold w-full flex xl:text-[28px]">
        <span className="self-start ml-5">배너 관리</span>
      </div>
      <div className="flex items-center w-full justify-center">
        <div
          className="flex flex-col border gap-[20px] p-4 xl:p-7 mx-[20px] w-full overflow-x-auto rounded-[10px] bg-white shadow-sm">
      {children}
        </div>
      </div>
    </div>
  )
}
export default BannerLayout