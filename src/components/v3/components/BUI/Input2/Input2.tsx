import { FC, InputHTMLAttributes } from "react";

interface IInput2Props extends InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
  stat?: string;
  readonly?: boolean;
  readonlyText?: string;
  placeholderText?: string;
  type?: string;
  description?: string;
  clearBtn?: boolean;
}

const Input2: FC<IInput2Props> = ({
  stat,
  onClear,
  readonly,
  readonlyText,
  placeholderText,
  type,
  description,
  clearBtn = false,
  ...restProps
}) => {
  if (readonly || stat == "readonly") {
    return (
      <div className={"flex flex-col"}>
        <div
          className={`flex items-center rounded-[4px] border border-gray_scale-90 bg-gray_scale-90 py-[14px] pl-3`}
        >
          <input
            className="bg-gray_scale-90 font-sans text-[16px] text-gray_scale-100"
            readOnly={true}
          />
        </div>
        {/*placeholder*/}
        <div className="flex justify-between">
          <span className={`font-sans text-[12px] text-gray-400`}>
            {description}
          </span>
        </div>
        <div className="text-system-fruit]"></div>
      </div>
    );
  }

  const borderColorClasses = {
    success: "border-[#4A87E3]",
    error: "border-system-fruit",
  };

  const descriptionColorClasses = {
    success: "text-[#4A87E3]",
    error: "text-system-fruit",
  };

  const borderClasses = `border rounded-[4px] ${
    borderColorClasses[stat as keyof typeof borderColorClasses]
  }`;
  const descriptionClasses = `font-sans text-[12px] ${
    descriptionColorClasses[stat as keyof typeof descriptionColorClasses]
  }`;

  return (
    <div className={"flex flex-col "}>
      <div
        className={`flex items-center justify-between rounded-[4px] focus-within:border-black ${borderClasses} py-[14px] pl-3`}
      >
        <input
          className="w-full font-sans text-[16px] text-gray_scale-800 "
          placeholder={placeholderText}
          type={type}
          {...restProps}
        />

        {/*clearBtn*/}
        {clearBtn || (
          <button className="mr-3" onClick={onClear}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
            >
              <circle cx="8" cy="8.5" r="7" fill="#DADADA" />
              <path d="M5.5 6L10.5 11" stroke="white" strokeLinecap="round" />
              <path d="M5.5 11L10.5 6" stroke="white" strokeLinecap="round" />
            </svg>
          </button>
        )}
        {stat == "success" ? (
          <svg
            className="mr-3"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M12 5.33268L6.66666 10.666L4 7.99935"
              stroke="#4A87E3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : stat == "error" ? (
          <svg
            className="mr-3"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 15.5C4.13401 15.5 1 12.366 1 8.5C1 4.63401 4.13401 1.5 8 1.5C11.866 1.5 15 4.63401 15 8.5C15 12.366 11.866 15.5 8 15.5ZM7.18579 4.5L7.24044 5.93669L7.46995 9.75065H8.51913L8.74863 5.93669L8.80328 4.5H7.18579ZM7.28415 12.2209C7.47359 12.407 7.71038 12.5 7.99454 12.5C8.27869 12.5 8.51548 12.407 8.70492 12.2209C8.90164 12.028 9 11.7903 9 11.5078C9 11.2252 8.90164 10.991 8.70492 10.8049C8.51548 10.612 8.27869 10.5155 7.99454 10.5155C7.71038 10.5155 7.47359 10.612 7.28415 10.8049C7.09472 10.991 7 11.2252 7 11.5078C7 11.7903 7.09472 12.028 7.28415 12.2209Z"
              fill="#F05C2E"
            />
          </svg>
        ) : null}
      </div>
      {/*placeholder*/}
      <div className="flex justify-between">
        <span className={`ml-1 ${descriptionClasses}`}>{description}</span>
      </div>
      <div className="text-system-fruit"></div>
    </div>
  );
};
export default Input2;
