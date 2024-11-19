"use client";

import React from "react";
import { Logo } from "../ui/Logo";
import { MobileHeader } from "./MobileHeader";
import { CtaButtons } from "./CtaButtons";
import { SelectableLink } from "./SelectableLink";
import { Icon } from "../ui";
import { useSession } from "next-auth/react";

interface IMainHeaderProps {
  useMobileBackButton?: boolean;
}

export function MainHeader({ useMobileBackButton }: IMainHeaderProps) {
  const session = useSession();
  const loggedIn = !!session.data?.user;

  return (
    <div className="sticky top-0 z-10 h-fit bg-white">
      {/* desktop navbar */}
      <div className="container flex h-[80px]  items-center justify-between max-pc:hidden">
        {/* Left */}
        <div className="flex items-center gap-10">
          <Logo />
          <div className="flex items-center gap-6">
            <SelectableLink
              href="/logosearch"
              label="로고 검색"
              activeFirstPaths={["/trademarks"]}
            >
              <Icon name="MagnifyingGlassIcon" size="md" />
            </SelectableLink>
            <SelectableLink
              href="/pricing"
              label="비용 안내"
              activeFirstPaths={["/pricing"]}
            />
            <SelectableLink
              href="/inquiry"
              label="문의 하기"
              activeFirstPaths={["/inquiry"]}
            />
            {loggedIn && (
              <SelectableLink
                href="/me"
                label="마이페이지"
                activeFirstPaths={["/me"]}
              />
            )}
          </div>
        </div>

        {/* Right */}
        <CtaButtons />
      </div>

      {/* mobile navbar */}
      <MobileHeader useMobileBackButton={useMobileBackButton} />
    </div>
  );
}
