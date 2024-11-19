import { ModalHeader } from "./ModalHeader";

interface DialogProps {
  title?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Dialog(props: DialogProps) {
  const { title, description, isOpen, onClose, children } = props;
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex animate-fadeIn items-center justify-center bg-black/80">
      <div className="mx-4 my-14 flex w-full max-w-[500px] flex-col overflow-hidden rounded-2xl bg-white p-4 pc:my-32">
        <ModalHeader
          title={title}
          description={description}
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
}
