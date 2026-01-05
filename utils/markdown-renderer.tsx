import { ReactNode } from 'react';

export function renderMarkdown(content: string): ReactNode[] {
  const lines = content.split('\n');
  const elements: ReactNode[] = [];
  let inCodeBlock = false;
  let codeLanguage = '';
  let codeLines: string[] = [];
  let inList = false;
  let listItems: string[] = [];
  let elementKey = 0;

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={elementKey++} className="my-4 ml-0 list-none space-y-1.5">
          {listItems.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-[15px] leading-[1.7] text-muted-foreground dark:text-white/60"
            >
              <span className="mt-[0.35em] text-muted-foreground dark:text-white/40">
                •
              </span>
              <span className="flex-1">{item}</span>
            </li>
          ))}
        </ul>,
      );
      listItems = [];
      inList = false;
    }
  };

  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx];

    // Handle code blocks
    if (line.startsWith('```')) {
      flushList(); // Close any open list
      if (!inCodeBlock) {
        // Start of code block
        inCodeBlock = true;
        codeLanguage = line.slice(3).trim();
        codeLines = [];
      } else {
        // End of code block
        inCodeBlock = false;
        elements.push(
          <div
            key={elementKey++}
            className="my-5 overflow-hidden rounded-md border border-border/20 bg-[#0d1117] dark:bg-[#0d1117]"
          >
            {codeLanguage && (
              <div className="border-b border-border/10 bg-[#161b22] px-3 py-1.5">
                <span className="text-xs text-slate-400">{codeLanguage}</span>
              </div>
            )}
            <pre className="overflow-x-auto p-4">
              <code className="text-[13px] font-mono leading-relaxed">
                {codeLines.map((codeLine, i) => {
                  const highlightedLine = highlightSyntax(
                    codeLine,
                    codeLanguage,
                  );
                  return (
                    <div key={i} className="min-h-[1.5rem]">
                      {highlightedLine}
                    </div>
                  );
                })}
              </code>
            </pre>
          </div>,
        );
        codeLines = [];
      }
      continue;
    }

    // Collect code lines
    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    // Handle list items
    if (line.startsWith('- ')) {
      inList = true;
      listItems.push(line.slice(2));
      continue;
    } else if (inList) {
      flushList();
    }

    // Process non-code-block, non-list lines
    const element = processMarkdownLine(line, elementKey);
    if (element) {
      elementKey++;
      elements.push(element);
    }
  }

  // Flush any remaining list
  flushList();

  return elements;
}

function processMarkdownLine(line: string, idx: number): ReactNode {
  // Headings
  if (line.startsWith('# ')) {
    return (
      <h1
        key={idx}
        className="text-3xl font-bold mt-8 mb-4 text-foreground dark:text-white leading-tight"
      >
        {line.slice(2)}
      </h1>
    );
  }
  if (line.startsWith('## ')) {
    return (
      <h2
        key={idx}
        className="text-2xl font-bold mt-8 mb-3 text-foreground dark:text-white leading-tight"
      >
        {line.slice(3)}
      </h2>
    );
  }
  if (line.startsWith('### ')) {
    return (
      <h3
        key={idx}
        className="text-xl font-bold mt-6 mb-2 text-foreground dark:text-white leading-tight"
      >
        {line.slice(4)}
      </h3>
    );
  }

  // Bold text
  if (line.includes('**')) {
    const parts = line.split('**');
    return (
      <p
        key={idx}
        className="mb-3 text-[15px] leading-[1.7] text-muted-foreground dark:text-white/60"
      >
        {parts.map((part, i) =>
          i % 2 === 0 ? (
            part
          ) : (
            <strong
              key={i}
              className="font-semibold text-foreground dark:text-white/90"
            >
              {part}
            </strong>
          ),
        )}
      </p>
    );
  }

  // Horizontal rule
  if (line === '---') {
    return (
      <hr key={idx} className="my-6 border-border/20 dark:border-white/5" />
    );
  }

  // Italic/emphasis
  if (line.startsWith('*') && line.endsWith('*') && !line.includes('**')) {
    return (
      <p
        key={idx}
        className="mb-4 italic text-sm text-muted-foreground dark:text-white/60"
      >
        {line.slice(1, -1)}
      </p>
    );
  }

  // Links
  if (line.includes('[') && line.includes('](')) {
    const linkMatch = line.match(/\[([^\]]+)\]\(([^\)]+)\)/);
    if (linkMatch) {
      const [, text, url] = linkMatch;
      const beforeLink = line.split('[')[0];
      const afterLink = line.split(')').slice(1).join(')');

      return (
        <p
          key={idx}
          className="mb-4 leading-relaxed text-muted-foreground dark:text-white/70"
        >
          {beforeLink}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline dark:text-white/90"
          >
            {text}
          </a>
          {afterLink}
        </p>
      );
    }
  }

  // Inline code
  if (line.includes('`') && !line.startsWith('```')) {
    const parts = line.split('`');
    return (
      <p
        key={idx}
        className="mb-4 leading-relaxed text-muted-foreground dark:text-white/70"
      >
        {parts.map((part, i) =>
          i % 2 === 0 ? (
            part
          ) : (
            <code
              key={i}
              className="px-1.5 py-0.5 rounded text-[13px] font-mono bg-muted/50 dark:bg-white/5 text-foreground dark:text-white/80"
            >
              {part}
            </code>
          ),
        )}
      </p>
    );
  }

  // Regular paragraph
  if (line.trim()) {
    return (
      <p
        key={idx}
        className="mb-3 text-[15px] leading-[1.7] text-muted-foreground dark:text-white/60"
      >
        {line}
      </p>
    );
  }

  // Empty line
  return <br key={idx} />;
}

/**
 * Simple syntax highlighter for code blocks
 */
function highlightSyntax(line: string, language: string): ReactNode {
  if (!line.trim()) {
    return <span className="text-slate-400">{line}</span>;
  }

  // Keywords by language
  const keywords: Record<string, string[]> = {
    typescript: [
      'const',
      'let',
      'var',
      'function',
      'return',
      'if',
      'else',
      'for',
      'while',
      'import',
      'export',
      'from',
      'await',
      'async',
      'class',
      'interface',
      'type',
      'extends',
      'implements',
      'new',
      'this',
      'null',
      'undefined',
      'true',
      'false',
    ],
    javascript: [
      'const',
      'let',
      'var',
      'function',
      'return',
      'if',
      'else',
      'for',
      'while',
      'import',
      'export',
      'from',
      'await',
      'async',
      'class',
      'extends',
      'new',
      'this',
      'null',
      'undefined',
      'true',
      'false',
    ],
    bash: [
      'cd',
      'ls',
      'mkdir',
      'rm',
      'echo',
      'cat',
      'grep',
      'npm',
      'yarn',
      'go',
      'git',
      'npx',
      'pnpm',
    ],
    go: [
      'package',
      'import',
      'func',
      'var',
      'const',
      'type',
      'struct',
      'interface',
      'return',
      'if',
      'else',
      'for',
      'range',
      'switch',
      'case',
      'default',
      'nil',
      'true',
      'false',
    ],
  };

  const langKeywords = keywords[language.toLowerCase()] || [];

  // Simple tokenization
  const tokens: Array<{ text: string; type: string }> = [];
  let currentToken = '';
  let inString = false;
  let stringChar = '';

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    // Handle strings
    if (
      (char === '"' || char === "'" || char === '`') &&
      (i === 0 || line[i - 1] !== '\\')
    ) {
      if (!inString) {
        if (currentToken) {
          tokens.push({ text: currentToken, type: 'default' });
          currentToken = '';
        }
        inString = true;
        stringChar = char;
        currentToken = char;
      } else if (char === stringChar) {
        currentToken += char;
        tokens.push({ text: currentToken, type: 'string' });
        currentToken = '';
        inString = false;
      } else {
        currentToken += char;
      }
      continue;
    }

    if (inString) {
      currentToken += char;
      continue;
    }

    // Handle comments
    if (char === '/' && line[i + 1] === '/') {
      if (currentToken) {
        tokens.push({ text: currentToken, type: 'default' });
        currentToken = '';
      }
      tokens.push({ text: line.slice(i), type: 'comment' });
      break;
    }

    // Word boundaries
    if (/\s/.test(char) || /[(){}[\];,.]/.test(char)) {
      if (currentToken) {
        tokens.push({ text: currentToken, type: 'default' });
        currentToken = '';
      }
      tokens.push({ text: char, type: 'default' });
    } else {
      currentToken += char;
    }
  }

  if (currentToken) {
    tokens.push({ text: currentToken, type: inString ? 'string' : 'default' });
  }

  return (
    <>
      {tokens.map((token, i) => {
        const isKeyword = langKeywords.includes(token.text);
        const isNumber = /^\d+$/.test(token.text);
        const isFunction =
          token.text.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/) &&
          i < tokens.length - 1 &&
          tokens[i + 1].text === '(';

        let className = 'text-slate-300';

        if (token.type === 'string') {
          className = 'text-emerald-400';
        } else if (token.type === 'comment') {
          className = 'text-slate-500 italic';
        } else if (isKeyword) {
          className = 'text-purple-400 font-medium';
        } else if (isFunction) {
          className = 'text-blue-400';
        } else if (isNumber) {
          className = 'text-orange-400';
        }

        return (
          <span key={i} className={className}>
            {token.text}
          </span>
        );
      })}
    </>
  );
}
