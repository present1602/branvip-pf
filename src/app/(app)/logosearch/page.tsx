import LogoSearchBanner from "@/app/(app)/logosearch/LogoSearchBanner";
import LogoSearchFilter from "@/app/(app)/logosearch/LogoSearchFilter";
import LogoSearchResult from "@/app/(app)/logosearch/LogoSearchResult";
import {trademarkService} from "@/services/trademark.service";
import {bannerService} from "@/services/banner.service";

export interface PageProps {
  searchParams: Record<string, string>;
}

const LogoSearchPage = async ({ searchParams }: PageProps) => {
  const { mood_id, color_id, product_type, vienna_code, status, offset } =
    searchParams;
  const { trademarks, totalCount } =
    await trademarkService.getFilteredTrademarks({
      mood_id: +mood_id,
      color_id: +color_id,
      product_type_code: product_type,
      vienna_code,
      status,
      offset: +offset || 0,
      limit: 30,
    });

  const banners = await bannerService.getAllBanners();

  return (
    <div className="flex flex-col">
      <LogoSearchBanner banners={banners} />
      <LogoSearchFilter />
      <div>
        <div className="h-4 w-screen bg-[#F3F8F6] xl:hidden"></div>
      </div>
      <LogoSearchResult trademarks={trademarks} total={totalCount} />
    </div>
  );
};

export default LogoSearchPage;
