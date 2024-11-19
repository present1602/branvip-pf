"use client";

import React from "react";
import { useReqStore } from "@/hooks/req.store";
import { useEffectOnce } from "react-use";
import { useToast } from "@/components/ui/use-toast";
export interface ILogoCardProps {
  logoImagePath: string;
  children: React.ReactElement;
}

const LogoCard: React.FC<ILogoCardProps> = ({ logoImagePath, children }) => {
  const { order, setOrder } = useReqStore();
  const [checked, setChecked] = React.useState<boolean>();
  const { toast } = useToast();

  const handleCheck = () => {
    if (checked) {
      setOrder({
        ...order,
        recommendLogoImagePath: (
          order?.recommendLogoImagePath as string[]
        ).filter((url) => url !== logoImagePath),
      });
      setChecked(false);
    } else {
      if ((order?.recommendLogoImagePath as string[]).length >= 3) {
        toast({
          title: "로고는 최대 3개까지 선택이 가능합니다",
        });
      } else {
        setOrder({
          ...order,
          recommendLogoImagePath: [
            ...(order?.recommendLogoImagePath as string[]),
            logoImagePath,
          ],
        });
        setChecked(true);
      }
    }
  };

  useEffectOnce(() => {
    (order?.recommendLogoImagePath as string[]).some(
      (logo: string) => logo === logoImagePath
    )
      ? setChecked(true)
      : setChecked(false);
  });
  return (
    <div
      className={`relative flex min-h-[100px] min-w-[100px] items-center justify-center rounded-xl border ${
        checked && `border-gray_scale-800`
      } `}
      onClick={handleCheck}
    >
      {children}
      <div className="absolute right-4 top-4">
        <input
          aria-labelledby="test"
          type={"checkbox"}
          aria-label="CheckLogo"
          className="custom-checkbox"
          checked={checked}
          onChange={handleCheck}
        ></input>
      </div>
    </div>
  );
};

export default LogoCard;
