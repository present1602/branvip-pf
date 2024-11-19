"use client";

import { usePdfModal } from "../hooks/usePdfModal";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { PdfViewer } from "./PdfViewer";

export function PdfDetailModal() {
  const store = usePdfModal();
  const { isOpen, setIsOpen, pdfUrl } = store;

  const isActive = !!(isOpen && pdfUrl);

  return (
    <Dialog open={isActive} onOpenChange={(open) => setIsOpen(open)}>
      <DialogContent>
        <DialogTitle>상표 전문 상세보기</DialogTitle>
        {isActive && <PdfViewer pdfUrl={pdfUrl} key={pdfUrl} />}
      </DialogContent>
    </Dialog>
  );
}
