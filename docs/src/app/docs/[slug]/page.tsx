import { getToolBySlug, tools } from '../../../lib/tools-data';
import Navbar from '../../../components/Navbar';
import Sidebar from '../../../components/Sidebar';
import Footer from '../../../components/Footer';
import CodeBlock from '../../../components/CodeBlock';
import TryItPanel from '../../../components/TryItPanel';
import Link from 'next/link';

// ✅ Required for output: "export"
export async function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export default function ToolDocPage({
  params,
}: {
  params: { slug: string };
}) {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
        <Navbar />

        <div style={{ padding: '80px 24px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 700 }}>
            Tool not found
          </h1>

          <p
            style={{
              color: 'var(--muted-foreground)',
              marginTop: '12px',
            }}
          >
            The tool &quot;{params.slug}&quot; does not exist.
          </p>

          <Link
            href="/docs"
            style={{
              color: 'var(--primary)',
              marginTop: '16px',
              display: 'inline-block',
            }}
          >
            Back to Docs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
      <Navbar />

      <div style={{ display: 'flex' }}>
        <Sidebar />

        <main
          style={{
            flex: 1,
            padding: '32px 40px',
            maxWidth: '900px',
            overflowY: 'auto',
          }}
        >
          {/* Breadcrumb */}
          <div
            style={{
              fontSize: '13px',
              color: 'var(--muted-foreground)',
              marginBottom: '16px',
            }}
          >
            <Link
              href="/docs"
              style={{
                color: 'var(--primary)',
                textDecoration: 'none',
              }}
            >
              Docs
            </Link>

            <span style={{ margin: '0 8px' }}>/</span>

            <span style={{ color: 'var(--muted-foreground)' }}>
              {tool.category}
            </span>

            <span style={{ margin: '0 8px' }}>/</span>

            <span style={{ color: 'var(--foreground)' }}>
              {tool.name}
            </span>
          </div>

          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <div
              style={{
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: '6px',
                background: 'var(--accent)',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--primary)',
                marginBottom: '12px',
              }}
            >
              {tool.category}
            </div>

            <h1
              style={{
                fontSize: '32px',
                fontWeight: 800,
                marginBottom: '8px',
              }}
            >
              {tool.name}
            </h1>

            <p
              style={{
                fontSize: '16px',
                color: 'var(--muted-foreground)',
                lineHeight: 1.6,
              }}
            >
              {tool.description}
            </p>
          </div>

          {/* Install */}
          <div
            style={{
              padding: '16px 20px',
              borderRadius: '8px',
              background: 'var(--card)',
              border: '1px solid var(--border)',
              marginBottom: '32px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <code
              style={{
                fontFamily: 'monospace',
                fontSize: '14px',
                color: 'var(--primary)',
              }}
            >
              npm i toolmetryai
            </code>
          </div>

          {/* Functions */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                fontSize: '22px',
                fontWeight: 700,
                marginBottom: '20px',
              }}
            >
              Functions
            </h2>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              {tool.functions.map((fn) => (
                <div
                  key={fn.name}
                  style={{
                    padding: '20px',
                    borderRadius: '12px',
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '8px',
                    }}
                  >
                    <code
                      style={{
                        fontFamily: 'monospace',
                        fontSize: '15px',
                        fontWeight: 600,
                        color: 'var(--primary)',
                      }}
                    >
                      {fn.name}
                    </code>

                    <span
                      style={{
                        fontSize: '12px',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: 'var(--accent)',
                        color: 'var(--muted-foreground)',
                      }}
                    >
                      returns: {fn.returns}
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: '14px',
                      color: 'var(--muted-foreground)',
                      marginBottom: '12px',
                    }}
                  >
                    {fn.description}
                  </p>

                  {fn.params.length > 0 && (
                    <div style={{ overflowX: 'auto' }}>
                      <table
                        style={{
                          width: '100%',
                          borderCollapse: 'collapse',
                          fontSize: '13px',
                        }}
                      >
                        <thead>
                          <tr
                            style={{
                              borderBottom: '1px solid var(--border)',
                            }}
                          >
                            <th style={{ padding: '8px 12px', textAlign: 'left' }}>
                              Param
                            </th>

                            <th style={{ padding: '8px 12px', textAlign: 'left' }}>
                              Type
                            </th>

                            <th style={{ padding: '8px 12px', textAlign: 'left' }}>
                              Required
                            </th>

                            <th style={{ padding: '8px 12px', textAlign: 'left' }}>
                              Description
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {fn.params.map((p) => (
                            <tr
                              key={p.name}
                              style={{
                                borderBottom: '1px solid var(--border)',
                              }}
                            >
                              <td
                                style={{
                                  padding: '8px 12px',
                                  fontFamily: 'monospace',
                                  color: 'var(--primary)',
                                }}
                              >
                                {p.name}
                              </td>

                              <td
                                style={{
                                  padding: '8px 12px',
                                  color: 'var(--muted-foreground)',
                                }}
                              >
                                {p.type}
                              </td>

                              <td style={{ padding: '8px 12px' }}>
                                {p.required ? (
                                  <span
                                    style={{
                                      color: '#ef4444',
                                      fontWeight: 600,
                                      fontSize: '12px',
                                    }}
                                  >
                                    Yes
                                  </span>
                                ) : (
                                  <span
                                    style={{
                                      color: 'var(--muted-foreground)',
                                      fontSize: '12px',
                                    }}
                                  >
                                    No
                                    {p.default ? ` (${p.default})` : ''}
                                  </span>
                                )}
                              </td>

                              <td
                                style={{
                                  padding: '8px 12px',
                                  color: 'var(--foreground)',
                                }}
                              >
                                {p.description}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Examples */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                fontSize: '22px',
                fontWeight: 700,
                marginBottom: '20px',
              }}
            >
              Examples
            </h2>

            {tool.examples.map((ex, i) => (
              <div key={i} style={{ marginBottom: '16px' }}>
                <h3
                  style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    marginBottom: '8px',
                    color: 'var(--foreground)',
                  }}
                >
                  {ex.title}
                </h3>

                <CodeBlock code={ex.code} />
              </div>
            ))}
          </section>

          {/* Try It */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                fontSize: '22px',
                fontWeight: 700,
                marginBottom: '20px',
              }}
            >
              Try It
            </h2>

            <TryItPanel toolSlug={tool.slug} />
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}
