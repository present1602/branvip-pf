import axios from "axios";

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const path = require("path");

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

export const uploadLogo = async (filePath, directory, index) => {
  try {
    const response = await axios.get(filePath, { responseType: "arraybuffer" });
    const fileContent = Buffer.from(response.data, "binary");
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const day = String(today.getDate()).padStart(2, "0");
    const today2 = `${year}-${month}-${day}`;
    const fileName = `${index}${today2}.png`;
    const params = {
      Bucket: process.env.AWS_S3_BANNER_BUCKET_NAME,
      Key: `${directory}/${fileName}`,
      Body: fileContent,
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    return `https://${process.env.AWS_S3_BANNER_BUCKET_NAME}.s3.ap-northeast-2.amazonaws.com/${directory}/${fileName}`;
  } catch (e) {
    console.error("file read error", e);
    throw e;
  }
};
export const uploadBanner = async (filePath, directory) => {
  try {
    const absolutePath = path.join(filePath);
    const fileContent = fs.readFileSync(absolutePath);
    const fileName = path.basename(filePath);
    const params = {
      Bucket: process.env.AWS_S3_BANNER_BUCKET_NAME,
      Key: `${directory}/${fileName}`,
      Body: fileContent,
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    return `https://${process.env.AWS_S3_BANNER_BUCKET_NAME}.s3.ap-northeast-2.amazonaws.com/${directory}/${fileName}`;
  } catch (e) {
    console.error("file read error", e);
    throw e;
  }
};

module.exports = {
  uploadBanner,
  uploadLogo,
};
