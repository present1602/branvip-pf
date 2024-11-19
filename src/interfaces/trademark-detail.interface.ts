import { Label } from "@prisma/client";

export interface ITrademarkDetail {
  administrativeMeasureInfo: IAdministrativeMeasureInfo[];
  biblioSummaryInfo: IBiblioSummaryInfo[];
  asignProduct: IAsignProduct[];
  agentInfo: IAgentInfo[];
  applicantInfo: IApplicantInfo[];
  sampleImageInfo: ISampleImageInfo[];
  similarityCodeInfo: ISimilarityCodeInfo[];
  vfersionInfo: IVfersionInfo[];
  viennaCodeInfo: IViennaCodeInfo[];
  similarTrademarks: ISimilarTrademark[];
  publicationInfo: IPublicationInfo[];
  rejectPdfUrl?: string;
  moods?: Label[];
  colors?: Label[];
}

export interface IPublicationInfo {
  path: string[];
  pdfName: string[];
}
export interface ISimilarTrademark {
  application_number: string;
  image_url: string;
  status: string;
}

export interface IAdministrativeMeasureInfo {
  processStateCode: string[];
  receiptSendDate: string[];
  receiptSendDocumentEngName: string[];
  receiptSendDocumentName: string[];
  receiptSendNumber: string[];
  seq: string[];
}

export interface IBiblioSummaryInfo {
  appReferenceNumber: string[];
  applicationDate: string[];
  applicationNumber: string[];
  classVersion: string[];
  designateDate: string[];
  familyFlag: string[];
  imageFlag: string[];
  internationalRegisterDate: string[];
  internationalRegisterNumber: string[];
  lastDisposalCode: string[];
  lastDisposalDate: string[];
  originalApplicationFlag: string[];
  priorityFlag: string[];
  productName: string[];
  productNameEng: string[];
  publicationDate: string[];
  publicationFlag: string[];
  publicationNumber: string[];
  rePublicationFlag: string[];
  regReferenceNumber: string[];
  registerFlag: string[];
  registerStatus: string[];
  registrationDate: string[];
  registrationNumber: string[];
  registrationPublicDate: string[];
  registrationPublicGazetteFlag: string[];
  registrationPublicNumber: string[];
  retroDate: string[];
  retroDivisionCode: string[];
  tmDivisionCode: string[];
  tmNameAcquisitionDate: string[];
  trademarkDivisionCode: string[];
  trlFlag: string[];
}

export interface IAsignProduct {
  mainCode: string[];
  productName: string[];
  productNameEng: string[];
  seq: string[];
  subCode: string[];
}

export interface IAgentInfo {
  agentAddress: string[];
  agentCode: string[];
  nameKoreanLong: string[];
  nationalCode: string[];
  seq: string[];
}

export interface IApplicantInfo {
  applicantAddress: string[];
  applicantCode: string[];
  nameKoreanLong: string[];
  nationalCode: string[];
  seq: string[];
}

export interface ISampleImageInfo {
  imageName: string[];
  path: string[];
  smallPath: string[];
}

export interface ISimilarityCodeInfo {
  similarCode: string[];
}

export interface IVfersionInfo {
  cd: string[];
  enNm: string[];
  koNm: string[];
  ver: string[];
}

export interface IViennaCodeInfo {
  viennaCode: string[];
  viennaCodeDescription: string[];
}
