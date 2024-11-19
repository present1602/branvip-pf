import React, { FC } from "react";

interface IRoundCheckboxProps {
  size?: 24 | 20;
  isChecked: boolean;
  setIsChecked: (checked: boolean) => void;
}

const RoundCheckbox: FC<IRoundCheckboxProps> = ({
  size,
  isChecked,
  setIsChecked,
}) => {
  const sizeClass = size === 24 ? "w-6 h-6" : "w-5 h-5";
  const iconSizeClass = size === 24 ? "w-4 h-4" : "w-3 h-3";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  return (
    <label className="inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        className="hidden" // 실제 체크박스를 숨깁니다.
        aria-label="check"
        checked={isChecked}
        onChange={handleChange}
      />
      <span
        className={`relative rounded-full ${sizeClass} mr-2 inline-block transition duration-200 ease-in-out hover:border-primary_scale-70 ${
          isChecked
            ? "border-green-500 bg-green-500"
            : "border-2 border-gray-300 bg-white"
        }`}
      >
        {isChecked && (
          <svg
            className={`${iconSizeClass} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white`}
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              d="M5 12l5 5L19 7"
            />
          </svg>
        )}
      </span>
    </label>
  );
};

export default RoundCheckbox;
