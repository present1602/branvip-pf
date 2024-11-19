import BasicUIButton from "@/components/v3/components/BUI/Button/BasicUIButton";
import Link from "next/link";

interface IProps {
  title: string;
  // buttonText: string;
  // href?: string;
  leading: React.ReactNode
}

export function TitleCardWithLeading({ title, leading }: IProps) {

  return (
    <div className={`flex w-full bg-white border border-2xl border-surface-100 rounded-lg py-6 px-6 b-6 mb-6`}>
      {leading}
      <div className="flex-1 heading1">
        {title}
      </div>
    </div>
  );

}
