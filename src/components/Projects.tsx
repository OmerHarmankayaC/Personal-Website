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
        {t.projects.items.map((item, idx) => {
          
          const isVera = item.id === 'vera';
          const isIEEE = item.id === 'ieee';
          
          let heroImage: any = null;
          if (item.images && item.images.length > 0) {
             if (isVera) {
               // Prioritize capturing the mobile `home_screen.png` for the vertical sidebar.
               heroImage = item.images.find(i => i.src.includes('home-screen')) || item.images[0];
             } else {
               heroImage = item.images[0];
             }
          }

          return (
            <motion.a 
              key={idx}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: 'easeOut' }}
              whileHover={{ backgroundColor: '#050505' }}
              style={{ 
                position: 'relative',
                gridColumn: item.size === 'large' ? 'span 12' : (item.size === 'medium-large' ? 'span 8' : 'span 4'),
                backgroundColor: '#000000',
                border: '1px solid var(--border)',
                padding: 'clamp(3rem, 6vw, 5rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: item.size === 'large' ? '80vh' : '65vh',
                textDecoration: 'none',
                color: 'var(--text)',
                transition: 'background-color 0.3s ease',
                overflow: 'hidden',
                cursor: 'none'
              }}
            >
              {/* Header Info - Pinned Top Left */}
              <div style={{ position: 'relative', zIndex: 20 }}>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem' }}>{item.role}</p>
                <h3 style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 400 }}>{item.title}</h3>
              </div>
              
              {/* VERA FINANCE: RIGHT-SIDE SPLIT SCREEN (50% WIDTH, 100% HEIGHT) */}
              {isVera && heroImage && (
                <div style={{ position: 'absolute', right: 0, top: 0, width: '50%', height: '100%', overflow: 'hidden', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <motion.img 
                    src={heroImage.src} 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'right center', filter: 'brightness(0.95)' }} 
                  />
                  {/* Subtle fade at the bottom to ensure the overlapping white description text remains highly legible */}
                  <div style={{ position: 'absolute', bottom: 0, right: 0, width: '100%', height: '40%', background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)', pointerEvents: 'none' }} />
                </div>
              )}

              {/* IEEE TEDU: BOTTOM HERO LAYOUT (100% WIDTH, 55% HEIGHT) */}
              {isIEEE && heroImage && (
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '55%', overflow: 'hidden', zIndex: 10, borderTop: '1px solid var(--border)' }}>
                  <motion.img 
                    src={heroImage.src} 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', filter: 'brightness(0.85)' }} 
                  />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '70%', background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)', pointerEvents: 'none' }} />
                </div>
              )}

              {/* Text Description - Explicitly configured z-index to sit ON TOP of the screenshots */}
              <p style={{ 
                maxWidth: '400px', 
                alignSelf: item.size === 'large' ? 'flex-end' : 'flex-start', 
                textAlign: item.size === 'large' ? 'right' : 'left',
                color: 'var(--text)',
                position: 'relative',
                zIndex: 30,
                textShadow: '0 4px 16px rgba(0,0,0,0.9)' // Ensures pop and readability
              }}>
                {item.description}
              </p>
            </motion.a>
          )
        })}
      </div>
    </section>
  )
}
