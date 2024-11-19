export const validateEmail = (email: string) => {    // 간단한 이메일 유효성 검사
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password: string) => {
  // 비밀번호는 최소 8자 이상이어야 하며 숫자와 문자를 포함해야 함
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?]{8,}$/;
  return regex.test(password);
};

export const validateName = (name: string) => {
  name = name.trim();
  if (name.length < 2 || name.length > 10) {
    return false;
  }
  if (/\s{2,}/.test(name)) {
    return false;
  }
  // 허용된 문자: 영어, 한국어, 일본어(히라가나, 가타카나), 중국어, 공백
  const regex = /^[a-zA-Z\s\uAC00-\uD7A3]+$/;
  // @ts-ignore
  if (!regex.test(name)) {
    return false;
  }

  return true;
};