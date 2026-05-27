'use client';

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'var(--background)',
      borderBottom: '1px solid var(--border)',
      backdropFilter: 'blur(12px)',
      transition: 'background-color 0.3s ease',
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 800,
            fontSize: '16px',
          }}>T</div>
          <span style={{ fontWeight: 700, fontSize: '18px', color: 'var(--foreground)' }}>
            Toolmetry <span className="gradient-text" style={{ fontWeight: 600 }}>Developer Web</span>
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link href="/docs" style={{
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--muted-foreground)',
            textDecoration: 'none',
            transition: 'all 0.2s',
          }}>
            Docs
          </Link>
          <Link href="/playground" style={{
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--muted-foreground)',
            textDecoration: 'none',
            transition: 'all 0.2s',
          }}>
            Playground
          </Link>
          <a
            href="https://www.npmjs.com/package/toolmetry"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--muted-foreground)',
              textDecoration: 'none',
            }}
          >
            npm
          </a>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
