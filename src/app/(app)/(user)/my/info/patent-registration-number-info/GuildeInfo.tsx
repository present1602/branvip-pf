import { SimpleInfoContainer } from "@/components/layouts/my/SimpleInfoContainer";

/* 기획에서 빠짐, 삭제 예정 */
export function GuideInfo(){
    return ( 
        <SimpleInfoContainer className="p-[20px]">
            <p className="body2-medium text-gray_scale-500 leading-6">특허고객번호는 특허청에 상표출원할 때 필요한 출원인의 고유번호입니다. 특허로에서 직접 발급받으실 수 있으며</p>
            <p className="body2-medium text-gray_scale-500 leading-6">특허고객번호 직접 기재 후 최초 출원 시 15,000원 추가 할인이 들어갑니다.</p>
            <p className="body2-medium text-gray_scale-500 leading-6">브랜빕은 ‘개인정보보호법 제 24조의2(주민등록번호 처리의 제한)’, ’상표법 시행령 제3조의 2(고유식별 정보의 처리)’,</p>
            <p className="body2-medium text-gray_scale-500 leading-6">’변리사법 제2조(업무)’를 근거로 하여 상표출원을 위한 주민등록번호를 요청하고 있습니다.</p>
        </SimpleInfoContainer>
    )
}