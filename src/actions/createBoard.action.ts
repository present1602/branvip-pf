"use server";

import { userService } from "../services/user.service";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/authOptions";
import { revalidatePath } from "next/cache";
import { getServerUserOrRedirect } from "./authAction";

interface ICreateBoardDto {
  title: string;
  content: string;
}

interface ICreateMyBoardDto {
  title: string;
  content: string;
  files?: any
}

export const createBoard = async ({ title, content }: ICreateBoardDto) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("로그인이 필요합니다.");
  }

  const userId = session.user.id;

  const createdBoard = await userService.createMyBoard({
    title,
    content,
    user: {
      connect: {
        id: userId,
      },
    },
  });
  return createdBoard;
};


/* 기존 me 문의내역도 동작하도록 새 메소드 생성해서 처리, 현재 마이페이지 상용으로 적용 시 위의 createBoard 삭제 예정 */
export const createMyBoard = async ({ title, content, files }: ICreateMyBoardDto) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("로그인이 필요합니다.");
  }

  const userId = session.user.id;

  const createdMyBoard = await userService.createMyBoardWithImages({
    userId, title, content, files
  })

  return createdMyBoard;
};

interface ICreateBoardCommentDto {
  content: string;
  boardId: string;
}
export const createBoardComment = async ({
  content,
  boardId,
}: ICreateBoardCommentDto) => {
  const user = await getServerUserOrRedirect();

  await userService.createMyBoardComment({
    content,
    board: {
      connect: {
        id: boardId,
      },
    },
    isAdmin: user.isAdmin,
    user: {
      connect: {
        id: user.id,
      },
    },
  });

  revalidatePath(`/me/boards/${boardId}`);
};
