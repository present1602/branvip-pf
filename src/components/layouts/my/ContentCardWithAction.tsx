import { twMerge } from "tailwind-merge";


interface IPageProps {
  children: React.ReactNode;
  title?: string;
  titleLarge?: string;
  infoText?: string;
  isDivider?: boolean;
  className?: string;
  action?: React.ReactNode;
}
export function ContentCardWithAction({ children, title, titleLarge, infoText, isDivider, className, action }: IPageProps) {

  return (
    <div className={twMerge("w-full bg-white border border-2xl border-surface-100 rounded-lg py-6 px-6 mb-6", className)} >
      <div className="flex items-center mb-4">
        <div className="flex-1">
          {title &&
            (
              <span className="heading2">{title}</span>

            )
          }

        </div>
        <div>
          {action}
        </div>

      </div>



      {isDivider
        && <div className="border-b mb-4" />
      }
      {children}
    </div>
  );
}
