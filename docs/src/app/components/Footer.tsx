import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-muted/20">
      {/* Gradient top border accent */}
      <div className="h-px gradient-bg opacity-40" />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg gradient-bg text-white font-bold text-xs">
                T
              </div>
              <span className="text-sm font-bold gradient-text">Toolmetry</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              18 essential developer tools in one zero-dependency package. Full TypeScript, Node + Browser.
            </p>
          </div>

          {/* Documentation */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Documentation</h3>
            <ul className="space-y-2.5">
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
            <ul className="space-y-2.5">
              <li><Link href="/docs/base64" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Base64</Link></li>
              <li><Link href="/docs/hash" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Hash</Link></li>
              <li><Link href="/docs/jwt" className="text-sm text-muted-foreground hover:text-foreground transition-colors">JWT</Link></li>
              <li><Link href="/docs/encrypt" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Encrypt</Link></li>
              <li><Link href="/docs/uuid" className="text-sm text-muted-foreground hover:text-foreground transition-colors">UUID</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Community</h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://www.npmjs.com/package/toolmetry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  npm <ExternalLink size={11} />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/toolmetry/toolmetry-npm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub <ExternalLink size={11} />
                </a>
              </li>
              <li>
                <a
                  href="https://toolmetryai.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  ToolmetryAI <ExternalLink size={11} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} ToolmetryAI. MIT License.
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            toolmetry v1.0.3 &middot; 18 modules
          </p>
        </div>
      </div>
    </footer>
  );
}
