"use client";

import { MagnifyingGlass } from "@/components/svg";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Button from "@/components/v3/components/BUI/Button/Button";
import Image from "next/image";
import { FC } from "react";
import { TMProps } from "@/app/(app)/trademark/[applicationId]/TMInfo";

interface TMReadMoreProps {
  tm: any;
}

const TMReadMore: FC<TMReadMoreProps> = ({ tm }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <button
      className="absolute right-8 top-7 flex h-11 w-11 items-center justify-center rounded-full border hover:shadow-md "
      onClick={onOpen}
    >
      <MagnifyingGlass />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                자세히 보기
              </ModalHeader>
              <ModalBody>
                <div className="relative flex h-[280px] w-[300px] items-center justify-center border-t">
                  <Image
                    src={tm.path[0]}
                    alt={tm.imageName[0]}
                    objectFit={"contain"}
                    fill
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button type="green" onClick={onClose}>
                  <span className="text-[18px] text-white">확인</span>
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </button>
  );
};

export default TMReadMore;
