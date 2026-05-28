'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { tools } from '@/lib/tools-data';
import { CodeBlock } from '@/app/components/CodeBlock';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';

export default function HomePage() {
  const [installCopied, setInstallCopied] = useState(false);

  const quickStartCode = `import { base64, url, hash, jwt, uuid, color, random, encrypt } from 'toolmetry';

// Base64
const encoded = base64.encode('Hello, World!');
const decoded = base64.decode(encoded);

// UUID
const id = uuid.v4();

// Color convert
const rgb = color.hexToRgb('#3B82F6');

// URL query string
const qs = url.buildQuery({ name: 'John', page: 1 });

// Random string
const token = random.string(32);

// AES-256 Encrypt
const encrypted = await encrypt.encryptAsync('Secret msg', 'password');`;

  const stats = [
    { label: 'Modules', value: '18' },
    { label: 'Dependencies', value: '0' },
    { label: 'TypeScript', value: 'Full' },
    { label: 'Platforms', value: 'Node + Browser' },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-[#1A1A1A]">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24 text-center">
            <div className="flex items-center justify-center gap-3 mb-5">
              <Image src="/logos/android-chrome-192x192.png" alt="Toolmetry" width={40} height={40} className="rounded-lg" />
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                Toolmetry
              </h1>
            </div>

            <p className="text-base text-[#999] max-w-lg mx-auto mb-8 leading-relaxed">
              18 essential developer tools in one zero-dependency package.
              Full TypeScript, Node + Browser support.
            </p>

            {/* Install */}
            <div className="inline-flex items-center gap-3 rounded-md border border-[#1A1A1A] bg-[#111111] px-4 py-2 mb-8">
              <code className="text-sm font-mono text-[#999]">$</code>
              <code className="text-sm font-mono text-white">npm i toolmetry</code>
              <button
                onClick={() => { navigator.clipboard.writeText('npm i toolmetry'); setInstallCopied(true); setTimeout(() => setInstallCopied(false), 2000); }}
                className="text-xs font-medium text-[#666] hover:text-white transition-colors"
              >
                {installCopied ? 'Copied' : 'Copy'}
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 rounded-md bg-[#0C2E76] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1a44a8] transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/playground"
                className="inline-flex items-center gap-2 rounded-md border border-[#1A1A1A] bg-[#111111] px-5 py-2.5 text-sm font-medium text-[#999] hover:text-white hover:bg-[#1A1A1A] transition-colors"
              >
                Playground
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-[#1A1A1A]">
          <div className="mx-auto max-w-6xl px-5 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs font-medium text-[#666] mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* All Modules */}
        <section className="border-b border-[#1A1A1A]">
          <div className="mx-auto max-w-6xl px-5 py-12">
            <h2 className="text-2xl font-bold text-white mb-2">All Modules</h2>
            <p className="text-sm text-[#666] mb-6">Everything you need, nothing you don&apos;t.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {tools.map(tool => (
                <Link
                  key={tool.slug}
                  href={`/docs/${tool.slug}`}
                  className="group block rounded-lg border border-[#1A1A1A] p-4 hover:border-[#0C2E76] transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-white group-hover:text-white transition-colors">
                      {tool.name}
                    </h3>
                    <span className="shrink-0 text-[10px] font-medium text-[#666] bg-[#1A1A1A] px-1.5 py-0.5 rounded">
                      {tool.category}
                    </span>
                  </div>
                  <p className="text-xs text-[#666] leading-relaxed line-clamp-2">
                    {tool.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section className="border-b border-[#1A1A1A]">
          <div className="mx-auto max-w-6xl px-5 py-12">
            <h2 className="text-2xl font-bold text-white mb-2">Quick Start</h2>
            <p className="text-sm text-[#666] mb-6">Get up and running in under a minute.</p>
            <div className="max-w-2xl">
              <CodeBlock code={quickStartCode} title="Quick Start" />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="mx-auto max-w-6xl px-5 py-12 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Ready to Build?</h2>
            <p className="text-sm text-[#666] mb-6 max-w-md mx-auto">
              Start using toolmetry in your project today. Zero dependencies, full TypeScript support, works everywhere.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 rounded-md bg-[#0C2E76] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1a44a8] transition-colors"
              >
                Read the Docs
              </Link>
              <a
                href="https://www.npmjs.com/package/toolmetry"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-[#1A1A1A] bg-[#111111] px-5 py-2.5 text-sm font-medium text-[#999] hover:text-white hover:bg-[#1A1A1A] transition-colors"
              >
                View on npm
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
