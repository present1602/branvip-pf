"use client"

import { Label, TextInput } from "@/components/ui";
import { ApplicantType, Prisma, UserApplicant } from "@prisma/client";
import BasicUIButton from "@/components/v3/components/BUI/Button/BasicUIButton";
// import { FileImageView } from "./FileImageView";
import Image from "next/image";


interface IProps {
    applicant?: UserApplicant;
    isContentOpen?: boolean;
}

const CompanyApplicantFormReadOnly = ({ applicant, isContentOpen }: IProps) => {

    return (
        <div className={`${isContentOpen ? 'block' : 'hidden'}`}>
            <div className="flex my-5">
                <BasicUIButton
                    className={`mx-[5px] my-[10px] rounded px-[30px] py-[10px] text2-bold ${applicant?.type === ApplicantType.INDIVIDUAL && 'bg-gray-400 text-white'}`}
                > 개인</BasicUIButton>
                <BasicUIButton
                    className={`mx-[5px] my-[10px] rounded px-[30px] py-[10px] text2-bold ${applicant?.type === ApplicantType.COMPANY && 'bg-gray-500 text-white'}`}
                > 법인</BasicUIButton>
            </div>

            <fieldset>
                <Label label="특허고객번호" className="mb-[30px]">
                    <span
                        onClick={() => alert("특허고객번호는 올인원 의뢰 시에만 직접 입력 가능하고 여기에서는 직접 입력하실 수 없습니다.\n특허고객번호 없이 양식 작성 후 관리자에게 문의해주세요.")} >
                        <TextInput
                            placeholder="특허고객번호"
                            className="bg-gray-50"
                            readOnly={true}
                            value={applicant?.applicantNumber || ''}
                        />
                    </span>
                </Label>

                <div className="grid grid-cols-2 gap-2 mb-[30px]">
                    <Label label="회사명 (한글)" required={true}>
                        <TextInput
                            placeholder="-를 제외하고 입력"
                            readOnly={true}
                            value={applicant?.companyName || ''}
                        />
                    </Label>
                    <Label label="회사명 (영문)" >
                        <TextInput
                            placeholder="-를 제외하고 입력"
                            readOnly={true}
                            value={applicant?.companyNameEn || ''}
                        />
                    </Label>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-[30px]">
                    <Label label="사업자등록번호" >
                        <TextInput
                            placeholder=""
                            readOnly={true}
                            value={applicant?.bizRegistrationNumber || ''}
                        />
                    </Label>
                    <Label label="법인등록번호" >
                        <TextInput
                            placeholder=""
                            readOnly={true}
                            value={applicant?.corpRegistrationNumber || ''}
                        />
                    </Label>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-[30px]">
                    <Label label="회사 전화번호" required={true}>
                        <TextInput
                            placeholder=""
                            readOnly={true}
                            value={applicant?.phoneNumber || ''}
                        />
                    </Label>
                    <Label label="담당자 이메일" required={true}>
                        <TextInput
                            placeholder=""
                            value={applicant?.email || ''}
                        />
                    </Label>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-[30px]">
                    <Label label="대표자 성명" required={true}>
                        <TextInput
                            placeholder=""
                            value={applicant?.name || ''}
                        />
                    </Label>
                    <Label label="대표자 주민등록번호" >
                        <TextInput
                            placeholder=""
                            value={applicant?.registerNumber || ''}
                        />
                    </Label>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-[30px]">
                    <Label label="대표자 전화번호" >
                        <TextInput
                            placeholder=""
                            value={applicant?.ownerPhoneNumber || ''}
                        />
                    </Label>
                    <Label label="대표자 이메일" >
                        <TextInput
                            placeholder=""
                            value={applicant?.ownerEmail || ''}
                        />
                    </Label>
                </div>

                <Label label="법인등기부 상의 주소" className="mb-[30px]">
                    <div className="flex align-center gap-3 ">
                        <div className="flex-1">
                            <TextInput
                                placeholder=""
                                value={applicant?.address || ''}
                            />
                        </div>
                    </div>
                    <TextInput
                        placeholder=""
                        value={applicant?.addressDetail || ''}
                    />
                </Label>

                <Label label="서명 또는 인감 등록" className="">
                    <div className="py-[26px]">
                        {/* <FileImageView type={ApplicantType.COMPANY} /> */}
                        {applicant?.signatureUrl
                            ?
                            <div className="flex justify-center rounded-2xl bg-white p-4">
                                <div className="relative flex h-[200px] w-[200px] items-center justify-center">
                                    <Image
                                        src={applicant?.signatureUrl ? applicant?.signatureUrl : ''}
                                        alt="서명 이미지"
                                        width={200}
                                        height={200}
                                        objectFit="contain"
                                    />
                                </div>
                            </div>

                            :
                            <div className="flex justify-center rounded-2xl bg-white p-4">
                                <div className="relative flex py-4 items-center justify-center">
                                    등록된 서명이나 인감이 없습니다.
                                </div>
                            </div>
                        }
                    </div>
                </Label>


            </fieldset>

            <div className="border-b my-5" />
        </div>

    );
}

export default CompanyApplicantFormReadOnly