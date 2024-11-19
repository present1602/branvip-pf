import { UserApplicant } from "@prisma/client";
import { create } from "zustand";

interface ApplicantStore {
  applicant?: Partial<UserApplicant>;
  setApplicant: (applicant: Partial<UserApplicant>) => void;

  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

export const useApplicantStore = create<ApplicantStore>((set, get) => ({
  applicant: undefined,
  setApplicant: (applicant) => set({ applicant }),

  isEditing: false,
  setIsEditing: (isEditing) => set({ isEditing }),
}));

interface CompanyApplicantStore {
  applicant?: Partial<UserApplicant>;
  setApplicant: (applicant: Partial<UserApplicant>) => void;

  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

export const useCompanyApplicantStore = create<CompanyApplicantStore>((set, get) => ({
  applicant: undefined,
  setApplicant: (applicant) => set({ applicant }),

  isEditing: false,
  setIsEditing: (isEditing) => set({ isEditing }),
}));
