"use client";

import { useUserStore } from "@/hooks/user.store";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface IUser {
  id: string;
  phoneNumber?: string | null | undefined;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}

export function MyProfile() {
  const { user: persistUser } = useUserStore()
  const session = useSession()
  const { clearUser } = useUserStore()
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null; // or return a loading indicator
  }

  const handleLogout = () => {
    const confirmed = confirm("로그아웃 하시겠습니까?");
    if (!confirmed) return;

    clearUser();
    signOut({
      callbackUrl: "/",
    });
  };


  return (
    <div className="flex items-center px-5 py-2">
      <div className="flex-1 rounded-lg text-lg font-semibold">
        {/* {persistUser?.name ? `${persistUser?.name}님 ` : ''} */}
        {persistUser?.name ? `${persistUser?.name}님 ` : `${session.data?.user.name}님`}
        {/* {session.data?.user.name}님 */}
      </div>
      <div className="flex h-full items-center">
        <span
          className="h-full cursor-pointer rounded-sm border px-4 py-2 text-[#0AB173]"
          onClick={handleLogout}
        >
          로그아웃
        </span>
      </div>
    </div>

  );
}
