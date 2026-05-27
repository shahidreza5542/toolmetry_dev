'use client';

import { Search } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { tools, iconMap } from '@/lib/tools-data';
import Link from 'next/link';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({ onSearch, placeholder = 'Search tools...' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = query.trim()
    ? tools.filter(t =>
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.description.toLowerCase().includes(query.toLowerCase()) ||
        t.category.toLowerCase().includes(query.toLowerCase()) ||
        t.slug.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (value: string) => {
    setQuery(value);
    setIsOpen(value.trim().length > 0);
    onSearch?.(value);
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={e => handleChange(e.target.value)}
          onFocus={() => query.trim() && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-border bg-background pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand/50"
        />
      </div>
      {isOpen && filtered.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 rounded-lg border border-border bg-card shadow-xl z-50 max-h-64 overflow-y-auto custom-scrollbar">
          {filtered.map(tool => {
            const Icon = iconMap[tool.icon];
            return (
              <Link
                key={tool.slug}
                href={`/docs/${tool.slug}`}
                onClick={() => { setIsOpen(false); setQuery(''); }}
                className="flex items-center gap-2.5 px-3 py-2.5 hover:bg-muted transition-colors"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand/10 dark:bg-brand/20 text-brand dark:text-brand-accent">
                  {Icon && <Icon size={14} />}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">{tool.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{tool.category}</div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
      {isOpen && query.trim() && filtered.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 rounded-lg border border-border bg-card shadow-xl z-50 p-4 text-center">
          <p className="text-sm text-muted-foreground">No tools found for &quot;{query}&quot;</p>
        </div>
      )}
    </div>
  );
}
