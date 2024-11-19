import { NextApiRequest, NextApiResponse } from "next";
import { uploadLogo } from "@/utils/s3";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    if (req.body.imageUrl) {
      const result = await uploadLogo(req.body.imageUrl, "pc");
      return res.status(200).json({ message: "req.body is ok", url: result });
    } else {
      return res.status(404).json({ message: "not found url" });
    }
  } else {
    return res.status(500).json({ message: "not method" });
  }
}
