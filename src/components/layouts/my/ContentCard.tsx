import { twMerge } from "tailwind-merge";


interface IPageProps {
  children: React.ReactNode;
  title?: string;
  titleLarge?: string;
  infoText?: string;
  isDivider?: boolean;
  className?: string;
}
export function ContentCard({ children, title, titleLarge, infoText, isDivider, className }: IPageProps) {

  return (
    <div className={twMerge("w-full bg-white border border-2xl border-surface-100 rounded-lg py-6 px-6 mb-6", className)} >
      {titleLarge &&
        (<div className="mb-4">
          <span className="heading1">{titleLarge}</span>
        </div>
        )
      }

      {title &&
        (<div className="mb-4">
          <span className="heading2">{title}</span>
        </div>
        )
      }

      {infoText &&
        (
          <span className="body2-medium text-[#999999]">
            {infoText}
          </span>
        )
      }
      {isDivider
        && <div className="border-b mb-4" />
      }
      {children}
    </div>
  );
}
