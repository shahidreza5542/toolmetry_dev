'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { tools, iconMap, categories, categoryColors } from '@/lib/tools-data';
import { CodeBlock } from '@/app/components/CodeBlock';
import { SearchBar } from '@/app/components/SearchBar';
import { ArrowRight } from 'lucide-react';
import type { Category } from '@/lib/tools-data';

export default function DocsPage() {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const quickStartCode = `// 1. Install the package
npm i toolmetry

// 2. Import what you need
const { base64, url, hash, jwt, uuid, color, text, json, password, morse, roman, cron, diff, lorem, htmlEntity, numberBase, encrypt, random } = require('toolmetry');

// 3. Use it!
const encoded = base64.encode('Hello, World!');
const id = uuid.v4();
const rgb = color.hexToRgb('#3B82F6');
const camel = text.toCamelCase('hello world');
const pwd = password.generate({ length: 20 });`;

  const filteredTools = useMemo(() => {
    let result = tools;
    if (activeCategory !== 'All') {
      result = result.filter(t => t.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.slug.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, searchQuery]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="min-w-0 flex-1">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            <span className="gradient-text">Documentation</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about the toolmetry npm package.
          </p>
        </div>

        {/* Getting Started */}
        <section id="quick-start" className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">Getting Started</h2>
          <p className="text-muted-foreground mb-4">
            toolmetry is a comprehensive developer tools library with 18 modules, zero dependencies, and full TypeScript support.
            It works in both Node.js and browser environments.
          </p>
          <CodeBlock code={quickStartCode} title="Quick Start" />
        </section>

        {/* Installation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">Installation</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <CodeBlock code="npm i toolmetry" title="npm" />
            <CodeBlock code="yarn add toolmetry" title="yarn" />
            <CodeBlock code="pnpm add toolmetry" title="pnpm" />
            <CodeBlock code="bun add toolmetry" title="bun" />
          </div>
        </section>

        {/* Module Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">Module Overview</h2>
          <p className="text-muted-foreground mb-6">
            toolmetry provides 18 modules covering a wide range of developer utilities. Click on any module to see its full API reference and interactive examples.
          </p>

          {/* Search and Category Filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex-1 max-w-md">
              <SearchBar onSearch={setSearchQuery} placeholder="Search 18 tools..." />
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setActiveCategory('All')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  activeCategory === 'All'
                    ? 'gradient-bg text-white shadow-sm'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                All ({tools.length})
              </button>
              {categories.map(cat => {
                const count = tools.filter(t => t.category === cat).length;
                if (count === 0) return null;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                      activeCategory === cat
                        ? 'gradient-bg text-white shadow-sm'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tool Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredTools.map(tool => {
              const Icon = iconMap[tool.icon];
              const catColor = categoryColors[tool.category];
              return (
                <Link
                  key={tool.slug}
                  href={`/docs/${tool.slug}`}
                  className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-brand/40 hover:shadow-md"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 dark:bg-brand/20 text-brand dark:text-brand-accent">
                    {Icon && <Icon size={18} />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-sm font-semibold text-card-foreground group-hover:text-brand transition-colors flex items-center gap-1.5">
                        {tool.name} <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                    </div>
                    <span className={`inline-block rounded-md px-1.5 py-0.5 text-[10px] font-semibold mb-1 ${catColor}`}>
                      {tool.category}
                    </span>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No tools found matching your search.</p>
            </div>
          )}
        </section>

        {/* Environment Support */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">Environment Support</h2>
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Module</th>
                    <th className="text-center px-4 py-3 font-semibold text-foreground">Category</th>
                    <th className="text-center px-4 py-3 font-semibold text-foreground">Node.js</th>
                    <th className="text-center px-4 py-3 font-semibold text-foreground">Browser</th>
                  </tr>
                </thead>
                <tbody>
                  {tools.map(tool => (
                    <tr key={tool.slug} className="border-b border-border last:border-0">
                      <td className="px-4 py-2.5 text-card-foreground">
                        <Link href={`/docs/${tool.slug}`} className="hover:text-brand transition-colors font-medium">
                          {tool.name}
                        </Link>
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span className={`inline-block rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${categoryColors[tool.category]}`}>
                          {tool.category}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-center text-green-600 dark:text-green-400">
                        {tool.slug === 'hash' ? 'Sync + Async' : tool.slug === 'encrypt' ? 'Sync + Async' : 'Yes'}
                      </td>
                      <td className="px-4 py-2.5 text-center text-green-600 dark:text-green-400">
                        {tool.slug === 'hash' ? 'Async only' : tool.slug === 'encrypt' ? 'Async only' : 'Yes'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
