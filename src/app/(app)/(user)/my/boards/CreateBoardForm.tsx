"use client";

import { createBoard } from "@/actions/createBoard.action";
import { Button, Label, TextArea, TextInput } from "@/components/ui";
import { useToast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";
import React, { useTransition } from "react";

export function CreateBoardForm() {
  const [creating, startCreating] = useTransition();
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const { toast } = useToast();

  const handleClick = async () => {
    if (creating) return;
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

    startCreating(async () => {
      const newBoard = await createBoard({ title, content });

      if (newBoard) {
        toast({
          title: "문의가 성공적으로 등록되었습니다.",
          variant: "default",
        });
        redirect("/me/boards/" + newBoard.id);
      }
    });
  };

  return (
    <div className="grid gap-4">
      <Label label="제목">
        <TextInput
          placeholder="제목을 작성해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Label>
      <Label label="문의 내용">
        <TextArea
          placeholder="문의 내용을 작성해주세요"
          maxLength={1000}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex justify-end">
          <span className="text-gray-400">{content.length} / 1000</span>
        </div>
      </Label>
      <Button
        onClick={handleClick}
        disabled={creating}
        size="lg"
        className="w-full"
      >
        {creating ? "문의 중..." : "확인"}
      </Button>
    </div>
  );
}
