import { CodeBlock } from '@/components/notes/CodeBlock';
import { ReactNode } from 'react';

export function processInlineFormatting(text: string): ReactNode {
  const parts: ReactNode[] = [];
  let currentIndex = 0;
  let segmentStart = 0;

  const flush = (end: number) => {
    if (segmentStart < end) parts.push(text.slice(segmentStart, end));
  };

  while (currentIndex < text.length) {
    if (text.slice(currentIndex, currentIndex + 2) === '**') {
      const closeIndex = text.indexOf('**', currentIndex + 2);
      if (closeIndex !== -1) {
        flush(currentIndex);
        parts.push(
          <strong
            key={currentIndex}
            className="font-semibold text-foreground dark:text-white/90"
          >
            {text.slice(currentIndex + 2, closeIndex)}
          </strong>,
        );
        currentIndex = closeIndex + 2;
        segmentStart = currentIndex;
        continue;
      }
    }

    // Inline code: `code`
    if (text[currentIndex] === '`') {
      const closeIndex = text.indexOf('`', currentIndex + 1);
      if (closeIndex !== -1) {
        flush(currentIndex);
        parts.push(
          <code
            key={currentIndex}
            className="px-1.5 py-0.5 rounded text-[13px] font-mono bg-muted/50 dark:bg-white/5 text-foreground dark:text-white/80"
          >
            {text.slice(currentIndex + 1, closeIndex)}
          </code>,
        );
        currentIndex = closeIndex + 1;
        segmentStart = currentIndex;
        continue;
      }
    }

    // Link: [text](url)
    if (text[currentIndex] === '[') {
      const match = text.slice(currentIndex).match(/^\[([^\]]+)\]\(([^)]+)\)/);
      if (match) {
        flush(currentIndex);
        const [fullMatch, linkText, url] = match;
        parts.push(
          <a
            key={currentIndex}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline dark:text-white/90"
          >
            {linkText}
          </a>,
        );
        currentIndex += fullMatch.length;
        segmentStart = currentIndex;
        continue;
      }
    }

    currentIndex++;
  }

  if (segmentStart < text.length) parts.push(text.slice(segmentStart));
  return parts.length > 0 ? parts : text;
}

// ─── Line renderer ─────────────────────────────────────────────────────────

function renderLine(line: string, idx: number): ReactNode {
  if (line.startsWith('# '))
    return (
      <h1
        key={idx}
        className="text-3xl font-bold mt-8 mb-4 text-foreground dark:text-white leading-tight"
      >
        {line.slice(2)}
      </h1>
    );
  if (line.startsWith('## '))
    return (
      <h2
        key={idx}
        className="text-2xl font-bold mt-8 mb-3 text-foreground dark:text-white leading-tight"
      >
        {line.slice(3)}
      </h2>
    );
  if (line.startsWith('### '))
    return (
      <h3
        key={idx}
        className="text-xl font-bold mt-6 mb-2 text-foreground dark:text-white leading-tight"
      >
        {line.slice(4)}
      </h3>
    );
  if (line === '---')
    return (
      <hr key={idx} className="my-6 border-border/20 dark:border-white/5" />
    );
  if (line.trim())
    return (
      <p
        key={idx}
        className="mb-3 text-[15px] leading-[1.6] text-muted-foreground dark:text-white/60"
      >
        {processInlineFormatting(line)}
      </p>
    );

  return <br key={idx} />;
}

// ─── Main renderer ─────────────────────────────────────────────────────────

export function renderMarkdown(content: string): ReactNode[] {
  const lines = content.split('\n');
  const elements: ReactNode[] = [];
  let elementKey = 0;

  // List state
  let listItems: string[] = [];

  // Code block state
  let inCodeBlock = false;
  let codeLanguage = '';
  let codeLines: string[] = [];

  const flushList = () => {
    if (listItems.length === 0) return;
    elements.push(
      <ul key={elementKey++} className="my-4 ml-0 list-none space-y-1.5">
        {listItems.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-[15px] leading-[1.6] text-muted-foreground dark:text-white/60"
          >
            <span className="mt-[0.35em] text-muted-foreground dark:text-white/40">
              •
            </span>
            <span className="flex-1">{processInlineFormatting(item)}</span>
          </li>
        ))}
      </ul>,
    );
    listItems = [];
  };

  for (const line of lines) {
    // Code block boundaries
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        flushList();
        inCodeBlock = true;
        codeLanguage = line.slice(3).trim();
        codeLines = [];
      } else {
        elements.push(
          <CodeBlock
            key={elementKey++}
            code={codeLines.join('\n')}
            language={codeLanguage}
          />,
        );
        inCodeBlock = false;
        codeLines = [];
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    // List items
    if (line.startsWith('- ')) {
      listItems.push(line.slice(2));
      continue;
    } else {
      flushList();
    }

    const el = renderLine(line, elementKey);
    if (el) {
      elementKey++;
      elements.push(el);
    }
  }

  flushList();
  return elements;
}
