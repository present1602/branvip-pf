import { kiprisService } from "@/services";
import TMInfo from "@/app/(app)/trademark/[applicationId]/TMInfo";

interface ITrademarkDetailPageProps {
  params: {
    applicationId: string;
  };
}

const TMDetailPage = async ({
  params: { applicationId },
}: ITrademarkDetailPageProps) => {
  let tm;

  try {
    tm = await kiprisService.getTrademarkDetail(applicationId);
  } catch (err) {
    console.log("tm 상표정보를 불러옵니다", tm);
    console.error("상표 정보를 가져오지 못했습니다", err);
  }

  return (
    <>
      <div className="flex flex-col">{tm && <TMInfo tm={tm} />}</div>
    </>
  );
};

export default TMDetailPage;
