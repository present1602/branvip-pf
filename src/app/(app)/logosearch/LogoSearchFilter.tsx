import React, { FC } from "react";
import SearchTMInput from "@/app/(app)/logosearch/SearchTMInput";
import IconCircle from "../../../../public/renewal/assets/svg/icons/circle01";
import IconStar from "../../../../public/renewal/assets/svg/icons/star01";
import IconColor from "../../../../public/renewal/assets/svg/icons/color";
import IconMenu01 from "../../../../public/renewal/assets/svg/icons/menu01";
import TokenItems from "@/app/(app)/logosearch/Token/TokenItems";
import { productTypeService } from "@/services/product-type.service";
import { labelService } from "@/services/label.service";
import { viennaService } from "@/services/vienna.service";
import MoodFilter from "@/components/v3/components/Select/MoodFilter";
import DiagramFilter from "@/components/v3/components/Select/DiagramFilter";
import StatusFilter from "@/components/v3/components/Select/StatusFilter";
import ProductFilter from "@/components/v3/components/Select/ProductFilter";
import ColorFilter from "@/components/v3/components/Select/ColorFilter";

const LogoSearchFilter = async () => {
  const productTypes = await productTypeService.getAllProductTypes();
  const productOptions = productTypes.map((productType) => ({
    label: productType.title,
    value: productType.code,
  }));

  const colors = await labelService.getAllColors();
  const colorsOptions = colors.map((color) => ({
    label: color.title ?? "",
    value: color.id.toString(),
    imageUrl: color.imageUrl ?? "",
  }));

  const codes = await viennaService.getAllViennaCodes();
  const codeOptions = codes.map((code) => ({
    label: code.title ?? "",
    value: code.code,
  }));

  const moods = await labelService.getAllMoods();
  const moodsOptions = moods.map((mood) => ({
    label: mood.title ?? "",
    value: mood.id.toString(),
    imageUrl: mood.imageUrl ?? "",
  }));

  const allOptions = [productOptions, colorsOptions, codeOptions, moodsOptions];

  return (
    <div className="flex w-screen flex-col gap-4 xl:w-[1350px]">
      <div className="flex items-center justify-between  overflow-x-auto scrollbar-hide">
        <div className="inline-flex h-auto gap-[10px]  py-[10px] ">
          <StatusFilter label={"출원"} fontSize={50} type={"chip"} />
          <ProductFilter
            label={"업종"}
            fontSize={50}
            icon={<IconMenu01 />}
            options={productOptions}
          />
          <ColorFilter
            label={"색상"}
            fontSize={50}
            type={"color"}
            icon={<IconColor />}
            options={colorsOptions}
          />
          <DiagramFilter
            label={"도형"}
            fontSize={50}
            icon={<IconCircle />}
            options={codeOptions}
          />
          <MoodFilter
            label={"분위기"}
            fontSize={50}
            type={"mood"}
            icon={<IconStar />}
            options={moodsOptions}
          />
        </div>
        <div className="flex w-fit items-end justify-end">
          <SearchTMInput />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <TokenItems allOptions={allOptions} />
      </div>
    </div>
  );
};

export default LogoSearchFilter;
