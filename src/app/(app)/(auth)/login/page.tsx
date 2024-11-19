
import React, { FC, Suspense } from "react";


import LoginComponent from "@/app/(app)/(auth)/login/Login";


const LoginPage:FC = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <LoginComponent />

    </Suspense>
  );
};

export default LoginPage;