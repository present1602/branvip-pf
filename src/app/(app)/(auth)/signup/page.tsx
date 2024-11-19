
import SignUp from "@/app/(app)/(auth)/signup/SignUp";
import React, { FC, Suspense } from "react";


const SignUpPage: FC = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <SignUp />
    </Suspense>
  );
};

export default SignUpPage;