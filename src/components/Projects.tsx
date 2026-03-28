import { motion } from 'framer-motion';
import { useI18n } from '../i18n/context';

export default function Projects() {
  const { t } = useI18n();

  return (
    <section className="container" id="projects" style={{ paddingBottom: '15vh' }}>
      <h2 style={{ color: 'var(--text-muted)', fontSize: '1rem', letterSpacing: '0.1em', marginBottom: '4rem' }}>{t.projects.title}</h2>
      
      <div className="brutalist-grid" style={{ 
        display: 'grid', 
        gap: '0px' 
      }}>
        {t.projects.items.map((item, idx) => (
          <motion.a 
            key={idx}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: idx * 0.1, ease: 'easeOut' }}
            whileHover={{ backgroundColor: '#111111' }}
            style={{ 
              gridColumn: item.size === 'large' ? 'span 12' : (item.size === 'medium-large' ? 'span 8' : 'span 4'),
              backgroundColor: 'var(--border-muted)',
              border: '1px solid var(--border)',
              padding: 'clamp(3rem, 6vw, 5rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: item.size === 'large' ? '60vh' : '40vh',
              textDecoration: 'none',
              color: 'var(--text)',
              transition: 'background-color 0.3s ease'
            }}
          >
            <div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem' }}>{item.role}</p>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>{item.title}</h3>
            </div>
            
            <p style={{ 
              maxWidth: '400px', 
              alignSelf: item.size === 'large' ? 'flex-end' : 'flex-start', 
              textAlign: item.size === 'large' ? 'right' : 'left',
              color: 'var(--text)'
            }}>
              {item.description}
            </p>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
