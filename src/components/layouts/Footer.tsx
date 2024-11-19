import React from "react";
import { Logo } from "../ui/Logo";
import Link from "next/link";
import { Button } from "../ui";

export function Footer() {
  const businessInfo = [
    ["상호명", "주식회사 브랜빕"],
    ["사업자등록번호", "278-86-02662"],
    ["대표", "조윤정"],
    ["주소", "서울특별시 강남구 역삼로160, 6층 4호"],
  ];

  const individualBusinessInfo = [
    ["상호명", "브랜빕"],
    ["사업자등록번호", "412-14-24634"],
  ];

  const links = [
    ["회사소개", "https://branvipcorp.com/"],
    ["블로그", "https://blog.naver.com/branvip"],
    ["창작자 지원하기", "https://forms.gle/6WZRUyk68FJnWoCn6"],
    [
      "이용약관",
      "https://branvip.notion.site/a0438e649cd24ae3bb2aa5f282e9cb48",
    ],
  ];

  return (
    <div className="bg-surface-50">
      <div className="container grid gap-10 py-14 pc:py-20">
        <Logo />
        <div className="grid gap-10 pc:flex pc:items-end pc:justify-between">
          <div className="flex flex-col gap-4 pc:gap-8">
            <ul className="grid gap-1">
              {businessInfo.map(([title, value]) => (
                <li key={title}>
                  <FooterItem title={title} value={value} />
                </li>
              ))}
            </ul>
            <ul className="grid gap-1">
              {individualBusinessInfo.map(([title, value]) => (
                <li key={title}>
                  <FooterItem title={title} value={value} />
                </li>
              ))}
            </ul>
          </div>
          <ul className="flex gap-2 max-pc:grid max-pc:grid-cols-2">
            {links.map(([title, href]) => (
              <li key={title}>
                <FooterLink title={title} href={href} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

interface IFooterItemProps {
  title: string;
  value: string;
}
const FooterItem: React.FC<IFooterItemProps> = ({ title, value }) => {
  return (
    <div className="flex gap-1 text-sm font-medium">
      <p className="text-surface-400">{title}</p>
      <p className="text-sm text-surface-600">{value}</p>
    </div>
  );
};

interface IFooterLinkProps {
  title: string;
  href: string;
}

const FooterLink = ({ title, href }: IFooterLinkProps) => {
  return (
    <Link href={href} target="_blank">
      <Button outline size="sm" className="min-w-[100px] max-pc:w-full">
        {title}
      </Button>
    </Link>
  );
};
