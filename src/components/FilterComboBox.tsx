"use client";

import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { GhostButton, Icon } from "./ui";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

interface IOption {
  label: string;
  value: string;
  parentValue?: string | null;
  imageUrl?: string;
}

export interface IFilterComboBoxProps {
  initLabel: string | undefined;
  options: IOption[];
  childOptions?: IOption[] | undefined;
  searchParamTitle: string;
  useSearch?: boolean;
  useGrid?: boolean;
  gridColumns?: "4" | "5";
  route: string;
}

export default function FilterComboBox({
                                         initLabel,
                                         options,
                                         childOptions,
                                         useSearch,
                                         useGrid,
                                         gridColumns,
                                         searchParamTitle,
                                         route,
                                       }: IFilterComboBoxProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initValue = searchParams ? searchParams.get(searchParamTitle) : "";
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(initValue ?? "");
  const [parentCode, setParentCode] = React.useState<String>(); //
  const [filteredChildOptions, setFilteredChildOptions] = useState<IOption[]>([]); // 필터링된 childOptions를 저장할 상태
  const [subOpen, setSubOpen] = React.useState(true);

  React.useEffect(() => {
    setValue(initValue ?? "");
  }, [initValue]);

  useEffect(() => {
    const newFilteredChildOptions = childOptions && childOptions.filter(childOptions => childOptions.parentValue === parentCode);
    if (newFilteredChildOptions !== undefined) (
      setFilteredChildOptions(newFilteredChildOptions));
  }, [parentCode, childOptions]);


  function getUpdatableParams() {
    const currentParams = searchParams ? searchParams.toString() : "";
    const params = new URLSearchParams(currentParams);
    params.delete("offset");
    scroll({ top: 0 });
    return params;
  }

  function onChange(newValue: string) {
    if (!newValue) {
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
    setValue("");
    setOpen(false);
    const params = getUpdatableParams();
    params.delete(searchParamTitle);
    router.push(`/${route}?` + params);
    return;
  }

  if (childOptions !== null && childOptions !== undefined){
    return (
      <div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              role="combobox"
              aria-controls="combo-options"
              aria-expanded={open}
              className={cn(
                "flex items-center justify-between gap-2 rounded-xl border border-surface-200 p-3 max-pc:min-w-[150px] max-pc:max-w-[250px] pc:w-full",
                (value || open) && "border-primary-500 text-primary-500",
              )}
            >
          <span className="truncate">
            {value ? options.find((o) => o.value === value)?.label || childOptions.find((op) => op.value === value)?.label : initLabel}
          </span>
              <Icon name="ChevronUpDownIcon" />
            </button>
          </PopoverTrigger>

          <div className="grid grid-cols-2">

            <PopoverContent className="w-fit p-0">
              {!useGrid && (
                <Command>
                  {useSearch && (
                    <>
                      <CommandInput placeholder={initLabel + " 검색"} />
                      <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                    </>
                  )}
                  <div className="grid grid-cols-2  max-h-[220px] pc:max-w-[700px] max-w-[450px]">
                    <CommandGroup className="col-span-1 max-h-[220px] divide-y divide-surface-50 overflow-y-auto">
                      {options.map((o) => (
                        <div key={o.value}>
                          <CommandItem
                            value={o.label}
                            onSelect={() => {
                              setSubOpen(true);
                              reClickItem(o.value);
                            }}
                            className={cn("flex justify-between px-4 py-3",
                              value === o.value ? "text-black" : "text-black",
                            )}
                          >
                            {o.label}
                            <Check
                              className={cn(
                                "ml-2 h-4 w-4",
                                value === o.value ? "opacity-100" : "opacity-0",
                              )}
                            />
                          </CommandItem>
                        </div>
                      ))}
                    </CommandGroup>
                    <CommandGroup className="col-span-1 max-h-[220px] divide-y divide-surface-50 overflow-y-auto">
                      {filteredChildOptions.map((op) => (
                        <div key={op.value}>
                          <CommandItem
                            value={op.label}
                            onSelect={() => {
                              const newValue = value === op.value ? "" : op.value;
                              setValue(newValue);
                              setOpen(false);
                              onChange(newValue);
                            }}
                            className="flex justify-between px-4 py-3"
                          >
                            {op.label}
                            <Check
                              className={cn(
                                "ml-2 h-4 w-4",
                                value === op.value ? "opacity-100" : "opacity-0",
                              )}
                            />
                          </CommandItem>
                        </div>
                      ))}
                    </CommandGroup>
                  </div>
                </Command>
              )}
              {useGrid && (
                <div
                  className={cn(
                    "grid gap-2 p-4",
                    gridColumns === "4" ? "grid-cols-4" : "grid-cols-5",
                  )}
                >
                  {options.map((o) => {
                    const isSelected = value === o.value;
                    return (
                      <button
                        key={o.value}
                        onClick={() => {
                          const newValue = value === o.value ? "" : o.value;
                          setValue(newValue);
                          setOpen(false);
                          onChange(newValue);
                        }}
                        className={cn(
                          "flex items-center gap-2 rounded-lg bg-surface-50 p-2",
                          isSelected &&
                          "border-primary-500 bg-primary-50 text-primary-500",
                        )}
                      >
                        {/* 옵션 이미지 */}
                        <Image
                          src={o.imageUrl ?? ""}
                          width={20}
                          height={20}
                          alt={o.label}
                        />
                        {/* 옵션 라벨 */}
                        <span>{o.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
              {/*필터 취소 버튼*/}
              <div className="bg-surface-50 px-4 py-2">
                <div className="flex justify-end">
                  <GhostButton size="sm" onClick={refreshParam}>
                    필터 취소하기
                  </GhostButton>
                </div>
              </div>
            </PopoverContent>
          </div>
        </Popover>
      </div>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-controls="combo-options"
          aria-expanded={open}
          className={cn(
            "flex items-center justify-between gap-2 rounded-xl border border-surface-200 p-3 max-pc:min-w-[150px] max-pc:max-w-[250px] pc:w-full",
            (value || open) && "border-primary-500 text-primary-500",
          )}
        >
          <span className="truncate">
            {value ? options.find((o) => o.value === value)?.label : initLabel}
          </span>
          <Icon name="ChevronUpDownIcon" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0">
        {!useGrid && (
          <Command>
            {useSearch && (
              <>
                <CommandInput placeholder={initLabel + " 검색"} />
                <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
              </>
            )}
            <CommandGroup className="max-h-[220px] divide-y divide-surface-50 overflow-y-auto">
              {options.map((o) => (
                <CommandItem
                  key={o.value}
                  value={o.label}
                  onSelect={() => {
                    const newValue = value === o.value ? "" : o.value;

                    setValue(newValue);
                    setOpen(false);
                    onChange(newValue);
                  }}
                  className="flex justify-between px-4 py-3"
                >
                  {o.label}
                  <Check
                    className={cn(
                      "ml-2 h-4 w-4",
                      value === o.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        )}

        {useGrid && (
          <div
            className={cn(
              "grid gap-2 p-4",
              gridColumns === "4" ? "grid-cols-4" : "grid-cols-5",
            )}
          >
            {options.map((o) => {
              const isSelected = value === o.value;
              return (
                <button
                  key={o.value}
                  onClick={() => {
                    const newValue = value === o.value ? "" : o.value;
                    setValue(newValue);
                    setOpen(false);
                    onChange(newValue);
                  }}
                  className={cn(
                    "flex items-center gap-2 rounded-lg bg-surface-50 p-2",
                    isSelected &&
                    "border-primary-500 bg-primary-50 text-primary-500",
                  )}
                >
                  <Image
                    src={o.imageUrl ?? ""}
                    width={20}
                    height={20}
                    alt={o.label}
                  />
                  <span>{o.label}</span>
                </button>
              );
            })}
          </div>
        )}
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
}
