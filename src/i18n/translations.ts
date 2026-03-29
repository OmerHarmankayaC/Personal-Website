export type Language = 'EN' | 'TR';

export const translations = {
  EN: {
    hero: {
      tags: ["SYS.01 // CE-IE", "VER_1.0.0", "39.92N, 32.85E // ANKARA"],
      title: ["ÖMER", "HARMANKAYA"],
      subtitle1: "Engineering Systems. Building Realities.",
      subtitle2: "Computer & Industrial Engineering @ TED University",
      scroll: "Scroll"
    },
    about: {
      title: "About",
      text: "I'm Ömer. Computer Engineering and Industrial Engineering at TED University — not because I had to, but because I'm genuinely drawn to both how systems are built and how they're optimized. The most interesting problems live at that intersection.\n\nI build with AI as a core methodology. Not a shortcut — a craft. The result is work that ships: a live fintech app, a society's entire web presence, products that exist in the real world."
    },
    projects: {
      title: "Selected Works",
      items: [
        {
          id: 'vera',
          title: "Vera Finance",
          role: "Fullstack / AI Integration",
          description: "A comprehensive personal finance application leveraging AI for real-time insights.",
          link: "https://vera.staticorbit.dev/",
          size: "large",
          images: [
            { src: '/images/vera/landing.png', type: 'desktop' },
            { src: '/images/vera/app/home-screen.png', type: 'mobile' },
            { src: '/images/vera/app/insights.png', type: 'mobile' },
            { src: '/images/vera/app/assets.png', type: 'mobile' },
            { src: '/images/vera/app/goals.png', type: 'mobile' },
            { src: '/images/vera/app/inventory.png', type: 'mobile' }
          ]
        },
        {
          id: 'ieee',
          title: "IEEE TEDU",
          role: "Design / Development",
          description: "Official society web page for the IEEE branch at TED University.",
          link: "https://ieee-tedu.vercel.app/",
          size: "medium-large",
          images: [
            { src: '/images/ieee/ieee-mockup-1.png', type: 'desktop' },
            { src: '/images/ieee/ieee-mockup-2.png', type: 'desktop' },
            { src: '/images/ieee/ieee-mockup-3.png', type: 'desktop' },
            { src: '/images/ieee/ieee-mockup-4.png', type: 'desktop' }
          ]
        },
        {
          id: 'hospital-db',
          title: "HOSPITAL DB",
          role: "SYSTEMS ARCHITECTURE",
          description: "Full relational database design for a hospital management platform. Schema architecture, normalization, and constraint enforcement.",
          link: "#",
          size: "medium-small",
          tags: "C# · MS SQL · SCHEMA DESIGN",
          images: []
        }
      ]
    },
    footer: {
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub",
      title: "LET'S WORK"
    }
  },
  TR: {
    hero: {
      tags: ["SYS.01 // CE-IE", "SÜRÜM_1.0.0", "39.92N, 32.85E // ANKARA"],
      title: ["ÖMER", "HARMANKAYA"],
      subtitle1: "Sistem Mühendisliği. Dijital Gerçeklikler İnşa Etmek.",
      subtitle2: "Bilgisayar ve Endüstri Mühendisliği @ TED Üniversitesi",
      scroll: "Kaydır"
    },
    about: {
      title: "Hakkımda",
      text: "Ben Ömer. TED Üniversitesi'nde Bilgisayar Mühendisliği ve Endüstri Mühendisliği okuyorum — zorunda olduğum için değil, sistemlerin nasıl kurulduğuna ve nasıl optimize edildiğine gerçekten ilgi duyduğum için. En ilginç problemler bu kesişim noktasında yaşıyor.\n\nYapay zekayı temel bir metodoloji olarak kullanarak inşa ediyorum. Bir kestirme yol değil — bir zanaat. Sonuç, yayına giren işlerdir: canlı bir fintech uygulaması, bir topluluğun tüm web varlığı, gerçek dünyada var olan ürünler."
    },
    projects: {
      title: "Seçili Çalışmalar",
      items: [
        {
          id: 'vera',
          title: "Vera Finance",
          role: "Fullstack / Yapay Zeka Entegrasyonu",
          description: "Gerçek zamanlı içgörüler için yapay zekadan yararlanan kapsamlı bir kişisel finans uygulaması.",
          link: "https://vera.staticorbit.dev/",
          size: "large",
          images: [
            { src: '/images/vera/landing.png', type: 'desktop' },
            { src: '/images/vera/app/home-screen.png', type: 'mobile' },
            { src: '/images/vera/app/insights.png', type: 'mobile' },
            { src: '/images/vera/app/assets.png', type: 'mobile' },
            { src: '/images/vera/app/goals.png', type: 'mobile' },
            { src: '/images/vera/app/inventory.png', type: 'mobile' }
          ]
        },
        {
          id: 'ieee',
          title: "IEEE TEDU",
          role: "Tasarım / Geliştirme",
          description: "TED Üniversitesi IEEE topluluğunun resmi web sayfası.",
          link: "https://ieee-tedu.vercel.app/",
          size: "medium-large",
          images: [
            { src: '/images/ieee/ieee-mockup-1.png', type: 'desktop' },
            { src: '/images/ieee/ieee-mockup-2.png', type: 'desktop' },
            { src: '/images/ieee/ieee-mockup-3.png', type: 'desktop' },
            { src: '/images/ieee/ieee-mockup-4.png', type: 'desktop' }
          ]
        },
        {
          id: 'hospital-db',
          title: "HASTANE VERİTABANI",
          role: "SİSTEM MİMARİSİ",
          description: "Bir hastane yönetim platformu için tam ilişkisel veritabanı tasarımı. Şema mimarisi, normalizasyon ve kısıtlama zorlama.",
          link: "#",
          size: "medium-small",
          tags: "C# · MS SQL · ŞEMA TASARIMI",
          images: []
        }
      ]
    },
    footer: {
      email: "E-Posta",
      linkedin: "LinkedIn",
      github: "GitHub",
      title: "BİRLİKTE ÇALIŞALIM"
    }
  }
};
