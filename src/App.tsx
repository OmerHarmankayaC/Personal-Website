import { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';
import Archive from './components/Archive';
import CustomCursor from './components/CustomCursor';
import { I18nProvider } from './i18n/context';
import { CursorProvider } from './context/CursorContext';

import { useI18n } from './i18n/context';

// Scroll Management Component
function ScrollManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/') {
      // Restore home scroll position if it exists
      const savedY = sessionStorage.getItem('homeScrollPos');
      if (savedY) {
        // Delay slightly ensures the DOM has painted elements enough to have height
        requestAnimationFrame(() => {
          setTimeout(() => {
            window.scrollTo(0, Number(savedY));
            if ((window as any).lenis) {
              (window as any).lenis.scrollTo(Number(savedY), { immediate: true });
            }
          }, 50);
        });
      } else {
        window.scrollTo(0, 0);
      }
    } else {
      // Always scroll to top for new pages like project details
      window.scrollTo(0, 0);
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(0, { immediate: true });
      }
    }
  }, [pathname]);

  return null;
}

function GlobalLanguageSwitcher() {
  const { lang, setLang } = useI18n();
  const location = useLocation();
  
  if (location.pathname === '/') return null;
  
  return (
    <div style={{
      position: 'fixed',
      bottom: '32px',
      left: 'clamp(16px, 5vw, 32px)',
      zIndex: 100,
      display: 'flex',
      gap: '8px',
      fontSize: '0.75rem',
      fontFamily: 'var(--font-mono)',
      letterSpacing: '0.1em'
    }}>
      <button 
        onClick={() => setLang('TR')} 
        style={{ color: lang === 'TR' ? 'var(--text)' : 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.3s ease', padding: 0 }}
      >
        TR
      </button>
      <span style={{ color: 'var(--border)' }}>/</span>
      <button 
        onClick={() => setLang('EN')} 
        style={{ color: lang === 'EN' ? 'var(--text)' : 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.3s ease', padding: 0 }}
      >
        EN
      </button>
    </div>
  );
}

function MainLayout() {
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Save scroll position when leaving the main page precisely using the buffered reference
    return () => {
      window.removeEventListener('scroll', handleScroll);
      sessionStorage.setItem('homeScrollPos', lastScrollY.current.toString());
    };
  }, []);

  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Footer />
    </main>
  );
}

// Animated Routes Component to force re-render on route changes
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <Routes key={location.pathname} location={location}>
      <Route path="/" element={<MainLayout />} />
      <Route path="/project/:id" element={<ProjectDetail />} />
      <Route path="/archive" element={<Archive />} />
    </Routes>
  );
}

function App() {
  useEffect(() => {
    // Force browser to not restore scroll position
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
    });

    (window as any).lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      (window as any).lenis = null;
    };
  }, []);

  return (
    <I18nProvider>
      <CursorProvider>
        <Router>
          <ScrollManager />
          <CustomCursor />
          <GlobalLanguageSwitcher />
          <AnimatedRoutes />
        </Router>
      </CursorProvider>
    </I18nProvider>
  );
}

export default App;
