"use client";

import { usePayple } from "../hooks/usePayple";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export function PaypleInit() {
  const { setPayerEmail, setPayerName } = usePayple();
  const session = useSession();
  const user = session.data?.user;

  useEffect(() => {
    if (!user) return;

    setPayerEmail(user.email || "");
    setPayerName(user.name || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return <></>;
}
