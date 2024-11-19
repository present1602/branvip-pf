"use client"

import React, { FC } from "react";
import { useRouter } from "next/navigation";

const BeforeBtn:FC = () => {

  const router = useRouter()

  return (
    <button onClick={() => {router.back()}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M15.75 19.5L8.25 12L15.75 4.5" stroke="#313131" strokeWidth="1.5" strokeLinecap="round"
              strokeLinejoin="round" />
      </svg>
    </button>
  )
}

export default BeforeBtn