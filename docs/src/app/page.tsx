import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { tools, categories } from '../lib/tools-data';
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
      <Navbar />

      {/* Hero */}
      <section style={{
        padding: '80px 24px 60px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, var(--background) 0%, var(--card) 100%)',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-block',
            padding: '6px 16px',
            borderRadius: '999px',
            background: 'var(--accent)',
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--primary)',
            marginBottom: '24px',
          }}>
            v3.0.0 — Now with AES-256 Encryption + Random Generator
          </div>
          <h1 style={{ fontSize: '48px', fontWeight: 800, lineHeight: 1.1, marginBottom: '20px' }}>
            Build Faster with{' '}
            <span className="gradient-text">Toolmetry</span>
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--muted-foreground)', lineHeight: 1.6, maxWidth: '600px', margin: '0 auto 32px' }}>
            A comprehensive developer tools library for JavaScript &amp; TypeScript.
            Base64, hashing, JWT, UUID, AES-256 encryption, random generation, and 18+ utilities in one package.
          </p>

          {/* Install command */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            background: 'var(--code-bg)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '14px 24px',
            marginBottom: '32px',
          }}>
            <span style={{ color: '#94a3b8', fontSize: '14px', fontFamily: 'monospace' }}>$</span>
            <code style={{ color: '#4ade80', fontSize: '15px', fontFamily: 'monospace' }}>npm i toolmetry</code>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/docs" style={{
              padding: '12px 28px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              color: 'white',
              fontWeight: 600,
              fontSize: '15px',
              textDecoration: 'none',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}>
              Read Docs
            </Link>
            <Link href="/playground" style={{
              padding: '12px 28px',
              borderRadius: '8px',
              background: 'var(--card)',
              border: '1px solid var(--border)',
              color: 'var(--foreground)',
              fontWeight: 600,
              fontSize: '15px',
              textDecoration: 'none',
              transition: 'transform 0.2s',
            }}>
              Try Playground
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section style={{ padding: '60px 24px', maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '24px', textAlign: 'center' }}>Quick Start</h2>
        <div style={{
          background: 'var(--code-bg)',
          borderRadius: '12px',
          padding: '24px',
          overflow: 'auto',
        }}>
          <pre style={{ margin: 0, color: 'var(--code-text)', fontSize: '14px', lineHeight: 1.7 }}>
{`const toolmetry = require('toolmetry');

// Base64
const encoded = toolmetry.base64Encode('Hello!');
const decoded = toolmetry.base64Decode(encoded);

// UUID
const id = toolmetry.uuidV4();

// Hash
const hash = toolmetry.hashGenerate('hello world');

// AES-256 Encrypt
const encrypted = toolmetry.aesEncrypt('Secret', 'password');
const decrypted = toolmetry.aesDecrypt(encrypted, 'password');

// Random
const str = toolmetry.randomString(16);
const num = toolmetry.randomInt(1, 100);
const hex = toolmetry.randomHex(32);

// Or destructure only what you need
const { base64Encode, uuidV4, hashGenerate } = require('toolmetry');`}
          </pre>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '40px 24px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '32px', textAlign: 'center' }}>
          {tools.length} Developer Tools, One Package
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px',
        }}>
          {tools.map(tool => (
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
                padding: '4px 10px',
                borderRadius: '6px',
                background: 'var(--accent)',
                fontSize: '11px',
                fontWeight: 600,
                color: 'var(--primary)',
                marginBottom: '10px',
              }}>
                {tool.category}
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--foreground)', marginBottom: '6px' }}>
                {tool.name}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--muted-foreground)', lineHeight: 1.5 }}>
                {tool.description.slice(0, 100)}{tool.description.length > 100 ? '...' : ''}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
