"use client"

import { useState } from "react";

export function UserInfoContent({ user }: any) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };


    return (
        <div className="flex flex-col gap-y-5 bg-[#F8F9F8] border border-surface-100 rounded-lg p-5">

            <div className="flex">
                <div className="body2-bold text-[#888888] w-[120px] text-left">가입자명</div>
                <div className="flex-1">
                    <span className="body2-medium text-[#999999]">
                        {user?.name}
                        {
                            user.loginType === 'kakao'
                            &&
                            <>
                                <span className="bg-[#FEE500] text-white px-1 py-[2px] rounded ml-2 cursor-pointer"
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >KAKAO
                                </span>
                                {isHovered
                                    &&
                                    <span className="text-sm mx-1 p-1">
                                        {user.accounts[0].socialEmail}
                                    </span>
                                }
                            </>
                        }
                        {
                            user.loginType === 'naver'
                            &&
                            <>
                                <span className="bg-[#03C75A] text-white px-1 py-[2px] rounded ml-2 cursor-pointer"
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >NAVER
                                </span>
                                {isHovered
                                    &&
                                    <span className="text-sm mx-1 p-1">
                                        {user.accounts[0].socialEmail}
                                    </span>
                                }
                            </>
                        }
                    </span>
                </div>
            </div>

            <div className="flex">
                <div className="body2-bold text-[#888888] w-[120px] text-left">이메일</div>
                <div className="flex-1 body2-medium text-[#999999]">
                    {user?.email}
                </div>

            </div>
            <div className="flex">
                <div className="body2-bold text-[#888888] w-[120px] text-left">연락처</div>
                <div className="flex-1 body2-medium text-[#999999]">
                    {user?.phoneNumber}
                </div>
            </div>
        </div>
    )
}