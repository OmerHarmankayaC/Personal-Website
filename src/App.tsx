import { useEffect } from 'react';
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

// Scroll Management Component
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    // If lenis is available globally, use it for immediate scroll
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);
  return null;
}

function MainLayout() {
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
          <ScrollToTop />
          <CustomCursor />
          <AnimatedRoutes />
        </Router>
      </CursorProvider>
    </I18nProvider>
  );
}

export default App;
