import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./db";
import type { NextAuthOptions, User } from "next-auth";
import NaverProvider from "next-auth/providers/naver";
import { Adapter } from "next-auth/adapters";
import KakaoProvider from "next-auth/providers/kakao";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { userService } from "@/services/user.service";
import { Prisma } from "@prisma/client";
import { formatPhoneNumber } from "./formatters";


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (user && user.password) {
          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isValid) {
            return user;
          }
        }
        return null;
      },
    }),

    KakaoProvider({
      clientId: process.env.OAUTH_KAKAO_CLIENT_ID || "",
      clientSecret: process.env.OAUTH_KAKAO_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: false,

      profile(profile) {
        return {
          id: profile.id,
          name: profile.kakao_account?.profile?.nickname,
          email: profile.kakao_account?.email,
          image: profile.kakao_account?.profile?.profile_image_url,
          phoneNumber: profile.kakao_account?.phone_number,
        };
      },
    }),
    NaverProvider({
      clientId: process.env.NEXT_PUBLIC_OAUTH_NAVER_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_OAUTH_NAVER_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: false,

      profile(profile) {
        return {
          id: profile.response.id,
          name: profile.response.name,
          email: profile.response.email,
          image: profile.response.profile_image,
          phoneNumber: profile.response?.mobile,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.isAdmin = user.isAdmin;
        token.name = user.name;
        token.email = user.email;
        token.phoneNumber = user.phoneNumber;
        // token.loginType = account?.provider || 'email';
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user && token?.sub) {
        session.user.id = token.sub;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.isAdmin = token.isAdmin as boolean;
        session.user.phoneNumber = token.phoneNumber;
      }
      return session;
    },

    async signIn({ user, account }) {
      // 이메일 회원의 경우 db users에서 user를 가져오고 account는 null
      // 소셜회원의 경우 기가입된 회원이면 db user테이블과 account테이블에서 user와 account를 가져옴
      // 소셜회원이면서 신규 로그인회원이면 소셜계정에서 제공하는 user와 account가 넘어옴

      if (!account) return '/login'

      if (account.type === 'credentials') {
        // 이메일 로그인 : 현재는 이메일로 가입하면 user테이블에만 정보가 저장되는 상태임.

        await userService.updateLastLoggedIn(user.id)
        return true
      }

      else if (account.provider === 'kakao' || account.provider === 'naver') {
        // 카카오 기존 가입자가 네이버 가입 시도시   or  네이버 기존 가입자가 카카오 로그인 시도 시
        if (user.email) {
          const userByEmail = await userService.getUserByEmail(user.email)

          if (userByEmail) {

            if (userByEmail?.loginType === 'email') {
              //소셜로그인 사용자로 바꾸는 로직
              return `/login-type-change?email=${userByEmail.email}&id=${userByEmail.id}&provider=${account.provider}&providerAccountId=${account.providerAccountId}&accessToken=${account.access_token}`;

            } else {
              if (userByEmail?.loginType === account.provider) {
                // 기존 소셜로그인 회원 로그인 시
                await userService.updateLastLoggedIn(user.id)

                if (userByEmail.accounts.length === 0) {
                  // 로그인타입 kakao or naver이나 accounts 테이블에 저장안된 회원(이메일 회원이 카카오나 네이버 소셜회원 전환하기 누른 경우 실행)
                  const accountData: Prisma.AccountCreateInput = {
                    user: { connect: { id: userByEmail.id } }, // 사용자와 연결
                    provider: account.provider,
                    providerAccountId: account.providerAccountId,
                    socialEmail: user.email,
                    access_token: account.access_token,
                    refresh_token: account.refresh_token,
                    expires_at: account.expires_at,
                    scope: account.scope,
                    type: 'oauth'
                  }
                  await userService.createAccount(accountData);
                  return true;

                } else {
                  return true
                }

              } else if (userByEmail?.loginType === 'kakao' && account.provider === 'naver') {
                // 기존 소셜로그인 회원이 다른 소셜계정으로 로그인 시도시 : 현재 코드는 아래의 naver, kakao가 반대인 코드와 동일함. 아래코드와 하나로 합쳐도 될듯함
                return `/duplicate-social-email?email=${userByEmail.email}&provider=${userByEmail.loginType}`;


              } else if (userByEmail?.loginType === 'naver' && account.provider === 'kakao') {
                // 기존 소셜로그인 회원이 다른 소셜계정으로 로그인 시도시
                return `/duplicate-social-email?email=${userByEmail.email}&provider=${userByEmail.loginType}`;
              }
            }

          } else {

            //신규회원
            let data: Prisma.UserCreateInput = {
              email: user.email,
              loginType: account.provider
            }
            if (user.name) {
              data.name = user.name
            }
            if (user.image) {
              data.image = user.image
            }
            if (user.phoneNumber) {
              // data.phoneNumber = user.phoneNumber
              data.phoneNumber = formatPhoneNumber(user.phoneNumber)

            }

            const newUwer = await userService.createUserWithSocialLoginType(data)

            if (newUwer) {
              const accountData: Prisma.AccountCreateInput = {
                user: { connect: { id: newUwer.id } }, // 사용자와 연결
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                socialEmail: user.email,
                access_token: account.access_token,
                refresh_token: account.refresh_token,
                expires_at: account.expires_at,
                scope: account.scope,
                type: 'oauth'
              }
              await userService.createAccount(accountData);
              return true;
            }
          }
        }
      }

      return true;
    },
  },
};
