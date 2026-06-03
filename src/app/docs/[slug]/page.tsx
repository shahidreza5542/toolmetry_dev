import { getToolBySlug, tools } from '@/lib/tools-data';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return { title: 'Module Not Found' };
  }

  return {
    title: `${tool.name} — Toolmetry API Reference`,
    description: tool.description,
    keywords: [tool.name, 'toolmetry', tool.category.toLowerCase(), 'npm package', 'developer tool', ...tool.functions.map(f => f.name)],
    openGraph: {
      title: `${tool.name} — Toolmetry`,
      description: tool.description,
      type: 'article',
    },
  };
}

export async function generateStaticParams() {
  return tools.map(tool => ({ slug: tool.slug }));
}

export default async function ToolDocPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-xl font-bold text-white mb-2">Module Not Found</h1>
        <p className="text-sm text-[#666] mb-4">The module &quot;{slug}&quot; does not exist.</p>
        <a href="/docs" className="text-sm font-medium text-white hover:underline">Back to Docs</a>
      </div>
    );
  }

  const currentIndex = tools.findIndex(t => t.slug === slug);
  const prevTool = currentIndex > 0 ? tools[currentIndex - 1] : null;
  const nextTool = currentIndex < tools.length - 1 ? tools[currentIndex + 1] : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: tool.name,
    description: tool.description,
    programmingLanguage: 'JavaScript',
    codeSampleType: 'API',
    runtimePlatform: ['Node.js', 'Browser'],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="mb-5 flex items-center gap-1.5 text-xs text-[#666]">
        <a href="/docs" className="hover:text-white transition-colors">Docs</a>
        <span>/</span>
        <span className="text-white">{tool.name}</span>
      </nav>

      <div className="mb-8 pb-5 border-b border-[#1A1A1A]">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-bold text-white">{tool.name}</h1>
          <span className="text-[10px] font-medium text-[#666] bg-[#1A1A1A] px-2 py-0.5 rounded">{tool.category}</span>
        </div>
        <p className="text-sm text-[#666]">{tool.description}</p>
      </div>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-white mb-2">Import</h2>
        <pre className="rounded-lg border border-[#1A1A1A] bg-[#0A0A0A] px-4 py-3 text-[13px] leading-6 font-mono text-[#ccc] overflow-x-auto">{tool.importStatement}</pre>
      </section>

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

      <section className="mb-8">
        <h2 className="text-base font-semibold text-white mb-2">Examples</h2>
        <div className="space-y-2">
          {tool.examples.map((example, i) => (
            <div key={i} className="rounded-lg border border-[#1A1A1A] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-[#111111] border-b border-[#1A1A1A]">
                <span className="text-[11px] font-medium text-[#666]">{example.title}</span>
              </div>
              <div className="overflow-x-auto">
                <pre className="px-4 py-3 text-[13px] leading-6 font-mono bg-[#0A0A0A] text-[#ccc]">{example.code}</pre>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3 pt-5 border-t border-[#1A1A1A]">
        {prevTool ? (
          <a href={`/docs/${prevTool.slug}`} className="group rounded-lg border border-[#1A1A1A] p-3 hover:border-[#0C2E76] transition-colors">
            <div className="text-[10px] text-[#666] mb-0.5">Previous</div>
            <div className="text-sm font-medium text-white">{prevTool.name}</div>
          </a>
        ) : <div />}
        {nextTool ? (
          <a href={`/docs/${nextTool.slug}`} className="group rounded-lg border border-[#1A1A1A] p-3 hover:border-[#0C2E76] transition-colors text-right">
            <div className="text-[10px] text-[#666] mb-0.5">Next</div>
            <div className="text-sm font-medium text-white">{nextTool.name}</div>
          </a>
        ) : <div />}
      </div>
    </>
  );
}
