import { Order, OrderItem, UserApplicant } from "@prisma/client";
import OrderItemView from "./OrderItemView";
import { joinStringArrayWithDelimeter } from "@/utils/dataHelpers";
import { formatCurrencyKRWon } from "@/utils/formatters";
import { twMerge } from "tailwind-merge";
import { v4 } from "uuid";

interface IProps {
  data: Order & {
    items: OrderItem[];
    applicant: UserApplicant | null;
  };
  isContentOpen: boolean;
}

export default function OrderInfo({ data, isContentOpen }: IProps) {

  const totalVAT = Math.floor((data.finalPaymentPrice - data.tenPercentDiscountAmount) * 0.1);

  return (
    <div
      className={twMerge(
        "flex flex-col rounded px-[17px] py-6 shadow-md",
        isContentOpen ? "block" : "hidden"
      )}
    >
      <div className="mb-5 flex items-center">
        <p className="body2-bold text-gray-800">상표유형</p>
        <p className="flex flex-1 justify-end">
          {" "}
          {data.isWordmarkIncluded && "이름"} {data.isLogoIncluded && "로고"}{" "}
        </p>
      </div>
      <div className="mb-5 flex items-center">
        <p className="body2-bold text-gray-800">분위기</p>
        <p className="flex flex-1 justify-end">
          {joinStringArrayWithDelimeter(data.selectedMoods)}
        </p>
      </div>
      <div className="mb-5">
        <p className="body2-bold mb-4 text-gray-800">상품분류</p>
        <div className="grid gap-5 bg-gray-50 p-5">
          {data.productTypeCodes.length > 0 &&
            data.productTypeCodes.map((element: string) => {
              const code = element.substring(0, 4);
              const label = element.substring(5, element.length);
              return (
                <div
                  key={v4()}
                >
                  <span className="text-primary_scale-70">{code}</span>
                  <span className=" text-gray_scale-800 px-2">{label}</span>
                </div>
              );
            })}


        </div>
      </div>
      <div className="mb-[30px] border-b" />

      <div>
        <div className="body2-bold text-gray-800">
          검토+로고디자인+출원 서비스 상세 내역
        </div>
        {data.items &&
          data.items.length > 0 &&
          data.items.map((item) => {
            return <OrderItemView item={item} key={v4()} />;
          })}
      </div>

      <div className="mb-[30px] border-b" />

      {data.priorityScreening.length > 0 && (
        <>
          <div className="mb-5">
            <p className="body2-bold mb-4 text-gray-800">우선심사</p>
            <div className="grid gap-5 bg-gray-50 p-5">
              {data.priorityScreening.map((element: string) => {
                const code = element.substring(0, 4);
                const label = element.substring(5, element.length);
                return (
                  <div
                    key={v4()}
                  >
                    <span className="text-primary_scale-70">{code}</span>
                    <span className=" text-gray_scale-800 px-2">{label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mb-[30px] border-b" />
        </>
      )}
      <div className="mb-[30px]">
        <div className="body2-bold mb-[16px] text-gray-800">결제 상세</div>

        <div className="grid gap-[16px]">
          <div className="flex items-center">
            <div className="text1-medium text-[#FF5457]">할인 올인원 10%</div>
            <div className="flex flex-1 justify-end">
              {formatCurrencyKRWon(data.tenPercentDiscountAmount)} 원
            </div>
          </div>

          <div className="flex items-center">
            <div className="text1-medium text-gray-600">부가세</div>
            <div className="flex flex-1 justify-end">
              {totalVAT || 0}원
            </div>
          </div>

          <div className="flex items-center">
            <div className="text1-medium text-gray-600">합계</div>
            <div className="flex flex-1 justify-end">
              {data.finalPaymentPrice}원
            </div>
          </div>

          {/* 
          데이터확인용(디버거 사용방법몰라서)
          <div className="flex items-center">
            <div className="text1-medium text-gray-600">데이터</div>
            <div className="flex flex-1 justify-end">
              {JSON.stringify(data)}
            </div>
          </div> */}

        </div>
      </div>

      <div className="border-b" />

      <div className="my-5">
        <div className="flex items-center">
          <div className="heading2 text-gray-800">
            총 합계 결제금액(VAT 포함)
          </div>
          <div className="flex flex-1 justify-end">
            {formatCurrencyKRWon(data.tenPercentDiscountAmount)} 원
          </div>
        </div>

        <div className="rounded bg-gray-50 p-[16px]">
          <p className="caption2-semibold">
            • 총 결제금액에는 당소 수수료 외 특허청 관납료가 포함되어 있으며,
            세금계산서는 수수료에 대해서만 발행됩니다.
          </p>
          <p className="caption2-semibold">
            • 상표를 사용 하실 상품이나 서비스가 시기상 잘 알려지지 않은 업종일
            경우(ex 2019년 기준, 메타버스 관련 사업 등) 비고시 명칭 상품으로,
            특허청 관납료가 6,000원 추가 청구 됩니다.
          </p>
          <p className="caption2-semibold">
            • 정부지원사업 시 세금계산서 발행가능 금액을 꼭 확인하세요.
          </p>
        </div>
      </div>
    </div>
  );
}
