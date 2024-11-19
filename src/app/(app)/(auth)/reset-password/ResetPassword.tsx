"use client";

import React, { FC, useEffect, useState, useTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { validatePassword } from "@/components/v3/components/validate";
import { BtnType } from "@/app/(app)/(auth)/signup/SignUp";
import Label from "@/components/v3/components/BUI/Label/Label";
import Input2 from "@/components/v3/components/BUI/Input2/Input2";
import Button from "@/components/v3/components/BUI/Button/Button";

interface PasswordState {
  password: string;
  passwordError: string;
  passwordConfirm: string;
  passwordConfirmError: string;
}

const ResetPassword: FC = () => {
  const params = useParams<{ token: string }>();
  const token = params?.token;
  const [, startResetPassword] = useTransition();

  const [passwordState, setPWState] = useState<PasswordState>({
    password: "",
    passwordError: "",
    passwordConfirm: "",
    passwordConfirmError: "",
  });
  const [submitType, setSubmitType] = useState<BtnType>("readonly");
  const router = useRouter();

  const handleChange =
    (field: keyof PasswordState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setPWState((prevState) => ({
        ...prevState,
        [field]: value,
        ...(field === "password" && {
          passwordError: validatePassword(value) ? "success" : "error",
          passwordConfirmError:
            value === prevState.passwordConfirm ? "success" : "error",
        }),
        ...(field === "passwordConfirm" && {
          passwordConfirmError:
            value === prevState.password ? "success" : "error",
        }),
      }));
    };

  const handleClear = (field: keyof PasswordState) => () => {
    setPWState((prevState) => ({
      ...prevState,
      [field]: "",
    }));
  };

  const handleSubmit = () => {
    startResetPassword(async () => {
      try {
        const res = await fetch("/api/auth/reset-password", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
            password: passwordState.password,
          }),
        });

        const bodyData = await res.json();
        const message = bodyData.message;

        if (res.ok) {
          router.push(`/login/email?resetPW=${message}`);
        } else {
          toast({
            title: "An unexpected error occurred.",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "관리자에게 문의바랍니다.",
          variant: "destructive",
        });
      }
    });
  };

  useEffect(() => {
    if (
      passwordState.passwordError == "success" &&
      passwordState.passwordConfirmError == "success"
    ) {
      setSubmitType("green");
    } else {
      setSubmitType("readonly");
    }
  }, [passwordState.passwordConfirmError, passwordState.passwordError]);

  useEffect(() => {
    setPWState((prevState) => ({
      ...prevState,
      passwordConfirmError: prevState.password
        ? prevState.password === prevState.passwordConfirm
          ? "success"
          : "error"
        : "",
    }));
  }, [passwordState.password, passwordState.passwordConfirm]);

  return (
    <div className="flex flex-col items-center pb-[90px] pt-[46px] xl:pt-[90px]">
      {/*title*/}
      <span className="heading2 xl:title1">비밀번호 변경하기</span>
      {/*input & submit*/}
      <div className="mb-[40px] mt-[52px] flex w-[335px] flex-col gap-[18px]">
        <Label label={"비밀번호"} require>
          <Input2
            type={"password"}
            placeholderText={"8자리 이상의 특수문자,영문자,숫자 조합"}
            onClear={handleClear("password")}
            onChange={handleChange("password")}
            value={passwordState.password}
            stat={passwordState.passwordError}
          />
        </Label>
        <Label label={"비밀번호 확인"} require>
          <Input2
            type={"password"}
            placeholderText={"비밀번호 재입력"}
            onClear={handleClear("passwordConfirm")}
            onChange={handleChange("passwordConfirm")}
            value={passwordState.passwordConfirm}
            stat={passwordState.passwordConfirmError}
          />
        </Label>
      </div>
      <div className={"w-full"}>
        <Button type={submitType} onClick={handleSubmit}>
          <span
            className={`font-sans text-[18px] ${
              submitType == "green" ? "text-white" : "text-warm_gray_scale-30"
            }`}
          >
            비밀번호 변경하기
          </span>
        </Button>
      </div>
    </div>
  );
};

export default ResetPassword;
