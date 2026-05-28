'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { tools, categories } from '@/lib/tools-data';
import { CodeBlock } from '@/app/components/CodeBlock';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import type { Category } from '@/lib/tools-data';

export default function DocsPage() {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const quickStartCode = `// 1. Install
npm i toolmetry

// 2. Import
const { base64, url, hash, jwt, uuid, color, text, json, password, morse, roman, cron, diff, lorem, htmlEntity, numberBase, encrypt, random } = require('toolmetry');

// 3. Use
const encoded = base64.encode('Hello, World!');
const id = uuid.v4();
const rgb = color.hexToRgb('#3B82F6');
const camel = text.toCamelCase('hello world');
const pwd = password.generate({ length: 20 });`;

  const filteredTools = useMemo(() => {
    let result = tools;
    if (activeCategory !== 'All') result = result.filter(t => t.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.slug.toLowerCase().includes(q));
    }
    return result;
  }, [activeCategory, searchQuery]);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-5 py-10">
          {/* Header */}
          <h1 className="text-3xl font-bold text-white mb-2">Documentation</h1>
          <p className="text-sm text-[#666] mb-10 leading-relaxed">
            Everything you need to know about the toolmetry npm package. 18 modules, zero dependencies, full TypeScript.
          </p>

          {/* Getting Started */}
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-white mb-3">Getting Started</h2>
            <CodeBlock code={quickStartCode} title="Quick Start" />
          </section>

          {/* Installation */}
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-white mb-3">Installation</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <CodeBlock code="npm i toolmetry" title="npm" />
              <CodeBlock code="yarn add toolmetry" title="yarn" />
              <CodeBlock code="pnpm add toolmetry" title="pnpm" />
              <CodeBlock code="bun add toolmetry" title="bun" />
            </div>
          </section>

          {/* Module Overview */}
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-white mb-3">Module Overview</h2>
            <p className="text-sm text-[#666] mb-4">
              Click on any module to see its full API reference and interactive examples.
            </p>

            {/* Search + Filter */}
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <div className="flex-1 max-w-xs">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search modules..."
                  className="w-full rounded-md border border-[#1A1A1A] bg-[#0A0A0A] px-3 py-2 text-sm text-white placeholder:text-[#444] focus:outline-none focus:border-[#0C2E76]"
                />
              </div>
              <div className="flex flex-wrap gap-1">
                <button
                  onClick={() => setActiveCategory('All')}
                  className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                    activeCategory === 'All' ? 'bg-[#0C2E76] text-white' : 'bg-[#1A1A1A] text-[#999] hover:text-white'
                  }`}
                >
                  All ({tools.length})
                </button>
                {categories.map(cat => {
                  const count = tools.filter(t => t.category === cat).length;
                  if (!count) return null;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                        activeCategory === cat ? 'bg-[#0C2E76] text-white' : 'bg-[#1A1A1A] text-[#999] hover:text-white'
                      }`}
                    >
                      {cat} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Module List */}
            <div className="space-y-1">
              {filteredTools.map(tool => (
                <Link
                  key={tool.slug}
                  href={`/docs/${tool.slug}`}
                  className="group flex items-center justify-between rounded-lg border border-[#1A1A1A] px-4 py-3 hover:border-[#0C2E76] transition-colors"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium text-white">{tool.name}</h3>
                      <span className="text-[10px] text-[#666] bg-[#1A1A1A] px-1.5 py-0.5 rounded">{tool.category}</span>
                    </div>
                    <p className="text-xs text-[#666] mt-0.5 line-clamp-1">{tool.description}</p>
                  </div>
                  <svg className="shrink-0 text-[#444] group-hover:text-[#0C2E76] transition-colors" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </Link>
              ))}
            </div>

            {filteredTools.length === 0 && (
              <p className="text-sm text-[#666] text-center py-8">No modules found.</p>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
