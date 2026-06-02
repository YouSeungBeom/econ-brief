// Task 006 더미 데이터: 실제 Notion 연동 전 UI 레이아웃 검증용 (Task 007/008에서 삭제 예정)
import type { NewsArticle, NotionBlock } from "@/lib/types"

// 카테고리 분포: 거시경제 2건, 주식/증시 1건, 부동산 1건, 글로벌 2건
export const DUMMY_ARTICLES: NewsArticle[] = [
  {
    id: "article-001",
    slug: "article-001",
    title: "한국은행, 기준금리 3.25%로 동결…물가 안정세 속 신중한 기조 유지",
    summary:
      "한국은행 금융통화위원회가 기준금리를 3.25%로 동결했다. 물가 상승률이 목표치(2%) 수준에 근접했으나 글로벌 에너지 가격 변동성과 환율 불안 요소를 감안해 신중한 입장을 유지했다.",
    category: "거시경제",
    tags: ["금리", "한국은행", "통화정책"],
    published: "2026-05-30T09:00:00.000Z",
    status: "Published",
    thumbnail: null,
    source: "https://example.com/news/001",
  },
  {
    id: "article-002",
    slug: "article-002",
    title: "코스피 2,700선 돌파…반도체 강세에 외국인 순매수 지속",
    summary:
      "국내 증시가 반도체 대형주 강세와 외국인 매수세에 힘입어 코스피 지수 2,700선을 돌파했다. 삼성전자와 SK하이닉스가 각각 2%대 상승을 기록하며 지수를 견인했다.",
    category: "주식/증시",
    tags: ["코스피", "반도체", "외국인"],
    published: "2026-05-29T09:00:00.000Z",
    status: "Published",
    thumbnail: null,
    source: "https://example.com/news/002",
  },
  {
    id: "article-003",
    slug: "article-003",
    title: "서울 아파트 거래량 3개월 연속 증가…강남 3구 중심 매수세 회복",
    summary:
      "서울 아파트 거래량이 3개월 연속 증가하며 회복 신호를 보이고 있다. 강남·서초·송파 등 강남 3구를 중심으로 실수요자 및 투자 수요가 재유입되는 분위기다.",
    category: "부동산",
    tags: ["아파트", "서울", "강남"],
    published: "2026-05-28T09:00:00.000Z",
    status: "Published",
    thumbnail: null,
    source: "https://example.com/news/003",
  },
  {
    id: "article-004",
    slug: "article-004",
    title: "연준 FOMC 의사록 공개…연내 1회 금리 인하 가능성 시사",
    summary:
      "미국 연방준비제도(Fed)의 FOMC 의사록이 공개되며 연내 1회 금리 인하 가능성을 시사했다. 위원들은 인플레이션 둔화 속도가 예상보다 느리다는 데 공감대를 형성했다.",
    category: "글로벌",
    tags: ["연준", "FOMC", "금리인하"],
    published: "2026-05-27T09:00:00.000Z",
    status: "Published",
    thumbnail: null,
    source: "https://example.com/news/004",
  },
  {
    id: "article-005",
    slug: "article-005",
    title: "국내 소비자물가 2.1% 상승…에너지 가격 하락이 물가 견인",
    summary:
      "5월 국내 소비자물가지수(CPI)가 전년 동기 대비 2.1% 상승했다. 에너지 가격 하락이 전체 물가를 누르는 주요 요인으로 작용했으며, 식료품 가격은 소폭 상승세를 이어갔다.",
    category: "거시경제",
    tags: ["물가", "CPI", "에너지"],
    published: "2026-05-26T09:00:00.000Z",
    status: "Published",
    thumbnail: null,
    source: null,
  },
  {
    id: "article-006",
    slug: "article-006",
    title: "엔비디아 실적 서프라이즈…AI 반도체 수요 지속 확인",
    summary:
      "엔비디아가 시장 예상을 크게 웃도는 분기 실적을 발표했다. 데이터센터 부문 매출이 전년 대비 400% 증가하며 AI 반도체 수요가 지속됨을 확인했다.",
    category: "글로벌",
    tags: ["엔비디아", "AI", "반도체"],
    published: "2026-05-25T09:00:00.000Z",
    status: "Published",
    thumbnail: null,
    source: "https://example.com/news/006",
  },
]

// 뉴스 상세 페이지 더미 본문 블록 — NotionRenderer의 paragraph/heading/quote/list 분기 검증용
export const DUMMY_BLOCKS: NotionBlock[] = [
  {
    id: "block-001",
    parentId: "article-001",
    type: "heading_2",
    content: {
      rich_text: [
        {
          type: "text",
          plain_text: "핵심 결정 배경",
          href: null,
          annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: "default" },
          text: { content: "핵심 결정 배경", link: null },
        },
      ],
    },
  },
  {
    id: "block-002",
    parentId: "article-001",
    type: "paragraph",
    content: {
      rich_text: [
        {
          type: "text",
          plain_text: "금융통화위원회는 소비자물가 상승률이 2%대 초반으로 안정되고 있으나, 글로벌 에너지 가격 변동성과 환율 불안 요소를 감안해 금리 동결을 결정했습니다.",
          href: null,
          annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: "default" },
          text: { content: "금융통화위원회는 소비자물가 상승률이 2%대 초반으로 안정되고 있으나, 글로벌 에너지 가격 변동성과 환율 불안 요소를 감안해 금리 동결을 결정했습니다.", link: null },
        },
      ],
    },
  },
  {
    id: "block-003",
    parentId: "article-001",
    type: "quote",
    content: {
      rich_text: [
        {
          type: "text",
          plain_text: "물가 안정 흐름은 긍정적이나 대외 불확실성이 여전해 신중한 접근이 필요하다. — 한국은행 총재",
          href: null,
          annotations: { bold: false, italic: true, strikethrough: false, underline: false, code: false, color: "default" },
          text: { content: "물가 안정 흐름은 긍정적이나 대외 불확실성이 여전해 신중한 접근이 필요하다. — 한국은행 총재", link: null },
        },
      ],
    },
  },
  {
    id: "block-004",
    parentId: "article-001",
    type: "heading_2",
    content: {
      rich_text: [
        {
          type: "text",
          plain_text: "시장 반응 및 전망",
          href: null,
          annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: "default" },
          text: { content: "시장 반응 및 전망", link: null },
        },
      ],
    },
  },
  {
    id: "block-005",
    parentId: "article-001",
    type: "bulleted_list_item",
    content: {
      rich_text: [
        {
          type: "text",
          plain_text: "국채 금리는 동결 결정 직후 소폭 하락했습니다.",
          href: null,
          annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: "default" },
          text: { content: "국채 금리는 동결 결정 직후 소폭 하락했습니다.", link: null },
        },
      ],
    },
  },
  {
    id: "block-006",
    parentId: "article-001",
    type: "bulleted_list_item",
    content: {
      rich_text: [
        {
          type: "text",
          plain_text: "원달러 환율은 전일 대비 5원 하락해 1,370원대를 기록했습니다.",
          href: null,
          annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: "default" },
          text: { content: "원달러 환율은 전일 대비 5원 하락해 1,370원대를 기록했습니다.", link: null },
        },
      ],
    },
  },
  {
    id: "block-007",
    parentId: "article-001",
    type: "paragraph",
    content: {
      rich_text: [
        {
          type: "text",
          plain_text: "대부분의 시장 전문가들은 하반기 1~2회 금리 인하 가능성에 무게를 두고 있으며, 미국 연준의 통화정책 방향이 주요 변수가 될 것으로 분석합니다.",
          href: null,
          annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: "default" },
          text: { content: "대부분의 시장 전문가들은 하반기 1~2회 금리 인하 가능성에 무게를 두고 있으며, 미국 연준의 통화정책 방향이 주요 변수가 될 것으로 분석합니다.", link: null },
        },
      ],
    },
  },
]
