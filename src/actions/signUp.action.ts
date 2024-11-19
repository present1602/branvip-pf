"use server";

import bcrypt from "bcryptjs";
import { db } from "@/utils/db";

export async function signUp(email: string, password: string, name: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      agreeServiceTerms: true,
      agreePrivacyTerms: true,
      agreedTermsAt: new Date(),
    },
  });
}
