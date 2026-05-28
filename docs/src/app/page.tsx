'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { CodeBlock } from '@/app/components/CodeBlock';

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>
    ),
    title: 'Zero Dependencies',
    description: 'No external packages. No bloat. Just pure, self-contained utility functions that work everywhere without supply chain risks.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
    ),
    title: 'Full TypeScript',
    description: 'Complete type definitions for every module. IntelliSense, type checking, and autocompletion out of the box for a seamless DX.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
    ),
    title: 'Node + Browser',
    description: 'Works in both Node.js and browser environments. Universal modules with platform-specific optimizations for each runtime.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
    ),
    title: '18 Modules',
    description: 'Base64, URL, Hash, JWT, UUID, AES Encrypt, Random, Color, HTML Entity, Number Base, Text, JSON, Password, Morse, Roman, Cron, Diff, Lorem.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
    ),
    title: 'Lightweight',
    description: 'Minimal footprint. Import only what you need. Tree-shakeable exports keep your bundle lean and your app fast.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
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
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
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
          <div className="mx-auto max-w-5xl px-5 py-20">
            <h2 className="text-2xl font-bold text-white mb-4">About Toolmetry</h2>

            <p className="text-sm text-[#999] leading-relaxed mb-5">
              Toolmetry is a modern developer utility library designed to simplify everyday backend and frontend tasks. Instead of installing multiple small packages for common operations, Toolmetry provides a single, unified toolkit with zero dependencies.
            </p>

            <p className="text-sm text-[#999] leading-relaxed mb-5">
              It includes 18 modular tools covering encoding, hashing, authentication, encryption, random generation, text processing, data formatting, and more. Each module is optimized for performance and works seamlessly in both Node.js and browser environments.
            </p>

            <p className="text-sm text-[#999] leading-relaxed mb-6">
              Built with TypeScript support and tree-shaking in mind, Toolmetry ensures that you only ship what you actually use — keeping your bundle size minimal and your application fast.
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Zero External Dependencies",
                "Full TypeScript Support",
                "Node + Browser Compatible",
                "Tree-shakeable Architecture"
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-[#1A1A1A] bg-[#111111] px-4 py-3 text-sm text-white"
                >
                  {item}
                </div>
              ))}
            </div>

            <p className="text-xs text-[#666] mt-6">
              Maintained by ToolmetryAI • MIT Licensed Open Source
            </p>
          </div>
        </section>

        {/* ── D. QUICK START CODE SECTION ── */}
        <section className="border-b border-[#1A1A1A]">
          <div className="mx-auto max-w-5xl px-5 py-20">
            <h2 className="text-2xl font-bold text-white mb-2">Quick Start</h2>

            <p className="text-sm text-[#666] mb-6">
              Install and start using Toolmetry in seconds.
            </p>

            <div className="rounded-lg border border-[#1A1A1A] bg-[#111111] px-4 py-3 font-mono text-sm text-white mb-6">
              npm i toolmetry
            </div>

            <CodeBlock code={quickStartCode} title="Example Usage" />
          </div>
        </section>

        {/* ── E. FAQ SECTION ── */}
        <section className="border-b border-[#1A1A1A]">
          <div className="mx-auto max-w-5xl px-5 py-20">
            <h2 className="text-2xl font-bold text-white mb-2">FAQ</h2>

            <p className="text-sm text-[#666] mb-6">
              Common questions about Toolmetry.
            </p>

            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-[#1A1A1A] rounded-lg bg-[#111111]"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex justify-between items-center px-4 py-3 text-left"
                  >
                    <span className="text-sm text-white">{faq.question}</span>
                    <span className="text-[#666]">
                      {openFaq === index ? "−" : "+"}
                    </span>
                  </button>

                  {openFaq === index && (
                    <div className="px-4 pb-3">
                      <p className="text-sm text-[#999] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
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
