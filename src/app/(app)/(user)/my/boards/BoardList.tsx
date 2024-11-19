"use client";

import { UserBoard } from "@prisma/client";
import { BoardCard } from "./BoardCard";
import { useEffect, useMemo, useState } from "react";
import { Pagination } from "@nextui-org/react";
import { getBoardCountByUser, getBoardsByUserId } from "@/actions/userBoard.action";
import { ContentCard } from "@/components/layouts/my/ContentCard";
import { SimpleInfoContainer } from "@/components/layouts/my/SimpleInfoContainer";

interface IUserBoard extends UserBoard {
    _count: {
        comments: number;
    };
}

interface IProps {
    count?: number
}


const noBoardInfoText = "문의내역이 없습니다."

export default function BoardList({ }: IProps) {
    const [boards, setBoards] = useState<IUserBoard[]>([])
    const [count, setCount] = useState<number>(0)

    const [page, setPage] = useState(1)
    const rowsPerPage = 5;
    const pages = Math.ceil(count / rowsPerPage);

    useEffect(() => {
        async function fetchData() {
            // 아래 액션 두번 호출하는데 한번으로도 처리 가능할듯함
            const boardCount = await getBoardCountByUser();
            setCount(boardCount)
            const data = await getBoardsByUserId(page, rowsPerPage)
            setBoards(data)
        }
        fetchData()
    }, [page])

    return (
        <div className="grid gap-4">
            {count === 0 && (
                <ContentCard>
                    <SimpleInfoContainer className="h-[374px]">
                        <p className="text-center text-gray-400 text-[28px]">
                            {noBoardInfoText}
                        </p>
                    </SimpleInfoContainer>
                </ContentCard>
            )}

            {
                boards.map(({ _count, ...board }) => {
                    return (
                        <BoardCard
                            board={board}
                            key={board.id}
                            commentCount={_count.comments}
                        />
                    );
                })
            }
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
        </div>

    );
}
