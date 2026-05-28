'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/docs', label: 'Docs' },
  { href: '/playground', label: 'Playground' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#0A0A0A] border-b border-[#1A1A1A]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 h-14">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logos/android-chrome-192x192.png" alt="Toolmetry" width={26} height={26} className="rounded" />
          <span className="text-[15px] font-bold text-white">Toolmetry</span>
          <span className="text-[10px] font-medium text-[#666] bg-[#1A1A1A] px-1.5 py-0.5 rounded">v1.0.4</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'text-white bg-[#0C2E76]'
                    : 'text-[#999] hover:text-white hover:bg-[#1A1A1A]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => navigator.clipboard.writeText('npm i toolmetry')}
            className="text-xs font-mono text-[#999] hover:text-white transition-colors"
          >
            $ npm i toolmetry
          </button>
          <a
            href="https://www.npmjs.com/package/toolmetry"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-[#999] hover:text-white transition-colors"
          >
            npm
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-1.5 rounded-md text-[#999] hover:text-white"
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {mobileOpen
              ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
              : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
            }
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[#1A1A1A] px-5 py-3 space-y-1">
          {navLinks.map(link => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-white bg-[#0C2E76]'
                    : 'text-[#999] hover:text-white hover:bg-[#1A1A1A]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
