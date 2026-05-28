'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { CodeBlock } from '@/app/components/CodeBlock';

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
    ),
    title: 'Zero Dependencies',
    description: 'No external packages. No bloat. Just pure, self-contained utility functions that work everywhere without supply chain risks.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
    ),
    title: 'Full TypeScript',
    description: 'Complete type definitions for every module. IntelliSense, type checking, and autocompletion out of the box for a seamless DX.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
    ),
    title: 'Node + Browser',
    description: 'Works in both Node.js and browser environments. Universal modules with platform-specific optimizations for each runtime.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
    ),
    title: '18 Modules',
    description: 'Base64, URL, Hash, JWT, UUID, AES Encrypt, Random, Color, HTML Entity, Number Base, Text, JSON, Password, Morse, Roman, Cron, Diff, Lorem.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
    ),
    title: 'Lightweight',
    description: 'Minimal footprint. Import only what you need. Tree-shakeable exports keep your bundle lean and your app fast.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    ),
    title: 'MIT License',
    description: 'Fully open source. Use it in personal projects, commercial software, or anywhere you need it. No restrictions, no worries.',
  },
];

const faqs = [
  {
    question: 'What is toolmetry?',
    answer: 'Toolmetry is an npm package that provides 18 essential developer tools in a single, zero-dependency package. It includes utilities for encoding, security, identity, design, math, text processing, and more — all with full TypeScript support.',
  },
  {
    question: 'Is toolmetry free?',
    answer: 'Yes! Toolmetry is completely free and open source under the MIT License. You can use it in personal projects, commercial applications, or anywhere you need developer utilities.',
  },
  {
    question: 'Does it work in the browser?',
    answer: 'Absolutely. Toolmetry is designed to work in both Node.js and browser environments. Security-sensitive modules like AES encryption use the Web Crypto API in the browser, and Node.js crypto on the server.',
  },
  {
    question: 'How do I install it?',
    answer: 'Simply run `npm i toolmetry` in your project directory. You can also use yarn, pnpm, or bun — `yarn add toolmetry`, `pnpm add toolmetry`, or `bun add toolmetry`.',
  },
  {
    question: 'Does it have any dependencies?',
    answer: 'No. Toolmetry has zero external dependencies. Every module is implemented from scratch, ensuring no supply chain risks and keeping your project lean.',
  },
  {
    question: 'Can I import only specific modules?',
    answer: 'Yes. Toolmetry supports tree-shaking. You can import only the modules you need using ES module syntax, and your bundler will eliminate the rest from the final output.',
  },
];

export default function HomePage() {
  const [installCopied, setInstallCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* ── A. HERO SECTION (full screen with dot grid bg) ── */}
        <section className="min-h-screen flex items-center justify-center border-b border-[#1A1A1A] relative overflow-hidden">
          {/* Dot Grid Background */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
          {/* Subtle radial glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#0C2E76] opacity-[0.04] blur-[120px] pointer-events-none" />

          <div className="relative mx-auto max-w-3xl px-5 py-20 text-center">
            {/* Version badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#1A1A1A] bg-[#111111] px-4 py-1.5 mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0C2E76]" />
              <span className="text-xs font-medium text-[#999]">v1.0.5 — Now Available</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
              18 Developer Tools.<br />
              One Package.<br />
              <span className="text-[#4a7adb]">Zero Dependencies.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#999] max-w-xl mx-auto mb-10 leading-relaxed">
              Encode, hash, encrypt, generate, convert — all in a single lightweight package with full TypeScript support. Works in Node.js and the browser.
            </p>

            {/* Install Command */}
            <div className="inline-flex items-center gap-3 rounded-lg border border-[#1A1A1A] bg-[#111111]/80 backdrop-blur-sm px-5 py-3 mb-10">
              <code className="text-sm font-mono text-[#666]">$</code>
              <code className="text-sm font-mono text-white">npm i toolmetry</code>
              <button
                onClick={() => { navigator.clipboard.writeText('npm i toolmetry'); setInstallCopied(true); setTimeout(() => setInstallCopied(false), 2000); }}
                className="text-xs font-medium text-[#666] hover:text-white transition-colors px-2 py-1 rounded border border-[#1A1A1A] hover:border-[#333]"
              >
                {installCopied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 rounded-lg bg-[#0C2E76] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1a44a8] transition-colors shadow-lg shadow-[#0C2E76]/20"
              >
                Get Started
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
              <a
                href="https://www.npmjs.com/package/toolmetry"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[#1A1A1A] bg-[#111111]/80 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-[#999] hover:text-white hover:border-[#333] transition-colors"
              >
                View on npm
              </a>
            </div>
          </div>
        </section>

        {/* ── B. FEATURES SECTION ── */}
        <section className="border-b border-[#1A1A1A]">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Why Toolmetry?</h2>
              <p className="text-sm text-[#666] max-w-lg mx-auto">
                Built for developers who want powerful tools without the bloat.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map(feature => (
                <div
                  key={feature.title}
                  className="rounded-lg border border-[#1A1A1A] bg-[#111111] p-6 hover:border-[#0C2E76]/40 transition-colors group"
                >
                  <div className="text-[#4a7adb] mb-3 group-hover:text-[#6b9aef] transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-xs text-[#666] leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── C. ABOUT TOOLMETRY DEV SECTION ── */}
        <section className="border-b border-[#1A1A1A]">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">About Toolmetry</h2>
              <div className="space-y-4 text-sm text-[#999] leading-relaxed">
                <p>
                  Toolmetry was born from a simple frustration: every project needs the same utilities — Base64 encoding, URL parsing, hashing, UUID generation — but each one pulls in a different dependency with its own set of sub-dependencies. Before you know it, your node_modules is bloated and your supply chain is fragile.
                </p>
                <p>
                  We built Toolmetry to be the single source of truth for common developer operations. Eighteen modules covering encoding, security, identity, design, math, text, data, utility, and content — all implemented from scratch with zero external dependencies. Every function has full TypeScript types, and the entire package is tree-shakeable so you only ship what you use.
                </p>
                <p>
                  Whether you&apos;re building a CLI tool in Node.js, a web app in the browser, or a serverless function, Toolmetry works the same way everywhere. Security-sensitive operations like hashing and encryption automatically use the appropriate platform API — Node&apos;s crypto module on the server, and the Web Crypto API in the browser.
                </p>
                <p>
                  Toolmetry is maintained by the <a href="https://toolmetryai.com" target="_blank" rel="noopener noreferrer" className="text-[#4a7adb] hover:underline">ToolmetryAI</a> team and is open source under the MIT License.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── D. QUICK START CODE SECTION ── */}
        <section className="border-b border-[#1A1A1A]">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Quick Start</h2>
              <p className="text-sm text-[#666] mb-6">Get up and running in under a minute.</p>
              <CodeBlock code={quickStartCode} title="Quick Start" />
            </div>
          </div>
        </section>

        {/* ── E. FAQ SECTION ── */}
        <section className="border-b border-[#1A1A1A]">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Frequently Asked Questions</h2>
              <p className="text-sm text-[#666] mb-8">Common questions about toolmetry.</p>

              <div className="space-y-2">
                {faqs.map((faq, index) => (
                  <div key={index} className="rounded-lg border border-[#1A1A1A] overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="flex items-center justify-between w-full px-5 py-4 text-left hover:bg-[#111111] transition-colors"
                    >
                      <span className="text-sm font-medium text-white">{faq.question}</span>
                      <svg
                        width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        className={`shrink-0 text-[#666] transition-transform duration-200 ${openFaq === index ? 'rotate-180' : ''}`}
                        strokeLinecap="round" strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    {openFaq === index && (
                      <div className="px-5 pb-4 pt-0">
                        <p className="text-sm text-[#999] leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── F. CTA SECTION ── */}
        <section>
          <div className="mx-auto max-w-6xl px-5 py-20 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Ready to Build?</h2>
            <p className="text-sm text-[#666] mb-8 max-w-md mx-auto">
              Start using toolmetry in your project today. Zero dependencies, full TypeScript support, works everywhere.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 rounded-lg bg-[#0C2E76] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1a44a8] transition-colors shadow-lg shadow-[#0C2E76]/20"
              >
                Read the Docs
              </Link>
              <a
                href="https://www.npmjs.com/package/toolmetry"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[#1A1A1A] bg-[#111111] px-6 py-3 text-sm font-semibold text-[#999] hover:text-white hover:border-[#333] transition-colors"
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
