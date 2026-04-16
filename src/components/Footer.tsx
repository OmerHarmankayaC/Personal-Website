import { motion } from 'framer-motion';
import { useI18n } from '../i18n/context';
import { useState } from 'react';
import { ArrowUpRight, Download } from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile';

const LinkRow = ({ text, href, icon, id }: { text: string; href: string; icon?: React.ReactNode; id?: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile(1024);
  
  return (
    <a 
      href={href}
      id={id}
      target={href.startsWith('http') ? "_blank" : undefined}
      rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 0',
        borderBottom: `1px solid ${isHovered ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)'}`,
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        width: '100%',
        cursor: isMobile ? 'pointer' : 'none',
        touchAction: 'pan-y'
      }}
    >
      <span style={{ 
        fontFamily: 'var(--font-body)', 
        fontSize: 'clamp(14px, 2vw, 16px)', 
        fontWeight: 400,
        opacity: isHovered || isMobile ? 1 : 0.65,
        transition: 'opacity 0.3s ease',
        color: 'var(--text)'
      }}>
        {text}
      </span>
      <span style={{ 
        display: 'flex',
        alignItems: 'center',
        opacity: isHovered || isMobile ? 1 : 0.4,
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translate(2px, -2px)' : 'none',
        color: 'var(--text)'
      }}>
        {icon || <ArrowUpRight size={20} strokeWidth={1.5} />}
      </span>
    </a>
  );
};

export default function Footer() {
  const { t, lang } = useI18n();
  const isMobile = useIsMobile(1024);
  const isLongTitle = t.footer.watermark.length > 12;
  const fontSize = isLongTitle ? 'clamp(2.5rem, 9.5vw, 16rem)' : 'clamp(4rem, 15vw, 22rem)';
  const bottomOffset = isLongTitle ? '-3.8vw' : '-5vw';
  const liftAmount = isLongTitle ? '-9.2vw' : '-6.5vw';

  return (
    <footer style={{ 
      borderTop: '1px solid var(--border)',
      paddingTop: '25vh',
      paddingBottom: '20vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }} className="container">
      
      {/* Contact Section */}
      <div style={{ 
        position: 'relative', 
        zIndex: 10, 
        marginBottom: '15vh',
        paddingLeft: '7vw' 
      }}>
        <motion.h2 
          initial={{ color: 'rgba(255,255,255,0.1)' }}
          whileInView={{ color: '#ffffff' }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 1.2 }}
          style={{ 
            fontFamily: 'var(--font-display)', 
            fontWeight: 400, 
            fontSize: 'clamp(52px, 8vw, 96px)', 
            lineHeight: 1, 
            letterSpacing: '0.02em',
            marginBottom: '48px',
            textTransform: 'uppercase',
            cursor: isMobile ? 'default' : 'none'
          }}
        >
          {t.footer.heading1}<br />
          <span style={{ fontWeight: 300, letterSpacing: '0.05em', fontFamily: 'var(--font-body)', textTransform: 'uppercase', fontSize: '0.4em', opacity: 0.6 }}>{t.footer.heading2}</span>
        </motion.h2>

        <p style={{ 
          fontFamily: 'var(--font-body)', 
          fontWeight: 300, 
          fontSize: 'clamp(16px, 1.5vw, 19px)', 
          opacity: 0.85, 
          maxWidth: '520px', 
          marginBottom: '56px',
          lineHeight: 1.6,
          color: 'var(--text)'
        }}>
          {t.footer.desc}
        </p>

        <div style={{ maxWidth: '600px', marginTop: '40px' }}>
          <LinkRow text="omr.harmankaya@gmail.com" href="mailto:omr.harmankaya@gmail.com" />
          <LinkRow text="linkedin.com/in/omer-harmankaya" href="https://www.linkedin.com/in/omer-harmankaya" />
          <LinkRow text="github.com/OmerHarmankayaC" href="https://github.com/OmerHarmankayaC" />
          <LinkRow 
            text={t.footer.cv} 
            href={lang === 'TR' ? '/CV-CMPE-TR.pdf' : '/CV-CMPE-ENG.pdf'} 
            icon={<Download size={20} strokeWidth={1.5} />} 
            id="cv-download" 
          />
        </div>
      </div>

      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: 'auto', position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
        <motion.p 
          initial={{ opacity: 0.4 }}
          whileInView={{ opacity: 0 }}
          viewport={{ margin: "-200px" }}
          style={{ 
            color: '#ffffff', 
            fontSize: '0.9rem', 
            fontFamily: 'var(--font-body)', 
            fontWeight: 300,
            pointerEvents: 'none'
          }}
        >
          {t.system.copyright}
        </motion.p>
      </div>

      {/* LET'S WORK Watermark - Scroll Activated */}
      <motion.h1 
        initial={{ y: 0, opacity: 0.05 }}
        whileInView={{ y: liftAmount, opacity: 1 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
        style={{ 
          position: 'absolute',
          bottom: bottomOffset, 
          left: '50%',
          x: '-50%',
          fontSize: fontSize, 
          lineHeight: 0.8,
          whiteSpace: 'nowrap',
          color: '#ffffff',
          fontFamily: 'var(--font-display)',
          fontWeight: 400,
          zIndex: 5, 
          textTransform: 'uppercase',
          letterSpacing: '0.01em',
          cursor: isMobile ? 'default' : 'none',
          pointerEvents: 'none',
          userSelect: 'none',
          willChange: 'transform, opacity'
        }}
      >
        {t.footer.watermark}
      </motion.h1>
      
    </footer>
  )
}
