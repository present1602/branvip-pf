"use client";

import { Button, Icon } from "../../../../components/ui";
import { useToast } from "../../../../components/ui/use-toast";
import { useScrapStore } from "../../../../hooks/scrap.store";
import React from "react";

interface IProps {
  applicationNumber: string;
  imageUrl: string;
}

export function ScrapButton({ applicationNumber, imageUrl }: IProps) {
  const { toast } = useToast();
  const { trademarks, setTrademarks, setModalOpened } = useScrapStore();
  const isScrapped = trademarks
    .map(({ applicationNumber }) => applicationNumber)
    .includes(applicationNumber);

  const toggleScrap = () => {
    if (isScrapped) {
      setTrademarks(
        trademarks.filter((v) => v.applicationNumber !== applicationNumber)
      );
      toast({
        title: "상표 스크랩을 취소했습니다.",
      });
    } else {
      setTrademarks([
        ...trademarks,
        {
          applicationNumber,
          imageUrl,
        },
      ]);

      setModalOpened(true);

      toast({
        title: "상표를 저장했습니다.",
        description: "스크랩한 상표는 디자인 문의에서 확인할 수 있습니다.",
      });
    }
  };

  return (
    <Button
      size="sm"
      onClick={toggleScrap}
      leftIcon={<Icon name="BookmarkIcon" size="md" />}
      className="w-full pc:w-fit"
      outline={isScrapped}
    >
      상표 스크랩 {isScrapped && "취소"}
    </Button>
  );
}
