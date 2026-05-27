'use client';

import { useState } from 'react';
import { Terminal, Copy, Check, Package, Zap, Globe, Shield, ArrowRight, Layers, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { tools } from '@/lib/tools-data';
import { ToolCard } from '@/app/components/ToolCard';
import { CodeBlock } from '@/app/components/CodeBlock';

export default function HomePage() {
  const [installCopied, setInstallCopied] = useState(false);

  const handleInstallCopy = () => {
    navigator.clipboard.writeText('npm i toolmetry');
    setInstallCopied(true);
    setTimeout(() => setInstallCopied(false), 2000);
  };

  const quickStartCode = `const { base64, url, hash, jwt, uuid, color, random, encrypt } = require('toolmetry');

// Base64 encode/decode
const encoded = base64.encode('Hello, World!');
const decoded = base64.decode(encoded);

// Generate a UUID
const id = uuid.v4();

// Convert colors
const rgb = color.hexToRgb('#3B82F6');
// { r: 59, g: 130, b: 246 }

// URL query string
const qs = url.buildQuery({ name: 'John', page: 1 });
// "?name=John&page=1"

// Random string
const token = random.string(32);
// "aB3xY9kL2mN5pQ8wR7tV4..."

// AES-256 Encrypt
const encrypted = encrypt.encrypt('Secret msg', 'password');`;

  const stats = [
    { label: 'Modules', value: '18', icon: Package },
    { label: 'Zero Dependencies', value: '0', icon: Shield },
    { label: 'TypeScript', value: 'Full', icon: Globe },
    { label: 'Platforms', value: 'Node + Browser', icon: Zap },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 gradient-bg opacity-[0.03] dark:opacity-[0.08]" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20 bg-brand" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-10 bg-brand-accent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 bg-brand" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-24 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-sm font-medium gradient-bg text-white shadow-md shadow-brand/20">
            <Sparkles size={14} /> v1.0.3 — Now with 18 Modules
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            <span className="gradient-text">Toolmetry Developer Web</span>
          </h1>
          <p className="text-lg sm:text-xl font-light mb-8 text-muted-foreground max-w-2xl mx-auto">
            Build faster with powerful developer tools. 18 essential modules in one zero-dependency package.
          </p>

          {/* Install command */}
          <div className="inline-flex items-center gap-3 rounded-xl px-5 py-3 font-mono text-sm bg-card border border-border shadow-lg">
            <Terminal size={16} className="shrink-0 text-brand" />
            <span className="text-foreground">npm i toolmetry</span>
            <button
              onClick={handleInstallCopy}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-brand hover:bg-brand/10 transition-colors"
            >
              {installCopied ? <Check size={12} /> : <Copy size={12} />}
              {installCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white gradient-bg shadow-lg shadow-brand/20 transition-all hover:shadow-xl hover:shadow-brand/30 active:scale-95"
            >
              <Zap size={16} /> Get Started
            </Link>
            <Link
              href="/playground"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold border border-border bg-card text-foreground hover:bg-muted transition-all"
            >
              <Globe size={16} /> Playground
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Quick Start</h2>
            <p className="mt-2 text-muted-foreground">Get up and running in under a minute</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <CodeBlock code={quickStartCode} title="Quick Start Example" />
          </div>
        </div>
      </section>

      {/* Tool Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              <span className="gradient-text">18 Powerful Modules</span>
            </h2>
            <p className="mt-2 text-muted-foreground">Everything you need, nothing you don&apos;t</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {tools.map(tool => (
              <ToolCard
                key={tool.slug}
                slug={tool.slug}
                name={tool.name}
                icon={tool.icon}
                category={tool.category}
                description={tool.description}
              />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
            >
              View full documentation <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-muted/30 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map(stat => (
              <div key={stat.label} className="text-center p-6 rounded-xl bg-card border border-border">
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-brand/10 dark:bg-brand/20 text-brand dark:text-brand-accent mb-3">
                  <stat.icon size={20} />
                </div>
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Ready to Build?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Start using toolmetry in your project today. Zero dependencies, full TypeScript support, works everywhere.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white gradient-bg shadow-lg shadow-brand/20 transition-all hover:shadow-xl hover:shadow-brand/30 active:scale-95"
            >
              <Layers size={16} /> Read the Docs
            </Link>
            <a
              href="https://www.npmjs.com/package/toolmetry"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold border border-border bg-card text-foreground hover:bg-muted transition-all"
            >
              View on npm <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
