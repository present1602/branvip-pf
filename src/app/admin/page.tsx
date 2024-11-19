import { redirect } from "next/navigation";
import { getServerUserOrRedirect } from "@/actions/authAction";

const AdminPage = async () => {
  redirect("/admin/banner");
};

export default AdminPage;
