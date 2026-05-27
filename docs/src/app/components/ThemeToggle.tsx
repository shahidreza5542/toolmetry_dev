'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  if (!mounted) {
    return (
      <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background/50 transition-colors">
        <Sun size={16} className="text-muted-foreground" />
      </button>
    );
  }

  const currentTheme = resolvedTheme || theme;
  const isDark = currentTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background/50 transition-all duration-300 hover:bg-muted hover:border-brand/30"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="relative h-4 w-4 overflow-hidden">
        <Sun
          size={16}
          className={`absolute inset-0 text-amber-500 transition-all duration-500 ${
            isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
          }`}
        />
        <Moon
          size={16}
          className={`absolute inset-0 text-brand transition-all duration-500 ${
            isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
          }`}
        />
      </div>
    </button>
  );
}
