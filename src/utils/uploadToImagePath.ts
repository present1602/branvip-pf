import axios from "axios";

export const uploadToImagePath = async (imagePath: string) => {
  const fileType = "image/png";

  const res = await fetch(
    `/api/upload-image?imagePath=${imagePath}&fileType=${fileType}`
  );

  const { url, fields, path } = await res.json();

  const formData = new FormData();

  Object.entries({ ...fields, imagePath }).forEach(([key, value]) => {
    formData.append(key, value as string);
  });

  const upload = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (upload.ok) {
    // 상용버킷
    const location =
      "https://branvip-images.s3.ap-northeast-2.amazonaws.com/" + path;
    // 개발버킷
    // const location =
    // "https://branvip-dev-images.s3.ap-northeast-2.amazonaws.com/" + path;
    return location;
  } else {
    console.error("Upload failed.");
  }
};
