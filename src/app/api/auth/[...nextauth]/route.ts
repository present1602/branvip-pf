// import { Auth } from "../../";
// import { authOptions } from "@/auth/utils";
import { authOptions } from "@/utils/authOptions";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
