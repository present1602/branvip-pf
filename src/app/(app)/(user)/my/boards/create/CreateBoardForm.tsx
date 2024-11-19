'use client';

import { createBoard, createMyBoard } from "@/actions/createBoard.action";
import { Label, TextArea, TextInput } from "@/components/ui";
import { toast } from "@/components/ui/use-toast";
import BasicUIButton from "@/components/v3/components/BUI/Button/BasicUIButton";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ImagesUploadBox from "@/components/v3/components/ImagesUploadBox";
import { useUploadLogoStore } from "@/hooks/uploadLogo.store";


export function CreateBoardForm() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const { files } = useUploadLogoStore()
  const router = useRouter()


  async function handleClick() {
    if (!title)
      return toast({
        title: "제목을 입력해주세요",
        variant: "destructive",
      });

    if (!content)
      return toast({
        title: "내용을 입력해주세요",
        variant: "destructive",
      });

    const newBoard = await createMyBoard({ title, content, files });

    if (newBoard) {
      toast({
        title: "문의가 성공적으로 등록되었습니다.",
        variant: "success",
      });

      setTimeout(() => {
        router.push(`/my/boards`)
      }, 800)
    }

  }

  function cancle() {
    router.push("/my/boards")
  }

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    field: string
  ) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    if (field == 'title') {
      setTitle(value)
    } else if (field == 'content') {
      setContent(value)
    }
  };

  return (
    <div>
      <div className="grid gap-6 md:gap-8">
        <Label label="문의제목" className="body2-bold text-gray-800">
          <TextInput
            placeholder="문의드립니다"
            onChange={(e) => handleChange(e, "title")}
          />
        </Label>

        <Label label="문의내용(내용 1000자 이내)" className="body2-bold text-gray-800">
          <TextArea
            placeholder="본문 내용입니다."
            maxLength={1000}
            onChange={(e) => handleChange(e, "content")}
          />
        </Label>

        <Label label="파일첨부" className="text2-bold text-gray-400">
          <div className="">
            <button>
              <div className="flex flex-col items-center justify-center">
                <ImagesUploadBox />
              </div>
            </button>
          </div>
        </Label>

      </div>

      <div className="border-b my-5" />

      <div className="flex gap-2 flex-row-reverse pt-2 pb-6">
        <BasicUIButton onClick={handleClick} >완료</BasicUIButton>
        <BasicUIButton onClick={cancle} >취소</BasicUIButton>
      </div>


    </div>
  )
}