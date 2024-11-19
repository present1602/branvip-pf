import type { NextApiRequest, NextApiResponse } from "next";
import formidable, { Formidable } from "formidable";
import * as fs from "fs";
import * as os from "os";
import { bannerService } from "@/services/banner.service";
import { uploadBanner } from "@/utils/s3";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const form = new Formidable({
      uploadDir: os.tmpdir(),
      keepExtensions: true,
      multiples: true, // 파일이 여러개일 경우를 대비해 추가
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Form parse error", error: err });
      }

      const { title, description, startDate, endDate, link } = fields;
      // 필드가 배열로 반환될 수 있으므로 단일 값으로 변환
      const getField = (field: string | string[] | undefined): string => {
        if (Array.isArray(field)) {
          return field[0];
        }
        return field ?? "";
      };

      const pcFile = files.pcFile as formidable.File | formidable.File[];
      const mobileFile = files.mobileFile as
        | formidable.File
        | formidable.File[];

      const getSingleFile = (
        file: formidable.File | formidable.File[] | undefined
      ): formidable.File | undefined => {
        if (Array.isArray(file)) {
          return file[0];
        }
        return file;
      };

      const pcSingleFile = getSingleFile(pcFile);
      const mobileSingleFile = getSingleFile(mobileFile);

      if (!pcSingleFile || !mobileSingleFile) {
        res.status(400).json({ message: "PC or Mobile file not uploaded" });
        return;
      }

      try {
        const pcUploadResult = await uploadBanner(pcSingleFile?.filepath, "pc");
        const mobileUploadResult = await uploadBanner(
          mobileSingleFile?.filepath,
          "mobile"
        );

        const bannerInfo = {
          title: getField(title),
          description: getField(description),
          startDate: new Date(getField(startDate)),
          endDate: new Date(getField(endDate)),
          imageUrlPc: pcUploadResult,
          imageUrlMobile: mobileUploadResult,
          link: getField(link),
        };

        const banner = await bannerService.createBanner(bannerInfo);

        // 업로드된 파일 삭제 (선택 사항)
        if (pcSingleFile) {
          fs.unlinkSync(pcSingleFile.filepath);
        }
        if (mobileSingleFile) {
          fs.unlinkSync(mobileSingleFile.filepath);
        }

        res.status(200).json({
          message: "Files uploaded successfully",
          pcUrl: pcUploadResult,
          mobileUrl: mobileUploadResult,
          banner,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "File upload failed", error: error });
      }
    });
  } else if (req.method == "PATCH") {
    const form = new Formidable({
      uploadDir: os.tmpdir(),
      keepExtensions: true,
      multiples: true, // 파일이 여러개일 경우를 대비해 추가
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Form parse error", error: err });
      }

      const { id, title, description, startDate, endDate, link } = fields;

      const getField = (field: string | string[] | undefined): string => {
        if (Array.isArray(field)) {
          return field[0];
        }
        return field ?? "";
      };
      const bannerInfo: any = {};

      const bannerId = getField(id);

      if (getField(title).length > 0) {
        bannerInfo.title = getField(title);
      }

      if (getField(description).length > 0) {
        bannerInfo.description = getField(description);
      }

      if (getField(startDate).length > 1) {
        bannerInfo.startDate = new Date(getField(startDate));
      }

      if (getField(endDate).length > 1) {
        bannerInfo.endDate = new Date(getField(endDate));
      }

      if (getField(link).length > 1) {
        bannerInfo.link = getField(link);
      }

      const pcFile = files.pcFile as formidable.File | formidable.File[];
      const mobileFile = files.mobileFile as
        | formidable.File
        | formidable.File[];

      const getSingleFile = (
        file: formidable.File | formidable.File[] | undefined
      ): formidable.File | undefined => {
        if (Array.isArray(file)) {
          return file[0];
        }
        return file;
      };

      const pcSingleFile = pcFile ? getSingleFile(pcFile) : undefined;
      const mobileSingleFile = mobileFile
        ? getSingleFile(mobileFile)
        : undefined;

      const pcUploadResult = pcSingleFile
        ? await uploadBanner(pcSingleFile?.filepath, "pc")
        : undefined;
      const mobileUploadResult = mobileSingleFile
        ? await uploadBanner(mobileSingleFile?.filepath, "mobile")
        : undefined;

      if (pcUploadResult) {
        bannerInfo.imageUrlPc = pcUploadResult;
      }

      if (mobileUploadResult) {
        bannerInfo.imageUrlMobile = mobileUploadResult;
      }

      try {
        const banner = await bannerService.updateBanner(
          bannerInfo,
          Number(bannerId)
        );
        res.status(200).json({ message: "Banner Update successfully", banner });
      } catch (e) {
        console.error(e);
      } finally {
        if (pcSingleFile) {
          fs.unlinkSync(pcSingleFile.filepath);
        }
        if (mobileSingleFile) {
          fs.unlinkSync(mobileSingleFile.filepath);
        }
      }
      return res.status(200).json({ message: "test" });
    });
  } else if (req.method == "DELETE") {
    const { id } = req.query;
    try {
      const result = await bannerService.deleteBanner(Number(id));
    } catch (e) {
      console.error(e);
      return res
        .status(500)
        .json({ message: "Banner delete failed", error: e });
    }
    res.status(200).json({ message: `Banner with id ${id} deleted` });
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
