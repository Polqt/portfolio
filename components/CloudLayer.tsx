/**
 * Night clouds drifting across the whole viewport. Fixed layer behind
 * content (-z-10), pure CSS animation, invisible to pointer and screen
 * readers.
 */
export default function CloudLayer() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <span
        className="cloud left-[-10%] top-[8%] h-40 w-[55%] bg-foreground/[0.05]"
        style={{ '--cloud-duration': '75s' } as React.CSSProperties}
      />
      <span
        className="cloud right-[-15%] top-[34%] h-48 w-[60%] bg-primary/[0.04]"
        style={{ '--cloud-duration': '95s' } as React.CSSProperties}
      />
      <span
        className="cloud left-[15%] top-[60%] h-36 w-[45%] bg-foreground/[0.04]"
        style={{ '--cloud-duration': '60s' } as React.CSSProperties}
      />
      <span
        className="cloud right-[0%] top-[82%] h-32 w-[42%] bg-foreground/[0.035]"
        style={{ '--cloud-duration': '85s' } as React.CSSProperties}
      />
    </div>
  );
}
