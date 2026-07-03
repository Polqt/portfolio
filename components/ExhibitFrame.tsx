import { ReactNode } from 'react';

type ExhibitFrameProps = {
  number: string;
  title: string;
  children: ReactNode;
  className?: string;
  flush?: boolean;
};

export default function ExhibitFrame({
  number,
  title,
  children,
  className = '',
  flush = false,
}: ExhibitFrameProps) {
  return (
    <section className={`vitrine flex flex-col ${className}`}>
      <div className="flex items-baseline justify-between border-b border-border px-4 py-2.5 sm:px-5">
        <span className="plaque">{title}</span>
        <span className="font-mono text-[10.5px] tracking-[0.14em] text-primary">
          {number}
        </span>
      </div>
      <div className={`flex-1 ${flush ? '' : 'p-4 sm:p-5'}`}>{children}</div>
    </section>
  );
}
