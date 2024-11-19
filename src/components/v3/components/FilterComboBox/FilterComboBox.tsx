"use client";

import React, { ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { GhostButton, Icon } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Check } from "lucide-react";
import {
  SelectCommand,
  SelectCommandEmpty,
  SelectCommandGroup,
  SelectCommandInput,
  SelectCommandItem,
} from "../SelectCommand/SelectCommand";
import Chip from "../BUI/Chip/Chip";
import StatChip from "../StatChip/StatChip";

interface IOption {
  label: string;
  value: string;
  parentValue?: string | null;
  imageUrl?: string;
}

export interface IFilterComboBoxProps {
  initLabel: string | undefined;
  options: IOption[];
  searchParamTitle: string;
  useSearch?: boolean;
  useGrid?: boolean;
  route: string;
  type?: string;
  icon?: ReactNode;
}

export default function CustomFilterComboBox({
                                               initLabel,
                                               options,
                                               useSearch,
                                               searchParamTitle,
                                               type,
                                               icon,
                                               route,
                                             }: IFilterComboBoxProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initValue = searchParams ? searchParams.get(searchParamTitle) : "";
  const [open, setOpen] = React.useState(false);
  const [currentValue, setCurrentValue] = React.useState(initValue ?? "");
  const [parentCode, setParentCode] = React.useState<String>(); //
  const [subOpen, setSubOpen] = React.useState(true);
  React.useEffect(() => {
    setCurrentValue(initValue ?? "");
  }, [initValue]);


  function getUpdatableParams() {
    const currentParams = searchParams ? searchParams.toString() : "";
    const params = new URLSearchParams(currentParams);
    params.delete("offset");
    scroll({ top: 0 });
    return params;
  }

  function onChange(newValue: string) {
    const value = currentValue === newValue ? "" : newValue;
    setOpen(false)
    if (!value) {
      return refreshParam();
    }
    const params = getUpdatableParams();
    params.set(searchParamTitle, newValue);
    router.push(`/${route}?` + params);
    return;
  }

  const reClickItem = (value: String) => {
    if (value === parentCode) {
      setParentCode("");
    } else {
      setParentCode(value);
    }
  };

  function refreshParam() {
    setCurrentValue("");
    setOpen(false);
    const params = getUpdatableParams();
    params.delete(searchParamTitle);
    router.push(`/${route}?` + params);
    return;
  }


  if (type === "chip") {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            role="combobox"
            aria-controls="combo-options"
            aria-expanded={open ? "true" : "false"}
            className={cn(
              `flex items-center justify-between gap-1 rounded-[8px] border border-gray_scale-90 p-3 w-[116px] h-11`,
              (currentValue || open) && "border-black text-primary-500",
            )}
          >
            {/*체크 후 보일 화면*/}
            <span className="truncate text-sm">
            {currentValue ? (
              <StatChip
                stat={options.find((o) => o.value === currentValue)?.value || "Default Title"}
                size="m"
              />
            ) : initLabel}
          </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M8.23178 12.5781L4.74182 8.39018C4.19905 7.73886 4.6622 6.75 5.51004 6.75H12.49C13.3378 6.75 13.801 7.73886 13.2582 8.39018L9.76822 12.5781C9.36843 13.0579 8.63157 13.0579 8.23178 12.5781Z"
                fill="#999999" />
            </svg>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0">
          <div className="grid grid-cols-3 p-[20px] gap-[10px]">
            {options.map((item, index) => (
              <button key={index}
                      onClick={() => {
                        onChange(item.value);
                      }}>
                <StatChip stat={item.value} size={"m"} />
              </button>
            ))}
          </div>
          <div className="bg-surface-50 px-4 py-2">
            <div className="flex justify-end">
              <GhostButton size="sm" onClick={refreshParam}>
                필터 취소하기
              </GhostButton>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  } else if ((type === "color") || (type === "mood")) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            role="combobox"
            aria-controls="combo-options"
            aria-expanded={open ? "true" : "false"}
            className={cn(
              `flex items-center justify-between gap-1 rounded-[8px] border border-gray_scale-90 p-3 w-[168px] h-11 text-sm`,
              (currentValue || open) && "border-black text-primary-500",
            )}
          >
            <div className="flex gap-2 justify-center items-center">

              {currentValue ? (
                <Chip
                  text={options.find((o) => o.value === currentValue)?.label || "Default Title"}
                  value={options.find((o) => o.value === currentValue)?.value || "Default Title"}
                  type={type}
                  image={options.find((o) => o.value === currentValue)?.imageUrl || "/assets/colors/rainbow-circle.png"}
                />
              ) : (<div className="flex justify-center items-center gap-2">
                {icon}
                {initLabel}
              </div>)}
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M8.23178 12.5781L4.74182 8.39018C4.19905 7.73886 4.6622 6.75 5.51004 6.75H12.49C13.3378 6.75 13.801 7.73886 13.2582 8.39018L9.76822 12.5781C9.36843 13.0579 8.63157 13.0579 8.23178 12.5781Z"
                fill="#999999" />
            </svg>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0">
          <div className="grid grid-cols-3 p-[20px] gap-[10px]">
            {options.map((item, index) => (
              <button key={index}
                      onClick={() => {
                        onChange(item.value);
                      }}>
                <Chip text={item.label} value={item.value} type={type} image={item.imageUrl} />
              </button>
            ))}
          </div>
          <div className="bg-surface-50 px-4 py-2">
            <div className="flex justify-end">
              <GhostButton size="sm" onClick={refreshParam}>
                필터 취소하기
              </GhostButton>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  } else {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            role="combobox"
            aria-controls="combo-options"
            aria-expanded={open ? "true" : "false"}
            className={cn(
              `flex items-center justify-between gap-1 rounded-[8px] border border-gray_scale-90 p-3 w-[168px] truncate h-11 text-sm`,
              (currentValue || open) && "border-black text-black",
            )}
          >
            {currentValue ? (
              <span>
                {options.find((o) => o.value === currentValue)?.label || "Default Title"}
              </span>
            ) : (<div className="flex justify-center items-center gap-2 ">
              {icon}
              {initLabel}
            </div>)}
            <Icon name="ChevronUpDownIcon" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0">

          <SelectCommand>
            <div className="bg-[#F6F6F6] px-5 py-3.5">
              <div className="border rounded-3xl bg-white">
                <SelectCommandInput placeholder={initLabel + "검색"} />
                <SelectCommandEmpty>검색 결과가 없습니다.</SelectCommandEmpty>
              </div>
            </div>
            <SelectCommandGroup className="overflow-y-auto p-5 h-52">
              {options.map((item, index) => (

                <SelectCommandItem
                  key={index}
                  value={item.value}
                  onSelect={() => {
                    onChange(item.value);                  }}
                >
                  <div
                    className="border-2 border-gray_scale-90 rounded-sm h-4 w-4 flex justify-center items-center gap-3">
                    <Check
                      className={cn(
                        "h-3 w-3 flex items-center justify-center",
                        currentValue === item.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </div>
                  <span className="text-sm text-[#202428] flex items-center justify-center">
                      {item.label}
                    </span>
                </SelectCommandItem>
              ))}
            </SelectCommandGroup>
          </SelectCommand>
        </PopoverContent>
      </Popover>
    );
  }

}
