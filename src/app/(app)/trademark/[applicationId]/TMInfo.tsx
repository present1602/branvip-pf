import TMTitleAndStatus from "@/app/(app)/trademark/[applicationId]/TMTitleAndStatus";
import TMDetail from "@/app/(app)/trademark/[applicationId]/TMDetail";
import TMDetailInfo from "@/app/(app)/trademark/[applicationId]/TMDetailInfo";
import { ITrademarkDetail } from "@/interfaces";

export interface TMProps {
  tm: ITrademarkDetail;
  sectors?: unknown[];
}

const TMInfo = ({ tm }: TMProps) => {
  return (
    <div className="flex flex-col">
      <TMTitleAndStatus tm={tm} />
      <TMDetail tm={tm} />
      <div className="mt-16 h-4 bg-primary_colorless-70 xl:hidden"></div>
      <div className="heading1 mt-[36px] hidden xl:inline">상표정보</div>
      <TMDetailInfo tm={tm} />
    </div>
  );
};

export default TMInfo;
