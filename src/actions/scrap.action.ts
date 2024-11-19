"use server";

import { userService } from "@/services/user.service";
import { getServerUserOrRedirect } from "./authAction";

export const deleteLogoScrap = async (scrapId: number) => {
    const { id: userId } = await getServerUserOrRedirect();
    const result = await userService.deleteLogoScrap(scrapId, userId);
}