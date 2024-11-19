"use server";

import { db } from "@/utils/db"
import bcrypt from "bcryptjs"

export async function updatePassword(id: string, password: string){
    const hashedPassword = await bcrypt.hash(password, 10)
    
    await db.user.update({
        where : {
            id: id
        },
        data: {
            password: hashedPassword
        }
    })

}