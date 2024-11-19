import { NextApiRequest, NextApiResponse } from "next";
import { userService } from "@/services/user.service";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    console.log(req.body);
    try {
      const result = await userService.createApplicant(req.body);
      return res.status(200).json({ data: req.body });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "An error occurred." });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default handler;
