import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    phoneNumber?: string | null | undefined;
    isAdmin?: boolean;
  }
  interface Session {
    user: {
      id: string;
      phoneNumber?: string | null | undefined;
      isAdmin?: boolean;
    } & DefaultSession["user"];
  }

  interface Profile {
    kakao_account: {
      phone_number: string;
    };
    response: {
      mobile: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    phoneNumber?: string | null; // JWT에도 phoneNumber 속성을 추가
  }
}
