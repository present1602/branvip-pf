"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useTrademarksLoading } from "@/hooks/trademarksLoading.store";

interface IPageNavigationProps {
  total: number;
}

export function PageNavigation({ total = 0 }: IPageNavigationProps) {
  const searchParams = useSearchParams();
  const [offset, setOffset] = React.useState(
    Number(searchParams ? searchParams.get("offset") : "") || 0,
  );

  const pathName = usePathname();
  const params = new URLSearchParams(searchParams ? searchParams.toString() : "");
  const router = useRouter();
  const { setIsLoading } = useTrademarksLoading()

  const limit = 30;

  const page = {
    current: Math.floor(offset / limit),
    total: Math.floor(total / limit),
  };

  const navButtons =
    page.current === 0
      ? [0, 1, 2, 3, 4]
      : page.current === 1
        ? [-1, 0, 1, 2, 3]
        : page.current === page.total
          ? [-4, -3, -2, -1, 0]
          : page.current === page.total - 1
            ? [-3, -2, -1, 0, 1]
            : [-2, -1, 0, 1, 2];

  useEffect(() => {
    setOffset(Number(searchParams ? searchParams.get("offset") : '') || 0);
  }, [searchParams]);

  const onChange = (next: number) => {
    const offset = next * limit;
    params.set("offset", offset.toString());
    setOffset(offset);

    if (pathName === "/search") {
      setIsLoading(false);
      router.push("/search?" + params.toString());
      return;
    }
    router.push("/trademarks?" + params.toString());
    scroll({ top: 0 });
  };

  if (page.total <= 0) {
    return null;
  }

  return (
    <nav className="flex justify-center py-10">
      <ul className="flex gap-2">
        {navButtons.map((button) => {
          if (
            !(page.current + button >= 0 && page.current + button <= page.total)
          ) {
            return null;
          }

          const next = button + page.current;
          const isCurrent = next === page.current;
          const isDisabled = next < 0 || next > page.total;
          return (
            <li key={button}>
              <button
                disabled={isDisabled}
                className={`h-10 w-10 rounded-md transition-colors ${
                  isCurrent
                    ? "bg-primary-700 text-white"
                    : "bg-white text-surface-500 hover:bg-surface-100"
                }`}
                onClick={() => onChange(next)}
              >
                {next + 1}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
