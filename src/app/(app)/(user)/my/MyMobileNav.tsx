"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Menubar from "@/assets/menubar.png"
import Drawup from "@/assets/drawup.png"
import DrawDown from "@/assets/drawdown.png"
import { data } from "./MeNavMenuData";

export default function MyMobileNav() {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const router = useRouter()

    function handleToggleMenu() {
        setIsMenuOpen(!isMenuOpen)
    }

    function handleNavMenuClick(href: string) {
        router.push(href);
        setIsMenuOpen(false)
    }

    return (
        <>
            <div className="w-full fixed bottom-0 z-200 lg:hidden py-5 px-[10px] rounded-t-[10px] border-1 border-gray-300 bg-white">
                <div className="flex md:px-2" onClick={handleToggleMenu}>
                    <div className="flex-1 flex items-center gap-[2px] md:gap-1 body1-bold">
                        <Image src={Menubar} alt="" />
                        내 정보관리
                    </div>
                    <Image src={Drawup} alt="" />

                </div>
            </div>

            <div
                className={`fixed inset-0 z-50 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            >
                <div
                    className="absolute inset-0 bg-gray-800 opacity-50"
                    onClick={handleToggleMenu}
                ></div>
                <div
                    className={`absolute bottom-0 w-full h-1/2 bg-white z-50 border-1 border-gray-300 rounded-t-[10px]
            transition-transform duration-300 ${isMenuOpen ? 'translate-y-0' : 'translate-y-full'}`}
                >
                    <div className="px-5 pt-5">
                        <div className="flex mb-5" onClick={handleToggleMenu}>
                            <div className="flex-1 flex items-center gap-[2px] md:gap-1 body1-bold">
                                <Image src={Menubar} alt="" />
                                내 정보관리
                            </div>
                            <Image src={DrawDown} alt="" width={24} height={24} />
                        </div>
                        {data.map((item, index) => (
                            <div className={`flex flex-col`}
                                key={`${item.title}_${index}`}>
                                <div className="py-[6px] cursor-pointer" onClick={() => handleNavMenuClick(item.href)}>
                                    <span className="text-[16px] font-semibold">{item.title}</span>
                                </div>
                                {item.lower?.map((lowerItem, index) => (
                                    <div
                                        className="py-[6px] cursor-pointer"
                                        key={`${lowerItem}_${index}`}
                                        onClick={() => handleNavMenuClick(lowerItem.href)}>
                                        <span className="text-[14px] text-gray_scale-400">{lowerItem.title} </span>
                                    </div>
                                ))}
                                {index !== data.length - 1 && <div className="border-b mt-3 mb-3"></div>}
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </>
    );
}