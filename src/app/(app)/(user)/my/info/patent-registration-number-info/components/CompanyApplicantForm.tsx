"use client"

import { Label, TextArea, TextInput } from "@/components/ui";
import BasicUIButton from "@/components/v3/components/BUI/Button/BasicUIButton";
import { FileUploader } from "./SignitureFileUploader";
import { useApplicantStore, useCompanyApplicantStore } from "@/hooks/applicant.store";
import { ApplicantType, Prisma, UserApplicant } from "@prisma/client";
import { toast } from "@/components/ui/use-toast";
import { setApplicant as setApplicantAction } from "@/actions/applicant.action";
import { useEffect, useTransition } from "react";
import { PostCodeSearchButton } from "./PostCodeSearchButton";
import { handleValidation } from "@/utils/validationHandler";
import { useRouter } from "next/navigation";


interface IProps {
    applicant?: UserApplicant;
}

const CompanyApplicantForm = (props: IProps) => {
    const [saving, startSaving] = useTransition();
    const { applicant, isEditing, setApplicant, setIsEditing } = useCompanyApplicantStore();
    const router = useRouter()

    useEffect(() => {
        if (props.applicant) {
            setApplicant(props.applicant);
            setIsEditing(true);
        } else {
            setApplicant({})
            setIsEditing(false);
        }
    }, [props.applicant, setApplicant, setIsEditing]);

    const handleSave = () => {
        if (saving) return;
        if (!applicant) {
            return toast({
                title: "출원인 정보를 입력해주세요",
                variant: "destructive",
            });
        }
        const {
            id,
            applicantNumber,
            companyName,
            companyNameEn,
            bizRegistrationNumber,
            corpRegistrationNumber,
            phoneNumber,
            email,
            name,
            registerNumber,
            ownerPhoneNumber,
            ownerEmail,
            address,
            addressDetail,
            signatureUrl
        } = applicant;

        const data = {
            type: ApplicantType.COMPANY,
            applicantNumber,
            companyName,
            companyNameEn,
            bizRegistrationNumber,
            corpRegistrationNumber,
            phoneNumber,
            email,
            name,
            registerNumber,
            ownerPhoneNumber,
            ownerEmail,
            address,
            addressDetail,
            signatureUrl
        };

        const requiredField = {
            email,
            companyName,
            name,
            phoneNumber,
        }
        const hasEmptyField = Object.values(requiredField).some((value) => !value);

        if (hasEmptyField) {
            return toast({
                title: "필수 정보를 모두 입력해주세요",
                variant: "destructive",
            });
        }

        if (!handleValidation('email', email)) return;
        if (!handleValidation('companyName', companyName)) return;
        if (!handleValidation('name', name)) return;

        if (!handleValidation('phoneNumber', phoneNumber)) return;
        if (companyNameEn && !handleValidation('companyNameEn', companyNameEn)) return;
        if (registerNumber && !handleValidation('registerNumber', registerNumber)) return;

        if (ownerEmail && !handleValidation('email', ownerEmail, '대표자 이메일을 올바르게 입력해주세요')) return;
        if (bizRegistrationNumber && !handleValidation('bizRegistrationNumber', bizRegistrationNumber)) return;
        if (corpRegistrationNumber && !handleValidation('corpRegistrationNumber', corpRegistrationNumber)) return;


        startSaving(async () => {
            try {
                if (isEditing) {
                    await setApplicantAction({ ...data, id: applicant.id });
                    toast({
                        title: "출원인 정보가 수정되었습니다.",
                    });
                    setTimeout(() => {
                        router.push('/my/info/patent-registration-number-info')

                    }, 300)
                } else {
                    await setApplicantAction({ ...data });
                    toast({
                        title: "출원인 정보가 저장되었습니다.",
                    });
                    setTimeout(() => {
                        router.push('/my/info/patent-registration-number-info')

                    }, 300)
                }
            } catch (error) {
                console.error(error);
                toast({
                    title: "출원인 정보 저장에 실패했습니다.",
                    variant: "destructive",
                });
            }

            // await setApplicantAction({ ...data }) as Prisma.UserApplicantCreateWithoutUserInput;
            // // await setApplicantAction({});

            // toast({
            //     title: "출원인 정보가 저장되었습니다.",
            // });
        });
    };


    return (
        <div>
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
                            onChange={(e) => {
                                setApplicant({ ...applicant, companyName: e.target.value })
                            }}
                            value={applicant?.companyName || ''}
                        />
                    </Label>
                    <Label label="회사명 (영문)" >
                        <TextInput
                            placeholder="-를 제외하고 입력"
                            onChange={(e) => {
                                setApplicant({ ...applicant, companyNameEn: e.target.value })
                            }}
                            value={applicant?.companyNameEn || ''}
                        />
                    </Label>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-[30px]">
                    <Label label="사업자등록번호" >
                        <TextInput
                            placeholder="-를 제외하고 입력해주세요"
                            onChange={(e) => {
                                setApplicant({ ...applicant, bizRegistrationNumber: e.target.value })
                            }}
                            value={applicant?.bizRegistrationNumber || ''}
                        />
                    </Label>
                    <Label label="법인등록번호" >
                        <TextInput
                            placeholder="-를 제외하고 입력해주세요"
                            onChange={(e) => {
                                setApplicant({ ...applicant, corpRegistrationNumber: e.target.value })
                            }}
                            value={applicant?.corpRegistrationNumber || ''}
                        />
                    </Label>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-[30px]">
                    <Label label="회사 전화번호" required={true}>
                        <TextInput
                            placeholder="-를 제외하고 입력해주세요"
                            onChange={(e) => {
                                setApplicant({ ...applicant, phoneNumber: e.target.value })
                            }}
                            value={applicant?.phoneNumber || ''}
                        />
                    </Label>
                    <Label label="담당자 이메일" required={true}>
                        <TextInput
                            placeholder="-를 제외하고 입력해주세요"
                            onChange={(e) => {
                                setApplicant({ ...applicant, email: e.target.value })
                            }}
                            value={applicant?.email || ''}
                        />
                    </Label>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-[30px]">
                    <Label label="대표자 성명" required={true}>
                        <TextInput
                            placeholder="-를 제외하고 입력해주세요"
                            onChange={(e) => {
                                setApplicant({ ...applicant, name: e.target.value })
                            }}
                            value={applicant?.name || ''}
                        />
                    </Label>
                    <Label label="대표자 주민등록번호" >
                        <TextInput
                            placeholder="-를 제외하고 입력해주세요"
                            onChange={(e) => {
                                setApplicant({ ...applicant, registerNumber: e.target.value })
                            }}
                            value={applicant?.registerNumber || ''}
                        />
                    </Label>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-[30px]">
                    <Label label="대표자 전화번호" >
                        <TextInput
                            placeholder="-를 제외하고 입력해주세요"
                            onChange={(e) => {
                                setApplicant({ ...applicant, ownerPhoneNumber: e.target.value })
                            }}
                            value={applicant?.ownerPhoneNumber || ''}
                        />
                    </Label>
                    <Label label="대표자 이메일" >
                        <TextInput
                            placeholder="-를 제외하고 입력해주세요"
                            onChange={(e) => {
                                setApplicant({ ...applicant, ownerEmail: e.target.value })
                            }}
                            value={applicant?.ownerEmail || ''}
                        />
                    </Label>
                </div>

                <Label label="법인등기부 상의 주소" className="mb-[30px]">
                    <div className="flex align-center gap-3 ">
                        <div className="flex-1">
                            <TextInput
                                placeholder="주소를 입력해주세요"
                                onChange={(e) => {
                                    setApplicant({ ...applicant, address: e.target.value })
                                }}
                                value={applicant?.address || ''}
                            />
                        </div>
                        <PostCodeSearchButton type={ApplicantType.COMPANY} />
                    </div>
                    <TextInput
                        placeholder="상세주소를 입력해주세요"
                        onChange={(e) => {
                            setApplicant({ ...applicant, addressDetail: e.target.value })
                        }}
                        value={applicant?.addressDetail || ''}
                    />
                </Label>

                <Label label="서명 또는 인감 등록" className="">
                    <div className="py-[26px]">
                        <FileUploader type={ApplicantType.COMPANY} />
                    </div>
                </Label>

                <div className="flex items-center justify-end gap-[6px]">
                    <BasicUIButton className="text2-bold border border-gray-200 rounded-sm py-[6px] text-gray-400"
                    >취소
                    </BasicUIButton>
                    <BasicUIButton className="text2-bold border border-gray-200 rounded-sm py-[6px] text-gray-400"
                        onClick={handleSave}
                    >완료
                    </BasicUIButton>
                </div>
            </fieldset>

            <div className="border-b my-5" />
        </div>

    );
}

export default CompanyApplicantForm