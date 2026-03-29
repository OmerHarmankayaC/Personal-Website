import { motion } from 'framer-motion';
import { useI18n } from '../i18n/context';

export default function Projects() {
  const { t } = useI18n();

  // Hospital DB ERD Visual (SVG)
  const HospitalDBVisual = () => (
    <motion.svg 
      viewBox="0 0 400 300" 
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 0.9, 0.5] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
    >
      {/* Table 1 */}
      <rect x="50" y="50" width="100" height="80" rx="2" fill="rgba(240,238,232,0.04)" stroke="rgba(240,238,232,0.2)" strokeWidth="0.8" />
      <line x1="50" y1="70" x2="150" y2="70" stroke="rgba(240,238,232,0.2)" strokeWidth="0.8" />
      <line x1="60" y1="85" x2="140" y2="85" stroke="rgba(240,238,232,0.1)" strokeWidth="0.5" />
      <line x1="60" y1="100" x2="140" y2="100" stroke="rgba(240,238,232,0.1)" strokeWidth="0.5" />
      <line x1="60" y1="115" x2="140" y2="115" stroke="rgba(240,238,232,0.1)" strokeWidth="0.5" />

      {/* Table 2 */}
      <rect x="250" y="80" width="100" height="80" rx="2" fill="rgba(240,238,232,0.04)" stroke="rgba(240,238,232,0.2)" strokeWidth="0.8" />
      <line x1="250" y1="100" x2="350" y2="100" stroke="rgba(240,238,232,0.2)" strokeWidth="0.8" />
      <line x1="260" y1="115" x2="340" y2="115" stroke="rgba(240,238,232,0.1)" strokeWidth="0.5" />
      <line x1="260" y1="130" x2="340" y2="130" stroke="rgba(240,238,232,0.1)" strokeWidth="0.5" />
      <line x1="260" y1="145" x2="340" y2="145" stroke="rgba(240,238,232,0.1)" strokeWidth="0.5" />

      {/* Table 3 */}
      <rect x="150" y="180" width="100" height="80" rx="2" fill="rgba(240,238,232,0.04)" stroke="rgba(240,238,232,0.2)" strokeWidth="0.8" />
      <line x1="150" y1="200" x2="250" y2="200" stroke="rgba(240,238,232,0.2)" strokeWidth="0.8" />
      <line x1="160" y1="215" x2="240" y2="215" stroke="rgba(240,238,232,0.1)" strokeWidth="0.5" />
      <line x1="160" y1="230" x2="240" y2="230" stroke="rgba(240,238,232,0.1)" strokeWidth="0.5" />
      <line x1="160" y1="245" x2="240" y2="245" stroke="rgba(240,238,232,0.1)" strokeWidth="0.5" />

      {/* Connectors */}
      <path d="M 150 90 L 250 90" fill="none" stroke="rgba(240,238,232,0.15)" strokeWidth="0.8" />
      <rect x="148" y="88" width="4" height="4" transform="rotate(45 150 90)" fill="rgba(240,238,232,0.25)" />
      <rect x="248" y="88" width="4" height="4" transform="rotate(45 250 90)" fill="rgba(240,238,232,0.25)" />

      <path d="M 300 160 L 300 220 L 250 220" fill="none" stroke="rgba(240,238,232,0.15)" strokeWidth="0.8" />
      <rect x="298" y="158" width="4" height="4" transform="rotate(45 300 160)" fill="rgba(240,238,232,0.25)" />
      <rect x="248" y="218" width="4" height="4" transform="rotate(45 250 220)" fill="rgba(240,238,232,0.25)" />
    </motion.svg>
  );

  return (
    <section className="container" id="projects" style={{ paddingBottom: '15vh' }}>
      <h2 style={{ 
        color: 'var(--text-muted)', 
        fontSize: '1.4rem', 
        letterSpacing: '0.18em', 
        marginBottom: '4rem',
        paddingLeft: '7vw',
        fontWeight: 600,
        textTransform: 'uppercase'
      }}>{t.projects.title}</h2>
      
      <div className="brutalist-grid" style={{ 
        display: 'grid', 
        gap: '0px' 
      }}>
        {t.projects.items.map((item, idx) => {
          
          const isVera = item.id === 'vera';
          const isIEEE = item.id === 'ieee';
          const isHospital = item.id === 'hospital-db';
          
          let heroImage: any = null;
          if (item.images && item.images.length > 0) {
             if (isVera) {
               heroImage = item.images.find(i => i.src.includes('home-screen')) || item.images[0];
             } else {
               heroImage = item.images[0];
             }
          }

          return (
            <motion.a 
              key={idx}
              href={isHospital ? undefined : item.link}
              target={isHospital ? undefined : "_blank"}
              rel={isHospital ? undefined : "noopener noreferrer"}
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
                justifyContent: isVera ? 'center' : 'space-between',
                minHeight: item.size === 'large' ? '80vh' : '65vh',
                textDecoration: 'none',
                color: 'var(--text)',
                transition: 'background-color 0.3s ease',
                overflow: 'hidden',
                cursor: 'none'
              }}
            >
              {/* VERA FINANCE: SPECIAL LAYOUT */}
              {isVera ? (
                <div style={{ position: 'relative', zIndex: 30, width: '45%', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.12rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem', fontWeight: 600, letterSpacing: '0.18em' }}>{item.role}</p>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 700, marginBottom: '1.5rem', lineHeight: 1, textTransform: 'uppercase' }}>{item.title}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '1rem', opacity: 0.55, marginBottom: '20px', maxWidth: '380px' }}>
                    A personal finance platform with AI-powered receipt scanning and real-time market data. Concept to live product.
                  </p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>{item.tags}</p>
                  
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', marginTop: 'auto' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '0.9rem' }}>View live product →</span>
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ position: 'relative', zIndex: 20 }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.12rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem', fontWeight: 600, letterSpacing: '0.18em' }}>{item.role}</p>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700, textTransform: 'uppercase' }}>{item.title}</h3>
                  </div>

                  <p style={{ 
                    maxWidth: '400px', 
                    alignSelf: item.size === 'large' ? 'flex-end' : 'flex-start', 
                    textAlign: item.size === 'large' ? 'right' : 'left',
                    color: 'var(--text)',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 300,
                    position: 'relative',
                    zIndex: 30,
                    textShadow: '0 4px 16px rgba(0,0,0,0.9)'
                  }}>
                    {item.description}
                  </p>
                  
                  {item.tags && (
                    <p style={{ 
                      position: 'relative', 
                      zIndex: 30, 
                      fontFamily: 'var(--font-mono)', 
                      fontSize: '0.7rem', 
                      color: 'var(--text-muted)',
                      marginTop: '1rem' 
                    }}>
                      {item.tags}
                    </p>
                  )}
                </>
              )}
              
              {/* VISUALS */}
              {isVera && heroImage && (
                <div style={{ position: 'absolute', right: 0, top: 0, width: '50%', height: '100%', overflow: 'hidden', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <motion.img 
                    src={heroImage.src} 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'right center', filter: 'brightness(0.95)' }} 
                  />
                  <div style={{ position: 'absolute', bottom: 0, right: 0, width: '100%', height: '40%', background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)', pointerEvents: 'none' }} />
                </div>
              )}

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

              {isHospital && (
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '60%', height: '70%', overflow: 'hidden', zIndex: 10, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', padding: '2rem' }}>
                  <HospitalDBVisual />
                </div>
              )}
            </motion.a>
          )
        })}
      </div>
    </section>
  )
}
