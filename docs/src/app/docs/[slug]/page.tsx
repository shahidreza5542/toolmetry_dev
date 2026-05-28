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
  const slug = params?.slug as string;

  const tool = getToolBySlug(slug);

  if (!tool) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Module Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The module "{slug}" does not exist.
        </p>
        <Link href="/docs" className="text-brand font-semibold">
          Back to Docs
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
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="lg:flex lg:gap-8">
        <Sidebar />

        <div className="flex-1 max-w-4xl">
          
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/docs">Docs</Link>
            <ChevronRight size={12} />
            <span>{tool.category}</span>
            <ChevronRight size={12} />
            <span className="text-foreground">{tool.name}</span>
          </nav>

          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-brand/10 text-brand">
              {Icon && <Icon size={24} />}
            </div>

            <div>
              <h1 className="text-3xl font-bold">{tool.name}</h1>
              <p className="text-muted-foreground">{tool.description}</p>
            </div>
          </div>

          {/* Import */}
          <section className="mb-8">
            <h2 className="font-semibold mb-2">Import</h2>
            <CodeBlock code={tool.importStatement} />
          </section>

          {/* API */}
          <section className="mb-8">
            <h2 className="font-semibold mb-2">API Reference</h2>

            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3">Function</th>
                    <th className="text-left p-3">Params</th>
                    <th className="text-left p-3">Returns</th>
                    <th className="text-left p-3">Description</th>
                  </tr>
                </thead>

                <tbody>
                  {tool.functions.map((fn, i) => (
                    <tr key={i} className="border-t">
                      <td className="p-3 font-mono text-brand">{fn.name}</td>
                      <td className="p-3 text-muted-foreground">{fn.params || '—'}</td>
                      <td className="p-3 text-muted-foreground">{fn.returns}</td>
                      <td className="p-3 text-muted-foreground">{fn.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Examples */}
          <section className="mb-8">
            <h2 className="font-semibold mb-2">Examples</h2>
            {tool.examples.map((ex, i) => (
              <CodeBlock key={i} code={ex.code} title={ex.title} />
            ))}
          </section>

          {/* Try */}
          <section className="mb-8">
            <h2 className="font-semibold mb-2">Try It Live</h2>
            <TryItLive toolSlug={tool.slug} />
          </section>

          {/* Navigation */}
          <div className="flex justify-between border-t pt-6">
            {prevTool ? (
              <Link href={`/docs/${prevTool.slug}`}>← {prevTool.name}</Link>
            ) : <div />}

            {nextTool ? (
              <Link href={`/docs/${nextTool.slug}`}>{nextTool.name} →</Link>
            ) : <div />}
          </div>

        </div>
      </div>
    </div>
  );
}