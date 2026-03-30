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
          year: "2024",
          category: "Fintech",
          platform: "Web / Mobile",
          role: "Fullstack / AI Integration",
          description: "A comprehensive personal finance application leveraging AI for real-time insights.",
          fullDescription: "Vera Finance is a next-generation personal wealth management platform designed to simplify complex financial data. By integrating advanced AI models, Vera provides users with proactive insights, automated categorization, and intelligent budgeting tools that adapt to individual spending patterns.",
          techStack: ["Next.js", "TypeScript", "PostgreSQL", "OpenAI API", "Framer Motion", "Tailwind CSS"],
          challenge: "Processing and categorizing thousands of transactions in real-time while maintaining low latency and high accuracy.",
          solution: "Implemented a robust serverless architecture with a specialized vector database for transaction pattern matching and a custom fine-tuned model for financial categorization.",
          link: "https://vera.staticorbit.dev/",
          size: "large",
          images: [
            { src: '/images/vera/landing.png', type: 'desktop' },
            { src: '/images/vera/app/home-screen.png', type: 'mobile' },
            { src: '/images/vera/app/insights.png', type: 'mobile' },
            { src: '/images/vera/app/assets.png', type: 'mobile' },
            { src: '/images/vera/app/goals.png', type: 'mobile' },
            { src: '/images/vera/app/inventory.png', type: 'mobile' }
          ],
          tags: ""
        },
        {
          id: 'ieee',
          title: "IEEE TEDU WEBSITE",
          year: "2023",
          category: "Society / Community",
          platform: "Web",
          role: "Design / Development",
          description: "Official society web page for the IEEE branch at TED University.",
          fullDescription: "The IEEE TEDU website serves as the primary digital hub for one of the university's most active student branches. It features integrated event management, member portals, and a dynamic committee showcase system designed to improve student engagement and information accessibility.",
          techStack: ["React", "Vite", "Firebase", "Framer Motion", "GSAP"],
          challenge: "Managing a large volume of dynamic content from multiple student committees while ensuring a fast, responsive user experience on mobile devices.",
          solution: "Developed a distributed content architecture using Firebase for real-time updates and optimized asset delivery for high-performance rendering of visual committee cards.",
          link: "https://ieee-tedu.vercel.app/",
          size: "medium-large",
          images: [
            { src: '/images/ieee/ieee-mockup-1.png', type: 'desktop' },
            { src: '/images/ieee/ieee-mockup-2.png', type: 'desktop' },
            { src: '/images/ieee/ieee-mockup-3.png', type: 'desktop' },
            { src: '/images/ieee/ieee-mockup-4.png', type: 'desktop' }
          ],
          tags: ""
        },
        {
          id: 'hospital-db',
          title: "Hospital dbms",
          year: "2023",
          category: "Database Systems",
          platform: "Backend / SQL",
          role: "SYSTEMS ARCHITECTURE",
          description: "Full relational database design for a hospital management platform. Schema architecture, normalization, and constraint enforcement.",
          fullDescription: "A comprehensive database management system designed to handle complex relationships between patients, staff, appointments, and medical records. The project focused on high-integrity data modeling and optimized query performance for critical healthcare operations.",
          techStack: ["PostgreSQL", "SQLAlchemy", "Python", "Normalization (3NF/BCNF)", "ER Modeling"],
          challenge: "Ensuring strict data integrity and complex relationship mapping across 20+ interconnected tables in a high-concurrency environment.",
          solution: "Designed a multi-layered schema implementing advanced SQL constraints, triggers for automated auditing, and optimized indexing strategies for high-frequency medical record lookups.",
          link: "#",
          size: "medium-small",
          images: [],
          tags: ""
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
          year: "2024",
          category: "Fintech",
          platform: "Web / Mobil",
          role: "Fullstack / Yapay Zeka Entegrasyonu",
          description: "Gerçek zamanlı içgörüler için yapay zekadan yararlanan kapsamlı bir kişisel finans uygulaması.",
          fullDescription: "Vera Finance, karmaşık finansal verileri basitleştirmek için tasarlanmış yeni nesil bir kişisel varlık yönetimi platformudur. Gelişmiş yapay zeka modellerini entegre ederek Vera, kullanıcılara bireysel harcama kalıplarına uyum sağlayan proaktif içgörüler, otomatik kategorizasyon ve akıllı bütçeleme araçları sunar.",
          techStack: ["Next.js", "TypeScript", "PostgreSQL", "OpenAI API", "Framer Motion", "Tailwind CSS"],
          challenge: "Düşük gecikme süresi ve yüksek doğruluk sağlarken binlerce işlemi gerçek zamanlı olarak işlemek ve kategorize etmek.",
          solution: "İşlem kalıbı eşleştirme için özel bir vektör veritabanı ve finansal kategorizasyon için özel olarak eğitilmiş bir model kullanarak sağlam bir sunucusuz mimari uygulandı.",
          link: "https://vera.staticorbit.dev/",
          size: "large",
          images: [
            { src: '/images/vera/landing.png', type: 'desktop' },
            { src: '/images/vera/app/home-screen.png', type: 'mobile' },
            { src: '/images/vera/app/insights.png', type: 'mobile' },
            { src: '/images/vera/app/assets.png', type: 'mobile' },
            { src: '/images/vera/app/goals.png', type: 'mobile' },
            { src: '/images/vera/app/inventory.png', type: 'mobile' }
          ],
          tags: ""
        },
        {
          id: 'ieee',
          title: "IEEE TEDU WEB SİTESİ",
          year: "2023",
          category: "Topluluk / Sosyal",
          platform: "Web Site",
          role: "Tasarım / Geliştirme",
          description: "TED Üniversitesi IEEE topluluğunun resmi web sayfası.",
          fullDescription: "IEEE TEDU web sitesi, üniversitenin en aktif öğrenci kollarından biri için birincil dijital merkez olarak hizmet vermektedir. Öğrenci katılımını ve bilgi erişilebilirliğini artırmak için tasarlanmış entegre etkinlik yönetimi, üye portalları ve dinamik bir komite vitrin sistemi içerir.",
          techStack: ["React", "Vite", "Firebase", "Framer Motion", "GSAP"],
          challenge: "Mobil cihazlarda hızlı ve duyarlı bir kullanıcı deneyimi sağlarken, birden fazla öğrenci komitesinden gelen büyük miktarda dinamik içeriği yönetmek.",
          solution: "Gerçek zamanlı güncellemeler için Firebase kullanarak dağıtılmış bir içerik mimarisi geliştirildi ve görsel komite kartlarının yüksek performanslı sunumu için varlık teslimi optimize edildi.",
          link: "https://ieee-tedu.vercel.app/",
          size: "medium-large",
          images: [
            { src: '/images/ieee/ieee-mockup-1.png', type: 'desktop' },
            { src: '/images/ieee/ieee-mockup-2.png', type: 'desktop' },
            { src: '/images/ieee/ieee-mockup-3.png', type: 'desktop' },
            { src: '/images/ieee/ieee-mockup-4.png', type: 'desktop' }
          ],
          tags: ""
        },
        {
          id: 'hospital-db',
          title: "Hospital dbms",
          year: "2023",
          category: "Veritabanı Sistemleri",
          platform: "Backend / SQL",
          role: "SİSTEM MİMARİSİ",
          description: "Bir hastane yönetim platformu için tam ilişkisel veritabanı tasarımı. Şema mimarisi, normalizasyon ve kısıtlama zorlama.",
          fullDescription: "Hastalar, personel, randevular ve tıbbi kayıtlar arasındaki karmaşık ilişkileri yönetmek için tasarlanmış kapsamlı bir veritabanı yönetim sistemi. Proje, yüksek bütünlüklü veri modelleme ve kritik sağlık operasyonları için optimize edilmiş sorgu performansına odaklandı.",
          techStack: ["PostgreSQL", "SQLAlchemy", "Python", "Normalization (3NF/BCNF)", "ER Modeling"],
          challenge: "Çoklu kullanıcı ortamında 20'den fazla birbirine bağlı tabloda katı veri bütünlüğü ve karmaşık ilişki eşlemesi sağlamak.",
          solution: "Gelişmiş SQL kısıtlamaları, otomatik denetim için tetikleyiciler ve yüksek frekanslı tıbbi kayıt aramaları için optimize edilmiş indeksleme stratejileri uygulayan çok katmanlı bir şema tasarlandı.",
          link: "#",
          size: "medium-small",
          images: [],
          tags: ""
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
