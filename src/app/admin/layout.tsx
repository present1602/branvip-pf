import { ReactNode } from "react";
import AdminHeader from "@/components/v3/components/AdminLayout/AdminHeader";
import { getServerUserOrRedirect } from "@/actions/authAction";
import { redirect } from "next/navigation";
import Nav from "@/app/admin/Nav";
import { userService } from "@/services/user.service";

interface IProps {
  children: ReactNode;
}

const AdminLayout = async ({ children }: IProps) => {
  const user = await getServerUserOrRedirect();
  if (user) {
    const dbUser = await userService.getUserProfileOrThrow(user.id);
    if (!dbUser.isAdmin) {
      console.log("어드민이 아닙니다");
      redirect("/");
    }
  } else {
    console.log("로그인이 필요합니다");
    redirect("/");
  }
  return (
    <div>
      <AdminHeader />
      <div className="flex w-full justify-center gap-[47px] bg-[#F6F6F6] pl-[20px] xl:px-[100px] 2xl:px-[320px]">
        <div className="hidden xl:inline">
          <Nav />
        </div>
        <main className="flex w-full flex-col">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
