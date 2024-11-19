"use server";

import { userService } from "@/services/user.service";
import { getServerUserOrRedirect } from "./authAction";

export async function getBoardsByUserId(page: number = 1, rowsPerPage: number = 5) {
    const { id: userId } = await getServerUserOrRedirect();
    return await userService.getBoardsByUserId(userId, page, rowsPerPage)
}

export async function getBoardCountByUser() {
    const { id: userId } = await getServerUserOrRedirect();
    return await userService.getBoardCountByUser(userId)
}

