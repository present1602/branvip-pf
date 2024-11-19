"use client"

import { signOut } from "next-auth/react";


const Logout =  () => {
    signOut({
      callbackUrl: '/'
    });
  return (
    <>
      logout...
    </>
  )
}

export default Logout