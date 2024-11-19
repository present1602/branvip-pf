import { twMerge } from "tailwind-merge";
import { ModalHeader } from "./ModalHeader";

interface DrawerProps {
  title?: string;
  description?: string;
  direction?: "left" | "right" | "bottom";
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Drawer({ direction = "left", ...props }: DrawerProps) {
  const { title, description, isOpen, onClose, children } = props;

  const containerClass = {
    left: "justify-start",
    right: "justify-end",
    bottom: "justify-center items-end",
  };
  const directionClass = {
    left: "h-full mr-10 rounded-r-2xl max-w-[400px] animate-slideRight",
    right: "h-full ml-10 rounded-l-2xl max-w-[400px] animate-slideLeft",
    bottom: "mt-14 rounded-t-2xl max-w-[500px] animate-slideTop",
  };

  if (!isOpen) return null;
  return (
    <div
      className={twMerge(
        "fixed inset-0 z-[9999] flex animate-fadeIn bg-black/80",
        containerClass[direction]
      )}
    >
      <div
        className={twMerge("w-full bg-white p-4", directionClass[direction])}
      >
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
