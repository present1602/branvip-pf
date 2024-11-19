"use client";

import { dropUser, getUserProfile } from "@/actions/user.action";
// import { dropUser } from "@/actions/user.action";
import { ContentCard } from "@/components/layouts/my/ContentCard";
import { Button, Icon } from "@/components/ui";
import { toast } from "@/components/ui/use-toast";
import { useUserStore } from "@/hooks/user.store";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const deleteAccountInfoText = "정말 탈퇴하시겠습니까?"

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
        socialEmail: string | null,
        access_token?: string | null
    }[];

}

async function unlinkKakao(accessToken: string) {
    try {
        const response = await axios.post('https://kapi.kakao.com/v1/user/unlink', {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log('카카오 계정 연결 해제 성공:', response.data);
    } catch (error) {
        console.error('카카오 계정 연결 해제 실패:', error);
    }
}

async function unlinkNaver(accessToken: string) {
    try {
        const cid = process.env.NEXT_PUBLIC_OAUTH_NAVER_CLIENT_ID
        const sid = process.env.NEXT_PUBLIC_OAUTH_NAVER_CLIENT_SECRET

        const response = await axios.get('https://nid.naver.com/oauth2.0/token', {
            params: {
                grant_type: 'delete',
                client_id: cid,
                client_secret: sid,
                access_token: accessToken,
                service_provider: 'NAVER'
            }
        });
        console.log('네이버 연결 해제 성공:', response.data);
    } catch (error) {
        console.error('네이버 계정 연결 해제 실패:', error);
    }
}

export function CloseAccount(props: any) {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
    const { clearUser } = useUserStore()
    const [user, setUser] = useState<IUser>()

    useEffect(() => {
        async function fetchUser() {
            const data = await getUserProfile()
            setUser(data)
        }
        fetchUser()

    }, [])


    const handleDeleteConfirm = () => {
        async function deleteConfirm() {

            try {

                if (user?.accounts && user?.accounts[0] && user?.accounts[0].access_token) {
                    if (user?.loginType === 'kakao') {
                        await unlinkKakao(user?.accounts[0].access_token)
                    } else if (user?.loginType === 'naver') {
                        await unlinkNaver(user?.accounts[0].access_token)
                    }
                }

                clearUser();
                await dropUser()
                await signOut({
                    callbackUrl: "/",
                });


            } catch (err: any) {
                toast({
                    title: '회원탈퇴 처리에 실패했습니다. 관리자에게 문의바랍니다.',
                    variant: 'destructive'
                })
            }
        }
        deleteConfirm()
        onClose()
    }
    const cancleDelete = () => {
        onClose()
    }

    return (
        <>
            <ContentCard title={"회원탈퇴"}>
                <div className="flex flex-col md:flex-row">
                    <div className="flex-1">
                        <span className="body2-medium text-[#999999]">
                            회원 탈퇴 시 정보가 모두 삭제됩니다.
                        </span>
                    </div>

                    <div className="flex">
                        <span className="text2-bold border w-full text-center md:w-[84px] cursor-pointer p-2 text-[#8B95A1]"
                            onClick={onOpen}
                        >탈퇴하기</span>
                    </div>
                </div>
            </ContentCard>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}
                hideCloseButton={true}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex gap-1 border-b ">
                                <span className="flex-1">삭제하기</span>
                                <button onClick={onOpenChange} >
                                    <Icon name="XMarkIcon" className="h-8 w-8 text-surface-500 cursor-pointer" />
                                </button>
                                <div className="border-b border-gray-100" />
                            </ModalHeader>
                            <ModalBody className="p-6">
                                <div className="py-[50px] body1-medium text-gray-900 text-center">
                                    {deleteAccountInfoText}
                                </div>

                                <div className="flex gap-2 flex-row-reverse">
                                    <Button onClick={handleDeleteConfirm} size="md" className="bg-primary_scale-70 text-white" >확인</Button>
                                    <Button onClick={cancleDelete} size="md" className="border border-primary_scale-70 bg-white text-primary_scale-70" >취소</Button>
                                </div>

                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}