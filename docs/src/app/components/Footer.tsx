import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg gradient-bg text-white font-bold text-xs">
                T
              </div>
              <span className="text-sm font-bold gradient-text">Toolmetry Developer Web</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Comprehensive developer tools library for JavaScript and TypeScript. 18 modules, zero dependencies.
            </p>
          </div>

          {/* Documentation */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Documentation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Getting Started
                </Link>
              </li>
              <li>
                <Link href="/docs/base64" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="/playground" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Playground
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Popular Tools</h3>
            <ul className="space-y-2">
              <li><Link href="/docs/base64" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Base64</Link></li>
              <li><Link href="/docs/hash" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Hash</Link></li>
              <li><Link href="/docs/jwt" className="text-sm text-muted-foreground hover:text-foreground transition-colors">JWT</Link></li>
              <li><Link href="/docs/uuid" className="text-sm text-muted-foreground hover:text-foreground transition-colors">UUID</Link></li>
              <li><Link href="/docs/encrypt" className="text-sm text-muted-foreground hover:text-foreground transition-colors">AES-256 Encrypt</Link></li>
              <li><Link href="/docs/random" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Random Generator</Link></li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.npmjs.com/package/toolmetry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  npm <ExternalLink size={11} />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/toolmetry/toolmetry-npm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub <ExternalLink size={11} />
                </a>
              </li>
              <li>
                <a
                  href="https://toolmetryai.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  ToolmetryAI <ExternalLink size={11} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            Built by ToolmetryAI. Licensed under MIT.
          </p>
          <p className="text-xs text-muted-foreground">
            toolmetry v1.0.3 &middot; 18 modules
          </p>
        </div>
      </div>
    </footer>
  );
}
