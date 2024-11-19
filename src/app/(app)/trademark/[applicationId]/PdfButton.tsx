"use client";

import { FileIcon } from "@/components/svg";
import { FC } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import Button from "@/components/v3/components/BUI/Button/Button";
import { PdfViewer } from "@/components/PdfViewer";

interface IPdfButtonProps {
  tm: any;
}

const PdfButton: FC<IPdfButtonProps> = ({ tm }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const pdfUrl = tm.rejectPdfUrl || tm?.publicationInfo?.[0]?.path[0] || "";

  return (
    <>
      {pdfUrl && (
        <button
          className="flex w-[140px] items-center justify-center gap-1  rounded-[4px] border border-gray_scale-600 p-[10px] hover:shadow-md"
          onClick={onOpen}
        >
          <span className="text-[14px] font-semibold text-gray_scale-600 xl:text-base">
            {!!tm.rejectPdfUrl ? "거절 결정서" : `특허청 문서`}
          </span>
          <FileIcon />
        </button>
      )}
      <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                특허청 문서
              </ModalHeader>
              <ModalBody>
                <div className="border-t">
                  <PdfViewer pdfUrl={pdfUrl} key={pdfUrl} />
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
    </>
  );
};

export default PdfButton;
