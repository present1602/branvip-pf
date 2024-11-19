import React, { FC, Suspense } from "react";
import SignIn from "@/app/(app)/(auth)/login/email/SignIn";

const Page: FC = async () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <SignIn />
    </Suspense>
  );
};

export default Page;