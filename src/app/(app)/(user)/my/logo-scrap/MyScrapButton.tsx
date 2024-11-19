"use client";

import { FC, Suspense, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useScrapStore } from "@/hooks/scrap.store";
import { ScrapIcon } from "@/components/svg";

interface IProps {
  
}

const MyScrapButton: FC<IProps> = () => {
  const { toast } = useToast();
  const { trademarks, setTrademarks, setModalOpened } = useScrapStore();
  const [isScrapped, setIsScrapped] = useState(true);


  const tmScrap = () => {
   
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

export default MyScrapButton;