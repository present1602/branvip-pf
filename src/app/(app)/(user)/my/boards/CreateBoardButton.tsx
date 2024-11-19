"use client";

import { Button } from "@/components/ui";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import React from "react";
import { CreateBoardForm } from "./CreateBoardForm";

export function CreateBoardButton() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsOpen(false);
          }
        }}
      >
        <Button outline size="sm" onClick={() => setIsOpen(true)}>
          문의하기
        </Button>
        <DialogContent>
          <DialogTitle>문의하기</DialogTitle>
          <CreateBoardForm />
        </DialogContent>
      </Dialog>
    </>
  );
}
