import { create } from "zustand";

interface IFileInfo {
  fileName: string;
  fileSize: string;
  imageUrl: string;
  previewImage: string;
}
interface IUploadLogoStore {
  files: IFileInfo[];
  addFile: (file: IFileInfo) => void;
  clearFiles: () => void;
  removeFile: (fileName: string) => void; // 새로운 메서드 추가
}

export const useUploadLogoStore = create<IUploadLogoStore>((set) => ({
  files: [],
  addFile: (file: IFileInfo) =>
    set((state) => ({ files: [...state.files, file] })),
  removeFile: (fileName: string) =>
    set((state) => ({
      files: state.files.filter((file) => file.fileName !== fileName),
    })),
  clearFiles: () => set({ files: [] }),
}));
