import { formatDateToLocale, formatDateToLocaleWithFullYear } from "@/utils/formatters";
import { UserBoard } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CalanderImage from "@/assets/calendar.png";
import MessageImage from "@/assets/message.png";

interface IProps {
  board: UserBoard;
  commentCount: number;
}

export function BoardCard({ board, commentCount }: IProps) {
  const dateText = formatDateToLocaleWithFullYear(board.createdAt);

  const href = `/my/boards/${board.id}`;
  
  return (
    <Link
      href={href}
      className="rounded-2xl border border-surface-100 bg-white p-4 transition-all hover:border-primary-500 hover:shadow-lg pc:p-6"
    >
      <div className="truncate font-bold text-surface-900 mb-5">{board.title}</div>
      <div className="truncate text-surface-600">{board.content}</div>

      <div className="border-b my-5" /> 

      <div className="flex gap-3 items-center">
        <div className="text-sm font-bold text-surface-500 items-center">
          <Image src={CalanderImage} alt='' width={20} height={20} className="inline-block mr-[2px]"/>
          {dateText}
        </div>
        <div className="text-sm font-bold text-surface-500 items-center">
          <Image src={MessageImage} alt='' width={20} height={20} className="inline-block mr-[2px]" />
          댓글 {commentCount}
        </div>
      </div>
    </Link>
  );
}
