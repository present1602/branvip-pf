import { SearchTrademarkInput } from "@/components/SearchTrademarkInput";
import React from "react";
import { ProductFilterDropdown } from "./ProductFilterDropdown";
import { ViennaFilterDropdown } from "./ViennaFilterDropdown";
import { MoodFilterDropdown } from "./MoodFilterDropdown";
import { ColorFilterDropdown } from "./ColorFilterDropdown";
import { StatusFilterButtons } from "./StatusFilterButtons";
import { RefreshButton } from "./RefreshButton";

export function HeaderWithFilters() {
  return (
    <div className="container sticky top-0 z-20 grid h-fit gap-2 border-surface-100 bg-white py-4 max-pc:border-b">
      <div className="grid gap-2 pc:flex pc:items-center pc:gap-2">
        <div className="w-full pc:w-[220px]">
          <SearchTrademarkInput />
        </div>
        <div className="flex w-full gap-4 overflow-x-auto pc:gap-2">
          <div className="flex grid-cols-6 gap-2 pc:grid pc:flex-1">
            <div className="col-span-2">
              <ProductFilterDropdown />
            </div>
            <MoodFilterDropdown />
            <ColorFilterDropdown />
            <div className="col-span-2">
              <ViennaFilterDropdown />
            </div>
          </div>
          <StatusFilterButtons route={'trademarks'}/>
        </div>
      </div>
      <div className="flex justify-end">
        <RefreshButton route={'trademarks'}/>
      </div>
    </div>
  );
}
