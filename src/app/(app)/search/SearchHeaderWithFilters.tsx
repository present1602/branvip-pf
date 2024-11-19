import { SearchTrademarkInput } from "@/components/SearchTrademarkInput";
import React from "react";
import { SearchProductFilterDropdown } from "@/app/(app)/search/SearchProductFilterDropdown";
import { SearchViennaFilterDropdown } from "@/app/(app)/search/SearchViennaFilterDropdown";
import { StatusFilterButtons } from "@/app/(app)/trademarks/StatusFilterButtons";
import { RefreshButton } from "@/app/(app)/trademarks/RefreshButton";

export function SearchHeaderWithFilters() {
  return (
    <div className="container sticky top-0 z-20 grid h-fit gap-2 border-surface-100 bg-white py-4 max-pc:border-b">
      <div className="grid gap-2 pc:flex pc:items-center pc:gap-2">
        <div className="w-full pc:w-[500px]">
          <SearchTrademarkInput />
        </div>
        <div className="flex w-full gap-4 overflow-x-auto pc:gap-2">
          <div className="flex grid-cols-6 gap-2 pc:grid pc:flex-1">
            <div className="col-span-3">
              <SearchProductFilterDropdown />
            </div>
            <div className="col-span-3">
              <SearchViennaFilterDropdown />
            </div>
          </div>
          <StatusFilterButtons route={'search'} />
        </div>
      </div>
      <div className="flex justify-end">
        <RefreshButton route={'search'}/>
      </div>
    </div>
  );
}
