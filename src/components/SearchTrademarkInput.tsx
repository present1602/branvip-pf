"use client";

import React from "react";
import { Icon, TextInput } from "./ui";

interface IProps {
  keyword?: string;
}

export function SearchTrademarkInput({ keyword }: IProps) {
  const [value, setValue] = React.useState(keyword);

  return (
    <form action="/search" className="w-full">
      <div className="relative">
        <TextInput
          name="keyword"
          placeholder="특허청 데이터 검색"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="absolute right-3 top-3 cursor-pointer" type="submit">
          <Icon name="MagnifyingGlassIcon" size="md" />
        </button>
      </div>
    </form>
  );
}
