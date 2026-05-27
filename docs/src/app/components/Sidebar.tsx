'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { tools, iconMap, categories } from '@/lib/tools-data';
import { ChevronRight, BookOpen } from 'lucide-react';
import type { Category } from '@/lib/tools-data';

export function Sidebar() {
  const pathname = usePathname();

  const toolsByCategory = categories.map(cat => ({
    category: cat,
    tools: tools.filter(t => t.category === cat),
  })).filter(group => group.tools.length > 0);

  return (
    <aside className="sticky top-16 h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-border bg-muted/20 overflow-y-auto custom-scrollbar hidden lg:block">
      <div className="p-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Getting Started
        </h3>
        <ul className="space-y-0.5 mb-6">
          <li>
            <Link
              href="/docs"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                pathname === '/docs'
                  ? 'bg-brand/10 text-brand font-medium dark:bg-brand/20 dark:text-brand-accent'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <BookOpen size={15} className="shrink-0" />
              Overview
            </Link>
          </li>
        </ul>

        {toolsByCategory.map(group => (
          <div key={group.category} className="mb-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              {group.category}
            </h3>
            <ul className="space-y-0.5">
              {group.tools.map(tool => {
                const Icon = iconMap[tool.icon];
                const isActive = pathname === `/docs/${tool.slug}`;
                return (
                  <li key={tool.slug}>
                    <Link
                      href={`/docs/${tool.slug}`}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive
                          ? 'bg-brand/10 text-brand font-medium dark:bg-brand/20 dark:text-brand-accent'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      {Icon && <Icon size={15} className="shrink-0" />}
                      <span className="truncate">{tool.name}</span>
                      {isActive && <ChevronRight size={14} className="ml-auto shrink-0" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
