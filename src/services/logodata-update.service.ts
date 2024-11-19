// "use server"
//
//
// import { db } from "@/utils/db";
// import { kiprisService } from "@/services/kipris.service";
// import { trademarkService } from "@/services/trademark.service";
// import cron from "node-cron";
//
// // 로고상태 자동 업데이트 서비스
// const trademarkStatusUpdated = async (i: number) => {
//   try {
//     console.log(i, "번째 로고상태변경 작업시작");
//     // DB Index 1번부터 작업 시작
//     await db.trademark.findUnique({
//       where: {
//         id: i,
//       },
//     }).then(async (result: any) => {
//       const trademark = result
//
//       // 로고와 출원번호가 있을때 진행
//       if (trademark && trademark.application_number) {
//         const applicationId = trademark.application_number; // 로고의 출원번호 추출
//         await kiprisService.getTrademarkDetail(applicationId).then(async (res: any) => {
//           const newStatus = res.biblioSummaryInfo[0].registerStatus[0];
//           if (trademark.last_disposal_code_name !== newStatus) {       // 기존 로고 상태 데이터와 키프리스 로고 상태 데이터가 다를시 진행
//             const result = await trademarkService.changeTrademarkStatus(applicationId, newStatus);       // 로고 상태 업데이트 진행
//           } else {
//             console.log("로고 업데이트 변경사항 없음");
//           }
//
//         }) // 키프리스 최신 데이터 가져오기
//       }
//     });
//   } catch (err) {
//     console.log(err, "로고 업데이트에 실패했습니다");
//     return err;
//   }
// };
//
// // 작업 프로세스
// export const startProcess =  async() => {
//   try {
//     const result: any = db.$queryRaw`SELECT COUNT(*) FROM trademark`;    // DB index 정보 가져오기
//     const table_count: number = result[0].count;   // index count 변수 할당
//
//     for (let i = 0; i < table_count; i++) {
//       const result2 = await trademarkStatusUpdated(i)
//       await new Promise(resolve => setTimeout(resolve, 300));     //0.3초 마다 한번씩 실행 await 여서 비동기로 진행됨
//       console.log(result2)
//     }
//     return "success"
//   } catch (error) {
//     console.log(error, "작업에 실패했습니다.");
//     return 'error';
//   }
// };
//
// // cron 이용한 스케줄링 시스템 12시 기준 시작
// export const StartCron = () => {
//   cron.schedule("* * * * *", () => {
//     console.log("작업 시작:", new Date());
//     startProcess().then((res : string) => {
//       return console.log("모든 작업 완료:", new Date());
//     });
//   });
// };
//
// StartCron()