"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Skeleton } from "@nextui-org/react";
import { useSession } from "next-auth/react";

const LogoSearchBanner: React.FC<any> = ({ banners }) => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [onLoaded, setOnLoaded] = useState(false);
  const session = useSession();

  const bannerItems = useMemo(() => {
    return banners.filter((b: any) => b.status === "진행중");
  }, [banners]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex(
        (prevIndex) => (prevIndex + 1) % bannerItems.length
      );
    }, 5000); // 5초마다 배너 전환

    return () => clearInterval(interval);
  }, [bannerItems]);

  useEffect(() => {
    setTimeout(() => {
      setOnLoaded(true);
    }, 2000);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence>
        <div className="relative flex items-center justify-center xl:h-60">
          <a
            href={bannerItems[currentBannerIndex].link}
            target={
              bannerItems[currentBannerIndex].link.startsWith("https")
                ? "_blank"
                : "_self"
            }
            rel="noopener noreferrer"
          >
            <Skeleton isLoaded={onLoaded} className="rounded-2xl">
              <motion.div
                key={currentBannerIndex}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                }}
                transition={{
                  duration: 1,
                }}
                className="hidden xl:inline"
              >
                <Image
                  src={bannerItems[currentBannerIndex].imageUrlPc}
                  alt="pc"
                  width={1350}
                  height={121}
                  onLoad={() => setOnLoaded(true)}
                />
              </motion.div>
            </Skeleton>
            <Image
              className="xl:hidden"
              src={bannerItems[currentBannerIndex].imageUrlMobile}
              alt="mobile"
              width={375}
              height={100}
            />
          </a>
        </div>
      </AnimatePresence>
    </div>
  );
};
export default LogoSearchBanner;
