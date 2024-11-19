
import { create } from "zustand";

interface ReviewCardIndexState {
  offset: number; // 현재 활성화된 리뷰 카드의 인덱스
  setOffset: (index: number) => void; // 인덱스 설정 함수
}

// 스토어 생성
const useReviewCardIndex = create<ReviewCardIndexState>((set) => ({
  offset: 0, // 초기 활성 인덱스
  setOffset: (index: number) => set({ offset: index }), // 상태 업데이트 함수
}));

export default useReviewCardIndex;