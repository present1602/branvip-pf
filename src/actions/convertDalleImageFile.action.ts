"use server";
import { uploadLogo } from "@/utils/s3";

export default async function convertDalleImageFile(imageUrl: string, index: number) {
  const result = await uploadLogo(imageUrl, "pc", index);
  return result;
}
