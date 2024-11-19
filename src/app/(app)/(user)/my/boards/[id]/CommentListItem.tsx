"use client"

import Image from "next/image";
import { cn } from "@/lib/utils";
import { formatDateConverterYYMMDD, formatDateStringWithHyphen, formatDateToLocale } from "@/utils/formatters";
import { UserBoardComment } from "@prisma/client";
import React, { useState } from "react";
import UserDefaultImage from "@/assets/user-default.png"
import { Button, TextArea } from "@/components/ui";
import BasicUIButton from "@/components/v3/components/BUI/Button/BasicUIButton";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react"
import { Icon, Label } from "@/components/ui";
import { useSession } from "next-auth/react";
import { deleteUserBoardComment, updateUserBoardComment } from "@/actions/userBoardComment.action";
import { toast } from "@/components/ui/use-toast";
import { userService } from "@/services/user.service";


interface ExtendedUserBoardComment extends UserBoardComment {
  user: {
    name: string | null
  }
}
interface IProps {
  comment: ExtendedUserBoardComment;
}


const infoText1 = "댓글을 삭제하시겠습니까?"
const deleteSuccessText = "댓글을 삭제했습니다."
const updateSuccessText = "댓글을 수정했습니다."

export default function CommentListItem({ comment }: IProps) {
  const [content, setContent] = useState<string>(comment.content)
  const [isEditing, setIsEditing] = useState(false)
  const dateText = formatDateConverterYYMMDD(comment.createdAt);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const session = useSession()
  const user = session.data?.user

  const handleUpdateExec = () => {
    if (!user) {
      return
    }

    updateUserBoardComment(comment.id, content)

    setIsEditing(false)
    toast({
      title: updateSuccessText,
      variant: 'success'
    })
  };

  const hancleUpdateClick = () => {

    setIsEditing(true)
  }
  const hancleUpdateCancle = () => {
    setIsEditing(false)
    setContent(comment.content)
  }

  const handleDeleteConfirm = () => {
    if (!user) {
      return
    }

    /* db 제어문은 update임( is_deleted -> true)  */
    deleteUserBoardComment(comment.id)

    toast({
      title: deleteSuccessText,
      variant: 'success'
    })
    setTimeout(function () {
      onClose()
      window.location.reload();
    }, 500)

  }
  const cancleDelete = () => {
    if (!user) {
      return
    }
  }

  return (
    <div>
      <div
        className={cn(
          "grid gap-2 rounded border border-gray-200 p-4",
        )}
      >
        {comment.isAdmin && <span className="font-bold text-surface-600">브랜빕</span>}
        <div className="flex items-center gap-1">
          <div className="flex flex-1">
            <Image src={UserDefaultImage} alt="" width={24} height={24} className="inline-block" />
            <div className="text2-bold text-gray-600 px-1 py-[1px]">{comment.user.name}</div>
            <div className="text-sm font-medium text-surface-500 py-[1px] px-[2px]">{dateText}</div>
          </div>

          {isEditing
            ?
            (
              <div className="flex items-center gap-[6px]">
                <BasicUIButton className="hidden md:block text2-bold border border-gray-200 rounded-sm py-[6px] text-gray-400"
                  onClick={handleUpdateExec}
                >완료
                </BasicUIButton>
                <BasicUIButton className="hidden md:block text2-bold border border-gray-200 rounded-sm py-[6px] text-gray-400"
                  onClick={hancleUpdateCancle}
                >취소
                </BasicUIButton>
              </div>
            )
            : (
              <div className="flex items-center gap-[6px]">
                <BasicUIButton className="hidden md:block text2-bold border border-gray-200 rounded-sm py-[6px] text-gray-400"
                  onClick={hancleUpdateClick}
                >수정
                </BasicUIButton>
                <BasicUIButton className="hidden md:block text2-bold border border-gray-200 rounded-sm py-[6px] text-gray-400"
                  onClick={onOpen}
                >삭제
                </BasicUIButton>
              </div>
            )
          }

        </div>
        {isEditing
          ?
          // (<TextArea className="whitespace-pre-line break-keep font-medium text-surface-600 px-4 border rounded border-gray-300">
          //   {content}
          // </TextArea>
          <div className="p-4 border rounded border-gray-300">
            <textarea className={"w-full font-medium text-surface-60"} onChange={(e) => setContent(e.target.value)}
              rows={5}
              value={content} />
          </div>
          :
          <p className="whitespace-pre-line break-keep font-medium text-surface-600">
            {content}
          </p>

        }
      </div>

      {isEditing
        ?
        (<div className="md:hidden mt-2">
          <div className="flex items-center justify-end gap-[6px]">
            <BasicUIButton className="text2-bold border border-gray-200 rounded-sm py-[6px] text-gray-400"
            >취소
            </BasicUIButton>
            <BasicUIButton className="text2-bold border border-gray-200 rounded-sm py-[6px] text-gray-400"
              onClick={onOpen}
            >완료
            </BasicUIButton>
          </div>
        </div>)
        : (
          <div className="md:hidden mt-2">
            <div className="flex items-center justify-end gap-[6px]">
              <BasicUIButton className="text2-bold border border-gray-200 rounded-sm py-[6px] text-gray-400"
              >수정
              </BasicUIButton>
              <BasicUIButton className="text2-bold border border-gray-200 rounded-sm py-[6px] text-gray-400"
                onClick={onOpen}
              >삭제
              </BasicUIButton>
            </div>
          </div>
        )
      }
      {/* 댓글 삭제 모달 */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}
        hideCloseButton={true}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex gap-1 border-b ">
                <span className="flex-1">삭제하기</span>
                <button onClick={onOpenChange} >
                  <Icon name="XMarkIcon" className="h-8 w-8 text-surface-500 cursor-pointer" />
                </button>
                <div className="border-b border-gray-100" />
              </ModalHeader>
              <ModalBody className="p-6">
                <div className="py-[50px] body1-medium text-gray-900 text-center">
                  {infoText1}
                </div>

                <div className="flex gap-2 flex-row-reverse">
                  <Button onClick={handleDeleteConfirm} size="md" className="bg-primary_scale-70 text-white" >확인</Button>
                  <Button onClick={cancleDelete} size="md" className="border border-primary_scale-70 bg-white text-primary_scale-70" >취소</Button>
                </div>

              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
