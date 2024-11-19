import { NextResponse } from "next/server";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { Conditions } from "@aws-sdk/s3-presigned-post/dist-types/types";
import { S3Client } from "@aws-sdk/client-s3";

const accessKeyId = process.env.AWS_S3_ACCESS_KEY;
const secretAccessKey = process.env.AWS_S3_SECRET_KEY;

if (!accessKeyId || !secretAccessKey) {
  throw new Error("Missing AWS credentials");
}

const s3Client = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const imagePath = searchParams.get("imagePath");
  const fileType = searchParams.get("fileType");

  const tenMegabytes = 1024 * 1024 * 10;
  const key = `upload/${Date.now()}-${imagePath}`;

  if (!imagePath || !fileType) {
    return NextResponse.json(
      { error: "Missing file or fileType" },
      { status: 400 }
    );
  }

  const params = {
    Bucket: "branvip-images",
    Key: key,
    Conditions: [
      { acl: "public-read" } as Conditions,
      ["content-length-range", 0, tenMegabytes] as Conditions,
    ],
    Fields: {
      "Content-Type": fileType,
      acl: "public-read",
    },
    Expires: 60,
  };

  try {
    const post = await createPresignedPost(s3Client, params);

    return NextResponse.json({ ...post, path: key });
  } catch (e) {
    return NextResponse.json(
      { error: "Error creating presigned URL" },
      { status: 500 }
    );
  }
};
