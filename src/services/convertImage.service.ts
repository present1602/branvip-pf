import axios from "axios";

class ConvertImageService {
  async imageToFile(imageUrl: string) {
    const downloadImageAsFile = async (imageUrl: string): Promise<File> => {
      try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const blob = await response.blob();
        if (!blob.type.startsWith("image/")) {
          throw new Error("The requested resource is not a valid image");
        }
        const fileName = imageUrl.split("/").pop() || "downloaded_image";
        const fileType = "image/jpeg"; // 필요한 경우 다른 이미지 타입으로 변경
        return new File([blob], fileName, { type: fileType });
      } catch (error) {
        console.error("Error downloading image:", error);
        throw error;
      }
    };
  }
}
export const convertImageService = new ConvertImageService();
