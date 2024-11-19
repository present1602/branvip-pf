"use client"

import React, { FC, useState } from "react";
import CustomTextInput from "@/components/v3/components/ui/TextInput";
import { IconReadingGlasses } from "@/components/svg";

interface IProps {
  keyword?: string;
}

const SearchTMInput:FC<IProps> = ({keyword}) => {

  const [value, setValue] = useState(keyword || '');

  return(
    <div>
      <form action="/search" className="w-80">
        <div className="relative">
          <CustomTextInput
            className=""
            name="keyword"
            placeholder="특허청 전체 데이터 검색"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button className="absolute right-6 top-4 cursor-pointer" type="submit">
            <IconReadingGlasses/>
          </button>
        </div>
      </form>
    </div>
  )
}

export default SearchTMInput