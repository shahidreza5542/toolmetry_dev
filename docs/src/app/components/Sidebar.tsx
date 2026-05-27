'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { tools, iconMap, categories } from '@/lib/tools-data';
import { BookOpen, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import type { Category } from '@/lib/tools-data';

export function Sidebar() {
  const pathname = usePathname();
  const [collapsedCats, setCollapsedCats] = useState<Set<string>>(new Set());

  const toolsByCategory = categories.map(cat => ({
    category: cat,
    tools: tools.filter(t => t.category === cat),
  })).filter(group => group.tools.length > 0);

  const toggleCategory = (cat: string) => {
    setCollapsedCats(prev => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  return (
    <aside className="sticky top-[60px] h-[calc(100vh-60px)] w-64 shrink-0 border-r border-border bg-sidebar overflow-y-auto custom-scrollbar hidden lg:block">
      <div className="p-4">
        {/* Getting Started */}
        <div className="mb-5">
          <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70 mb-2 px-3">
            Getting Started
          </h3>
          <Link
            href="/docs"
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
              pathname === '/docs'
                ? 'bg-brand/10 text-brand font-medium border-l-2 border-brand'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <BookOpen size={15} className="shrink-0" />
            Overview
          </Link>
        </div>

        {/* Tool Categories */}
        {toolsByCategory.map(group => {
          const isCollapsed = collapsedCats.has(group.category);
          return (
            <div key={group.category} className="mb-4">
              <button
                onClick={() => toggleCategory(group.category)}
                className="flex items-center justify-between w-full text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70 mb-2 px-3 hover:text-muted-foreground transition-colors"
              >
                <span>{group.category}</span>
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${isCollapsed ? '-rotate-90' : ''}`}
                />
              </button>
              {!isCollapsed && (
                <ul className="space-y-0.5">
                  {group.tools.map(tool => {
                    const Icon = iconMap[tool.icon];
                    const isActive = pathname === `/docs/${tool.slug}`;
                    return (
                      <li key={tool.slug}>
                        <Link
                          href={`/docs/${tool.slug}`}
                          className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-sm transition-all ${
                            isActive
                              ? 'bg-brand/10 text-brand font-medium border-l-2 border-brand'
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                          }`}
                        >
                          {Icon && <Icon size={14} className="shrink-0 opacity-70" />}
                          <span className="truncate">{tool.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
