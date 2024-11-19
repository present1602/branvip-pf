"use server";

import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const getServerUser = async () => {
  const session = await getServerSession(authOptions);
  return session?.user;
};

export const getServerUserOrRedirect = async () => {
  const user = await getServerUser();
  if (!user) {
    redirect("/");
  }
  return user;
};
