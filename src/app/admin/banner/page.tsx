import React, { FC } from "react";
import { bannerService } from "@/services/banner.service";
import BannerManagement from "@/app/admin/banner/BannerManagement";

const BannerManagePage: FC = async () => {

  const banners = await bannerService.getAllBanners();
  return (
      <BannerManagement banners={banners}/>
  );
};

export default BannerManagePage;