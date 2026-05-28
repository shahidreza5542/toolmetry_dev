import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="border-t border-[#1A1A1A] bg-[#0A0A0A]">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Image src="/logos/android-chrome-192x192.png" alt="Toolmetry" width={20} height={20} className="rounded" />
              <span className="text-sm font-bold text-white">Toolmetry</span>
              <span className="text-[9px] font-medium text-[#666] bg-[#1A1A1A] px-1.5 py-0.5 rounded">v1.0.5</span>
            </div>
            <p className="text-xs text-[#666] leading-relaxed">
              18 essential developer tools. Zero dependencies. Full TypeScript. Works in Node.js and the browser.
            </p>
          </div>

          {/* Documentation */}
          <div>
            <h4 className="text-xs font-semibold text-[#999] uppercase tracking-wider mb-3">Documentation</h4>
            <ul className="space-y-2">
              <li><Link href="/docs" className="text-xs text-[#666] hover:text-white transition-colors">Getting Started</Link></li>
              <li><Link href="/docs/base64" className="text-xs text-[#666] hover:text-white transition-colors">API Reference</Link></li>
              <li><Link href="/playground" className="text-xs text-[#666] hover:text-white transition-colors">Playground</Link></li>
            </ul>
          </div>

          {/* Popular */}
          <div>
            <h4 className="text-xs font-semibold text-[#999] uppercase tracking-wider mb-3">Popular</h4>
            <ul className="space-y-2">
              <li><Link href="/docs/base64" className="text-xs text-[#666] hover:text-white transition-colors">Base64</Link></li>
              <li><Link href="/docs/hash" className="text-xs text-[#666] hover:text-white transition-colors">Hash</Link></li>
              <li><Link href="/docs/jwt" className="text-xs text-[#666] hover:text-white transition-colors">JWT</Link></li>
              <li><Link href="/docs/encrypt" className="text-xs text-[#666] hover:text-white transition-colors">Encrypt</Link></li>
              <li><Link href="/docs/uuid" className="text-xs text-[#666] hover:text-white transition-colors">UUID</Link></li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-semibold text-[#999] uppercase tracking-wider mb-3">Links</h4>
            <ul className="space-y-2">
              <li><a href="https://www.npmjs.com/package/toolmetry" target="_blank" rel="noopener noreferrer" className="text-xs text-[#666] hover:text-white transition-colors">npm</a></li>
              <li><a href="https://github.com/toolmetryai/toolmetry-npm" target="_blank" rel="noopener noreferrer" className="text-xs text-[#666] hover:text-white transition-colors">GitHub</a></li>
              <li><a href="https://toolmetryai.com" target="_blank" rel="noopener noreferrer" className="text-xs text-[#666] hover:text-white transition-colors">ToolmetryAI</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-[#1A1A1A] flex items-center justify-between">
          <p className="text-[11px] text-[#555]">&copy; {new Date().getFullYear()} ToolmetryAI. MIT License.</p>
          <p className="text-[11px] text-[#555] font-mono">v1.0.5</p>
        </div>
      </div>
    </footer>
  );
}
