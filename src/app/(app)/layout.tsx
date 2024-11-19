import React, { FC } from "react";
import GNB from "@/components/v3/components/GNB/GlobalNavigationBar";

interface IProps {
  children: React.ReactNode;
}

const DefaultLayout: FC<IProps> = ({ children }) => {
  return (
    <>
      <GNB>{children}</GNB>
    </>
  );
};
export default DefaultLayout;
