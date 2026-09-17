# 홈페이지(랜딩페이지) 리뉴얼 — 개발자 전달 문서

> 작성일: 2026-09-14 (원본) / 2026-09-15 저장소 반영 시 경로·이력 부분 보정
> 대상: 이 저장소(`cogmo-landing`, Next.js 16 + React 19, App Router)를 이어받아 작업할 개발자
> 범위: `app/page.tsx`(홈페이지) 전면 교체 + 6개 언어 클라이언트 i18n 신규 도입(홈 한정)

---

## 1. 배경과 목표

기존 홈페이지는 "안녕" 인지기능 검사 앱을 소개하는 B2C 톤이었다. 이번 리뉴얼은 코그모 안녕을
**"평가 기반 고객관리 플랫폼"**으로 재포지셔닝하는 B2B 랜딩페이지로 완전히 교체하는 작업이다.
타깃은 방문재활센터, 기능성 트레이닝센터, 필라테스 스튜디오, 퍼스널트레이너 등 "고객을 평가·설명·관리해야
하는 모든 전문가".

작업 순서:
1. `annyeong-landing-preview/preview.html` — 정적 HTML/vanilla JS 프리뷰로 콘텐츠·디자인·6개 언어
   번역까지 먼저 만들어 사용자 승인을 받음(별도 프로젝트 폴더, 이 저장소 밖).
2. 이번 문서가 다루는 작업 — 그 승인된 프리뷰를 이 저장소의 `app/page.tsx`로 포팅.

프리뷰 원본(`preview.html`, `assets/js/i18n.js`, `assets/js/landing.js`)은 작업자 로컬의
`annyeong-landing-preview/` 폴더에만 있고 이 저장소에는 없다. 문구를 다시 확인하거나
`lib/i18n/dictionary.ts`와 대조해야 하면 작업자에게 요청할 것.

---

## 2. 저장소 반영 경로

이 작업은 git 이력이 없는 소스 스냅샷(zip)을 받아서 진행됐고, 결과물을 다시 zip으로 전달받아
이 저장소의 `main`(`815a2c1`) 위에 적용했다. 적용 시점에 확인한 것:

- 전달본과 `main`을 전체 비교했을 때 `app/page.tsx`, `app/download/page.tsx`,
  `components/SiteChrome.tsx` 3개만 차이났고 나머지 파일은 바이트 단위로 동일 — 즉 베이스가
  어긋나서 되돌려진 커밋은 없다.
- `node_modules`, 빌드 산출물(`next-env.d.ts`, `*.tsbuildinfo`), 참고자료 폴더는 반영하지 않았다.
- 참고자료 폴더(`업로드 하지 않을 참고 자료 폴더/`)는 이 저장소 `.gitignore`에 항목이 없다.
  로컬에 두려면 `.gitignore`에 직접 추가할 것.

### 반영하면서 되돌린 것 (2026-09-15)

전달본을 `main`과 나란히 놓고 보니 홈이 사이트에서 떨어져 나가는 회귀가 있어, 머지 전에 아래를
바로잡았다. 콘텐츠·번역·실사 목업은 전부 그대로 두고 연결과 지면만 손봤다.

| 되돌린 것 | 이유 |
|---|---|
| 헤더를 전 페이지 공통으로 통일 | 홈만 별도 헤더를 쓰면서 사이트 안에서 홈이 떨어져 나갔음. 대분류 3개(서비스·비즈니스·회사소개)로 재구성하고 `lib/navigation.ts` 한 벌로 수렴 |
| 비-한국어에서는 드롭다운 대신 홈 섹션 앵커 | 번역본이 홈뿐이라 하위 페이지로 보내면 읽을 수 없는 막다른 링크가 됨. 언어 스위처도 홈에서만 노출 |
| `HomeFooter.tsx` 삭제, 전역 `Footer` 재사용 | 사업자등록번호·대표이사·주소가 홈에서만 사라졌고 약관/개인정보가 `href="#"` 죽은 링크였음 |
| `/download` 원복 | 다국어는 홈에만 두기로 함. 크롬만 바꾸면 그 페이지도 같은 정보 손실을 떠안음 |
| 섹션 순서 재구성 + 중복 제거 | 같은 운영 문제 목록을 `Problem`·`BeforeAfter`·`BrandStory` 세 곳에서 반복하고 있었다. `BrandStory` 를 `Problem` 에 흡수하고, `UseCase`(대상)를 기능 상세 앞으로, `SocialProof`(신뢰 지표)를 제품 설명 뒤로 옮겼다 |
| `ServiceExpansion.tsx` 삭제 | 헤더 `서비스` 패널이 같은 5개 프로그램을 전 페이지에서 제공하게 되면서 홈 섹션이 중복이 됨 |
| `AppDownload.tsx` 삭제 | 앱 다운로드는 헤더 CTA·히어로·요금제·최종 CTA·모바일 스티키까지 이미 5곳에서 유도하고 있어 전용 섹션이 중복이었음 |
| `Evidence.tsx` 삭제 | `SocialProof`와 수치·사전 키가 동일한 중복 섹션 |
| `FinalCta` → 공용 `CTASection` 위임 | 같은 디자인을 손으로 다시 짜면서 준비중 처리와 `py-40` 리듬을 잃었음 |
| Pricing·Hero CTA 목적지 교정 | 새 홈 전체에 `/contact` 링크가 0건이라 B2B 리드 퍼널이 막다른 길이었음 |
| 프로그램 5개를 헤더 `서비스` 패널에 배치 | 원본 Programs 섹션이 통삭제되며 `/rehab-*`·`/healthcare-*` 5개가 고아가 됐음. 홈 섹션으로 복원했다가 헤더 통일 후 그쪽으로 옮김 — 전 페이지에서 도달 가능해짐 |
| `Assessment`·`BrandStory`에 상세 페이지 링크 추가 | `/service-hi` `/service-fea` `/about` `/story` 도달 경로 복구 |
| `FadeUp` → `Reveal`(순수 CSS) | IntersectionObserver 방식이라 초기 HTML이 `opacity-0`. 하이드레이션 실패 시 섹션 대부분이 안 보였음 |
| `HeroPhoneMockup` + `animate-fade-up` + `hero.jpg` 제거 | 새 Hero가 언어별 실사 목업을 쓰면서 참조가 0이 됨 |
| 섹션 지면 리듬 재배치 | 흰/연회색이 10연속 교대하고 색 밴드가 페이지 끝 1/3에 몰려 있었음. `Report`를 `surface-annyeong` 브랜드 밴드로 올려 중반에 무게를 심음 |
| 헤더 '검사 해보기' → `disabled` | `href="#" + target="_blank"` 라 홈이 새 탭으로 하나 더 열렸음 |

반대로 **손대지 않은 것**: 6개 언어 사전 문구(과장·상투 없이 원본보다 구체적), AI 생성 이미지 6장,
섹션 구성과 순서, 실사 목업 28장.

---

## 3. 아키텍처 결정 사항과 이유

### 3-1. i18n: 클라이언트 전용, URL 라우팅 없음

`/en`, `/ja` 같은 언어별 경로를 만들지 않았다. 언어는 `localStorage`에 저장하고, 페이지는 항상 같은
`/` 주소를 쓰며, 마운트 후 저장된 언어로 텍스트만 교체한다(`next-themes`의 다크모드 전환과 동일한
패턴). 이유:
- 기존에 이 저장소는 **i18n 인프라가 전혀 없었다**(`next-intl` 등 라이브러리 없음, `[locale]` 라우트
  없음, `middleware.ts` 없음). URL 라우팅을 도입하려면 기존 라우트 10여 개(`about`, `contact`,
  `service-hi` 등)를 전부 라우트 그룹으로 옮겨야 해서 이번 작업 범위를 크게 벗어남.
- 정적 프리뷰가 이미 이 방식으로 사용자 승인을 받은 상태였음.

**트레이드오프(알고 있어야 할 것)**: 다국어 URL이 없으므로 SEO상 이 페이지는 "한국어 페이지" 하나로만
인식된다. 또한 비-한국어를 저장해둔 재방문자는 첫 렌더에 한국어가 한 프레임 보였다가 저장된 언어로
바뀌는 깜빡임이 있을 수 있다(hydration mismatch 방지를 위해 SSR은 항상 `ko`로 렌더하고
`useEffect`에서 `localStorage`를 읽어 동기화하기 때문). 이 깜빡임을 없애려면 `<head>`에 동기적으로
`localStorage`를 읽는 인라인 스크립트를 추가하고 `useSyncExternalStore`로 바꾸는 방법이 있다(
`next-themes`가 FOUC를 없애는 방식과 동일) — 지금은 하지 않았고, 필요해지면 추가할 수 있는 개선
포인트로만 남겨둔다.

### 3-2. 헤더는 전 페이지 공통 — 언어에 따라 목적지만 바뀐다

`components/SiteChrome.tsx`는 `/admin*` 만 제외하고 홈을 포함한 모든 페이지를 같은
`<Nav>` + `<main>` + `<Footer>` 로 감싼다. 헤더·푸터가 페이지마다 갈라지지 않는다.

헤더(`components/Nav.tsx`)는 `fixed` 가 아니라 `sticky` 다. 예전 `fixed` Nav 시절 `<main>` 에
붙어 있던 `pt-16` 보정은 그래서 사라졌다 — 헤더가 문서 흐름에 참여하므로 보정이 필요 없다.

구성은 **좌: 로고 + 언어 스위처 / 중앙: 대분류 3개 / 우: CTA 2개** 이고, 대분류는
`lib/navigation.ts` 한 곳에 정의해 데스크톱 드롭다운과 모바일 아코디언이 같은 데이터를 쓴다.

| 대분류 | 하위 항목 |
|---|---|
| 서비스 | 인지기능 검사 '안녕', 근골격계 기능 검사 FEA / 방문재활 2건 / 그룹 건강관리 3건 |
| 비즈니스 | 서비스 문의, 요금제, 활용사례 |
| 회사소개 | 브랜드 소개, 코그모 스토리, 아티클 |

드롭다운은 `group-hover` 와 `group-focus-within` 으로 열린다 — 순수 CSS 라 JS 없이 동작하고
키보드로도 닿는다.

#### 언어에 따라 달라지는 부분

번역본이 있는 페이지가 **홈 하나뿐**이라는 게 제약이다. 비-한국어 사용자에게 `/service-hi`,
`/about` 같은 한국어 전용 페이지로 가는 링크를 주면 전부 막다른 길이 된다. 그래서:

- **한국어**: 대분류를 펼치면 하위 페이지로 나간다.
- **그 외 언어**: 라벨·위치·디자인은 그대로인 채 드롭다운 없이 홈 안의 섹션 앵커로만 보낸다
  (`서비스 → #assessment`, `비즈니스 → #pricing`, `회사소개 → #brand-story`).

**홈이 아닌 페이지의 헤더는 저장된 언어를 무시하고 항상 한국어로 그린다**(`Nav.tsx` 의
`isMultilingual`). 본문이 한국어 전용이라 헤더만 번역되면 더 어긋난다.

**언어 스위처 자체는 전 페이지에 둔다.** 홈에만 두면 헤더 왼쪽 그룹의 폭이 달라져 가운데
대분류 메뉴 위치가 페이지마다 흔들린다. 대신 두 가지를 지킨다:

- 버튼에 표시되는 언어는 **지금 화면이 실제로 그려진 언어**다. 홈이 아니면 항상 한국어로 보인다 —
  버튼은 EN 인데 화면은 한국어인 상태를 만들지 않는다.
- 홈이 아닌 페이지에서 비-한국어를 고르면 **홈으로 이동한다**. 번역본이 홈뿐이라 그대로 두면
  고르고도 아무 일이 안 일어나는 막다른 조작이 된다.

하위 페이지들이 번역되면 그 조건 하나만 넓히면 그대로 확장된다.

#### 푸터

푸터는 전역 `components/Footer.tsx` 한 벌뿐이다. 초기 버전은 `HomeFooter.tsx` 를 따로 만들었는데,
그 결과 사업자등록번호·대표이사·주소 같은 법정 표기가 홈에서만 사라지고 약관/개인정보 링크가
`href="#"` 로 죽어 있었다. 푸터가 두 벌이면 한쪽만 갱신되는 사고가 반복되므로 한 벌로 수렴시켰다.
대가로 **푸터는 언어를 따라가지 않고 한국어 고정**이다 — 푸터가 가리키는 하위 페이지들도 전부
한국어 전용이라 지금은 이쪽이 덜 어긋난다.

#### 다른 페이지 본문은 안 건드렸다

`/about`, `/service-hi`, `/contact`, `/download` 등의 **본문 마크업과 카피는 이번 작업으로 전혀
바뀌지 않았다.** 바뀐 건 헤더뿐이다.

라우트 그룹(`app/(site)` vs `app/(home)`)으로 재구성하는 방법도 검토했지만, 헤더를 통일하고 나니
chrome 변형이 `/admin` 하나뿐이라 그럴 이유가 없어졌다.

---

## 4. 파일 구조

```
app/
  layout.tsx                      # LanguageProvider 가 여기 — 헤더가 전 페이지 공통이라 최상단이어야 함
  page.tsx                        # 홈페이지 — 12개 섹션 + StickyCta 만. 헤더·푸터는 SiteChrome 담당

components/
  SiteChrome.tsx                  # /admin 만 제외하고 전 페이지를 Nav + main + Footer 로 감쌈
  Nav.tsx                         # 사이트 공통 헤더 (sticky). 언어별 목적지 분기가 여기 있음
  MobileMenu.tsx                  # 모바일 아코디언 패널 — Nav 와 lib/navigation.ts 를 공유
  LangSwitcher.tsx                # 언어 드롭다운 (홈에서만 렌더) — 바깥 클릭/Escape로 닫힘
  FlagIcon.tsx                    # 원형 국기 인라인 SVG 5종 + en 용 지구본
  Footer.tsx                      # 전역 푸터 — 홈도 이걸 쓴다. 회사 정보는 lib/company.ts 참조
  CTASection.tsx                  # 공용 CTA 밴드 — footnote/id prop 추가됨, FinalCta 가 이걸 감싼다

  home/                           # 홈 전용 — 나머지 페이지에서는 쓰이지 않음
    Reveal.tsx                    # 등장 래퍼 — globals.css 의 reveal 키프레임 + .seq-item 스태거
    StickyCta.tsx                 # 모바일 하단 고정 CTA 바

  sections/                       # preview.html 섹션 순서 그대로 1섹션 1파일
    Hero.tsx
    SocialProof.tsx
    Problem.tsx
    CoreValue.tsx
    Assessment.tsx
    Report.tsx
    UseCase.tsx
    BeforeAfter.tsx
    CustomerManagement.tsx
    Pricing.tsx
    Faq.tsx
    FinalCta.tsx

lib/
  company.ts                      # 회사 법정 표기 단일 출처 — 번역 대상이 아니라 사전이 아닌 상수
  navigation.ts                   # 헤더 대분류 3개와 하위 항목 — 데스크톱·모바일이 공유
  i18n/
    dictionary.ts                 # LANGS + I18N (168키 × 6언어) + translate() — 원본 i18n.js에서 기계적으로 이식
    LanguageContext.tsx           # LanguageProvider, useLanguage(), useT()
    images.ts                     # LOCALIZED_IMAGES 맵 + IMAGE_DIMENSIONS + resolveLocalizedImage()
    useLocalizedImage.ts          # useLocalizedImage(slot) 훅

public/images/landing/
  frame_export/                    # 실사 목업 스크린샷, {slot}.{lang}.jpg 형식, 7슬롯 × 4언어 = 28장
  generated/                       # AI 생성 일러스트(나노바나나), 리사이즈+JPEG 압축 완료
  app-customer-profile.jpg         # 비지역화 이미지(전 언어 공용, 실사 촬영본 없음)
```

---

## 5. i18n 시스템 사용법

### 텍스트 번역 추가/수정

`lib/i18n/dictionary.ts`의 `I18N` 객체를 직접 편집한다. **6개 언어(ko/en/ja/vi/zh/th) 전부에 같은
키를 추가해야 한다** — 하나라도 빠지면 그 언어에서는 한국어로 폴백된다(오류는 안 나지만 눈에 띄지
않게 번역 누락이 생긴다). 편집 후 아래로 키 개수가 6개 언어 모두 168(+추가한 개수)로 같은지
확인하는 습관을 들일 것:

```bash
node -e '
const { I18N } = require("./lib/i18n/dictionary.ts"); // 실제로는 ts-node나 아래 스니펫 참고
'
```
(ts 파일이라 바로 require는 안 됨 — 편집 후 `npx tsc --noEmit lib/i18n/dictionary.ts ...`로 최소한
문법 오류만 잡거나, 아래처럼 간단히 각 언어 객체의 `Object.keys().length`를 눈으로 비교하는 것도
충분하다.)

컴포넌트에서는:
```tsx
import { useT } from "@/lib/i18n/LanguageContext";

function MySection() {
  const t = useT();
  return <p>{t("some.new.key")}</p>;
}
```

### 절대 번역하면 안 되는 것

Starter/Professional/Business 플랜명, Core Value 같은 영문 eyebrow 라벨과
FEA 5개 영역명(Core & Balance /
Thoracic / Hip / Shoulder / Lower Limb)은 **의도적으로 사전에 키가 없다** — 어떤 언어를
선택해도 항상 영어 리터럴 문자열 그대로 렌더링해야 한다(`components/sections/Assessment.tsx`의
FEA 카드 참고). 실수로 이런 걸 `t()`로 감싸서 사전에 키를 추가하지 말 것.

### 이미지 다국어 처리

`lib/i18n/images.ts`의 `LOCALIZED_IMAGES`에 슬롯별로 언어→경로 맵이 있다. 컴포넌트에서:
```tsx
const src = useLocalizedImage("report-cognitive"); // 현재 언어에 맞는 경로 자동 반환
```
`resolveLocalizedImage()`의 폴백 순서는 `map[lang] ?? map.en ?? map.ko`다. **베트남어(vi)·태국어(th)는
현재 실사 목업이 없어서 자동으로 영어 버전이 보인다** — 나중에 vi/th 촬영본이 생기면
`LOCALIZED_IMAGES`에 해당 언어 키만 추가하면 된다(컴포넌트 코드는 안 건드려도 됨).

새 이미지 슬롯을 추가하려면: (1) `public/images/landing/frame_export/`에
`{새슬롯}.{ko|en|ja|zh}.jpg`로 파일 추가 → (2) `images.ts`의 `LOCALIZED_IMAGES`와
`IMAGE_DIMENSIONS`(언어별로 크기가 같은 슬롯만)에 항목 추가 → (3) 컴포넌트에서 `useLocalizedImage()`
호출.

---

## 6. 섹션 컴포넌트 요약

| 파일 | 내용 | 비고 |
|---|---|---|
| `Hero.tsx` | 헤드카피, CTA 2개, 대시보드+폰 목업 이미지 | 대시보드는 `next/image` 고정 크기, 폰 목업은 언어별 세로 길이가 달라 `fill` 사용 |
| `SocialProof.tsx` | PoC/참여자/검사수/대학 통계 4칸 | 페이지에서 통계가 노출되는 유일한 자리. 같은 수치를 반복하던 `Evidence.tsx`는 제거됨 |
| `Problem.tsx` | 모호한 상담 멘트 → 고객이 던지는 질문 → 브랜드 파트(만든 사람 쪽 질문 + `/about`·`/story` 링크) | 원래 별도였던 `BrandStory` 를 흡수했다. 그쪽 pull-quote 3개가 이 섹션의 운영 문제 목록과 1:1로 겹쳤음. 헤더의 `/#brand-story` 앵커가 브랜드 파트를 가리킨다 |
| `CoreValue.tsx` | 5단계 흐름, 데스크톱 그리드/모바일 리스트 두 레이아웃 | `.map()`으로 처리, 원본 vanilla JS의 수동 DOM 재생성 함수 불필요해짐 |
| `Assessment.tsx` | 평가 3종 카드 + 카드1·2에서 `/service-hi`·`/service-fea` 로 나가는 링크 | FEA 카드(card2)의 5개 영역명은 하드코딩 영문 리터럴. 카드3은 대응 단독 페이지가 없어 링크 없음 |
| `Report.tsx` | 리포트 스크린샷 3장 | 지면이 `surface-annyeong`(브랜드 그린 밴드) — 흰/연회색 교대가 길게 이어지는 걸 중반에서 끊는 자리. 본문에 `relative z-10` 필요 |
| `UseCase.tsx` | 활용사례 3카드, 카드별 flow chip 개수 다름(5/6/5) | |
| `BeforeAfter.tsx` | Before/After 5행 비교표 | |
| `CustomerManagement.tsx` | 실제 앱·대시보드 화면 2장 + 카피 | 흐름 배지는 뺐다 — `CoreValue` 의 5단계와 같은 흐름이었음. 오른쪽 이미지(`app-customer-profile.jpg`)는 언어별 버전 없이 전 언어 공용 |
| `Pricing.tsx` | Starter/Professional/Business 3카드 | 플랜명은 하드코딩 영문 리터럴. 가격 텍스트 자체가 번역 키라 한국어는 원화, 나머지는 달러 — 별도 로직 없음 |
| `Faq.tsx` | 5문항, **각 항목이 독립적으로 열림/닫힘**(배타적 아코디언 아님) | 원본 동작 그대로 유지 — 실수로 "개선"한다고 exclusive accordion으로 바꾸지 말 것 |
| `FinalCta.tsx` | 최종 CTA — 공용 `CTASection` 에 i18n 문구만 주입 | 마크업을 따로 짜지 않는다. 준비중(disabled)·외부링크 처리와 `py-40` 리듬이 다른 9개 페이지 CTA 와 자동으로 같아짐 |

---

## 7. 알려진 이슈 / TODO

1. **`npm run build`가 실패한다** — 이번 작업과 무관한 기존 이슈. `lib/supabase.ts`가
   `NEXT_PUBLIC_SUPABASE_URL`/`SUPABASE_SERVICE_ROLE_KEY` 환경변수 없이 무조건
   `createClient()`를 호출해서, `/api/articles/[id]/view` 라우트의 페이지 데이터 수집 단계에서
   빌드가 죽는다. `.env.local`에 두 값을 채워 넣으면 해결될 것으로 예상(실제 Supabase 프로젝트 값
   필요, 이번 작업 범위 밖이라 손대지 않음). `npm run dev`와 `tsc --noEmit`, `npx eslint`는 전부
   정상 통과함.
2. **베트남어·태국어 실사 목업 없음** — 현재 영어로 자동 대체 표시 중. 촬영본이 생기면 4번 항목
   참고해서 `images.ts`에 추가.
3. **AI 생성 이미지 6장은 임시 성격** — Assessment 카드 아이콘 3개, Use Case 배너 3개
   (`public/images/landing/generated/`). 압축은 해뒀지만(약 18MB → 4.8MB) 브랜드 확정 이미지로
   교체하는 게 좋음. 확인된 문제 두 가지: (a) Use Case 배너 3장이 웜 베이지·테라코타 계열이라
   토큰(쿨그레이 + `#00874D`)에 없는 색온도로 한 섹션만 튄다, (b) 세 아이콘의 조형 문법이
   서로 다르다(라운드 사각 앱아이콘 / 컨테이너 없는 픽토그램 / 원형 배지). 교체는 별도 작업으로
   미뤄두기로 했다.
4. **`app-grip-test` 이미지 슬롯 미사용** — 앱 화면2(악력 검사) 스크린샷이 4개 언어 다 있는데
   현재 어느 섹션에도 안 쓰이고 있음(`images.ts`에 데이터만 존재). Customer Management 섹션의
   `app-customer-profile.jpg`(언어별 버전 없음) 자리를 대체할 후보로 고려해볼 수 있음.
5. **FOUC 개선 여지** — 위 3-1 참고. 필요하면 부팅 스크립트 + `useSyncExternalStore` 방식으로
   업그레이드 가능.
6. **헤더 '검사 해보기' CTA가 비활성 상태** — 안녕 인지기능 검사 미니 웹(annyeong-check-app)이
   미배포라 `disabled` 버튼으로 두었다(`components/Nav.tsx`, 모바일은 `components/MobileMenu.tsx`).
   배포되면 그 자리를
   `<a href={실제주소} target="_blank" rel="noopener noreferrer">`로 바꿀 것. 이전 버전은
   `href="#" + target="_blank"` 라 누르면 홈이 새 탭으로 하나 더 열렸다.
7. **홈 푸터는 한국어 고정** — 3-2 참고. 전역 `Footer`를 재사용하기 때문이며, 하위 페이지가
   다국어화되기 전까지는 의도된 상태다.
8. **`animate-program-slide`가 미사용** — `app/globals.css`에 정의만 있고 참조가 없다. 이번
   리뉴얼 이전(`main`)부터 그랬던 것이라 이번 작업에서는 손대지 않았다.

---

## 8. 로컬 검증 방법

```bash
npm ci                 # node_modules 없으면 먼저 (package-lock.json 기준 설치)
npm run dev             # http://localhost:3000/ 에서 홈페이지 확인
npm run lint             # 새로 추가된 파일은 전부 통과함(기존 파일 일부 사전 존재하는 lint 에러 있음, 무관)
npx tsc --noEmit -p tsconfig.json   # 타입체크
```

체크리스트:
- [ ] 헤더 언어 버튼으로 6개 언어 전환 시 텍스트·이미지가 바뀌는지, vi/th는 영어로 보이는지
- [ ] FEA 카드 5개 영역명과 Professional/Business가 언어 무관하게 항상 영어인지
- [ ] 헤더 앵커 클릭(서비스/주요기능/활용사례/요금제/회사소개) 시 섹션이 고정 헤더에 안 가려지는지
- [ ] FAQ 항목들이 서로 독립적으로 열리고 닫히는지
- [ ] `/about`, `/service-hi`, `/download` 등 다른 페이지의 기존 Nav/Footer가 그대로인지
      (한국어 전용, 언어버튼 없음)
- [ ] 홈 맨 아래 푸터에 사업자등록번호·대표이사·주소가 보이고, 다른 페이지 푸터와 색·구성이 같은지
- [ ] 홈에서 `/articles` `/about` `/story` `/contact` `/service-hi` `/service-fea`
      `/rehab-*` `/healthcare-*` 로 실제로 이동되는지(전부 푸터 또는 섹션 안에 링크가 있어야 함)
- [ ] 요금제 3개 CTA가 각각 `/download`(무료 체험)·`/contact`(유료 2종)로 가는지
- [ ] 헤더 '검사 체험하기'가 비활성이고, 눌러도 새 탭이 열리지 않는지
- [ ] 홈과 `/about`·`/service-hi`·`/download` 의 헤더가 서로 같은지(로고·대분류 3개·CTA 2개)
- [ ] 서비스 대분류에 마우스를 올리면 3열 패널이 열리고, Tab 키로도 열리는지
- [ ] 비-한국어(EN 등)를 고르면 대분류가 드롭다운 없이 홈 섹션으로 스크롤되는지
- [ ] 홈이 아닌 페이지에는 언어 스위처가 없고 헤더가 한국어인지
- [ ] 모바일 뷰포트에서 햄버거 메뉴, 하단 스티키 CTA 동작 확인
- [ ] JS를 끄고 홈을 열었을 때 모든 섹션이 보이는지(등장 연출이 순수 CSS라 보여야 정상)

---

## 9. 참고 원본

아래 원본은 전부 **작업자 로컬(`annyeong-landing-preview/`)에만 있고 이 저장소에는 없다.** 필요하면
작업자에게 요청할 것.

- 정적 프리뷰(승인본): `preview.html`
- 원본 번역 사전(JS): `assets/js/i18n.js` → 이식 결과가 `lib/i18n/dictionary.ts`
- 원본 렌더링 로직(JS): `assets/js/landing.js` → 포팅 시 React `.map()`으로 대체됨
- 실사 목업 원본: `업로드 하지 않을 참고 자료 폴더/코그모랜딩페이지용/` — 전달받은 zip에 들어있었고
  저장소에는 반영하지 않았다(`public/images/landing/frame_export/`의 압축본만 커밋됨)
