"use client";

import { ContentCard } from "@/components/layouts/my/ContentCard"
import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react"
import Input2 from "@/components/v3/components/BUI/Input2/Input2";
// import Label from "@/components/v3/components/BUI/Label/Label";
import { Button, Icon } from "@/components/ui";
import { validatePassword } from "@/components/v3/components/validate";
import { useSession } from "next-auth/react";
import { updatePassword } from "@/actions/updatePassword.action";
import { toast } from "@/components/ui/use-toast";
import BasicFormLabel from "@/components/v3/components/BUI/Label/BasicFormLabel";
import BasicFormInput from "@/components/v3/components/BUI/Input/BasicFormInput";
import { getUserProfile } from "@/actions/user.action";



interface IUser {
    id: string;
    email: string;
    name: string | null;
    phoneNumber: string | null;
    loginType: string;
    accounts: {
        id: string,
        provider: string,
        providerAccountId: string,
        socialEmail: string | null
    }[];

}


const failText1 = '비밀번호는 8자리 이상의 특수문자,영문자,숫자 조합으로 입력해야 합니다.'
const failText2 = '비밀번호와 비밀번호확인 입력값이 일치하지 않습니다.'
const successText = '비밀번호 변경에 성공했습니다.'

export function PasswordChange() {

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
    const [user, setUser] = useState<IUser>()
    const [password, setPassword] = useState<string>('')
    const [passwordConfirm, setPasswordConfirm] = useState<string>('')

    useEffect(() => {
        async function fetchUser() {
            const data = await getUserProfile()
            setUser(data)
        }
        fetchUser()

    }, [])

    function handleSubmit() {
        if (!user) {
            return
        }
        if (!validatePassword(password)) {
            toast({
                title: failText1,
                variant: 'destructive'
            })
        } else if (password !== passwordConfirm) (
            toast({
                title: failText2,
                variant: 'destructive'
            })
        )
        else {
            updatePassword(user.id, password)
            toast({
                title: successText,
                variant: 'success'
            })
            setTimeout(function () {
                onClose()
            }, 500)
        }

    }

    function handleClick() {

        if (user?.loginType == 'email') {
            onOpen()

        } else if (user?.loginType == 'kakao' || user?.loginType == 'naver') {
            toast({
                title: '소셜로그인 회원은 비밀번호를 변경할 수 없습니다.',
                variant: 'default'
            })
        }
    }
    function cancle() {
        setPassword('')
        setPasswordConfirm('')
        onClose()
    }


    function handleChange(key: "password" | "passwordConfirm", e: React.ChangeEvent<HTMLInputElement>) {
        if (key === "password") {
            setPassword(e.target.value)
        } else if (key === "passwordConfirm") {
            setPasswordConfirm(e.target.value)
        }
    }



    return (
        <ContentCard title="비밀번호">
            <div className="flex flex-col md:flex-row">
                <div className="flex-1">
                    <span className="body2-medium text-[#999999]">
                        안전한 정보 보호를 위해 연락처 일부만 확인 가능하며, 수정화면에서 정확한 연락처 확인이 가능합니다.
                    </span>
                </div>

                <div className="flex">
                    <span className="text2-bold border w-full text-center md:w-[84px] cursor-pointer p-2 text-[#8B95A1]"
                        onClick={handleClick}
                    >수정하기</span>
                </div>
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}
                hideCloseButton={true}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex gap-1">
                                <span className="flex-1">비밀번호 수정</span>
                                <button onClick={onOpenChange} >
                                    <Icon name="XMarkIcon" className="h-8 w-8 text-surface-500 cursor-pointer" />
                                </button>
                            </ModalHeader>
                            <ModalBody>
                                <BasicFormLabel labelText={"비밀번호"} required={true} />
                                <BasicFormInput
                                    type={"password"}
                                    placeholder={"8자리 이상의 특수문자,영문자,숫자 조합"}
                                    onChange={(e) => handleChange("password", e)}
                                    value={password}
                                />

                                <BasicFormLabel labelText={"비밀번호 확인"} required />
                                <BasicFormInput
                                    type={"password"}
                                    placeholder={"비밀번호 재입력"}
                                    onChange={(e) => handleChange("passwordConfirm", e)}
                                    value={passwordConfirm}
                                />


                                <div className="flex gap-2 flex-row-reverse pt-2 pb-6">
                                    <Button onClick={handleSubmit} size="md" className="bg-primary_scale-70 text-white" >완료</Button>
                                    <Button onClick={cancle} size="md" className="border border-primary_scale-70 bg-white text-primary_scale-70" >취소</Button>
                                </div>

                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </ContentCard>
    )
}

