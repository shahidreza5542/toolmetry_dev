'use client';

import { useState, useMemo } from 'react';
import { tools } from '@/lib/tools-data';
import { TryItLive } from '@/app/components/TryItLive';
import { CodeBlock } from '@/app/components/CodeBlock';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import type { Category } from '@/lib/tools-data';

export default function PlaygroundPage() {
  const [selectedTool, setSelectedTool] = useState('base64');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'All'>('All');

  const filteredTools = useMemo(() => {
    if (categoryFilter === 'All') return tools;
    return tools.filter(t => t.category === categoryFilter);
  }, [categoryFilter]);

  const allCategories: (Category | 'All')[] = ['All', ...new Set(tools.map(t => t.category))];

  const handleCategoryChange = (cat: Category | 'All') => {
    setCategoryFilter(cat);
    if (cat === 'All') {
      setSelectedTool('base64');
    } else {
      const firstInCat = tools.find(t => t.category === cat);
      if (firstInCat) {
        setSelectedTool(firstInCat.slug);
      }
    }
  };

  const tool = tools.find(t => t.slug === selectedTool);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-5 py-10">
          <h1 className="text-2xl font-bold text-white mb-1">Playground</h1>
          <p className="text-sm text-[#666] mb-8">Try any toolmetry module right in your browser.</p>

          <div className="mb-8">
            <div className="flex flex-wrap gap-1 mb-3">
              {allCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                    categoryFilter === cat ? 'bg-[#0C2E76] text-white' : 'bg-[#1A1A1A] text-[#999] hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <select
              value={selectedTool}
              onChange={e => setSelectedTool(e.target.value)}
              className="w-full sm:w-64 rounded-md border border-[#1A1A1A] bg-[#0A0A0A] px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0C2E76]"
            >
              {filteredTools.map(t => (
                <option key={t.slug} value={t.slug}>{t.name} — {t.category}</option>
              ))}
            </select>
          </div>

          {tool && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-lg font-semibold text-white">{tool.name}</h2>
                  <span className="text-[10px] font-medium text-[#666] bg-[#1A1A1A] px-2 py-0.5 rounded">{tool.category}</span>
                </div>
                <p className="text-sm text-[#666]">{tool.description}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white mb-2">Interactive</h3>
                <TryItLive toolSlug={tool.slug} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white mb-2">Code Reference</h3>
                <div className="space-y-2">
                  <CodeBlock code={tool.importStatement} title="Import" />
                  {tool.examples.slice(0, 2).map((example, i) => (
                    <CodeBlock key={i} code={example.code} title={example.title} />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white mb-2">API Reference</h3>
                <div className="rounded-lg border border-[#1A1A1A] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm min-w-[600px]">
                      <thead>
                        <tr className="border-b border-[#1A1A1A] bg-[#111111]">
                          <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-[#666]">Function</th>
                          <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-[#666]">Parameters</th>
                          <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-[#666]">Returns</th>
                          <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-[#666]">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tool.functions.map((fn, i) => (
                          <tr key={i} className="border-b border-[#1A1A1A] last:border-0">
                            <td className="px-4 py-2.5"><code className="text-xs font-mono font-medium text-white">{fn.name}</code></td>
                            <td className="px-4 py-2.5"><code className="text-xs font-mono text-[#666]">{fn.params || '—'}</code></td>
                            <td className="px-4 py-2.5"><code className="text-xs font-mono text-[#666]">{fn.returns}</code></td>
                            <td className="px-4 py-2.5 text-xs text-[#666]">{fn.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
