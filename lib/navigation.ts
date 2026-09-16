/**
 * 사이트 헤더 네비게이션 정의 — 데스크톱 드롭다운과 모바일 아코디언이 이 한 벌을 공유한다.
 *
 * 대분류는 서비스 / 비즈니스 / 회사소개 3개로 고정이고, 라벨만 사전(nav.*)을 거친다.
 * 하위 항목 라벨은 한국어 리터럴이다 — 링크가 향하는 페이지들이 전부 한국어 전용이라
 * 번역하면 클릭한 순간 언어가 뒤바뀐다. 그래서 비-한국어에서는 애초에 이 하위 항목을 보여주지
 * 않고 `homeAnchor` 로 홈 안의 섹션에만 보낸다(components/Nav.tsx 참고).
 */

export interface NavItem {
  label: string;
  desc?: string;
  href: string;
}

export interface NavColumn {
  /** 열 제목. 없으면 항목만 나열한다 */
  heading?: string;
  items: NavItem[];
}

export interface NavGroup {
  /** React key 겸 내부 식별자 */
  key: string;
  /** 사전 키 — 대분류 라벨만 번역 대상 */
  labelKey: string;
  /** 비-한국어에서 이 대분류가 대신 가리키는 홈 안의 섹션 */
  homeAnchor: string;
  columns: NavColumn[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    key: "service",
    labelKey: "nav.service",
    homeAnchor: "/#assessment",
    columns: [
      {
        // 세 열이 모두 제목을 가져야 항목 첫 줄이 같은 높이에서 시작한다
        heading: "검사",
        items: [
          {
            label: "인지기능 검사 '안녕'",
            desc: "6가지 인지영역 정기 검사",
            href: "/service-hi",
          },
          {
            label: "근골격계 기능 검사 FEA",
            desc: "5개 영역 100점 정량 평가",
            href: "/service-fea",
          },
        ],
      },
      {
        heading: "방문재활",
        items: [
          { label: "시니어 방문재활", href: "/rehab-visit" },
          { label: "근골격계 방문재활", href: "/rehab-postop" },
        ],
      },
      {
        heading: "그룹 건강관리",
        items: [
          { label: "기업 임직원 건강관리", href: "/healthcare-corporate" },
          { label: "시니어 그룹 건강관리", href: "/healthcare-senior" },
          { label: "유소년 건강관리", href: "/healthcare-youth" },
        ],
      },
    ],
  },
  {
    key: "business",
    labelKey: "nav.business",
    homeAnchor: "/#pricing",
    // 한 열에 몰면 전체폭 시트 안에서 가느다란 띠로 보인다. 2열로 쪼개 무게를 맞춘다.
    columns: [
      {
        items: [
          { label: "서비스 문의", desc: "도입 상담 신청", href: "/contact" },
          // TODO: /pricing, /use-case 페이지를 만들면 href 만 교체한다. 지금은 홈 섹션이 본문.
          { label: "요금제", desc: "플랜과 가격", href: "/#pricing" },
        ],
      },
      {
        items: [{ label: "활용사례", desc: "도입 현장 이야기", href: "/#use-case" }],
      },
    ],
  },
  {
    key: "company",
    labelKey: "nav.about",
    homeAnchor: "/#brand-story",
    columns: [
      {
        items: [
          { label: "브랜드 소개", desc: "코그모가 하는 일", href: "/about" },
          { label: "코그모 스토리", desc: "우리가 시작한 이유", href: "/story" },
        ],
      },
      {
        items: [{ label: "아티클", desc: "건강 콘텐츠", href: "/articles" }],
      },
    ],
  },
];
