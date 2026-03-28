import { useI18n } from '../i18n/context';

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer style={{ 
      borderTop: '1px solid var(--border)',
      paddingTop: '5vh',
      paddingBottom: '5vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'hidden'
    }} className="container">
      
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '10vh' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: '2rem' }}>
          <li><a href="mailto:hello@example.com" style={{ textTransform: 'uppercase', fontSize: '0.9rem', color: 'var(--text)' }}>{t.footer.email}</a></li>
          <li><a href="#" style={{ textTransform: 'uppercase', fontSize: '0.9rem', color: 'var(--text)' }}>{t.footer.linkedin}</a></li>
          <li><a href="#" style={{ textTransform: 'uppercase', fontSize: '0.9rem', color: 'var(--text)' }}>{t.footer.github}</a></li>
        </ul>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>© 2026</p>
      </div>

      <h1 style={{ 
        fontSize: 'clamp(4rem, 15vw, 22rem)', 
        lineHeight: 0.8,
        whiteSpace: 'nowrap',
        color: 'var(--border-muted)',
        fontFamily: 'var(--font-serif)',
        cursor: 'default',
        transition: 'color 0.4s ease'
      }}
      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text)'}
      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--border-muted)'}
      >
        {t.footer.title}
      </h1>
      
    </footer>
  )
}
