"use client"

import { Label, TextInput } from "@/components/ui";
import BasicUIButton from "@/components/v3/components/BUI/Button/BasicUIButton";
import { UserApplicant, ApplicantType } from "@prisma/client";
import Image from "next/image";
// import { FileUploader } from "./SignitureFileUploaderView";


//  등록/수정폼(IndividualApplicantForm)과 
// 동일하나 state값들 처리하는 부분들 다 필요없고 placeholder도 굳이 넘겨주기보단 분리하는 편이 나을 것 같아 분리함
interface IProps {
    applicant: UserApplicant;
    isContentOpen: boolean;
}

const IndividualApplicantReadOnly = ({ applicant, isContentOpen }: IProps) => {
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
                        // onClick={() => alert("특허고객번호는 직접 입력하실 수 없습니다. 특허고객번호는 올인원 의뢰에서 입력할 수 있습니다.")} >
                        onClick={() => alert("특허고객번호는 올인원 의뢰 시에만 직접 입력 가능하고 여기에서는 직접 입력하실 수 없습니다.\n특허고객번호 없이 양식 작성 후 관리자에게 문의해주세요.")} >
                        <TextInput
                            placeholder="특허고객번호"
                            className="bg-gray-50"
                            readOnly={true}
                            value={applicant?.applicantNumber || ''}
                        />
                    </span>
                </Label>

                <div className="grid md:grid-cols-2 gap-2 mb-[30px]">

                    <Label label="한글 이름" required={true}>
                        <TextInput
                            placeholder=""
                            readOnly={true}
                            value={applicant?.name || ''}
                        />
                    </Label>

                    <Label label="영문 이름" >
                        <TextInput
                            placeholder=""
                            readOnly={true}
                            value={applicant?.nameEn || ''}
                        />
                    </Label>

                </div>

                <div className="grid md:grid-cols-2 gap-2 mb-[30px]">

                    <Label label="주민등록번호" >
                        <TextInput
                            placeholder=""
                            readOnly={true}
                            value={applicant?.registerNumber || ''}
                        />
                    </Label>

                    <Label label="이메일" required={true}>
                        <TextInput
                            placeholder=""
                            readOnly={true}
                            value={applicant?.email || ''}
                        />
                    </Label>
                </div>

                <Label label="휴대폰번호" required={true} className="mb-[30px]">
                    <TextInput
                        placeholder=""
                        readOnly={true}
                        value={applicant?.phoneNumber || ''}
                    />
                </Label>

                <Label label="주민등록상 주소" className="mb-[30px]">
                    <div className="flex align-center gap-3 ">
                        <div className="flex-1">
                            <TextInput
                                placeholder=""
                                readOnly={true}
                                value={applicant?.address || ''}
                            />
                        </div>
                    </div>

                    <TextInput
                        placeholder=""
                        readOnly={true}
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

export default IndividualApplicantReadOnly
