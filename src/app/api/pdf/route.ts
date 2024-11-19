import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const pdfUrl = req.nextUrl.searchParams.get("url");

  console.log("get pdf", pdfUrl);

  if (!pdfUrl) {
    throw new Error("No url param provided");
  }

  const res = await fetch(pdfUrl);
  const pdf = await res.arrayBuffer();
  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Length": pdf.byteLength.toString(),
    },
  });
};
