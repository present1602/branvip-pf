import { bannerService } from "@/services/banner.service";
import { redirect } from "next/navigation";
import BannerEdit from "@/app/admin/banner/[bannerId]/BannerEdit";

interface IBannerEditProps{
  params:{
    bannerId:string;
  }
}

const bannerEditPage = async ({params: {bannerId}}:IBannerEditProps) => {

  const banner = await bannerService.getBanner(Number(bannerId))

  if(banner){
    return(
      <BannerEdit banner={banner}/>
    )
  }else{
    return redirect('/admin/banner')
  }

}

export default bannerEditPage;