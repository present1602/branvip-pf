"use client";

import BasicUIButton from "@/components/v3/components/BUI/Button/BasicUIButton";
import { Link, Pagination } from "@nextui-org/react";
import { UserApplicant } from "@prisma/client";
import { useMemo, useState } from "react";

const tableKeyMap = {
    'type': '종류',
    'applicantNumber': '특허번호',
    'name': '이름',
    'phoneNumber': '전화번호'
}

const displayData = ['type', 'applicantNumber', 'name', 'phoneNumber']

export default function InfoList({ paramApplicants }: { paramApplicants: UserApplicant[] }) {
    const [page, setPage] = useState(1)
    const rowsPerPage = 4;
    const pages = Math.ceil(paramApplicants.length / rowsPerPage);

    const applicants = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return paramApplicants.slice(start, end);
    }, [page, paramApplicants]);


    return (
        <>
            <table className="table-auto w-full">
                <thead>
                    <tr className="bg-gray_scale-40 text-[15px] text-gray_scale-400">
                        {Object.values(tableKeyMap).map((col) => {

                            return (
                                <th key={col} className="text-center p-[10px] text-gray-700">
                                    {col}
                                </th>
                            );
                        }
                        )}
                        {/* {Object.keys(applicants[0]).map((col) => {
                            if (displayData.includes(col)) {
                                return (<th key={col} className="text-center p-[10px] text-gray-700">
                                    {col}
                                </th>

                                );
                            }
                        }
                        )} */}
                        <th>출원정보</th>
                    </tr>
                </thead>
                <tbody>
                    {applicants.map((row: any) => (
                        <tr key={row.id} className="border-b">
                            {Object.keys(tableKeyMap).map((key) => {
                                if (key === 'type') {
                                    return <td key={key} className="text-center p-[10px] text-gray-700">
                                        {row[key] === 'COMPANY' ? '법인' : '개인'}
                                    </td>
                                }
                                else {
                                    return (
                                        <td key={key} className="text-center p-[10px] text-gray-700">
                                            {row[key] !== undefined ? row[key] : '-'}
                                        </td>
                                    )
                                }
                            })}

                            <th>
                                <Link href={`/my/info/patent-registration-number-info/${row.id}`} key={`link_${row.id}`}>
                                    <BasicUIButton className="text-gray-400 border-warm_gray_scale-40 text2-bold py-1 my-1">
                                        수정하기
                                    </BasicUIButton>
                                </Link>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex items-start justify-center mt-8">
                <Pagination
                    loop
                    isCompact
                    showControls
                    variant="light"
                    color="secondary"
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                />
            </div>
        </>
    )
}