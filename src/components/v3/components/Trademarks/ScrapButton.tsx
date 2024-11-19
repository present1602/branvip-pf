"use client";

import { FC, Suspense, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useScrapStore } from "@/hooks/scrap.store";
import { ScrapIcon } from "@/components/svg";

interface IProps {
  applicationNumber: string;
  imageUrl: string;
}

const ScrapButton: FC<IProps> = ({ applicationNumber, imageUrl }) => {
  const { toast } = useToast();
  const { trademarks, setTrademarks, setModalOpened } = useScrapStore();
  const [isScrapped, setIsScrapped] = useState(false);

  // 상태 동기화
  useEffect(() => {
    const isScrapped = trademarks
      .map(({ applicationNumber }) => applicationNumber)
      .includes(applicationNumber);
    setIsScrapped(isScrapped);
  }, [trademarks, applicationNumber]);


  const tmScrap = () => {
    if (isScrapped) {
      setTrademarks(
        trademarks.filter((v) => v.applicationNumber !== applicationNumber),
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
    <button onClick={tmScrap}>
      <Suspense fallback={<div>Loading...</div>}>
      {isScrapped ? (<>
        <div className="hidden xl:inline">
          <ScrapIcon size={28} isCheck={true}/>
        </div>
        <div className="xl:hidden">
          <ScrapIcon size={20} isCheck={true}/>
        </div>
      </>) : (<>
        <div className="hidden xl:inline">
          <ScrapIcon size={28} isCheck={false}/>
        </div>
        <div className="xl:hidden">
          <ScrapIcon size={20} isCheck={false}/>
        </div>
      </>)}
      </Suspense>

    </button>
  );
};

export default ScrapButton;