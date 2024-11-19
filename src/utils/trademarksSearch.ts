// 예를 들어 React 컴포넌트 내부에서 사용할 수 있는 함수

import { ITrademarksSearch } from "@/pages/api/tm-search";

export const trademarksSearch = async (tmData: string) => {
  const response = await fetch('/api/tm-search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tmData),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch trademarks');
  }
  return response.json();
};
