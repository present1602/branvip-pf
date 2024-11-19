"use client";

import BasicUIButton from "@/components/v3/components/BUI/Button/BasicUIButton";
import { createBoardComment } from "../../../../../../actions/createBoard.action";
import { Button, TextArea } from "../../../../../../components/ui";
import { useToast } from "../../../../../../components/ui/use-toast";
import React, { useTransition } from "react";
import DisabledUIButton from "@/components/v3/components/BUI/Button/DisabledUIButton";

export function CreateCommentForm({ boardId = "" }) {
  const [content, setContent] = React.useState("");
  const [creating, startCreating] = useTransition();
  const { toast } = useToast();

  const handleClick = () => {
    if (creating) return;
    if (!content) {
      toast({
        title: "댓글을 작성해주세요",
        variant: "destructive",
      });
      return;
    }

    startCreating(async () => {

      await createBoardComment({ content, boardId });
      setContent("");

      toast({
        title: "댓글을 등록했습니다",
        variant: "success",
      });
    });
  };

  return (
    <div className="flex gap-2 items-stretch">
      <div className="flex-1">
        <TextArea
          placeholder="댓글을 작성해주세요"
          value={content}
          rows={1}
          maxLength={500}
          className="rounded-md"
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="">
        {content ?
          (<BasicUIButton className="h-full w-[100px] rounded text2-bold" isPrimary={true}
            onClick={handleClick}
          >
            댓글 쓰기
          </BasicUIButton>)
          :
          <DisabledUIButton buttonText="댓글 쓰기" className="w-[100px] h-full rounded" />
        }
      </div>
    </div>
  );
}
