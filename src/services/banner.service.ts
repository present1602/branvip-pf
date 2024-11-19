import { db } from "@/utils/db";
import { Prisma } from "@prisma/client";

interface IBannerInfoProps {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  imageUrlPc: string;
  imageUrlMobile: string;
  link: string;
}

class BannerService {
  async updateBanner(data: any, bannerId: number) {
    console.log(data);
    return db.banner.update({
      where: {
        id: bannerId,
      },
      data,
    });
  }

  async getBanner(id: number) {
    return db.banner.findUnique({
      where: {
        id: id,
      },
    });
  }
  async createBanner(bannerInfo: IBannerInfoProps) {
    return db.banner.create({ data: bannerInfo });
  }

  async getAllBanners() {
    const getBannerStatus = (startDate: Date, endDate: Date): string => {
      const today = new Date();

      endDate.setDate(endDate.getDate() + 1);
      endDate.setHours(0, 0, 0, 0); // 종료 날짜의 시간을 00:00:00.000으로 설정

      if (today < startDate) {
        return "진행 대기중";
      } else if (today >= startDate && today <= endDate) {
        return "진행중";
      } else {
        return "진행 종료";
      }
    };

    const banners = await db.banner.findMany({
      orderBy: {
        id: "desc" as Prisma.SortOrder,
      },
    });
    return banners.map((banner) => ({
      ...banner,
      status: getBannerStatus(
        new Date(banner.startDate),
        new Date(banner.endDate)
      ),
    }));
  }

  async deleteBanner(id: number) {
    return db.banner.delete({
      where: {
        id: id,
      },
    });
  }
}

export const bannerService = new BannerService();
