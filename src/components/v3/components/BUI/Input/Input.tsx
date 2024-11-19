import { FC, InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  onClear: () => void;
  stat?: string;
}

const Input: FC<IProps> = ({ stat, onClear, ...restProps }) => {
  const borderColorClasses = {
    success: "border-primary_scale-70",
    error: "border-system-fruit",
  };
  const descriptionColorClasses = {
    success: "text-primary_scale-70",
    error: "text-system-fruit",
  };

  const descriptions = {
    success: "동일한 이름의 상표가 검색되지 않았어요",
    error: "특허청에 이미 등록된 이름이에요.",
  };

  const borderClasses = `${
    borderColorClasses[stat as keyof typeof borderColorClasses]
  }`;
  const descriptionClasses = `${
    descriptionColorClasses[stat as keyof typeof descriptionColorClasses]
  }`;
  const description = descriptions[stat as keyof typeof descriptions];

  return (
    <div className="flex w-full flex-col">
      <div className={`relative flex border-b ${borderClasses} items-center`}>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
          >
            <circle cx="11" cy="11.5" r="6" stroke="#313131" strokeWidth="2" />
            <path
              d="M16 16.5L19 19.5"
              stroke="#313131"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <input className="w-full px-4 py-2" type="text" {...restProps} />
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
        {stat == "success" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
          >
            <path
              d="M12 5.83268L6.66666 11.166L4 8.49935"
              stroke="#00B672"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : stat == "error" ? (
          <svg
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
      <span className={`caption1-medium ${descriptionClasses}`}>
        {description}
      </span>
    </div>
  );
};

export default Input;
