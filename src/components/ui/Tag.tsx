import { Icon } from "./Icon";

interface TagProps {
  children: string;
  onRemove?: () => void;
}

export function Tag(props: TagProps) {
  const { children, onRemove } = props;

  return (
    <div className="flex w-fit items-center gap-1 rounded-lg bg-surface-100 px-2.5 py-0.5 text-surface-500">
      <span className="text-sm font-medium">{children}</span>
      {onRemove && (
        <button onClick={onRemove}>
          <Icon name="XMarkIcon" />
        </button>
      )}
    </div>
  );
}
