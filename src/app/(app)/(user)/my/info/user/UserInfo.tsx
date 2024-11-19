"use client";

import { ContentCard } from "@/components/layouts/my/ContentCard";
import { UserInfoContent } from "./UserInfoContent";
import { useDisclosure, Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import { getSession, useSession } from "next-auth/react";
import { Button, Icon } from "@/components/ui";
import SimpleInput from "@/components/v3/components/BUI/Input/SimpleInput";
import Label from "@/components/v3/components/BUI/Label/Label";
import { useEffect, useState } from "react";
import { getUserByEmail, getUserProfile, updateUser } from "@/actions/user.action";
import { toast } from "@/components/ui/use-toast";
import { useUserStore } from "@/hooks/user.store";
import { validateEmail } from "@/components/v3/components/validate";
import { handleValidation } from "@/utils/validationHandler";


const mypageInfoText1 = "안전한 정보 보호를 위해 연락처 일부만 확인 가능하며, 수정화면에서 정확한 연락처 확인이 가능합니다."

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

export interface IUserUpdate {
    email: string;
    name?: string | null;
    phoneNumber?: string | null;
}



export function UserInfo() {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const { data: session, update } = useSession()
    const [user, setUser] = useState<IUser>()
    const { setUser: setPersistUser } = useUserStore();

    const [userInput, setUserInput] = useState<IUserUpdate>()

    useEffect(() => {
        async function fetchUser() {
            const data = await getUserProfile()
            setUser(data)

            setUserInput({
                email: data.email,
                phoneNumber: data.phoneNumber,
                name: data.name
            })
        }
        fetchUser()

    }, [])

    // const reloadSession = () => {
    //     const event = new Event("visibilitychange");
    //     document.dispatchEvent(event);
    // };
    // // useEffect(() => {
    // //     const visibilityHandler = () =>
    // //         document.visibilityState === "visible" && update()
    // //     window.addEventListener("visibilitychange", visibilityHandler, false)
    // //     return () =>
    // //         window.removeEventListener("visibilitychange", visibilityHandler, false)
    // // }, [update])

    const handleUpdate = () => {
        async function callUpdate() {
            try {
                if (user?.email !== userInput?.email) {
                    if (!userInput?.email || !validateEmail(userInput?.email)) {
                        toast({
                            title: "이메일을 올바르게 입력해주세요",
                            variant: "destructive"
                        })
                        return;
                    } else {
                        const existingEmailUser = await getUserByEmail(userInput?.email)
                        if (existingEmailUser) {
                            toast({
                                title: "이미 사용중인 이메일입니다.",
                                variant: "destructive"
                            })
                            return;
                        }
                    }
                }

                if (!userInput?.name || !handleValidation('name', userInput?.name)) return;
                if (userInput?.phoneNumber && !handleValidation('phoneNumber', userInput?.phoneNumber)) return;

                const resultUser = await updateUser(userInput!)

                setUser(prevUser => {
                    if (!prevUser) {
                        return prevUser
                    }
                    return {
                        ...prevUser,
                        email: resultUser.email,
                        phoneNumber: resultUser.phoneNumber,
                        name: resultUser.name
                    }
                })

                setPersistUser({
                    id: resultUser.id,
                    email: resultUser.email,
                    name: resultUser.name,
                })

                // if (session) {
                //     await fetch('/api/auth/session?update', {
                //         method: 'POST',
                //         headers: {
                //             'Content-Type': 'application/json'
                //         },
                //         body: JSON.stringify(session)
                //     });
                // }

                // // const handleUpdateUserSession = async () => {
                // const newSession = {
                //     ...session,
                //     user: {
                //         ...session?.user,
                //         email: resultUser.email,
                //         name: resultUser.name,
                //         phoneNumber: resultUser.phoneNumber,
                //     },
                // };

                // await update(newSession);

                toast({
                    title: "회원정보가 수정되었습니다.",
                    variant: "success",
                })
                onClose()

            } catch (err: any) {
                toast({
                    title: "회원정보 수정에 실패했습니다.",
                    variant: "destructive",
                })
                onClose()
            }
        }
        callUpdate()
    }

    const cancleUpdate = () => {
        onClose()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setUserInput(prevInput => {
            if (!prevInput) {
                return prevInput;
            }
            return {
                ...prevInput,
                [name]: value
            }
        });
    }


    return (
        <>
            <ContentCard title={"가입자 정보"} infoText={mypageInfoText1} isDivider={true}>
                <div className="flex justify-end">
                    <span className="text2-bold border w-full md:w-[84px] text-center cursor-pointer p-2 mb-5"
                        onClick={onOpen}
                    >
                        수정하기
                    </span>
                </div>
                {user && <UserInfoContent user={user} />}

                {user &&
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange}
                        hideCloseButton={true}
                    >
                        <ModalContent>
                            {() => (
                                <>
                                    <ModalHeader className="flex gap-1">
                                        <span className="flex-1">가입자 정보 수정</span>
                                        <button onClick={onOpenChange} >
                                            <Icon name="XMarkIcon" className="h-8 w-8 text-surface-500 cursor-pointer" />
                                        </button>
                                    </ModalHeader>

                                    <ModalBody>
                                        <Label label={"가입자명"} require>
                                            <SimpleInput
                                                placeholderText={"내용 입력"}
                                                onChange={handleChange}
                                                value={userInput?.name}
                                                name="name"
                                            />

                                        </Label>

                                        <Label label={"연락처"}>
                                            <SimpleInput
                                                placeholderText={"-없이 입력해주세요"}
                                                onChange={handleChange}
                                                value={userInput?.phoneNumber}
                                                name="phoneNumber"
                                            />
                                        </Label>

                                        <Label label={"이메일"} require>
                                            <SimpleInput
                                                placeholderText={"내용 입력"}
                                                onChange={handleChange}
                                                value={userInput?.email}
                                                name="email"
                                            />
                                        </Label>

                                        <div className="flex gap-2 flex-row-reverse pt-2 pb-6">
                                            <Button onClick={handleUpdate} size="md" className="bg-primary_scale-70 text-white" >완료</Button>
                                            <Button onClick={cancleUpdate} size="md" className="border border-primary_scale-70 bg-white text-primary_scale-70" >취소</Button>
                                        </div>
                                    </ModalBody>
                                </>
                            )
                            }
                        </ModalContent>
                    </Modal>
                }
            </ContentCard>
        </>

    )
}