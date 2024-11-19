import { Order, OrderItem } from "@prisma/client";
import React from "react";

interface IProps {
  order: Order & {
    items: OrderItem[];
  };
}

export default function OrderPriceInfo({ order }: IProps) {
  return (
    <ul className="grid gap-2">
      {order.items.map((item, i) => {
        return (
          <ListItem
            key={i}
            title={item.title}
            value={
              formatPrice(item.price) +
              (item.type !== "DESIGN" && !!order.applicationMultiplier
                ? ` x ${order.applicationMultiplier} 개`
                : "")
            }
          />
        );
      })}
      {!!order.tenPercentDiscountAmount && (
        <ListItem
          title="10% 할인"
          value={"-" + formatPrice(order.tenPercentDiscountAmount)}
        />
      )}
      {!!order.totalPatentOfficeFee && (
        <ListItem
          title="특허청 수수료"
          value={formatPrice(order.totalPatentOfficeFee)}
        />
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-end">
          <span className="font-bold text-surface-900 pc:text-lg">
            결제 금액
          </span>
          <span className="mb-1 text-sm text-surface-900">(VAT 포함)</span>
        </div>
        <span className="text-lg font-bold text-primary-400 pc:text-xl">
          {formatPrice(order.finalPaymentPrice)}
        </span>
      </div>
    </ul>
  );
}

function formatPrice(price: number) {
  return price.toLocaleString("ko-KR") + "원";
}

function ListItem({ title, value }: { title: string; value: string }) {
  return (
    <li className="flex justify-between">
      <span className="font-bold text-surface-500">{title}</span>
      <span className="font-medium text-surface-500">{value}</span>
    </li>
  );
}
