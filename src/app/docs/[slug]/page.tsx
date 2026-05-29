'use client';

import { useParams } from 'next/navigation';
import { getToolBySlug, tools } from '@/lib/tools-data';
import { CodeBlock } from '@/app/components/CodeBlock';
import { TryItLive } from '@/app/components/TryItLive';
import Link from 'next/link';

export default function ToolDocPage() {
  const params = useParams();
  const slug = params.slug as string;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-xl font-bold text-white mb-2">Module Not Found</h1>
        <p className="text-sm text-[#666] mb-4">The module &quot;{slug}&quot; does not exist.</p>
        <Link href="/docs" className="text-sm font-medium text-white hover:underline">Back to Docs</Link>
      </div>
    );
  }

  const currentIndex = tools.findIndex(t => t.slug === slug);
  const prevTool = currentIndex > 0 ? tools[currentIndex - 1] : null;
  const nextTool = currentIndex < tools.length - 1 ? tools[currentIndex + 1] : null;

  return (
    <>
      {/* Breadcrumb */}
      <nav className="mb-5 flex items-center gap-1.5 text-xs text-[#666]">
        <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
        <span>/</span>
        <span className="text-white">{tool.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8 pb-5 border-b border-[#1A1A1A]">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-bold text-white">{tool.name}</h1>
          <span className="text-[10px] font-medium text-[#666] bg-[#1A1A1A] px-2 py-0.5 rounded">{tool.category}</span>
        </div>
        <p className="text-sm text-[#666]">{tool.description}</p>
      </div>

      {/* Import */}
      <section className="mb-8">
        <h2 className="text-base font-semibold text-white mb-2">Import</h2>
        <CodeBlock code={tool.importStatement} title="Import" />
      </section>

      {/* API Reference */}
      <section className="mb-8">
        <h2 className="text-base font-semibold text-white mb-2">API Reference</h2>
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
      </section>

      {/* Examples */}
      <section className="mb-8">
        <h2 className="text-base font-semibold text-white mb-2">Examples</h2>
        <div className="space-y-2">
          {tool.examples.map((example, i) => (
            <CodeBlock key={i} code={example.code} title={example.title} />
          ))}
        </div>
      </section>

      {/* Try It Live */}
      <section className="mb-8">
        <h2 className="text-base font-semibold text-white mb-2">Try It Live</h2>
        <TryItLive toolSlug={tool.slug} />
      </section>

      {/* Navigation */}
      <div className="grid grid-cols-2 gap-3 pt-5 border-t border-[#1A1A1A]">
        {prevTool ? (
          <Link href={`/docs/${prevTool.slug}`} className="group rounded-lg border border-[#1A1A1A] p-3 hover:border-[#0C2E76] transition-colors">
            <div className="text-[10px] text-[#666] mb-0.5">Previous</div>
            <div className="text-sm font-medium text-white">{prevTool.name}</div>
          </Link>
        ) : <div />}
        {nextTool ? (
          <Link href={`/docs/${nextTool.slug}`} className="group rounded-lg border border-[#1A1A1A] p-3 hover:border-[#0C2E76] transition-colors text-right">
            <div className="text-[10px] text-[#666] mb-0.5">Next</div>
            <div className="text-sm font-medium text-white">{nextTool.name}</div>
          </Link>
        ) : <div />}
      </div>
    </>
  );
}
