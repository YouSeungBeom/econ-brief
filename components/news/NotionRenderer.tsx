// Notion 블록 렌더러: NotionBlock 배열을 HTML로 변환하여 렌더링
// TODO: paragraph, heading_1/2/3, image, quote, bulleted_list_item 등 블록 타입별 처리

import type { NotionBlock } from "@/lib/types"

interface NotionRendererProps {
  // 렌더링할 Notion 블록 목록
  blocks: NotionBlock[]
}

export function NotionRenderer({ blocks }: NotionRendererProps) {
  if (blocks.length === 0) {
    return <p className="text-muted-foreground">본문이 없습니다.</p>
  }

  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      {blocks.map((block) => (
        // TODO: block.type에 따른 컴포넌트 분기 렌더링
        <div key={block.id} data-block-type={block.type}>
          {/* TODO: 블록 타입별 렌더링 구현 */}
        </div>
      ))}
    </div>
  )
}
