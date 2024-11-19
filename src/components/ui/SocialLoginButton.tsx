import Image from "next/image";
import React from "react";
import { twMerge } from "tailwind-merge";

const providers = {
  google: { src: "google.png", alt: "구글", style: "bg-white text-black" },
  kakao: {
    src: "kakao.png",
    alt: "카카오",
    style: "bg-[#FEE500] text-black",
  },
  naver: { src: "naver.png", alt: "네이버", style: "bg-[#03C75A] text-white" },
};

interface SocialLoginButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  provider: keyof typeof providers;
}

export function SocialLoginButton({
  size = "sm",
  ...props
}: SocialLoginButtonProps) {
  const { provider, className, ...restProps } = props;

  const sizeClass = {
    sm: { default: "px-3 py-2 text-sm", icon: 16 },
    md: { default: "px-4 py-3 text-base", icon: 20 },
    lg: { default: "px-5 py-4 text-xl", icon: 24 },
  };

  return (
    <button
      {...restProps}
      className={twMerge(
        "group relative flex items-center justify-center overflow-hidden rounded-[10px]",
        providers[provider].style,
        sizeClass[size].default,
        className
      )}
    >
      <Image
        src={"/assets/logo/" + providers[provider].src}
        width={sizeClass[size].icon}
        height={sizeClass[size].icon}
        alt={providers[provider].alt}
      />
      <div className="body1-medium px-4">
        {providers[provider].alt} 계정으로 계속하기
      </div>
      <div className="absolute inset-0 group-hover:bg-black/5" />
    </button>
  );
}
