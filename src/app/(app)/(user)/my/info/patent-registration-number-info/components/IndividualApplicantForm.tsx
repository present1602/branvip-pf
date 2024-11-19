"use client"

import { Label, TextArea, TextInput } from "@/components/ui";
import BasicUIButton from "@/components/v3/components/BUI/Button/BasicUIButton";
import { FileUploader } from "./SignitureFileUploader";
import { useApplicantStore } from "@/hooks/applicant.store";
import { useEffect, useTransition } from "react";
import { setApplicant as setApplicantAction } from "@/actions/applicant.action";
import { toast } from "@/components/ui/use-toast";
import { PostCodeSearchButton } from "./PostCodeSearchButton";
import { UserApplicant, ApplicantType } from "@prisma/client";
import { handleValidation } from "@/utils/validationHandler";
import { useRouter } from "next/navigation";


interface IProps {
    applicant?: UserApplicant;
}

const IndividualApplicantForm = (props: IProps) => {
    const [saving, startSaving] = useTransition();
    const { applicant, isEditing, setApplicant, setIsEditing } = useApplicantStore();
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
        // if (!applicant) {
        //     return toast({
        //         title: "출원인 정보를 입력해주세요",
        //         variant: "destructive",
        //     });
        // }
        if (!applicant) {
            return;
        }
        const {
            id,
            name,
            nameEn,
            applicantNumber,
            address,
            addressDetail,
            addressPostCode,
            email,
            phoneNumber,
            registerNumber,
            signatureUrl
        } = applicant;

        const data = {
            name,
            nameEn,
            type: ApplicantType.INDIVIDUAL,
            applicantNumber,
            address,
            addressDetail,
            addressPostCode,
            email,
            phoneNumber,
            registerNumber,
            signatureUrl
        };

        const requiredField = {
            name,
            email,
            phoneNumber
        }
        const hasEmptyField = Object.values(requiredField).some((value) => !value);

        if (hasEmptyField) {
            return toast({
                title: "필수 정보를 모두 입력해주세요",
                variant: "destructive",
            });
        }

        if (!handleValidation('name', name)) return;
        if (nameEn && !handleValidation('nameEn', nameEn)) return;
        if (!handleValidation('email', email)) return;
        if (registerNumber && !handleValidation('registerNumber', registerNumber)) return;
        if (!handleValidation('phoneNumber', phoneNumber)) return;

        startSaving(async () => {
            // await setApplicant({ ...data, id, applicantNumber });
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

                <div className="grid md:grid-cols-2 gap-2 mb-[30px]">

                    <Label label="한글 이름" required={true}>
                        <TextInput
                            placeholder="한글 이름을 입력헤주세요"
                            onChange={(e) => {
                                setApplicant({ ...applicant, name: e.target.value })
                            }}
                            value={applicant?.name || ''}
                        />
                    </Label>

                    <Label label="영문 이름" >
                        <TextInput
                            placeholder="영문 이름을 입력헤주세요"
                            onChange={(e) => {
                                setApplicant({ ...applicant, nameEn: e.target.value })
                            }}
                            value={applicant?.nameEn || ''}
                        />
                    </Label>

                </div>

                <div className="grid md:grid-cols-2 gap-2 mb-[30px]">

                    <Label label="주민등록번호" >
                        <TextInput
                            placeholder="-를 제외하고 입력해주세요"
                            onChange={(e) => {
                                setApplicant({ ...applicant, registerNumber: e.target.value })
                            }}
                            value={applicant?.registerNumber || ''}
                        />
                    </Label>

                    <Label label="이메일" required={true}>
                        <TextInput
                            placeholder="-를 제외하고 입력해주세요"
                            onChange={(e) => {
                                setApplicant({ ...applicant, email: e.target.value })
                            }}
                            value={applicant?.email || ''}
                        />
                    </Label>
                </div>

                <Label label="휴대폰번호" required={true} className="mb-[30px]">
                    <TextInput
                        placeholder="-를 제외하고 입력해주세요"
                        onChange={(e) => {
                            setApplicant({ ...applicant, phoneNumber: e.target.value })
                        }}
                        value={applicant?.phoneNumber || ''}
                    />
                </Label>

                <Label label="주민등록상 주소" className="mb-[30px]">
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
                        <PostCodeSearchButton type={ApplicantType.INDIVIDUAL} />
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
                        <FileUploader />
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

export default IndividualApplicantForm

// <div>
//     <fieldset>
//         <BasicFormLabel labelText="특허고객번호" required={true} className="mb-[30px]">
//             <BasicFormInput
//                 placeholder="-를 제외하고 입력해주세요"
//                 onChange={(e) => { }}
//             />
//         </BasicFormLabel>

//         <div className="grid grid-cols-2 gap-2 mb-[30px]">

//             <BasicFormLabel labelText="회사명 (한글)" required={true}>
//                 <BasicFormInput
//                     placeholder="-를 제외하고 입력"
//                     onChange={(e) => { }}
//                 />
//             </BasicFormLabel>

//             <BasicFormLabel labelText="회사명 (영문)" required={true}>
//                 <BasicFormInput
//                     placeholder="-를 제외하고 입력"
//                     onChange={(e) => { }}
//                 />
//             </BasicFormLabel>

//         </div>

//         <div className="grid grid-cols-2 gap-2 mb-[30px]">

//             <BasicFormLabel labelText="사업자등록번호" required={true}>
//                 <BasicFormInput
//                     placeholder="-를 제외하고 입력해주세요"
//                     onChange={(e) => { }}
//                 />
//             </BasicFormLabel>



//             <BasicFormLabel labelText="이메일" required={true}>
//                 <BasicFormInput
//                     placeholder="-를 제외하고 입력해주세요"
//                     onChange={(e) => { }}
//                 />
//             </BasicFormLabel>

//         </div>

//         <BasicFormLabel labelText="주민등록상 주소" required={true} className="mb-[30px]">
//             <div className="flex align-center gap-3 ">
//                 <BasicFormInput
//                     className="flex-1"
//                     placeholder="주소를 입력해주세요"
//                     onChange={(e) => { }}
//                 />

//                 <BasicUIButton className="rounded-[6px] my-[6px]">
//                     우편번호 찾기
//                 </BasicUIButton>
//             </div>
//             <BasicFormInput
//                 placeholder="상세주소를 입력해주세요"
//                 onChange={(e) => { }}
//             />
//         </BasicFormLabel>

//         <BasicFormLabel labelText="서명 또는 인감 등록" className="">
//             <div className="py-[26px]">
//                 <FileUploader />
//             </div>
//         </BasicFormLabel>

//         <div className="flex items-center justify-end gap-[6px]">
//             <BasicUIButton className="text2-bold border border-gray-200 rounded-sm py-[6px] text-gray-400"
//             >취소
//             </BasicUIButton>
//             <BasicUIButton className="text2-bold border border-gray-200 rounded-sm py-[6px] text-gray-400"
//                 onClick={() => { }}
//             >완료
//             </BasicUIButton>
//         </div>
//     </fieldset>
//     <div className="border-b my-5" />
// </div>
