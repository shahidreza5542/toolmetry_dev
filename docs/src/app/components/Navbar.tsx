'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X, Terminal } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/docs', label: 'Docs' },
  { href: '/playground', label: 'Playground' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 h-[60px] sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-bg text-white font-bold text-sm shadow-md shadow-brand/25 group-hover:shadow-lg group-hover:shadow-brand/35 transition-shadow">
            T
          </div>
          <span className="text-lg font-bold tracking-tight">
            <span className="gradient-text">Toolmetry</span>
          </span>
        </Link>

        {/* Desktop Navigation - Center */}
        <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {navLinks.map(link => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                  isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-5 rounded-full gradient-bg" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-mono text-muted-foreground bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
            onClick={() => { navigator.clipboard.writeText('npm i toolmetry'); }}
          >
            <Terminal size={12} className="text-brand" />
            npm i toolmetry
          </div>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background/50 transition-colors hover:bg-muted"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl px-4 py-3 space-y-1">
          {navLinks.map(link => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand/10 text-brand dark:bg-brand/20 dark:text-brand-accent'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {link.label}
                {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full gradient-bg" />}
              </Link>
            );
          })}
          <div className="pt-2 mt-2 border-t border-border">
            <div className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-mono text-muted-foreground bg-muted/30">
              <Terminal size={12} className="text-brand" />
              npm i toolmetry
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
