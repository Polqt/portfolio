import { Moon, Sun } from 'lucide-react';

const ThemeToggle = ({
  theme,
  setTheme,
  mounted,
}: {
  theme: string | undefined;
  setTheme: (theme: string) => void;
  mounted: boolean;
}) => {
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="h-full w-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Toggle theme"
    >
      <span suppressHydrationWarning>
        {mounted ? (
          theme === 'dark' ? (
            <Sun className="h-full w-full" />
          ) : (
            <Moon className="h-full w-full" />
          )
        ) : (
          <Moon className="h-full w-full" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
