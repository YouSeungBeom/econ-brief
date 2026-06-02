// Notion 블록 렌더러: NotionBlock 배열을 HTML 요소로 변환하여 본문 렌더링
import type { ReactNode } from "react"
import Image from "next/image"
import type { NotionBlock, NotionRichText, NotionBlockContent } from "@/lib/types"

interface NotionRendererProps {
  // 렌더링할 Notion 블록 목록
  blocks: NotionBlock[]
}

// rich_text 배열을 인라인 스타일이 적용된 JSX로 변환하는 헬퍼 함수
function renderRichText(richTexts: NotionRichText[]): ReactNode[] {
  return richTexts.map((rt, index) => {
    let node: React.ReactNode = rt.plain_text

    // 인라인 코드 스타일 적용
    if (rt.annotations.code) {
      node = (
        <code key={index} className="bg-muted px-1 rounded text-sm font-mono">
          {node}
        </code>
      )
    }
    // 굵게
    if (rt.annotations.bold) {
      node = <strong key={index}>{node}</strong>
    }
    // 기울임
    if (rt.annotations.italic) {
      node = <em key={index}>{node}</em>
    }
    // 링크
    if (rt.href) {
      node = (
        <a
          key={index}
          href={rt.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline"
        >
          {node}
        </a>
      )
    }

    return <span key={index}>{node}</span>
  })
}

// rich_text 배열 접근을 위한 타입 가드
function hasRichText(content: NotionBlockContent): content is { rich_text: NotionRichText[] } {
  return "rich_text" in content
}

// 이미지 블록 content 타입 가드: type + external/file 속성 검사
type ImageBlockContent = {
  type: "external" | "file"
  external?: { url: string }
  file?: { url: string }
  caption?: NotionRichText[]
}

function isImageContent(content: NotionBlockContent): content is ImageBlockContent {
  return (
    typeof content === "object" &&
    content !== null &&
    "type" in content &&
    (content.type === "external" || content.type === "file")
  )
}

// 이미지 URL을 블록 content에서 추출
function getImageUrl(content: NotionBlockContent): string | null {
  if (!isImageContent(content)) return null
  if (content.type === "external") return content.external?.url ?? null
  if (content.type === "file") return content.file?.url ?? null
  return null
}

// 단일 Notion 블록을 JSX 엘리먼트로 변환
function renderBlock(block: NotionBlock): ReactNode {
  const { type, content, id } = block

  // rich_text 기반 블록 공통 처리
  const richText = hasRichText(content) ? renderRichText(content.rich_text) : null

  switch (type) {
    case "paragraph":
      return (
        <p key={id} className="mb-4 leading-7 text-foreground">
          {richText}
        </p>
      )
    case "heading_1":
      return (
        <h1 key={id} className="mt-8 mb-4 text-3xl font-bold tracking-tight">
          {richText}
        </h1>
      )
    case "heading_2":
      return (
        <h2 key={id} className="mt-6 mb-3 text-2xl font-semibold">
          {richText}
        </h2>
      )
    case "heading_3":
      return (
        <h3 key={id} className="mt-4 mb-2 text-xl font-semibold">
          {richText}
        </h3>
      )
    case "bulleted_list_item":
      return (
        <ul key={id} className="mb-1 list-none pl-4">
          <li className="before:mr-2 before:content-['•']">{richText}</li>
        </ul>
      )
    case "numbered_list_item":
      return (
        <ol key={id} className="mb-1 list-decimal pl-6">
          <li>{richText}</li>
        </ol>
      )
    case "quote":
      return (
        <blockquote
          key={id}
          className="my-4 border-l-4 border-primary pl-4 italic text-muted-foreground"
        >
          {richText}
        </blockquote>
      )
    case "code": {
      // 코드 블록: 언어 정보를 data 속성으로 보존
      const codeContent = hasRichText(content) ? content.rich_text.map((rt) => rt.plain_text).join("") : ""
      return (
        <pre key={id} className="my-4 overflow-x-auto rounded-lg bg-muted p-4">
          <code className="block text-sm font-mono">{codeContent}</code>
        </pre>
      )
    }
    case "image": {
      const imageUrl = getImageUrl(content)
      if (!imageUrl) return null
      return (
        <div key={id} className="relative my-6 aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src={imageUrl}
            alt="뉴스 본문 이미지"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      )
    }
    default:
      // 알 수 없는 블록 타입은 무시
      return null
  }
}

export function NotionRenderer({ blocks }: NotionRendererProps) {
  if (blocks.length === 0) {
    return <p className="text-muted-foreground">본문이 없습니다.</p>
  }

  return (
    <div className="max-w-none">
      {blocks.map((block) => renderBlock(block))}
    </div>
  )
}
