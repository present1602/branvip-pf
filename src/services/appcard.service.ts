
interface params {
  email: string;
  phoneNumber: string;
  title: string;
  amount: number;
  name: string;
  surtax: number;
}

class AppCardService {


  private formatPhoneNumber(phoneNumber: string) {
    if (!phoneNumber) return "";
    // 모든 비-숫자 문자를 제거
    let standardNumber = phoneNumber.replace(/\D/g, "");

    // '+'와 '82'를 '0'으로 대체
    if (standardNumber.startsWith("8210")) {
      standardNumber = "010" + standardNumber.substring(4);
    }

    return standardNumber;
  }

  async useAxiosPayple(params: params) {
    return {
      PCD_PAY_TYPE: "card",
      PCD_PAY_WORK: "PAY",
      PCD_CARD_VER: "02",
      PCD_PAYER_NAME: params.name,
      PCD_PAYER_HP: this.formatPhoneNumber(params.phoneNumber),
      PCD_PAYER_EMAIL: params.email,
      PCD_PAY_GOODS: params.title,
      PCD_PAY_TOTAL: params.amount,
      PCD_PAY_ISTAX: "Y",
      PCD_PAY_TAXTOTAL: params.surtax,
      clientKey: process.env.NEXT_PUBLIC_REACT_APP_CLIENT_KEY || "",
      PCD_RST_URL: "/",
      callbackFunction: "",
    };
  }
}

export const appCardService = new AppCardService();