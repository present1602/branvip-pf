"use server";

import { db } from "@/utils/db"
import bcrypt from "bcryptjs"
import { getServerUserOrRedirect } from "./authAction";
import { userService } from "@/services/user.service";

export async function updateLoginType(loginType: string) {
    const { id } = await getServerUserOrRedirect();
    console.log(" updateLoginType id: ", id)
    return await userService.updateLoginType(loginType, id)

}