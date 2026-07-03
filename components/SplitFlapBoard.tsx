'use client';

import { useState } from 'react';
import Link from 'next/link';
import FlapText from '@/components/FlapText';

export { default as FlapText } from '@/components/FlapText';

export type BoardRow = {
  cells: string[];
  href?: string;
  /** amber-lit row (active) vs settled row */
  active?: boolean;
};

type SplitFlapBoardProps = {
  caption: string;
  columns: string[];
  rows: BoardRow[];
  /** CSS grid template for the columns, applied from sm up */
  template?: string;
};

function BoardRowView({
  row,
  rowIndex,
  templateStyle,
}: {
  row: BoardRow;
  rowIndex: number;
  templateStyle: React.CSSProperties;
}) {
  // whole row re-flips together on hover so cells never desync
  const [flipKey, setFlipKey] = useState(0);

  const content = (
    <div
      className="board-row px-4 py-3 font-mono text-sm uppercase tracking-[0.08em] sm:px-5"
      style={templateStyle}
      onMouseEnter={() => setFlipKey(k => k + 1)}
    >
      {row.cells.map((cell, cellIndex) => (
        <span
          key={cellIndex}
          className={
            cellIndex === 0
              ? 'text-primary'
              : row.active
                ? 'text-foreground'
                : 'text-muted-foreground'
          }
        >
          <FlapText text={cell} startIndex={rowIndex * 4} flipKey={flipKey} />
        </span>
      ))}
    </div>
  );

  return row.href ? (
    <Link href={row.href} className="block transition-colors hover:bg-muted/60">
      {content}
    </Link>
  ) : (
    content
  );
}

export default function SplitFlapBoard({
  caption,
  columns,
  rows,
  template = '2fr 1.2fr 1fr',
}: SplitFlapBoardProps) {
  const templateStyle = {
    '--board-template': template,
  } as React.CSSProperties;

  return (
    <div className="overflow-hidden rounded-sm border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5 sm:px-5">
        <span className="plaque text-primary">{caption}</span>
        <span
          className="h-2 w-2 rounded-full bg-primary motion-safe:animate-pulse"
          aria-hidden
        />
      </div>

      <div
        className="board-row hidden border-b border-border px-4 py-2 sm:grid sm:px-5"
        style={templateStyle}
      >
        {columns.map(col => (
          <span key={col} className="plaque">
            {col}
          </span>
        ))}
      </div>

      <div className="divide-y divide-border/60">
        {rows.map((row, rowIndex) => (
          <BoardRowView
            key={rowIndex}
            row={row}
            rowIndex={rowIndex}
            templateStyle={templateStyle}
          />
        ))}
      </div>
    </div>
  );
}
