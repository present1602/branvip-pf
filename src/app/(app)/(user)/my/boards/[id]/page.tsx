import { getServerUserOrRedirect } from "@/actions/authAction";
import { userService } from "@/services/user.service";
import React from "react";
import { formatDateToLocaleWithFullYear } from "@/utils/formatters";
import CommentListItem from "./CommentListItem";
import { TitleCard } from "@/components/layouts/my/TitleCard";
import { ContentCard } from "@/components/layouts/my/ContentCard";
import { CreateCommentForm } from "./CreateCommentForm";
import CalanderImage from "@/assets/calendar.png";
import MessageImage from "@/assets/message.png";
import IconArrow from "@/assets/icon-arrow_bottom-24_2.png"
import Image from "next/image";
import Link from "next/link";
import FileViewButton from "./FileViewButton";
import { UserBoard, UserBoardComment, UserBoardMedia } from "@prisma/client";

interface IProps {
  params: {
    id: string;
  };
}

export default async function BoardDetailPage({ params: { id } }: IProps) {
  const user = await getServerUserOrRedirect();
  const board = await userService.getBoardByIdOrThrow(id, user.id);
  // const board = boardResponse.board
  const dateText = formatDateToLocaleWithFullYear(board.createdAt);
  const commentCount = board.comments.length

  return (
    <div className="flex w-full flex-col">
      <TitleCard title="1:1 문의내역" />
      <ContentCard>
        <div className="mb-4 flex items-center gap-1">
          <Link href={"/my/boards"}>
            <Image src={IconArrow} alt="" />
          </Link>
          <span className="heading1">문의내역 상세보기</span>
        </div>
        <div className="border-b my-4" />
        <div className="flex flex-col px-[40px] py-[30px] border-1 rounded-lg border-gray-90">
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-1 ">
              {board.comments && board.comments.some(comment => comment.isAdmin) && (
                <span className="bg-primary-700 px-[16px] py-[6px] rounded-full min-w-[88px] h-[40px] flex items-center justify-center text-white">
                  답변완료
                </span>
              )}

              <p className="heading2 text-gray-800 mx-2">
                {board.title} 길게 길게 길게길게 길게 길게 길게길게길게 길게 길게길게길게 길게 길게길게길게 길게 길게길게길게 길게 길게길게길게 길게 길게길게길게 길게 길게길게길게 길게 길게길게
              </p>
            </div>

            <div className="flex gap-3 items-center">
              <div className="flex items-center text-sm font-bold text-surface-500">
                <Image src={CalanderImage} alt="" width={20} height={20} className="inline-block mr-[2px]" />
                {dateText}
              </div>
              <div className="flex items-center text-sm font-bold text-surface-500">
                <Image src={MessageImage} alt='' width={20} height={20} className="inline-block mr-[2px]" />
                댓글 {commentCount}
              </div>
            </div>
          </div>

          <div className="border-b my-5" />

          <div className="">
            <p className="body2-bold text-gray-800 mb-[15px]">문의내용</p>
            <div className="border-1 rounded border-gray-90 p-5 mb-5">{board.content}</div>
          </div>


          {
            board.userBoardMedia.length > 0
            && (
              <div>
                <p className="body2-bold text-gray-800 mb-[15px]">첨부파일</p>
                <div className="mt-1 flex flex-col gap-3">
                  {board.userBoardMedia.map((file: any, index: number) => {
                    return (
                      <FileViewButton file={file} />
                    )
                  })
                  }
                </div>
                <div className="border-b my-5" />
              </div>
            )
          }

          {/* 댓글영역 시작 */}
          <div>
            <p className="">댓글 {board.comments.length}</p>

            <div className="border-b my-5" />

            {
              board.comments.length > 0 && (
                <>
                  <div className="grid gap-5">
                    {
                      board.comments.map((comment) => (
                        <CommentListItem key={comment.id} comment={comment} />
                      ))
                    }
                  </div>
                  <div className="border-b my-5" />
                </>
              )
            }
          </div>



          <CreateCommentForm
            boardId={board.id}
          />

        </div>

      </ContentCard>
    </div>
  );
}
