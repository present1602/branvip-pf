import * as xml2js from "xml2js";

// 특정 시간부터 현재까지 얼마나 지났는지를 표시하는 함수
export function timeFromPast(createdAt: Date) {
  const now = Date.now();
  const past = new Date(createdAt).getTime();
  const diff = now - past;

  const scaleList = ["초", "분", "시간", "일", "주", "개월", "년"];
  const timeList = [
    diff / 1000,
    diff / (1000 * 60),
    diff / (1000 * 60 * 60),
    diff / (1000 * 60 * 60 * 24),
    diff / (1000 * 60 * 60 * 24 * 7),
    diff / (1000 * 60 * 60 * 24 * 30),
    diff / (1000 * 60 * 60 * 24 * 365),
  ];

  const index = timeList.findIndex((time) => time < 1);
  if (index === -1) {
    return `${Math.round(timeList[timeList.length - 1])}${scaleList[scaleList.length - 1]}`;
  }
  return `${Math.round(timeList[index - 1])}${scaleList[index - 1]}`;
}

// YY.MM.DD 형식으로 날짜를 표시하는 함수
export function yymmdd(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const monthString = month < 10 ? `0${month}` : `${month}`;
  const dayString = day < 10 ? `0${day}` : `${day}`;

  return `${year}.${monthString}.${dayString}`;
}

// HTML 문자열에서 문자열만 추출하는 함수
export function htmlToText(html: string): string {
  return html.replace(/(<([^>]+)>)/gi, "");
}

// 숫자를 3자리마다 콤마(,)를 찍어주는 함수
export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function xml2json(xml: any) {
  const parser = new xml2js.Parser();

  return parser
    .parseStringPromise(xml)
    .then((r) => r)
    .catch((e) => console.error(e));
}

export function formatDateToLocaleWithFullYear(date: Date) {
  let dateText = date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return dateText;
}

export function formatDateToLocale(date: Date) {
  let dateText = date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const currentYear = new Date().getFullYear();

  if (dateText.includes(`${currentYear}년`)) {
    dateText = dateText.replace(`${currentYear}년`, "");
  }

  return dateText;
}

export function formatTrademarkStatus(status: string) {
  if (status === "출원") {
    return "출원";
  }

  if (status.startsWith("포기")) {
    return "포기";
  }

  if (status.startsWith("취하")) {
    return "취하";
  }

  if (status.includes("등록")) {
    return "등록";
  }

  if (status.includes("거절")) {
    return "거절";
  }

  if (status === " " || status === "공고") {
    return "공고";
  }

  return "기타";
}

export function formatDateConverterYYMMDD(date: Date): string {
  const year = date.getFullYear().toString().slice(-2); // 년도에서 뒤의 두 자리만 가져오기
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // 월을 두 자리 숫자로 표시하기
  const day = ("0" + date.getDate()).slice(-2); // 일을 두 자리 숫자로 표시하기

  return `${year}.${month}.${day}`;
}

export function formatDateStringWithHyphen(rawString: string) {
  const date = rawString.trim();
  if (!date) {
    return "";
  }

  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);

  return `${year}-${month}-${day}`;
}
export function formatDateTimeString(dateTime: Date, delimiter: string = '.') {

  const year = dateTime.getFullYear();
  const month = ('0' + (dateTime.getMonth() + 1)).slice(-2);
  const day = ('0' + dateTime.getDate()).slice(-2);

  // 시, 분, 초를 2자리 숫자로 포맷
  const hours = ('0' + dateTime.getHours()).slice(-2);
  const minutes = ('0' + dateTime.getMinutes()).slice(-2);
  const seconds = ('0' + dateTime.getSeconds()).slice(-2);

  // 원하는 형식으로 포맷
  return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
}

export function formatTrademarkNumber({ value = "", isResigster = false }) {
  if (!value || typeof value !== "string" || !value.trim()) {
    return;
  }

  const head = value.substring(0, 2);

  if (isResigster) {
    const regist = value.substring(2, 9);

    return `${head}-${regist}`;
  }

  const year = value.substring(2, 6);
  const other = value.substring(6, 14);

  return `${head}-${year}-${other}`;
}

//파일 사이즈 측정

export const formatFileSize = (size: number): string => {
  if (size === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(size) / Math.log(k));
  return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const formatCurrency = (amount: string): string => {
  const number = parseFloat(amount.replace(/,/g, ""));
  if (isNaN(number)) return amount;

  return new Intl.NumberFormat("en-US").format(number);
};

export const formatPhoneNumber = (phoneNumber: string): string => {
  // Remove all non-numeric characters
  let formattedNumber = phoneNumber.replace(/[^0-9+]/g, '');

  // Check if the number starts with +82 and handle accordingly
  if (formattedNumber.startsWith('+82')) {
    formattedNumber = '0' + formattedNumber.slice(3);
  }

  return formattedNumber;
}

export const formatCurrencyKRWon = (amount: number) => {
  if (isNaN(amount)) {
    throw new Error('Input must be a valid number');
  }
  return amount.toLocaleString();
}
export const formatNumberWithCommas = (amount: number) => {
  if (isNaN(amount)) return amount.toString();

  return new Intl.NumberFormat("en-US").format(amount);
};
