import { create } from "zustand";
const initialState = {
  name: "",
  phoneNumber: "",
  email: "",
  option: "1",
  orderId: "",
  patentCustomerNumber: "",
  nameEn: "",
  registerNumber: "",
  address: "",
  addressDetail: "",
  addressPostCode: "",
  signatureUrl: "",
  bizRegistrationNumber: "",
  corpRegistrationNumber: "",
  companyName: "",
  companyNameEn: "",
  ownerPhoneNumber: "",
  ownerEmail: "",
  type: "",
  id: "",
};
interface ApplicantsStore {
  name: string;
  setName: (name: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  email: string;
  setEmail: (email: string) => void;
  option: string;
  setOption: (option: string) => void;
  orderId: string;
  setOrderId: (orderId: string) => void;
  patentCustomerNumber: string;
  setPatentCustomerNumber: (patentCustomerNumber: string) => void;
  nameEn: string;
  setNameEn: (nameEn: string) => void;
  registerNumber: string;
  setRegisterNumber: (registerNumber: string) => void;
  address: string;
  addressDetail: string;
  setAddress: (address: string) => void;
  setAddressDetail: (addressDetail: string) => void;
  addressPostCode: string;
  setAddressPostCode: (addressPostCode: string) => void;
  signatureUrl: string;
  setSignatureUrl: (signatureUrl: string) => void;
  bizRegistrationNumber: string;
  corpRegistrationNumber: string;
  setCorpRegistrationNumber: (corpRegistrationNumber: string) => void;
  setBizRegistrationNumber: (bizRegistrationNumber: string) => void;
  companyName: string;
  companyNameEn: string;
  setCompanyName: (companyName: string) => void;
  setCompanyNameEn: (companyNameEn: string) => void;
  ownerPhoneNumber: string;
  setOwnerPhoneNumber: (ownerPhoneNumber: string) => void;
  ownerEmail: string;
  setOwnerEmail: (ownerEmail: string) => void;
  type: string;
  setType: (type: string) => void;
  id?: string;
  setId: (id: string) => void;
  reset: () => void; // reset 함수 추가
}

export const useApplicantsStore = create<ApplicantsStore>((set) => ({
  name: "",
  phoneNumber: "",
  email: "",
  option: "1",
  orderId: "",
  patentCustomerNumber: "",
  nameEn: "",
  registerNumber: "",
  address: "",
  addressDetail: "",
  addressPostCode: "",
  signatureUrl: "",
  bizRegistrationNumber: "",
  corpRegistrationNumber: "",
  companyName: "",
  companyNameEn: "",
  ownerPhoneNumber: "",
  ownerEmail: "",
  type: "",
  id: "",

  setName: (name) => set({ name }),
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setEmail: (email) => set({ email }),
  setOption: (option) => set({ option }),
  setOrderId: (orderId) => set({ orderId }),
  setPatentCustomerNumber: (patentCustomerNumber) =>
    set({ patentCustomerNumber }),
  setNameEn: (nameEn) => set({ nameEn }),
  setRegisterNumber: (registerNumber) => set({ registerNumber }),
  setAddress: (address) => set({ address }),
  setAddressDetail: (addressDetail) => set({ addressDetail }),
  setAddressPostCode: (addressPostCode) => set({ addressPostCode }),
  setSignatureUrl: (signatureUrl) => set({ signatureUrl }),
  setBizRegistrationNumber: (bizRegistrationNumber) =>
    set({ bizRegistrationNumber }),
  setCorpRegistrationNumber: (corpRegistrationNumber) =>
    set({ corpRegistrationNumber }),
  setCompanyName: (companyName) => set({ companyName }),
  setCompanyNameEn: (companyNameEn) => set({ companyNameEn }),
  setOwnerPhoneNumber: (ownerPhoneNumber) => set({ ownerPhoneNumber }),
  setOwnerEmail: (ownerEmail) => set({ ownerEmail }),
  setType: (type) => set({ type }),
  setId: (id) => set({ id }),
  reset: () => set(initialState),
}));
