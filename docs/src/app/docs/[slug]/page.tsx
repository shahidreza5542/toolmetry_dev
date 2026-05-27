'use client';

import { useParams } from 'next/navigation';
import { getToolBySlug, iconMap, tools, categoryColors } from '@/lib/tools-data';
import { CodeBlock } from '@/app/components/CodeBlock';
import { TryItLive } from '@/app/components/TryItLive';
import { Sidebar } from '@/app/components/Sidebar';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';

export default function ToolDocPage() {
  const params = useParams();
  const slug = params.slug as string;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Module Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The module &quot;{slug}&quot; does not exist in the toolmetry package.
        </p>
        <Link
          href="/docs"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline underline-offset-4"
        >
          <ArrowLeft size={14} /> Back to Documentation
        </Link>
      </div>
    );
  }

  const Icon = iconMap[tool.icon];
  const catColor = categoryColors[tool.category];

  const currentIndex = tools.findIndex(t => t.slug === slug);
  const prevTool = currentIndex > 0 ? tools[currentIndex - 1] : null;
  const nextTool = currentIndex < tools.length - 1 ? tools[currentIndex + 1] : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="lg:flex lg:gap-8">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="min-w-0 flex-1 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link
              href="/docs"
              className="hover:text-foreground transition-colors"
            >
              Docs
            </Link>
            <ChevronRight size={12} />
            <span className={`inline-block rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${catColor}`}>
              {tool.category}
            </span>
            <ChevronRight size={12} />
            <span className="text-foreground font-medium">{tool.name}</span>
          </nav>

          {/* Tool Header */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand/10 dark:bg-brand/15 text-brand dark:text-brand-accent">
              {Icon && <Icon size={28} />}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{tool.name}</h1>
                <span className={`inline-block rounded-md px-2 py-0.5 text-[11px] font-semibold ${catColor}`}>
                  {tool.category}
                </span>
              </div>
              <p className="text-muted-foreground">{tool.description}</p>
            </div>
          </div>

          {/* Import Statement */}
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-foreground mb-3">Import</h2>
            <CodeBlock code={tool.importStatement} title="Import Statement" />
          </section>

          {/* API Reference */}
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-foreground mb-3">API Reference</h2>
            <div className="rounded-xl border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left px-4 py-3 font-semibold text-foreground">Function</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">Parameters</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">Returns</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tool.functions.map((fn, i) => (
                      <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-2.5">
                          <code className="text-xs font-mono font-semibold text-brand">{fn.name}</code>
                        </td>
                        <td className="px-4 py-2.5">
                          <code className="text-xs font-mono text-muted-foreground">{fn.params || '—'}</code>
                        </td>
                        <td className="px-4 py-2.5">
                          <code className="text-xs font-mono text-muted-foreground">{fn.returns}</code>
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground text-xs">{fn.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Code Examples */}
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-foreground mb-3">Examples</h2>
            <div className="space-y-4">
              {tool.examples.map((example, i) => (
                <CodeBlock key={i} code={example.code} title={example.title} />
              ))}
            </div>
          </section>

          {/* Try It Live */}
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-foreground mb-3">
              <span className="gradient-text">Try It Live</span>
            </h2>
            <TryItLive toolSlug={tool.slug} />
          </section>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
            {prevTool ? (
              <Link
                href={`/docs/${prevTool.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:border-brand/30 transition-all"
              >
                <ArrowLeft size={16} className="shrink-0 text-muted-foreground group-hover:text-brand transition-colors" />
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground mb-0.5">Previous</div>
                  <div className="text-sm font-medium text-foreground group-hover:text-brand transition-colors truncate">{prevTool.name}</div>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextTool ? (
              <Link
                href={`/docs/${nextTool.slug}`}
                className="group flex items-center justify-end gap-3 rounded-xl border border-border bg-card p-4 hover:border-brand/30 transition-all text-right"
              >
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground mb-0.5">Next</div>
                  <div className="text-sm font-medium text-foreground group-hover:text-brand transition-colors truncate">{nextTool.name}</div>
                </div>
                <ArrowRight size={16} className="shrink-0 text-muted-foreground group-hover:text-brand transition-colors" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
