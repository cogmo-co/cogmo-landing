/**
 * 회사 법정 표기 단일 출처.
 *
 * 상호·주소·사업자등록번호·대표자는 등기 정보라 **번역 대상이 아님** — 어떤 언어로 보든 같은
 * 문자열이어야 한다. 그래서 lib/i18n/dictionary.ts 가 아니라 여기 상수로 둔다.
 * (실제로 리뉴얼 초기 버전이 상호를 언어별로 번역해 `Cogmo株式会社` 같은 실재하지 않는 법인명을
 *  만들어낸 적이 있음 — 같은 실수를 막으려는 것이기도 함)
 *
 * 수신 메일 주소는 app/api/contact/route.ts 도 같은 값을 쓴다. 바꿀 일이 생기면 두 곳을 함께 볼 것.
 */
export const COMPANY = {
  nameKo: "코그모 주식회사",
  nameEn: "Cogmo Co., Ltd.",
  /** 주소는 줄바꿈 위치까지 표기 규칙이라 배열로 둔다 */
  addressLines: ["인천 미추홀구 인하로 100", "인하대학교 인하드림센터 204A"],
  registrationNumber: "702-87-03690",
  ceo: "한석규",
  email: "official@cogmo.life",
} as const;
