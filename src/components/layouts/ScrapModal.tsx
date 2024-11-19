"use client";

import { useScrapStore } from "@/hooks/scrap.store";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Button, Icon } from "../ui";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useToast } from "../ui/use-toast";
import { FillScrapIcon } from "@/components/svg";

export function ScrapModal() {
  const store = useScrapStore();
  const router = useRouter();
  const session = useSession();
  const { toast } = useToast();
  const { modalOpened, setModalOpened, trademarks, setTrademarks } = store;

  const gotoDetail = (applicationNumber: string) => {
    setModalOpened(false);
    router.push(`/trademark/${applicationNumber}`);
  };

  const deleteClip = (applicationNumber: string) => {
    const newTrademarks = trademarks.filter(
      (t) => t.applicationNumber !== applicationNumber
    );
    setTrademarks(newTrademarks);
  };

  const gotoContact = () => {
    const loggedIn = !!session.data?.user;

    if (loggedIn) {
      setModalOpened(false);
      return router.push("/contact/init");
    }

    return toast({
      title: "로그인이 필요합니다.",
      description: "로그인 후 이용해주세요.",
    });
  };

  return (
    <Dialog
      open={modalOpened}
      onOpenChange={(opened) => {
        setModalOpened(opened);
      }}
    >
      <DialogContent>
        <DialogTitle>
          <div className="flex items-center gap-1 border-b pb-5 text-surface-700">
            <FillScrapIcon />
            <span className="heading2">스크랩한 상표</span>
          </div>
        </DialogTitle>
        <div className="white">
          <ul className="grid max-h-[70vh] grid-cols-3 gap-4 overflow-y-auto">
            {trademarks.map((clip) => (
              <li
                key={clip.applicationNumber}
                className="relative flex flex-col items-center justify-center rounded-xl border p-2 hover:border-2 hover:border-primary-500"
              >
                <Image
                  className="max-h-[180px] cursor-pointer object-contain"
                  onClick={() => gotoDetail(clip.applicationNumber)}
                  src={clip.imageUrl}
                  alt="scrapped trademark image"
                  width={180}
                  height={180}
                />
                <button
                  className="absolute right-2 top-2 rounded-xl bg-gray-400 bg-opacity-50 p-2 text-gray-50 hover:bg-opacity-90"
                  onClick={() => deleteClip(clip.applicationNumber)}
                >
                  <Icon name="TrashIcon" className="h-6 w-6" />
                </button>
              </li>
            ))}
          </ul>
          <div className="flex pt-3">
            <Button
              size="lg"
              className="heading3 w-full bg-primary_scale-70 text-white"
              onClick={gotoContact}
            >
              브랜빕에 의뢰하기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
