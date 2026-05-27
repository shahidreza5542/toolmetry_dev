'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { categories, getToolsByCategory } from '../lib/tools-data';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside style={{
      width: '260px',
      minWidth: '260px',
      height: 'calc(100vh - 64px)',
      position: 'sticky',
      top: '64px',
      overflowY: 'auto',
      borderRight: '1px solid var(--sidebar-border)',
      background: 'var(--sidebar-bg)',
      padding: '16px 0',
      transition: 'background-color 0.3s ease, border-color 0.3s ease',
    }}>
      {categories.map(cat => {
        const catTools = getToolsByCategory(cat);
        if (catTools.length === 0) return null;
        return (
          <div key={cat} style={{ marginBottom: '8px' }}>
            <div style={{
              padding: '8px 20px',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--muted-foreground)',
            }}>
              {cat}
            </div>
            {catTools.map(tool => {
              const isActive = pathname === `/docs/${tool.slug}`;
              return (
                <Link
                  key={tool.slug}
                  href={`/docs/${tool.slug}`}
                  style={{
                    display: 'block',
                    padding: '7px 20px 7px 28px',
                    fontSize: '13px',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? 'var(--primary)' : 'var(--foreground)',
                    background: isActive ? 'var(--accent)' : 'transparent',
                    textDecoration: 'none',
                    borderRight: isActive ? '2px solid var(--primary)' : '2px solid transparent',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {tool.name}
                </Link>
              );
            })}
          </div>
        );
      })}
    </aside>
  );
}
