"use client";

import React, { FC, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTrademarksLoading } from "@/hooks/trademarksLoading.store";

interface IPaginationProps {
  total: number;
}

const Pagination: FC<IPaginationProps> = ({ total }) => {
  const searchParams = useSearchParams();
  const [offset, setOffset] = React.useState(
    Number(searchParams ? searchParams.get("offset") : "") || 0
  );

  const pathName = usePathname();
  const params = new URLSearchParams(
    searchParams ? searchParams.toString() : ""
  );
  const router = useRouter();
  const { setIsLoading } = useTrademarksLoading();

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
    setOffset(Number(searchParams ? searchParams.get("offset") : "") || 0);
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

    setIsLoading(false);
    router.push("/logosearch?" + params.toString());
    scroll({ top: 0 });
  };

  if (page.total <= 0) {
    return null;
  }

  return (
    <nav className="flex justify-center py-10 text-sm text-[#474747]">
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
                    ? "bg-white text-primary_scale-60"
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
      <div className="flex items-center justify-center">
        <button
          className="flex h-8 w-8 items-center justify-center rounded-lg border transition-colors hover:bg-surface-100"
          onClick={() => onChange(page.current + 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="7"
            height="12"
            viewBox="0 0 7 12"
            fill="none"
          >
            <path d="M1 1L6 6L1 11" stroke="#4C4C4C" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
