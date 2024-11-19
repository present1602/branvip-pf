"use client"

import Image from "next/image";
import MyScrapButton from "./MyScrapButton";
import { IMyScrapLogo } from "./MyScrapLogoList";
import { useState } from "react";
import { ScrapIcon } from "@/components/svg";
import { deleteLogoScrap } from "@/actions/scrap.action";
import { toast } from "@/components/ui/use-toast";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import { Button, Icon } from "@/components/ui";


interface IProps {
    userId: string
    logo: IMyScrapLogo
}



const deleteInfoText = "스크랩을 삭제하시겠습니까?"

export default function MyScrapLogoCard({ logo, userId }: IProps) {
    const [isScrapped, setIsScrapped] = useState(logo.isScrapped)
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()



    function handleScrapClick() {
        if (logo.isScrapped) {
            deleteLogoScrap(logo.id)

            toast({
                title: "스크랩을 삭제했습니다.",
                variant: "success"
            })
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        } else {

        }
    }

    const handleDeleteConfirm = () => {
        handleScrapClick()
    }
    const cancleDelete = () => [
        onOpenChange()
    ]

    return (
        <>
            <div className="relative rounded-[6px] border bg-white shadow-sm hover:shadow-lg">
                <div className="absolute top-4 right-4 z-10">
                    {/* <MyScrapButton isScrapped={isScrapped} setIsScrapped={setIsScrapped} handleToggle={ handleToggle } /> */}

                    <button onClick={onOpen}>
                        {isScrapped ? (<>
                            <div className="hidden xl:inline z-10">
                                <ScrapIcon size={28} isCheck={true} />
                            </div>
                            <div className="xl:hidden z-10">
                                <ScrapIcon size={20} isCheck={true} />
                            </div>
                        </>) : (<>
                            <div className="hidden xl:inline z-10">
                                <ScrapIcon size={28} isCheck={false} />
                            </div>
                            <div className="xl:hidden z-10">
                                <ScrapIcon size={20} isCheck={false} />
                            </div>
                        </>)}
                    </button>

                </div>
                <div className="relative flex h-[122px] shrink-0 items-center justify-center p-2 xl:h-44">
                    <Image
                        className="p-4"
                        src={logo.trademark.imageUrl ?? ""}
                        alt="scrap logo"
                        sizes={"120px"}
                        fill
                        style={{ objectFit: "contain" }}
                    />
                </div>
            </div>

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
                                    {deleteInfoText}
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
    );
}