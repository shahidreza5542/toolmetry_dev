export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '32px 24px',
      marginTop: '64px',
      background: 'var(--card)',
      transition: 'background-color 0.3s ease',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: '16px', color: 'var(--foreground)' }}>
            Toolmetry <span className="gradient-text">Developer Web</span>
          </div>
          <div style={{ fontSize: '13px', color: 'var(--muted-foreground)', marginTop: '4px' }}>
            Comprehensive developer tools library
          </div>
        </div>
        <div style={{ display: 'flex', gap: '24px', fontSize: '14px' }}>
          <a href="https://www.npmjs.com/package/toolmetry" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--muted-foreground)' }}>npm</a>
          <a href="https://github.com/toolmetryai" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--muted-foreground)' }}>GitHub</a>
          <a href="https://toolmetryai.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--muted-foreground)' }}>ToolmetryAI</a>
        </div>
      </div>
    </footer>
  );
}
