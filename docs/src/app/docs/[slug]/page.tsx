'use client';

import { useParams } from 'next/navigation';
import { getToolBySlug, iconMap, tools, categoryColors } from '@/lib/tools-data';
import { CodeBlock } from '@/app/components/CodeBlock';
import { TryItLive } from '@/app/components/TryItLive';
import { Sidebar } from '@/app/components/Sidebar';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

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
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
        >
          <ArrowLeft size={14} /> Back to Documentation
        </Link>
      </div>
    );
  }

  const Icon = iconMap[tool.icon];
  const catColor = categoryColors[tool.category];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="lg:flex lg:gap-8">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="min-w-0 flex-1">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Link
              href="/docs"
              className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <ArrowLeft size={14} /> Documentation
            </Link>
            <span>/</span>
            <span className={`inline-block rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${catColor}`}>
              {tool.category}
            </span>
          </div>

          {/* Tool Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand/10 dark:bg-brand/20 text-brand dark:text-brand-accent">
              {Icon && <Icon size={28} />}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{tool.name}</h1>
              <p className="text-muted-foreground mt-0.5">{tool.description}</p>
            </div>
          </div>

          {/* Import Statement */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-3">Import</h2>
            <CodeBlock code={tool.importStatement} title="Import Statement" />
          </section>

          {/* API Reference */}
          <section className="mb-8">
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
                      <tr key={i} className="border-b border-border last:border-0">
                        <td className="px-4 py-2.5">
                          <code className="text-xs font-mono font-semibold text-brand">{fn.name}</code>
                        </td>
                        <td className="px-4 py-2.5">
                          <code className="text-xs font-mono text-muted-foreground">{fn.params || '—'}</code>
                        </td>
                        <td className="px-4 py-2.5">
                          <code className="text-xs font-mono text-muted-foreground">{fn.returns}</code>
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">{fn.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Code Examples */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-3">Examples</h2>
            <div className="space-y-4">
              {tool.examples.map((example, i) => (
                <CodeBlock key={i} code={example.code} title={example.title} />
              ))}
            </div>
          </section>

          {/* Try It Live */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-3">
              <span className="gradient-text">Try It</span>
            </h2>
            <TryItLive toolSlug={tool.slug} />
          </section>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-border">
            {(() => {
              const currentIndex = tools.findIndex(t => t.slug === slug);
              const prevTool = currentIndex > 0 ? tools[currentIndex - 1] : null;
              const nextTool = currentIndex < tools.length - 1 ? tools[currentIndex + 1] : null;
              return (
                <>
                  {prevTool ? (
                    <Link
                      href={`/docs/${prevTool.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ArrowLeft size={14} /> {prevTool.name}
                    </Link>
                  ) : (
                    <div />
                  )}
                  {nextTool ? (
                    <Link
                      href={`/docs/${nextTool.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
                    >
                      {nextTool.name} <ArrowRight size={14} />
                    </Link>
                  ) : (
                    <div />
                  )}
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
