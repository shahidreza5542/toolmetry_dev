'use client';

import { useState, useMemo } from 'react';
import { tools, iconMap, categoryColors } from '@/lib/tools-data';
import { TryItLive } from '@/app/components/TryItLive';
import { CodeBlock } from '@/app/components/CodeBlock';
import { Play, ChevronDown, Package } from 'lucide-react';
import type { Category } from '@/lib/tools-data';

export default function PlaygroundPage() {
  const [selectedTool, setSelectedTool] = useState('base64');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'All'>('All');
  const tool = tools.find(t => t.slug === selectedTool);

  const filteredTools = useMemo(() => {
    if (categoryFilter === 'All') return tools;
    return tools.filter(t => t.category === categoryFilter);
  }, [categoryFilter]);

  const allCategories: (Category | 'All')[] = ['All', ...new Set(tools.map(t => t.category))];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">
          <span className="gradient-text">Playground</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Try any toolmetry module right in your browser. Select a tool, enter input, and see the output in real-time.
        </p>
      </div>

      <div className="lg:flex lg:gap-6">
        {/* Left Panel - Tool Selection */}
        <div className="lg:w-72 shrink-0 mb-6 lg:mb-0">
          <div className="sticky top-[76px] space-y-4">
            {/* Category Filter */}
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70 mb-2 block">Category</label>
              <div className="flex flex-wrap gap-1">
                {allCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all ${
                      categoryFilter === cat
                        ? 'gradient-bg text-white shadow-sm'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Tool selector dropdown */}
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70 mb-2 block">Select a Tool</label>
              <div className="relative">
                <select
                  value={selectedTool}
                  onChange={e => setSelectedTool(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-brand/30 appearance-none pr-8"
                >
                  {filteredTools.map(t => (
                    <option key={t.slug} value={t.slug}>{t.name}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Quick nav */}
            <div className="space-y-0.5 max-h-[calc(100vh-28rem)] overflow-y-auto custom-scrollbar rounded-xl border border-border p-1.5">
              {filteredTools.map(t => {
                const Icon = iconMap[t.icon];
                const isActive = selectedTool === t.slug;
                return (
                  <button
                    key={t.slug}
                    onClick={() => setSelectedTool(t.slug)}
                    className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm text-left transition-all ${
                      isActive
                        ? 'bg-brand/10 text-brand font-medium dark:bg-brand/15'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {Icon && <Icon size={14} className="shrink-0 opacity-70" />}
                    <span className="truncate flex-1">{t.name}</span>
                    {isActive && <Play size={10} className="shrink-0 text-brand" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Panel - Content & Output */}
        <div className="min-w-0 flex-1">
          {tool && (
            <div className="space-y-6">
              {/* Tool Info Header */}
              <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:gradient-bg before:rounded-r">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand/10 dark:bg-brand/15 text-brand dark:text-brand-accent">
                  {(() => { const Icon = iconMap[tool.icon]; return Icon ? <Icon size={20} /> : null; })()}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold text-foreground">{tool.name}</h2>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`inline-block rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${categoryColors[tool.category]}`}>
                      {tool.category}
                    </span>
                    <p className="text-xs text-muted-foreground truncate">{tool.description}</p>
                  </div>
                </div>
              </div>

              {/* Split-screen: Interactive + Code */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Interactive Area */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Play size={14} className="text-brand" /> Interactive
                  </h3>
                  <TryItLive toolSlug={tool.slug} />
                </div>

                {/* Code Reference */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Package size={14} className="text-brand-accent" /> Code Reference
                  </h3>
                  <div className="space-y-3">
                    <CodeBlock code={tool.importStatement} title="Import" />
                    {tool.examples.slice(0, 2).map((example, i) => (
                      <CodeBlock key={i} code={example.code} title={example.title} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Full API Reference */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Full API Reference</h3>
                <div className="rounded-xl border border-border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border bg-muted/50">
                          <th className="text-left px-4 py-2.5 font-semibold text-foreground">Function</th>
                          <th className="text-left px-4 py-2.5 font-semibold text-foreground">Parameters</th>
                          <th className="text-left px-4 py-2.5 font-semibold text-foreground">Returns</th>
                          <th className="text-left px-4 py-2.5 font-semibold text-foreground">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tool.functions.map((fn, i) => (
                          <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                            <td className="px-4 py-2">
                              <code className="text-xs font-mono font-semibold text-brand">{fn.name}</code>
                            </td>
                            <td className="px-4 py-2">
                              <code className="text-xs font-mono text-muted-foreground">{fn.params || '—'}</code>
                            </td>
                            <td className="px-4 py-2">
                              <code className="text-xs font-mono text-muted-foreground">{fn.returns}</code>
                            </td>
                            <td className="px-4 py-2 text-muted-foreground text-xs">{fn.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* More Code Examples */}
              {tool.examples.length > 2 && (
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">More Examples</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {tool.examples.slice(2).map((example, i) => (
                      <CodeBlock key={i} code={example.code} title={example.title} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
