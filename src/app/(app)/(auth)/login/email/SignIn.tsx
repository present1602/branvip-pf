"use client";

import React, { FC, useEffect, useRef, useState, useTransition } from "react";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import Label from "@/components/v3/components/BUI/Label/Label";
import Input2 from "@/components/v3/components/BUI/Input2/Input2";
import {
  validateEmail,
  validatePassword,
} from "@/components/v3/components/validate";
import OR from "@/components/v3/components/OR";
import Button from "@/components/v3/components/BUI/Button/Button";
import { useUserStore } from "@/hooks/user.store";
import { getUserByEmail } from "@/actions/user.action";

interface AuthState {
  email: string;
  password: string;
  emailError: string;
  passwordError: string;
  submitType: "green" | "white" | "default" | "readonly" | "ai";
}

interface ModalState {
  email: string;
  emailError: string;
}

const EmailInput: FC<{
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  stat: string;
}> = ({ label, value, onChange, onClear, stat }) => (
  <Label label={label} require>
    <Input2
      type={"email"}
      placeholderText={"이메일을 입력해주세요"}
      onClear={onClear}
      onChange={onChange}
      value={value}
      stat={stat}
      tabIndex={1}
    />
  </Label>
);

const PasswordInput: FC<{
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  stat: string;
}> = ({ label, value, onChange, onClear, stat }) => (
  <Label label={label} require>
    <Input2
      type={"password"}
      placeholderText={"비밀번호를 입력해주세요"}
      onClear={onClear}
      onChange={onChange}
      value={value}
      stat={stat}
      tabIndex={2}
    />
  </Label>
);

const SignIn: FC = () => {
  const [callBackUrl, setCallBackUrl] = useState<string>("/");
  const [, startFindPW] = useTransition();
  const [authState, setAuthState] = useState<AuthState>({
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
    submitType: "readonly",
  });
  const [modalState, setModalState] = useState<ModalState>({
    email: "",
    emailError: "",
  });
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [, startTransition] = useTransition();
  const { setUser } = useUserStore()

  const authStateRef = useRef(authState);

  useEffect(() => {
    authStateRef.current = authState;
  }, [authState]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setAuthState((prevState) => ({
      ...prevState,
      email: newEmail,
      emailError: validateEmail(newEmail) ? "success" : "error",
    }));
  };
  const handleFindEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newEmail = event.target.value;
    setModalState((prevState) => ({
      ...prevState,
      email: newEmail,
      emailError: validateEmail(newEmail) ? "success" : "error",
    }));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setAuthState((prevState) => ({
      ...prevState,
      password: newPassword,
      passwordError: validatePassword(newPassword) ? "success" : "error",
    }));
  };

  const handleSignIn = () => {
    startTransition(async () => {
      try {
        const res = await signIn("credentials", {
          redirect: false,
          email: authState.email,
          password: authState.password,
          callbackUrl: callBackUrl || '/',
        });


        if (res?.ok) {

          const userByEmail = await getUserByEmail(authState.email)

          if (userByEmail) {
            const userState = {
              id: userByEmail.id,
              email: userByEmail.email,
              name: userByEmail.name,
            }

            setUser(userState)
          }

          router.push(callBackUrl || "/");
        } else {
          toast({
            title: "아이디 혹은 비밀번호가 일치하지 않습니다",
            variant: "destructive",
          });
        }
      } catch (e) {
        console.error("로그인 에러:", e);
        toast({
          title: "로그인 처리도중 에러가 발생했습니다.",
          variant: "destructive",
        });
      }
    });
  };

  const handleFindPW = () => {
    startFindPW(async () => {
      try {
        const res = await fetch("/api/auth/reset-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: modalState.email,
          }),
        });

        const bodyData = await res.json();
        const message = bodyData.message;

        if (res.ok) {
          toast({
            title: message,
            variant: "success",
          });
          onClose();
        } else {
          toast({
            title: message,
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "이메일을 보내는데 실패했습니다",
          variant: "destructive",
        });
      }
    });
  };

  useEffect(() => {
    if (
      authState.emailError === "success" &&
      authState.passwordError === "success"
    ) {
      setAuthState((prevState) => ({
        ...prevState,
        submitType: "green",
      }));
    } else {
      setAuthState((prevState) => ({
        ...prevState,
        submitType: "readonly",
      }));
    }
  }, [authState.emailError, authState.passwordError]);

  useEffect(() => {
    const callBackUrlParam = searchParams?.get("callBackUrl") ?? "/";
    setCallBackUrl(callBackUrlParam);
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center pb-[90px] pt-[46px] xl:pt-[90px]">
      {/*title*/}
      <span className="heading2 xl:title1">이메일로 로그인</span>
      {/*input & submit*/}
      <div className="mb-[40px] mt-[52px] flex w-[335px] flex-col gap-[18px]">
        <EmailInput
          label="이메일"
          value={authState.email}
          onChange={handleEmailChange}
          onClear={() =>
            setAuthState((prevState) => ({
              ...prevState,
              email: "",
              emailError: "",
            }))
          }
          stat={authState.emailError}
        />
        <PasswordInput
          label="비밀번호"
          value={authState.password}
          onChange={handlePasswordChange}
          onClear={() =>
            setAuthState((prevState) => ({
              ...prevState,
              password: "",
              passwordError: "",
            }))
          }
          stat={authState.passwordError}
        />
        <div className="item -mb-7 -mt-2 flex flex-col">
          <span className="font-sans text-[12px] text-gray-400">
            아이디찾기는 문의하기 기타문의를 이용바랍니다
          </span>
          <button className="self-end font-sans text-[12px] text-gray-400 ">
            <span onClick={onOpen}>비밀번호찾기</span>
          </button>
        </div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  비밀번호 찾기
                </ModalHeader>
                <ModalBody>
                  <Label label={"이메일"} require>
                    <Input2
                      type={"email"}
                      placeholderText={"이메일을 입력해주세요"}
                      onClear={() => {
                        setModalState((prevState) => ({
                          ...prevState,
                          email: "",
                          emailError: "",
                        }));
                      }}
                      onChange={handleFindEmailChange}
                      value={modalState.email}
                    />
                  </Label>
                </ModalBody>
                <ModalFooter>
                  <Button onClick={handleFindPW}>
                    비밀번호 초기화 이메일 보내기
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
      <div className={"mb-10 w-full"}>
        <Button type={authState.submitType} onClick={handleSignIn}>
          <span
            className={`font-sans text-[18px] ${authState.submitType === "green"
              ? "text-white"
              : "text-warm_gray_scale-30"
              }`}
          >
            로그인
          </span>
        </Button>
      </div>
      {/*또는*/}
      <OR />
      {/*email btn*/}
      <div className="mt-10">
        <Link href={`/signup?callBackUrl=${callBackUrl}`}>
          <Button size="L" width={335}>
            <span className="body1-bold text-warm_gray_scale-50">
              이메일로 회원가입
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
