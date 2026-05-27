'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { tools, categories } from '../../lib/tools-data';

export default function DocsPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = tools.filter(t => {
    const matchesSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat = !activeCategory || t.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '32px 40px', maxWidth: '900px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>Documentation</h1>
          <p style={{ color: 'var(--muted-foreground)', marginBottom: '24px' }}>
            Explore all {tools.length} tools available in the toolmetry package.
          </p>

          {/* Search */}
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Search tools..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                background: 'var(--card)',
                color: 'var(--foreground)',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
            />
          </div>

          {/* Category filter */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <button
              onClick={() => setActiveCategory(null)}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: '1px solid var(--border)',
                background: !activeCategory ? 'var(--primary)' : 'var(--card)',
                color: !activeCategory ? 'white' : 'var(--foreground)',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  border: '1px solid var(--border)',
                  background: activeCategory === cat ? 'var(--primary)' : 'var(--card)',
                  color: activeCategory === cat ? 'white' : 'var(--foreground)',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Tools Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
            {filtered.map(tool => (
              <Link
                key={tool.slug}
                href={`/docs/${tool.slug}`}
                style={{
                  display: 'block',
                  padding: '20px',
                  borderRadius: '12px',
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  textDecoration: 'none',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
              >
                <div style={{
                  display: 'inline-block',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  background: 'var(--accent)',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--primary)',
                  marginBottom: '8px',
                }}>
                  {tool.category}
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--foreground)', marginBottom: '6px' }}>
                  {tool.name}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--muted-foreground)', lineHeight: 1.5 }}>
                  {tool.description.slice(0, 80)}...
                </p>
                <div style={{ fontSize: '12px', color: 'var(--primary)', marginTop: '8px', fontWeight: 500 }}>
                  {tool.functions.length} functions &rarr;
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
