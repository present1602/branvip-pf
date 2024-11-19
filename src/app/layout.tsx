import AuthSessionProvider from "../providers/authSessionProvider";
import "./globals.css";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { ScrollToTop } from "@/components/ScrollToTop";
import { LoginModal } from "@/components/LoginModal";
import { FloatingButtons } from "@/components/layouts/FloatingButtons";
import { ScrapModal } from "@/components/layouts/ScrapModal";
import Script from "next/script";
import { PaypleInit } from "@/components/PaypleInit";
import NextProvider from "@/providers/nextUIProvider";

export const metadata: Metadata = {
  title: {
    default: "로고 디자인과 상표등록을 한 번에, 브랜빕",
    template: "%s | 브랜빕",
  },
  description:
    "150만 개 데이터와 AI 기술을 통해 아이디어 검색부터, 혁신적인 디자인과 전문적인 상표출원까지! 한 번에 진행해 보세요.",
  keywords:
    "브랜빕, 상표, 출원, 로고, 검색, 지식재산권, 특허, 디자인, 저작권, 브랜드, 브랜딩, branvip",
  robots: "index,follow",
  metadataBase: new URL("https://branvip.com"),
};

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />

        <meta property="og:image" content="<generated>" />
        <meta property="og:image:type" content="<generated>" />
        <meta property="og:image:width" content="<generated>" />
        <meta property="og:image:height" content="<generated>" />
        <meta
          property="og:description"
          content="150만 개 데이터와 AI 기술을 통해 아이디어 검색부터, 혁신적인 디자인과 전문적인 상표출원까지! 한 번에 진행해 보세요. "
        />
        <meta
          name={"naver-site-verification"}
          content={"5a844dd6c0fe8b4005f7a89c42ce630be4f125da"}
        />
      </head>
      <body>
        <AuthSessionProvider>
          <NextProvider>
            {children}
            <LoginModal />
            <FloatingButtons />
            <ScrapModal />
            <PaypleInit />
          </NextProvider>
        </AuthSessionProvider>
        <Toaster />
        <ScrollToTop />
        <Script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js" />
        <Script src="https://cpay.payple.kr/js/v1/payment.js"></Script>
        <Script src="https://democpay.payple.kr/js/v1/payment.js"></Script>
      </body>
    </html>
  );
}
