"use client";

import React, { useState, useEffect } from "react";
import { useScrapStore } from "@/hooks/scrap.store";
import { Icon } from "../ui";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { IconTopArrow } from "@/components/svg";

export function FloatingButtons() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [y, setY] = useState(0);
  const { trademarks, setModalOpened } = useScrapStore();

  useEffect(() => {
    const handleScroll = () => setY(window.scrollY);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // 여기서 비동기 데이터 로딩 로직을 가정합니다.
    // 데이터 로딩 완료 후 isLoaded 상태를 true로 변경합니다.
    // 예: 데이터 로딩 함수가 promise를 반환한다고 가정
    async function loadData() {
      // useScrapStore() 혹은 다른 메서드를 통해 데이터를 로드합니다.
      // 데이터 로드가 완료되면 isLoaded를 true로 설정합니다.
      setIsLoaded(true);
    }
    loadData();
  }, []); // 의존성 배열에 필요한 값이 있다면 추가

  // 데이터 로딩 중이라면 로딩 인디케이터나 플레이스홀더를 표시
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (trademarks.length === 0) return null;
  return (
    <div className="fixed bottom-20 right-8 max-w-fit  max-pc:hidden">
      <div className="flex flex-col items-center">
        {trademarks.length > 0 && (
          <>
            <hr/>
            <button
              onClick={() => {
                setModalOpened(true);
              }}
              className="flex flex-col items-center gap-2 p-2"
            >
              <div className="flex -space-x-7">
                {trademarks.slice(0, 3).map((trademark, index) => (
                  <Image
                    key={index}
                    className="h-12 w-12 rounded-full border  object-cover"
                    src={trademark.imageUrl}
                    width={48}
                    height={48}
                    alt="scrapped trademark image"
                  />
                ))}
                {trademarks.length > 2 && (
                  <div className="flex h-12 w-12 items-end justify-end text-gray-700">
                    +{trademarks.length - 2}개
                  </div>
                )}
              </div>
            </button>
          </>
        )}
        <button
          onClick={() => window.scrollTo(0, 0)}
          className={cn(
            "flex flex-col w-[60px] h-[60px] justify-start rounded-full border border-gray_scale-90 bg-white items-center text-white opacity-0 transition-opacity duration-700",
            y > 0 && "opacity-100"
          )}
        >
          <IconTopArrow/>
          <span className="text-[14px] text-gray-700">TOP</span>
        </button>
      </div>
    </div>
  );
}
