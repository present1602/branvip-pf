interface PaypleToken {
  cst_id: string;
  custKey: string;
  AuthKey: string;
  PCD_PAY_HOST: string;
  PCD_PAY_URL: string;
  return_url: string;
}

interface PaymentByBillingKeyParams {
  email: string;
  phoneNumber: string;
  billingKey: string;
  title: string;
  amount: number;
}

class PaypleService {
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

  async getPaypleToken() {
    const apiUrl = process.env.PAYPLE_API_URL || "";
    const result: any = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        referer: process.env.PAYPLE_HTTP_REFERER || "",
      },
      body: JSON.stringify({
        cst_id: process.env.PAYPLE_CST_ID || "",
        custKey: process.env.PAYPLE_CUST_KEY || "",
        PCD_PAY_TYPE: "card",
        PCD_SIMPLE_FLAG: "Y",
      }),
    })
      .then((res) => {
        if (!res) return null;
        return res.text();
      })
      .then((text) => {
        console.log("Raw response Token:", text);

        if (!text) return null;
        return JSON.parse(text);
      });

    if (!result) throw new Error("Payple Token API Error");

    if (result.result !== "success") throw new Error(result.result_msg);

    console.log("token result-----", result);

    const { cst_id, custKey, AuthKey, return_url }: PaypleToken = result;
    return { cst_id, custKey, AuthKey, return_url };
  }

  async paymentByBillingKey(params: PaymentByBillingKeyParams) {
    const { cst_id, custKey, AuthKey, return_url } =
      await this.getPaypleToken();
    console.log("cst_id -------", cst_id, custKey, AuthKey);
    console.log("return url -------", return_url);

    const apiUrl = return_url;
    const result: any = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Referer: "http://localhost:8080",
        // Referer: process.env.PAYPLE_HTTP_REFERER || "",
      },
      body: JSON.stringify({
        PCD_CST_ID: cst_id,
        PCD_CUST_KEY: custKey,
        PCD_AUTH_KEY: AuthKey,
        PCD_PAY_TYPE: "card",
        PCD_PAYER_ID: params.billingKey,
        PCD_PAY_GOODS: params.title,
        PCD_PAY_TOTAL: params.amount,
        PCD_SIMPLE_FLAG: "Y",
        PCD_PAYER_HP: this.formatPhoneNumber(params.phoneNumber),
        PCD_PAYER_EMAIL: params.email,
      }),
    })
      .then((res) => {
        if (!res) return null;
        return res.text();
      })
      .then((text) => {
        console.log("Raw response:", text);

        if (!text) return null;
        return JSON.parse(text);
      });

    if (!result) throw new Error("Payple API Error");

    if (result.PCD_PAY_RST !== "success") throw new Error(result.result_msg);

    // if (+result.PCD_PAY_TOTAL !== params.amount)
    //   throw new Error("실제 결제 금액이 일치하지 않습니다.");

    return result;
  }
}

export const paypleService = new PaypleService();
