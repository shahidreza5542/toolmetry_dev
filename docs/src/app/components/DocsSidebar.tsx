'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { tools, categories, getToolsByCategory } from '@/lib/tools-data';
import type { Category } from '@/lib/tools-data';

export function DocsSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (cat: string) => {
    setCollapsedCategories(prev => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const isDocHome = pathname === '/docs';

  return (
    <aside className="h-full flex flex-col bg-[#0A0A0A]">
      {/* Logo Header */}
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-[#1A1A1A] shrink-0">
        <Image src="/logos/android-chrome-192x192.png" alt="Toolmetry" width={22} height={22} className="rounded" />
        <Link href="/" className="text-sm font-bold text-white hover:opacity-80 transition-opacity" onClick={onClose}>
          Toolmetry
        </Link>
        <span className="text-[9px] font-medium text-[#666] bg-[#1A1A1A] px-1.5 py-0.5 rounded">v1.0.5</span>
        {/* Mobile close button */}
        {onClose && (
          <button onClick={onClose} className="ml-auto p-1 rounded text-[#666] hover:text-white transition-colors" aria-label="Close sidebar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* Scrollable Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {/* Getting Started */}
        <div>
          <Link
            href="/docs"
            onClick={onClose}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              isDocHome
                ? 'bg-[#0C2E76] text-white'
                : 'text-[#999] hover:text-white hover:bg-[#1A1A1A]'
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
            Getting Started
          </Link>
        </div>

        {/* Modules by Category */}
        <div>
          <h3 className="px-3 mb-2 text-[10px] font-semibold text-[#666] uppercase tracking-widest">Modules</h3>
          <div className="space-y-0.5">
            {categories.map(cat => {
              const catTools = getToolsByCategory(cat);
              if (catTools.length === 0) return null;
              const isCollapsed = collapsedCategories.has(cat);

              return (
                <div key={cat}>
                  <button
                    onClick={() => toggleCategory(cat)}
                    className="flex items-center justify-between w-full px-3 py-1.5 text-[11px] font-semibold text-[#666] hover:text-[#999] uppercase tracking-wider transition-colors"
                  >
                    {cat}
                    <svg
                      width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                      className={`transition-transform ${isCollapsed ? '' : 'rotate-90'}`}
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                  {!isCollapsed && (
                    <div className="space-y-0.5 mt-0.5 mb-1">
                      {catTools.map(tool => {
                        const href = `/docs/${tool.slug}`;
                        const isActive = pathname === href;
                        return (
                          <Link
                            key={tool.slug}
                            href={href}
                            onClick={onClose}
                            className={`block rounded-md px-3 py-1.5 text-[13px] transition-colors truncate ${
                              isActive
                                ? 'bg-[#0C2E76] text-white font-medium'
                                : 'text-[#999] hover:text-white hover:bg-[#1A1A1A]'
                            }`}
                          >
                            {tool.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Bottom: npm */}
      <div className="shrink-0 px-4 py-3 border-t border-[#1A1A1A]">
        <a
          href="https://www.npmjs.com/package/toolmetry"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-[#666] hover:text-white transition-colors"
        >
          View on npm →
        </a>
      </div>
    </aside>
  );
}
