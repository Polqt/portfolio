'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 overflow-hidden rounded-lg border border-border/20 bg-[#0d1117] text-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/10 bg-[#161b22]">
        <span className="text-[11px] tracking-widest uppercase text-muted-foreground/50 font-medium">
          {language || 'code'}
        </span>
        <button
          onClick={handleCopy}
          aria-label="Copy code"
          className="flex items-center gap-1.5 text-[11px] text-muted-foreground/50 hover:text-muted-foreground transition-colors duration-200"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <pre className="overflow-x-auto p-4 leading-relaxed">
        <code className="font-mono text-[13px] text-slate-300 whitespace-pre">
          {code}
        </code>
      </pre>
    </div>
  );
}
