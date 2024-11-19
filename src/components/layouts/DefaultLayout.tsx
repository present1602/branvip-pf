import React from "react";
import { MainHeader } from "./MainHeader";
import { Footer } from "./Footer";

interface IProps {
  children: React.ReactNode;
  useMobileBackButton?: boolean;
}

export function DefaultLayout({ children, useMobileBackButton }: IProps) {
  return (
    <>
      <MainHeader useMobileBackButton={useMobileBackButton} />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
