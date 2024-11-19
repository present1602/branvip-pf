"use client";

import { PdfDetailModal } from "../../../../components/PdfDetailModal";
import { Button, Icon } from "../../../../components/ui";
import { usePdfModal } from "../../../../hooks/usePdfModal";

interface IProps {
  pdfUrl: string;
  isRejected?: boolean;
}

export function PdfButton({ pdfUrl, isRejected = false }: IProps) {
  const modal = usePdfModal();

  function handleClick() {
    modal.setIsOpen(true);
    modal.setPdfUrl(pdfUrl);
  }

  return (
    <>
      <Button
        size="sm"
        leftIcon={<Icon name="DocumentTextIcon" size="md" />}
        className="w-full pc:w-fit"
        outline
        onClick={handleClick}
      >
        {isRejected ? "거절 결정서 확인" : "상표 전문 확인"}
      </Button>
      <PdfDetailModal />
    </>
  );
}
