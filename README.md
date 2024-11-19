# 데브게이트 보일러 플레이트

## 들어가면서

이 문서는 컴포넌트를 구현하는 과정에서 있었던 다양한 설계 방법을 다루고 있습니다.

현재도 작업을 하고 있기 때문에, 한가지 방식으로 통일하여 컴포넌트를 설계하지 않습니다.
실험적으로 여러 방식을 사용하고 있습니다.
향후 코드 정리와 더불어 아키텍쳐와 컨벤션을 한번에 정리하고자 하니, 이 점 유의하시길 바랍니다.

---

## 디자인 시스템

우선적으로 주요 컴포넌트들을 자체 개발하고 있습니다. 유연한 디자인 시스템 코드 베이스를 바탕으로 빠르게 개발 작업을 완료하는 것 목표입니다.

일부 컴포넌트의 이름 및 prop은 Figma와 완전히 다르거나, 일부 조정한 부분이 있습니다.

### **현황**

| 컴포넌트              | 진행도 | 비고                                        |
| --------------------- | ------ | ------------------------------------------- |
| Button                | ✅     |                                             |
| Ghost Button          | ✅     | 버튼 상태 통합 예정(solid, outline, ghost)  |
| Social Login Button   | ✅     | NextAuth와 함께 더 많은 provider 지원       |
| Accordion             | ✅     |                                             |
| Tab Button            | ✅     | Tab / TabItem / TabPanel 로 구성            |
| Layout                | ✅     | `<section>` 태그로 대체 app.css 참조        |
| Header                | ✅     | Header / AppBar(mobile only) 두가지로 분류  |
| Modal / Drawer Slot   | ✅     | ModalHeader로 이름 변경                     |
| Modal                 | ✅     | 자체 구현                                   |
| Drawer                | ✅     | /Modal/ 내부로 이동                         |
| NextCustomInput Label           | ✅     | Label로 이름 변경                           |
| Textinput             | ✅     |                                             |
| Textarea              | ✅     |                                             | 
| Select                | ✅     |                                             |
| Dropdown              | ❌     |                                             |
| Toggle                | ✅     |                                             |
| Checkbox              | ✅     |                                             |
| Radiobutton           | ✅     |                                             |
| Addressinput          | ✅     |                                             |
| Image Uploader        | ❌     | 컴포넌트 분리 예정                          |
| Badge                 | ✅     |                                             |
| Skeleton              | ✅     |                                             |
| Loading Indicator     | ✅     |                                             |
| Alert                 | ❌     |                                             |
| Tooltip               | ❌     |                                             |
| ----- 추가 개발 ----- | ---    | ----- 외부 프로젝트에서 만들어진 것들 ----- |
| Tag / Tag NextCustomInput       | ✅     | 지식 공유 플랫폼 프로젝트에서 사용됨        |

### **컴포넌트 설계 방식**

1. props 타입 선언

   항상 컴포넌트 이름 뒤에 ~Props를 붙인다.

   ```
    interface AccordionProps {
      title: string;
      children: React.ReactNode;
      outline?: boolean;
    }
   ```

   prop의 기본값을 지정하는 경우, 파라미터에서 분해 할당한다. `props` 와 `restProps` 를 사용한다.

   ```
    function Badge({ size = "sm", ...props }: BadgeProps) {
      const { content, outline, className, ...restProps } = props;
    }
   ```

2. 스타일링

   - (적극 권장)twMerge : 단일 클래스가 아닌, 복합적인 동작이 이뤄지는 컴포넌트라면 사용

     ```
      <div
        className={twMerge(
          "group cursor-pointer rounded-2xl bg-white p-4",
          outline && "ring-1 ring-inset ring-surface-200",
          className
        )}
      ></div>
     ```

   - Class name : 대부분의 경우 클래스 이름을 오브젝트 형태로 저장하길 권장한다.

     ```
       const sizeClass = {
         sm: "px-3 py-2 text-sm gap-x-1",
         md: "px-4 py-3 text-base gap-x-2",
         lg: "p-4 text-xl gap-x-3",
       };

       <div className={twMerge(sizeClass[size])}/>
     ```

   - Attribute selector : boolean 형태의 값이나, 단순한 형태의 클래스 정도에 사용 (가급적 twMerge 사용 요망)
     ```
       <div
         className="ring-inset ring-surface-200 data-[solid=false]:ring-1
         data-solid={solid}  <-- boolean
       >
     ```
     [관련 문서](https://tailwindcss.com/docs/hover-focus-and-other-states#attribute-selectors)

---

====================================================================================
## 마이페이지
  - 기본 인수인계 내용 링크 : https://docs.google.com/document/d/1sSoQR1WakxHNqJX5NUc7zNAx_nUup5dbZAnFHYY7j7M/edit#heading=h.gywu4vhsh0gd
  - 내상표 조회 : applicantNumber 420070496201로 넣으면 샘플데이터 받을 수 있음.
  - 올인원 쪽과 마이페이지쪽 같이해당되는데 OrderUserApplicant 테이블 필요함(UserApplicant와 거의 동일한 내용 담고 있으면서 order테이블과 fk로 연결되는 테이블)

## 참고  
  - 비밀번호 찾기 재설정 이메일 링크로 클린 안됨. 모바일이면 많이 불편한듯함.
  - 이메일 비밀번호찾기 후 인증번호메일 -> 로고 엄청 크게 나오거나 이미지들 안나오는 경우 있음
  - 기존에 상용-개발 프로젝트 분리가 안되어 기존마이페이지파일를 유지한 채로  마이페이지를 m변경하면서 사용하던 불필요한 함수들 등 남아있는 경우 있음
  - my > logoscrap: 스크랩데이터 db데이터 적용시킨 파일들(추후 사용할 수 있음)
  - my > logo-scrap: 스크랩데이터 db데이터 로컬스토리지 적용시킨 파일들(현재 사용중)
  - account -> socialemail 최초 가입 시 이메일로 저장되고 이후 업데이트 없어서 카톡 회원이 이메일 변경하는 경우에도 마이페이지 소셜이메일 계정은 변경 전 계정으로 나타남(가입자명 옆 카카오 아이콘 롤오버시 나타나는 이메일) -> 혹시 요청 로그인 시 socialemail 칼럼 업데이트 처리하는 코드 넣으면됨.
  - 로그인 시 lastLoggedIn 업데이트 메소드 user.service에 정의돼있고 authoptions에서 await userService.updateLastLoggedIn(user.id) 필요한 부분에서 호출만 하면 적용될 것 같은데 작업 아직 안해
  - 컴포넌트색, 특히 회색 뒤죽박죽 섞여있음. tailwidncss.config 
  - 회색조 컬러들 데브게이트 컴포넌트는 컬렆팔레트 zinc(ts config에서 surface 로 ) 신규 컴포넌트 코드들은 gray로 돼있음
  - tailwindcss config 피그마와 안맞는부분들 있음(warm-gray 등)
  - 로그인 중 nextui 검은화면으로 리다이렉트되는 경우 생기고 callbackUrl과 관련이 있을 수 있는데 언제 생기는지부터 잘 파악이 안돼서 못고쳐놓음. 그런 상황이 최초1회 가입 후 로그인시나 언제 나올 수도 있음.
  - 7월 30일작업까지만 main브랜치에 병합돼있고 7월 31일 작업한 내용은 develop브랜치에 남아있음(퇴사 후 다음개발자 오기까지 공백기간 생기니 혹시 문제생길 경우 우려해 병합안함).


###### 프로젝트 구조 관련
  - zustand사용 안하는 훅스(useViewport등)와 zustand파일들 같은 hooks에 있는데 폴더 분리해도 될듯함.
  - 인터페이스 파일들 위치 정리안돼있고 export해서 같이 쓸 수 있는 경우도 재선언하는 경우 많음. 인터페이스명도 규칙 없음
  - user.service.ts에 사용자 정보관련, applicant 관련, 1:1문의(userboard)관련 모두 섞여있음.
  - compoents/layout/my에 마이페이지에서 쓰는 컴포넌트들 있는데 관리자쪽에서 사용 가능해보이는 것들도 있으나 일단 폴더명 my로 해둠. 혹시 관리자와 컴포넌트 공유하는쪽으로 진행 원한다 하면 폴더명 바꿔도 될듯함. 
  - 마이페이지 1:1문의 상세에서 제목앞에 <답변완료> : 어드민 아이디로 댓글 하나라도 있는 경우 답변완료로 처리.
  - userboard(1:1문의내역)에 isAdmin항목 있는데 기존에 있던거 안지우고 놔둔건데 필요없어보일듯함.
  - validation관련 utils함수  v3/component 아래에도 있고 utils아래에도 있는데 utils아래로 통일시키는편이 좋아보임
  - utils아래에 utils폴더 아래 위치하기 부적절해보이는 파일들 있는 섞여있는 것 같음
  - 기존 팝업메세지 등 텍스트 하드코딩돼있는거 변수처리하고 파일 만들어서 모으는 편이 좋아보임
  - 에러메세지에 대해서도 비슷하게 처리하거나 따로 관리하는 편이 좋아보임 (밸리데이션 후 토스트메세지 띄워주는건 utils에 작업해둠)


#  컴포넌트 구조 관련
  - 기존 1차 개발(데브게이트)의 컴포넌트들에 분리해서 v3/componets로 다른 컴포넌트 폴더가 존재해서 혼란스러울 수 있음.



## prettier 적용:
  - cmd + shift + p -> usersetting json 파일 "editor.formatOnSave": true, 추가(.prettierrc 적용됨)

## 인증, 유저정보 저장관련
  - 회원정보 수정 시 화면에 수정 내용 바로 반영되게 하려고 나중에 session.data.user에서 보여주던걸 zustand user persist로 적용시킴. 
  - 회원가입에서는 이메일인증있으나 회원정보 수정에서는 이메일 인증 없음
  - 회원탈퇴 시 user talbe isDelete true 변경됨. 탈퇴 후 재가입 시 동일 이메일의 이메일아이디나 소셜계정으로 로그인 시도 시 처리 구현안돼있음
  - nextauth로 소셜로그인 구현 시 기능은 다 구현돼도 원하는 때에 토스트메세지를 띄워주는 게 힘든 부분 등 제약이 따르는 것 같음

## db 테이블 관련
  - 7월 9일 기준으로 프리즈마로 db관리 적용 시작함. 
  - db의 테이블 스네이크케이스가 대부분이나 ApplicantTrademark 등 일부 다른 테이블 있음
  - boolean type에서 isAdmin등 캐멀케이스로 지었으나 IsVerification 등 파스칼케이스로 된 것들 있음
  - id cuid, autoincrement 기준 모호함. 정리 필요해보임.
  - db 테이블명 상표출원 관련 컬럼명이 Applicant 헷갈림
  - SignitureImage 현재 사용 안함. 추후 활용 가능성 있을수도 있어서 남겨둠.
  - schema에서 db변수들 대부분 캐멀케이스로 변환했으나 api쓰는쪽들은 스네이크케이스 쓰는 것들 있음
  - order테이블 finalPaymentPrice 매칭칼럼 total_price 헷갈림주의 -> 변수명 totalPrice 수정하는게 좋아보임
  

## nextjs버전
  - nextjs13사용중. 필요 시 14로 버전업 고려 가능

## 마이페이지 기존 파일 삭제
  -  기존 마이페이지 상용에서 사용하는 이유 때문에 못지우고 남긴상태로 개발진행, 마이페이지 새로 개발한 걸로 덮었으나 기존 마이페이지가 me폴더 아래 있었는데 해당 코드와 연결된 불필요한 코드들 남아있을 수도 있음(component/layout/me, me 패스로 연결되는 부분 등)
  - 마이페이지 가입자정보 > 가입자명 옆에 소셜아이콘 hover시 뜨는 이메일주소는 accounts테이블의 socialemail계정. 카카오는 소셜이메일 계정 수정가능한데 수정하더라도 기존에는 기존 이메일로보여짐. 로그인 시마다 업데이트 처리해줘도 무방하나 일단 작업은 안해둠
  - 마이페이지 1:1문의에서 ImageUploaadBox쓰는데 ImageUploaadBox 안에서 useUploadLogoStore 사용해서 혼동올 수 있음. useUploadLogoStore 이름 바꿔도 될듯함w
  

## 변수명 관련
  - 변수명에 trademark와 logo가 많이 섞여있는데 구분이 다소 모호함.
  - Label 속성 v3/component/BUI의 속성 require, devgate소스는 required
  - db 주민등록번호 칼럼명 registerNumber 헷갈림. 처음에 특허등록번호같은 건줄 알았음. 그리고 네이밍 어떤건 registration 어떤건 register임
  - db 법인등록번호 칼럼명 compRegistrationNumber 아니고 corpRegistrationNumber. 
  (db칼럼명 제외는 법인을 company붙이나 corporate로 해서 corpRegistrationNumber 인데 헷갈리면 compRegistrationNumber로 바꿔도될듯함)
  - user.service.ts getUserProfileOrThrow메소드명 유저applicant까지 다 불러오는 메소드고 getUserProfile도 만들어서 getUserProfileOrThrow메소드명바꾸는게 좋아보임
  - 마이 > 특허고객번호 조회에서는 [전체] 조회 시 모두 가져온다는 키로 'ALL'을 넣었는데 마이 > 내의뢰관리 조회에서는 ServiceKeyMap에 'ALL': 올인원 이런식으로 돼있어서 'ALL'이 올인원 조회고 type을 안넘겨야 전체 조회가 되게 해서 헷갈릴 수 있음. 
  
## 액션함수명, 서비스함수명
- 액션함수명, service의 함수명 일부는 같고 일부는 다르고 규칙 없음.

## 이미지 url fullpath
  - 현재 db에 s3 이미지가 버킷주소까지 포함해서 풀패스로 저장돼있음. 필요 시 이미지경로 env변수 빼서 imageurl 조합하는 식으로 해도 될 것 같음

## 타입관련
  - 유저관련 타입에서 phoneNumber 등 타입 phoneNumber? :string | null | undefined와 같은 형태인데 코드개선 가능할수도있음

## 리팩토링 관련
  - loginBtn 파일 안에 gnb헤더 유저프로필 컴포넌트 포함돼있어서 파일이름 수정하거나 컴포넌트 내용 분리하는 편이 좋아보임
  - gnb안에 글로벌헤더와 푸터 있고 그 안에 내용 들어가는 식이라 gnb이름 안어울려서 헷갈리 수 있음("@/components/v3/components/GNB/GlobalNavigationBar")

## 키프리스
  -  데이터서비스 -> OPEN API ->권리구분 국내ip데이터 한곡공보  : 검색 누르고 -> 상표출원속보
  -  rest 탭 > 항목별검색 > 자유검색
  - (상표/특허관련쪽은 기개발된 파트 대부분 박병호 개발자쪽이어서 박병호개발자한테 물어보시면 더 잘 알려주실거예요 )



# 컴포넌트선언 : 
  어떤건 export default function Component
  어던건 const Component = () => 등 정리 안돼있음 


# 서버 크레딧 만기 9월 말 : 그전까지 많이 써도 되고 이후엔 줄여야 될 것 같음
 - ec2 branvip-prod 안쓰는 것 같음. 병호님한테 물어보고 지워도 될것같음
 - branvip-test-server : 개인 테스트용 서버, 크레딧 만료전 종료시키고 고정 IP 반납해야 돈 안나옴
 - 현재 ssl acm, route53, 로드밸런서 사용중인데 ssl무료로도 가능한 구성 있으니 크레딧 만료되면 이부분 전달 필요할 것 같음 
 - rds : 상용 : branvip-db-test, 개발 : db-bravip. 나중에 개발서버가 추가되어 이름 혼동 올 수 있음. 
 - ec2: branvip-prod-next가 상용서버, 사용서버 내에 develop브랜치(dev.branvip.com)도 4000번 포트에서 구동중
 
## 서버
 - dev.branvip.com 도메인 aws 로드밸런서에서 4000번 포트로 연결돼있음. 
 - develop브랜치 pm2에서 branvip-dev 돌리면 4000번에서 돌아감
 - ec2 접속 pem파일 : cy/secu/ec2kp.pem  나 인수인계 폴더. .ssh에서 ssh branvipdev로 접속 가능
 - ec2 branvip-prod는 예전 사용하던 상용서번데 지금은 사용안하는 듯함. 다른서버는 남아있으면 지워도됨(제가 개인 테스트용으로 사용)
 

## 스타일오류
 - 참고 : 푸터영역 mt-[100px] -> pt-[100px] 수정 필요한 부분들 있음(겉으로 잘 드러나지 않는데 나중에 수정할 필요 생길 수 있음)


## 혹시 개발db 데이터를 날리는 상황이 왔을 경우 복구 방법
 - 쉬운방법 : rdb 스냅샷으로 새 db인스턴스 생성 후 새로 생성된 db를 개발db로 사용
 - 데이터 옮기는 방법: dbeaver 등 db프로그램으로 상용db에서 vienna_code 테이블 제외하고 데이터내보내기로 다른 테이블 데이터는 한번에 복구 가능.
   비엔나코드 테이블은 parentcode가 null인 데이터 먼저 복사해서 삽입하고 save후 나머지 parentcode가 not null인 데이터들 복사해서 붙여넣으면 됨. dbeaver기준 advanced paste로 붙여넣음. 
   중간에 실패하면 실패지점부터 다시 복사해서 옮기면 됨(더 좋은 방법이 있을 수 있으나 저는 이 방법으로 했었음).




  
 

