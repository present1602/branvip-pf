"use server"

import { userService } from "@/services/user.service";
import { getServerUserOrRedirect } from "./authAction";



export const deleteUserBoardComment = async (commentId: string) => {
    const { id: userId } = await getServerUserOrRedirect();
    const result = await userService.deleteUserBoardComment(commentId, userId);
}

export const updateUserBoardComment = async (commentId: string, content: string) => {
    const { id: userId } = await getServerUserOrRedirect();
    const updateData = {
        id: commentId,
        content: content
    }
    const result = await userService.updateUserBoardComment(updateData, userId);

    return result
}

