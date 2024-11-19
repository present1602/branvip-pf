import React from "react";
import { Icon } from "../Icon";

interface ModalHeaderProps {
  title?: string;
  description?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function ModalHeader(props: ModalHeaderProps) {
  const { title, description, onClick } = props;

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-end gap-x-2">
        {title && (
          <div className="flex-1 text-2xl font-bold text-surface-900">
            {title}
          </div>
        )}
        {onClick && (
          <button onClick={onClick}>
            <Icon name="XMarkIcon" className="h-8 w-8 text-surface-500" />
          </button>
        )}
      </div>
      {description && (
        <div className="whitespace-pre-wrap text-lg font-medium text-surface-400">
          {description}
        </div>
      )}
    </div>
  );
}
