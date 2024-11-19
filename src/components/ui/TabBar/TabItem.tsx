import { twMerge } from "tailwind-merge";

interface TabItemProps {
  label: string;
  caption?: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function TabItem(props: TabItemProps) {
  const { label, caption, selected, onClick } = props;

  return (
    <button


      onClick={onClick}
    >
      <div className="flex items-center gap-1">
        <div>{label}</div>
        {caption && <div className="font-black">{caption}</div>}
      </div>
    </button>
  );
}
