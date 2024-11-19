
// 알파벳 대소문자, 숫자, 특수문자를 포함한 8자 이상의 비밀번호
export function isValidPassword(password: string) {
  const passwordPattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return passwordPattern.test(password);
}

// 이메일 형식
export function isValidEmail(email: string) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
}

export const isValidNameKr = (name: string) => {
  name = name.trim();
  if (name.length < 2 || name.length > 8) {
    return false;
  }
  if (/\s{2,}/.test(name)) {
    return false;
  }
  // 허용된 문자: 영어, 한국어, 일본어(히라가나, 가타카나), 중국어, 공백
  const regex = /^[\uAC00-\uD7A3]+$/;
  // @ts-ignore
  if (!regex.test(name)) {
    return false;
  }

  return true;
};

export const isValidNameEn = (name: string) => {
  name = name.trim();
  if (name.length <= 2 || name.length >= 30) {
    return false;
  }
  if (/\s{2,}/.test(name)) {
    return false;
  }
  const regex = /^[a-zA-Z\s]+$/;
  // @ts-ignore
  if (!regex.test(name)) {
    return false;
  }
  return true;
};
export const isValidRegisterNumber = (value: string) => {
  // Check if value is 13 characters long and consists of only digits
  if (value.length !== 13 || !/^\d+$/.test(value)) {
    return false;
  }
  return true;
}

export const isValidCompanyName = (value: string) => {
  value = value.trim();
  if (value.length < 2 || value.length >= 30) {
    return false;
  }
  const regex = /^[\uAC00-\uD7A3a-zA-Z0-9]+$/;
  if (!regex.test(value)) {
    return false;
  }
  return true;
}
export const isValidCompanyNameEn = (value: string) => {
  value = value.trim();
  if (value.length < 2 || value.length >= 40) {
    return false;
  }
  const regex = /^[a-zA-Z0-9]+$/;
  if (!regex.test(value)) {
    return false;
  }
  return true;
}
export const isValidBizRegistrationNumber = (value: string) => {
  const regex = /^\d{10}$/;
  if (!regex.test(value)) {
    return false;
  }
  return true;
}

export const isValidCorpRegistrationNumber = (value: string) => {
  const regex = /^\d{13}$/;
  if (!regex.test(value)) {
    return false;
  }
  return true;
}

export const isValidPhoneNumber = (value: string) => {
  const regex = /^0\d{8,10}$/;
  if (!regex.test(value)) {
    return false;
  }
  return true;
}