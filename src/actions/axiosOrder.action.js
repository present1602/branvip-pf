'use server'

import { getServerUserOrRedirect } from "@/actions/authAction";
import { userService } from "@/services/user.service";
import { axiosPaypleService } from "@/services/axiosPayple.service";

export async function createAxiosOrder(){
  const { id } = await getServerUserOrRedirect()
  const user = await userService.getUserProfileOrThrow(id)

  await axiosPaypleService.requestPayplePay();
}