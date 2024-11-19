"use server"

import { authCodeService } from "@/services/AuthCode.service";

interface IAuthCodeProps {
  email: string;
}

export interface IEnterAuthProps {
  enterCode :string;
  email: string;
}

// 이메일 인증

// 인증번호 발급
export const generateAuthCode = async ({email } : IAuthCodeProps) => {
  return await authCodeService.createAuthCode(email)
}
// 인증번호 검증
export const verifyAuthCode = async (enterAuth : IEnterAuthProps) => {
  return await authCodeService.verifyAuthCode(enterAuth)
}
