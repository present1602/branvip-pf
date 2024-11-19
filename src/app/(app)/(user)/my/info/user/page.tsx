"use client";

import { TitleCard } from "@/components/layouts/my/TitleCard";
import { UserInfoContent } from "./UserInfoContent";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { PasswordChange } from "./PasswordChange";
import { UserInfo } from "./UserInfo";
import { CloseAccount } from "./CloseAccount";
import { useEffect, useState } from "react";


export default function UserInfoPage() {

    return (
        <div className="flex w-full flex-col">
            <TitleCard title="내정보" />

            <UserInfo />

            <PasswordChange />

            <CloseAccount />

        </div>
    )
}
