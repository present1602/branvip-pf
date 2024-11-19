"use client";

import React, { FC, useEffect, useState, useTransition } from "react";
import { generateAuthCode, verifyAuthCode } from "@/actions/AuthCode.action";
import { toast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import { signUp } from "@/actions/signUp.action";
import { useSearchParams } from "next/navigation";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "@/components/v3/components/validate";
import Label from "@/components/v3/components/BUI/Label/Label";
import Input2 from "@/components/v3/components/BUI/Input2/Input2";
import Button from "@/components/v3/components/BUI/Button/Button";
import CheckBox from "@/components/v3/components/BUI/CheckBox/CheckBox";
import Link from "next/link";
import { Tooltip } from "@nextui-org/react";

export type BtnType = "green" | "white" | "default" | "readonly" | "ai";

const SignUp: FC = () => {
  const [signUpState, setSignUpState] = useState({
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
    passwordConfirm: "",
    passwordConfirmError: "",
    name: "",
    nameError: "",
    isCheck: false,
    authCode: "",
    isAuth: false,
    authDesc: "",
    isEmailAuth: false,
  });
  const [submitType, setSubmitType] = useState<BtnType>("readonly");
  const [emailBtnType, setMailBtnType] = useState<BtnType>("readonly");
  const [callBackUrl, setCallBackUrl] = useState<string>();
  const [, startEmailAuthentication] = useTransition();
  const [, startVerifyEmailAuthCode] = useTransition();
  const searchParams = useSearchParams();

  const handleCheckboxChange = (checked: any) => {
    setSignUpState((prevState) => ({
      ...prevState,
      isCheck: checked,
    }));
  };

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setSignUpState((prevState) => ({
        ...prevState,
        [field]: e.target.value,
      }));
      if (field == "email") {
        setSignUpState((prevState) => ({
          ...prevState,
          emailError: validateEmail(e.target.value) ? "success" : "error",
        }));
      } else if (field == "password") {
        setSignUpState((prevState) => ({
          ...prevState,
          passwordError: validatePassword(e.target.value) ? "success" : "error",
        }));
      } else if (field == "name") {
        setSignUpState((prevState) => ({
          ...prevState,
          nameError: validateName(e.target.value) ? "success" : "error",
        }));
      }
    };

  const handleClear = (field: string) => () => {
    const fieldError = `${field}Error`;
    setSignUpState((prevState) => ({
      ...prevState,
      [field]: "",
    }));
    setSignUpState((prevState) => ({
      ...prevState,
      [fieldError]: "",
    }));
  };

  const emailAuthentication = () => {
    startEmailAuthentication(async () => {
      try {
        const { id, message } = await generateAuthCode({
          email: signUpState.email,
        });
        if (id == 0) {
          toast({
            title: message,
            variant: "default",
          });
        } else if (id == 1) {
          setSignUpState((prevState) => ({
            ...prevState,
            isEmailAuth: true,
          }));
          toast({
            title: message,
            variant: "success",
          });
        }
      } catch (e) {
        toast({
          title: "회원가입에 실패하였습니다 관리자에게 문의주세요",
          variant: "destructive",
        });
      }
    });
  };

  const verifyEmailAuthCode = async () => {
    startVerifyEmailAuthCode(async () => {
      try {
        const EnterAuth = {
          enterCode: signUpState.authCode,
          email: signUpState.email,
        };

        const { auth, message } = await verifyAuthCode(EnterAuth);

        if (auth) {
          setSignUpState((prevState) => ({
            ...prevState,
            authCodeError: "readonly",
            emailError: "readonly",
            authDesc: "인증이 완료되었습니다.",
            isAuth: true,
          }));
          toast({
            title: "인증이 완료되었습니다.",
            variant: "success",
          });
        } else {
          toast({
            title: message,
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "인증번호를 보내지 못했습니다.",
          variant: "destructive",
        });
      }
    });
  };

  const handleSignUp = async () => {
    const { email, password, name } = signUpState;

    try {
      await signUp(email, password, name);
      await signIn("credentials", {
        email,
        password,
        callbackUrl: callBackUrl,
      });
    } catch (error) {
      toast({
        title: "아이디 혹은 비밀번호가 일치하지 않습니다",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (signUpState.emailError == "success") {
      setMailBtnType("green");
    } else {
      setMailBtnType("readonly");
    }
  }, [signUpState.emailError]);

  useEffect(() => {
    setSignUpState((prevState) => ({
      ...prevState,
      passwordConfirmError:
        prevState.password != ""
          ? prevState.password == prevState.passwordConfirm
            ? "success"
            : "error"
          : "",
    }));
  }, [signUpState.password, signUpState.passwordConfirm]);

  useEffect(() => {
    if (
      signUpState.emailError == "readonly" &&
      signUpState.passwordError == "success" &&
      signUpState.passwordConfirmError == "success" &&
      signUpState.isCheck &&
      signUpState.nameError == "success"
    ) {
      setSubmitType("green");
    } else {
      setSubmitType("readonly");
    }
  }, [
    signUpState.emailError,
    signUpState.passwordError,
    signUpState.passwordConfirmError,
    signUpState.isCheck,
    signUpState.nameError,
  ]);

  useEffect(() => {
    const CBU = searchParams?.get("callBackUrl") ?? "/";
    setCallBackUrl(CBU);
  }, [callBackUrl, searchParams]);

  return (
    <div className="flex flex-col items-center pb-[90px] pt-[46px] xl:pt-[90px]">
      {/*title*/}
      <span className="heading2 xl:title1">이메일로 회원가입하기</span>
      {/*input & submit*/}
      <div className="mb-[40px] mt-[52px] flex w-[335px] flex-col gap-[18px]">
        <Label label={"이메일"} require>
          <div className="-mb-5 flex items-center justify-between gap-[6px]">
            <div className="w-full">
              <Input2
                id={"email"}
                type={"email"}
                placeholderText={"이메일을 입력해주세요"}
                onClear={handleClear("email")}
                onChange={handleChange("email")}
                value={signUpState.email}
                stat={signUpState.emailError}
                description={signUpState.authDesc}
                tabIndex={1}
              />
            </div>
            {signUpState.emailError == "success" && (
              <div className="h-full">
                <Button
                  type={emailBtnType}
                  size={"L"}
                  width={110}
                  height={53}
                  onClick={emailAuthentication}
                >
                  <Tooltip
                    placement={"bottom"}
                    content={
                      "이메일 인증번호를 받지 못하신 경우, 이메일을 다시 확인해 주세요."
                    }
                  >
                    <span className="font-sans text-[18px] text-white">
                      인증요청
                    </span>
                  </Tooltip>
                </Button>
              </div>
            )}
          </div>
        </Label>
        {signUpState.isAuth || (
          <div>
            {signUpState.isEmailAuth && (
              <Label label={"인증번호 입력"} require>
                <div className="flex items-center justify-between gap-[6px]">
                  <div className={"w-full"}>
                    <Input2
                      type={"text"}
                      onChange={handleChange("authCode")}
                      onClear={handleClear("authCode")}
                      value={signUpState.authCode}
                    />
                  </div>

                  <div className="h-full">
                    <Button
                      type={emailBtnType}
                      size={"L"}
                      width={110}
                      height={53}
                      onClick={verifyEmailAuthCode}
                    >
                      <span className="font-sans text-[18px] text-white">
                        인증확인
                      </span>
                    </Button>
                  </div>
                </div>
              </Label>
            )}
          </div>
        )}
        <Label label={"비밀번호"} require>
          <Input2
            type={"password"}
            placeholderText={"8자리 이상의 특수문자,영문자,숫자 조합"}
            onClear={handleClear("password")}
            onChange={handleChange("password")}
            value={signUpState.password}
            stat={signUpState.passwordError}
            tabIndex={2}
          />
        </Label>
        <Label label={"비밀번호 확인"} require>
          <Input2
            type={"password"}
            placeholderText={"비밀번호 재입력"}
            onClear={handleClear("passwordConfirm")}
            onChange={handleChange("passwordConfirm")}
            value={signUpState.passwordConfirm}
            stat={signUpState.passwordConfirmError}
            tabIndex={3}
          />
        </Label>
        <Label label={"이름"} require>
          <Input2
            type={"text"}
            placeholderText={"2~10자 사이의 한국어,영어만 가능합니다"}
            onClear={handleClear("name")}
            onChange={handleChange("name")}
            value={signUpState.name}
            stat={signUpState.nameError}
            tabIndex={4}
          />
        </Label>

        <div className="flex justify-around gap-2">
          <div className="w-[20px]">
            <CheckBox
              isChecked={signUpState.isCheck}
              setIsChecked={handleCheckboxChange}
              size={20}
            />
          </div>
          <div className="w-[322px] font-sans text-[14px]">
            서비스 이용을 위한 &nbsp;
            <Link
              href="https://branvip.notion.site/a0438e649cd24ae3bb2aa5f282e9cb48"
              target={"_blank"}
            >
              <span className="text-primary_scale-70">서비스 이용약관</span>
            </Link>
            을 확인하였으며, 이에 동의합니다.
          </div>
        </div>
      </div>
      <div className={"w-full"}>
        <Button type={submitType} onClick={handleSignUp}>
          <span
            className={`font-sans text-[18px] ${
              submitType == "green" ? "text-white" : "text-warm_gray_scale-30"
            }`}
          >
            회원가입
          </span>
        </Button>
      </div>
    </div>
  );
};
export default SignUp;
