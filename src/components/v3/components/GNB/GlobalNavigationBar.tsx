import { ReactNode } from "react";
import { GNBFooter } from "@/components/v3/components/GNB/GNBFooter";
import Header from "@/components/v3/components/GNB/Header";
import { GetServerSideProps } from "next";



interface IProps {
  children: ReactNode;
  isBeforeBtn?: boolean;
}

export default async function GNB({ children }: IProps) {

  return (
    <div>
      {/*<GNBHeader isBeforeBtn/>*/}
      <Header/>
      <main className="flex flex-col justify-center items-center w-full">
        {children}
      </main>
      <GNBFooter />
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, resolvedUrl } = context;

  return {
    props: {
      pathname: resolvedUrl,
      searchParams: query,
    },
  };
};