import { formatCurrencyKRWon } from "@/utils/formatters";
import { OrderItem } from "@prisma/client";

// export interface IOrderItem {
//     id: string;
//     title: string;
//     price: string | number;
//     feature: string[];
// }
interface IProps {
  item: OrderItem;
}
export default function OrderItemView({ item }: IProps) {
  return (
    <div className="my-6">
      <div className="body2-bold my-[16px] text-gray-600">{item.title}</div>
      <div className="mb-[16px] border-b" />
      <div className="grid gap-[16px]">
        <div className="flex items-center">
          <div className="text1-medium text-gray-600">{item.title}</div>
          <div className="flex flex-1 justify-end">
            <p>
              (부가세별도) {formatCurrencyKRWon(item.price) || item.price} 원
            </p>
          </div>
        </div>

        {item.features.map((feature: string, index: number) => {
          return (
            <div className="text1-medium gap-[16px] text-gray-600" key={index}>
              {feature}
            </div>
          );
        })}
      </div>
    </div>
  );
}
