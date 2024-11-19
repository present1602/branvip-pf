
import { toast } from "@/components/ui/use-toast";
import { isValidNameEn, isValidNameKr, isValidEmail, isValidPhoneNumber, isValidPassword, isValidRegisterNumber, isValidCompanyName, isValidCompanyNameEn, isValidBizRegistrationNumber, isValidCorpRegistrationNumber } from "./validators";

type ValidationFunction = (value: any) => boolean;

interface ValidationConfig {
    [key: string]: {
        validationFunction: ValidationFunction;
        errorMessage: string;
    };
}
const validationConfig: ValidationConfig = {
    name: {
        validationFunction: isValidNameKr,
        errorMessage: '이름을 올바르게 입력해주세요.',
    },
    nameEn: {
        validationFunction: isValidNameEn,
        errorMessage: '영문 이름을 올바르게 입력해주세요.',
    },
    email: {
        validationFunction: isValidEmail,
        errorMessage: '이메일을 올바르게 입력해주세요.',
    },
    password: {
        validationFunction: isValidPassword,
        errorMessage: '비밀번호를 올바르게 입력해주세요.',
    },
    registerNumber: {
        validationFunction: isValidRegisterNumber,
        errorMessage: '주민등록번호를 올바르게 입력해주세요.',
    },
    companyName: {
        validationFunction: isValidCompanyName,
        errorMessage: '회사명을 올바르게 입력해주세요.',
    },
    companyNameEn: {
        validationFunction: isValidCompanyNameEn,
        errorMessage: '회사명(영문)을 올바르게 입력해주세요.',
    },
    bizRegistrationNumber: {
        validationFunction: isValidBizRegistrationNumber,
        errorMessage: '사업자등록번호 10자리를 올바르게 입력해주세요.',
    },
    corpRegistrationNumber: {
        validationFunction: isValidCorpRegistrationNumber,
        errorMessage: '법인등록번호 13자리를 올바르게 입력해주세요.',
    },
    phoneNumber: {
        validationFunction: isValidPhoneNumber,
        errorMessage: '전화번호를 올바르게 입력해주세요',
    },
};

export function handleValidation(
    key: string,
    value: any,
    message?: string
) {
    const validation = validationConfig[key];

    if (validation && !validation.validationFunction(value)) {
        toast({
            title: message ? message : validation.errorMessage,
            variant: 'destructive',
        });
        return false;
    } else {
        return true;
    }
}


