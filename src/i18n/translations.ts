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
      text: "I'm a 3rd-year double major exploring the intersection of software and systems. I haven't locked myself into one niche yet—instead, I learn by building. I leverage AI to accelerate development and ship real-world projects that solve actual problems."
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
          link: "#",
          size: "medium-large",
          images: [
            { src: '/images/ieee/ieee-mockup-1.png', type: 'desktop' },
            { src: '/images/ieee/ieee-mockup-2.png', type: 'desktop' },
            { src: '/images/ieee/ieee-mockup-3.png', type: 'desktop' },
            { src: '/images/ieee/ieee-mockup-4.png', type: 'desktop' }
          ]
        },
        {
          id: 'stealth',
          title: "Stealth AI Suite",
          role: "Systems Architecture",
          description: "Upcoming real-world application focused on automating standard workflows.",
          link: "#",
          size: "medium-small",
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
      text: "Yazılım ve sistemlerin kesiştiği noktayı keşfeden bir 3. sınıf çift anadal öğrencisiyim. Henüz kendimi tek bir alana hapsetmedim—bunun yerine inşa ederek öğreniyorum. Geliştirme sürecini hızlandırmak ve gerçek sorunları çözen projeler ortaya çıkarmak için yapay zekadan yararlanıyorum."
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
          link: "#",
          size: "medium-large",
          images: [
            { src: '/images/ieee/ieee-mockup-1.png', type: 'desktop' },
            { src: '/images/ieee/ieee-mockup-2.png', type: 'desktop' },
            { src: '/images/ieee/ieee-mockup-3.png', type: 'desktop' },
            { src: '/images/ieee/ieee-mockup-4.png', type: 'desktop' }
          ]
        },
        {
          id: 'stealth',
          title: "Gizli Yapay Zeka Paketi",
          role: "Sistem Mimarisi",
          description: "Standart iş akışlarını otomatikleştirmeye odaklanan, gerçek dünyaya yönelik yeni uygulama.",
          link: "#",
          size: "medium-small",
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
