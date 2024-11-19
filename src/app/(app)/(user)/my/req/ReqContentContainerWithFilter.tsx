"use client"

import { getOrderByUserAndType } from "@/actions/order.action";
import BasicUIButton from "@/components/v3/components/BUI/Button/BasicUIButton";
import { OrderType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 } from "uuid"
import { serviceMap } from "@/lib/utils";
import { SimpleInfoContainer } from "@/components/layouts/my/SimpleInfoContainer";





const columnTitles = ['신청일', '신청번호', '신청인', '서비스 정보', '결제 내역', '디자인 의뢰 정보', '출원정보']
// const displayData = ['createdAt', 'id', 'type', 'totalPatentOfficeFee']

interface IProps {
    initialOrders: any[]
    userId: string;
}

const noReqText = '의뢰 내역이 없습니다.';


export default function ReqContentContainerWithFilter({ initialOrders, userId }: IProps) {
    const [activeTab, setActiveTab] = useState('TAKE_ALL')
    const [orders, setOrders] = useState<any>([])
    const router = useRouter()


    const handleFilter = (key: any) => {
        async function getData() {
            const filteredOrders = key === 'TAKE_ALL'
                ?
                await getOrderByUserAndType()
                :
                await getOrderByUserAndType(key)
            setOrders(filteredOrders)
            setActiveTab(key)
        }
        getData()
    }

    useEffect(() => {
        setOrders(initialOrders)
    }, [])

    return (
        <div className="flex flex-col">
            <div className="flex flex-1 gap-[10px] py-5">
                <BasicUIButton className="px-[12px] py-[10px] md:px-[30px] rounded-[6px]"
                    isPrimary={activeTab == 'TAKE_ALL' ? true : false}
                    onClick={() => handleFilter('TAKE_ALL')}
                >
                    전체
                </BasicUIButton>
                <BasicUIButton className="px-[12px] py-[10px] md:px-[30px] rounded-[6px]"
                    isPrimary={activeTab == 'ALL' ? true : false}
                    onClick={() => handleFilter(OrderType.ALL)}
                >
                    올인원 의뢰
                </BasicUIButton>
                <BasicUIButton className="px-[12px] py-[10px] md:px-[30px] rounded-[6px]"
                    isPrimary={activeTab == 'APPLICATION' ? true : false}
                    onClick={() => handleFilter(OrderType.APPLICATION)} >
                    상표출원
                </BasicUIButton>
            </div>
            <div className="flex justify-end body2-medium">
                총 <span className="text-primary_scale-60 body2-bold ml-[3px] mr-[1px]">{orders.length}</span> 건
            </div>

            {
                orders.length > 0
                    ?
                    <table className="table-auto w-full">
                        <thead>
                            <tr className="bg-gray_scale-40 text-[15px] text-gray_scale-400">
                                {columnTitles.map((colName: string) => {
                                    return (
                                        <th key={colName} className="text-center p-[10px] text-gray-700 ">
                                            {colName}
                                        </th>
                                    );
                                }
                                )}
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map((row: any) => {
                                return (
                                    <tr key={row.id} className="border-b">
                                        {Object.keys(row).map((key) => {
                                            if (key === 'id') return;
                                            return <td key={key} className="px-[10px] py-3 text-center">
                                                <span className=""> {
                                                    row[key]
                                                }
                                                </span>
                                            </td>;
                                        })}
                                        <td key={v4()} className="p-[10px] text-center">
                                            {
                                                row.type === serviceMap.DESIGN &&
                                                <BasicUIButton className="text2-bold border-gray_scale-70 text-gray-400 ">상세보기</BasicUIButton>
                                            }
                                        </td>
                                        <td key={row.id} className="p-[10px] flex justify-center" onClick={() => router.push(`/my/req/detail/${row.id}`)}>
                                            <BasicUIButton className="text2-bold border-gray_scale-70 text-gray-400">출원정보</BasicUIButton>
                                        </td>
                                    </tr>
                                )
                            }
                            )}
                        </tbody>
                    </table>
                    :
                    <SimpleInfoContainer className="h-[374px]">
                        <p className="text-center text-gray-400 text-[28px]">
                            {noReqText}
                        </p>
                    </SimpleInfoContainer>
            }

        </div>

    )
}