export type Language = 'EN' | 'TR';

export const translations = {
  EN: {
    hero: {
      tags: ["SYS.01 // CE-IE", "VER_1.0.0", "39.92N, 32.85E // ANKARA"],
      title: ["ÖMER", "HARMANKAYA"],
      subtitle1: "Engineering Systems. Building Realities.",
      subtitle2: "Computer & Industrial Engineering @ TED University",
      scroll: "Scroll",
      cursor: {
        explore: "Explore",
        back: "Back"
      },
      liveProduct: "See Live Product",
      archive: "Archive",
      projectMeta: {
        year: "Year",
        role: "Role",
        category: "Category",
        platform: "Platform",
        challenge: "The Challenge",
        solution: "The Solution",
        next: "Next Project",
        techStack: "Tech Stack"
      }
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
          featured: true,
          title: "Vera Finance",
          year: "2026",
          category: "Fintech",
          platform: "Web / Mobile",
          role: "Creator",
          description: "Personal finance tracker with built in AI receipt scanning, inventory, goals, assets, and budget tracking.",
          fullDescription: "A personal project driven by the desire to build something genuinely useful. Vera Finance is a comprehensive personal finance tracker featuring AI receipt scanning, inventory management, and income/expense tracking. I am particularly proud that it serves a real-world need and is nearing publication.",
          challenge: "Processing and categorizing thousands of transactions in real-time while maintaining low latency and high accuracy.",
          solution: "Implemented a robust serverless architecture with a specialized vector database for transaction pattern matching and a custom fine-tuned model for financial categorization.",
          link: "https://vera.staticorbit.dev/",
          size: "large",
          images: [
            { src: '/pictures/Vera-Finance/Vera-Landing_Page/Ekran Resmi 2026-03-29 11.57.08.png', type: 'desktop' },
            { src: '/pictures/Vera-Finance/Vera-In_App-screenshots/home_screen.png', type: 'mobile' },
            { src: '/pictures/Vera-Finance/Vera-In_App-screenshots/insights.png', type: 'mobile' },
            { src: '/pictures/Vera-Finance/Vera-In_App-screenshots/assets.png', type: 'mobile' },
            { src: '/pictures/Vera-Finance/Vera-In_App-screenshots/goals.png', type: 'mobile' },
            { src: '/pictures/Vera-Finance/Vera-In_App-screenshots/inventory.png', type: 'mobile' }
          ],
          tags: "Fintech // AI"
        },
        {
          id: 'ieee',
          featured: true,
          title: "IEEE TEDU WEBSITE",
          year: "2026",
          category: "Society / Blog",
          platform: "Web",
          role: "Design / Development",
          description: "An introduction and blog website made for the IEEE TEDU Student Societies.",
          fullDescription: "From my society I noticed that we did not have a dedicated website, so I took the initiative to build one. This platform serves as an introduction and blog for the IEEE TEDU Student Societies. I am extremely proud of its visually attractive, simple, yet highly effective design.",
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
          tags: "Web // Society // Design"
        },
        {
          id: 'hospital-db',
          featured: true,
          title: "Hospital dbms",
          year: "2025",
          category: "Database Systems",
          platform: "Backend / SQL",
          role: "Systems Architecture",
          description: "A database management system for a hypothetical hospital.",
          fullDescription: "Developed as a school project in collaboration with a team, this database management system is designed for a hypothetical hospital utilizing C# and MsSQL. My primary contribution, and what I am most proud of, was designing and creating the entire database schema from the ground up.",
          challenge: "Ensuring strict data integrity and complex relationship mapping across 20+ interconnected tables in a high-concurrency environment.",
          solution: "Designed a multi-layered schema implementing advanced SQL constraints, triggers for automated auditing, and optimized indexing strategies for high-frequency medical record lookups.",
          link: "#",
          size: "medium-small",
          images: [],
          tags: "Database // SQL"
        }
      ]
    },
    footer: {
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub",
      cv: "Download CV",
      title: "LET'S WORK",
      cta: ["Let's build", "something."],
      desc: "I'm open to opportunities, collaborations, and interesting conversations."
    }
  },
  TR: {
    hero: {
      tags: ["SYS.01 // CE-IE", "SÜRÜM_1.0.0", "39.92N, 32.85E // ANKARA"],
      title: ["ÖMER", "HARMANKAYA"],
      subtitle1: "Sistem Mühendisliği. Dijital Gerçeklikler İnşa Etmek.",
      subtitle2: "Bilgisayar ve Endüstri Mühendisliği @ TED Üniversitesi",
      scroll: "Kaydır",
      cursor: {
        explore: "Keşfet",
        back: "Geri"
      },
      liveProduct: "Canlı Ürünü Gör",
      archive: "Çalışmalar",
      projectMeta: {
        year: "YIL",
        role: "ROL",
        category: "KATEGORİ",
        platform: "PLATFORM",
        challenge: "Problem",
        solution: "Çözüm",
        next: "SIRADAKİ PROJE",
        techStack: "Teknoloji Yığını"
      }
    },
    about: {
      title: "Hakkımda",
      text: "Ben Ömer. TED Üniversitesi'nde Bilgisayar Mühendisliği ve Endüstri Mühendisliği öğrencisiyim. Bu iki disiplinin kesişiminde, sistemlerin hem mimarisini inşa etmek hem de bu sistemleri en yüksek verimlilikle optimize etmek üzerine odaklanıyorum.\n\nYapay zekayı sıradan bir araç değil, projelerimin çekirdeğine yerleştirdiğim bir zanaat olarak görüyorum. Bugüne kadar hayata geçirdiğim projeler; aktif bir fintech uygulamasından, bir topluluğun uçtan uca dijital varlığına kadar uzanan, gerçek dünyada değer yaratan somut çıktılardır."
    },
    projects: {
      title: "Seçili Çalışmalar",
      items: [
        {
          id: 'vera',
          featured: true,
          title: "Vera Finance",
          year: "2026",
          category: "Fintech",
          platform: "Web / Mobil",
          role: "Kurucu",
          description: "Dahili yapay zeka fiş tarama, envanter, hedefler, varlıklar ve bütçe takibi içeren kişisel finans uygulaması.",
          fullDescription: "Gerçekten faydalı bir şey inşa etme arzusuyla geliştirilmiş kişisel bir proje. Vera Finance; yapay zeka ile fiş tarama, envanter yönetimi ve gelir/gider takibi sunan kapsamlı bir finans izleyicisidir. Gerçek dünyadaki bir ihtiyaca hizmet etmesinden ve yayınlanmaya çok yakın olmasından büyük gurur duyuyorum.",
          challenge: "Düşük gecikme süresi ve yüksek doğruluk sağlarken binlerce işlemi gerçek zamanlı olarak işlemek ve kategorize etmek.",
          solution: "İşlem kalıbı eşleştirme için özel bir vektör veritabanı ve finansal kategorizasyon için özel olarak eğitilmiş bir model kullanarak sağlam bir sunucusuz mimari uygulandı.",
          link: "https://vera.staticorbit.dev/",
          size: "large",
          images: [
            { src: '/pictures/Vera-Finance/Vera-Landing_Page/Ekran Resmi 2026-03-29 11.57.08.png', type: 'desktop' },
            { src: '/pictures/Vera-Finance/Vera-In_App-screenshots/home_screen.png', type: 'mobile' },
            { src: '/pictures/Vera-Finance/Vera-In_App-screenshots/insights.png', type: 'mobile' },
            { src: '/pictures/Vera-Finance/Vera-In_App-screenshots/assets.png', type: 'mobile' },
            { src: '/pictures/Vera-Finance/Vera-In_App-screenshots/goals.png', type: 'mobile' },
            { src: '/pictures/Vera-Finance/Vera-In_App-screenshots/inventory.png', type: 'mobile' }
          ],
          tags: "Fintech // Yapay Zeka"
        },
        {
          id: 'ieee',
          featured: true,
          title: "IEEE TEDU WEB SİTESİ",
          year: "2026",
          category: "Topluluk / Blog",
          platform: "Web Site",
          role: "Tasarım / Geliştirme",
          description: "IEEE TEDU Öğrenci Toplulukları için hazırlanan, tanıtım ve blog odaklı web sitesi.",
          fullDescription: "Topluluğumuzun dijital bir varlığı olmadığını fark edince inisiyatif alarak bu tanıtım ve blog platformunu geliştirdim. Çıkan sonucun görsel olarak çekici, sade ama oldukça etkili olmasından dolayı gurur duyuyorum.",
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
          tags: "Web // Topluluk // Tasarım"
        },
        {
          id: 'hospital-db',
          featured: true,
          title: "Hospital dbms",
          year: "2025",
          category: "Veritabanı Sistemleri",
          platform: "Backend / SQL",
          role: "Sistem Mimarisi",
          description: "Hipotetik bir hastane için veritabanı yönetim sistemi.",
          fullDescription: "Bir üniversite projesi kapsamında ekip olarak geliştirilen ve C# ile MsSQL kullanan bu veritabanı yönetim sistemi hipotetik bir hastane için tasarlandı. Tüm veritabanı şemasını baştan uca benim oluşturmuş olmam projede en gurur duyduğum kısımdır.",
          challenge: "Çoklu kullanıcı ortamında 20'den fazla birbirine bağlı tabloda katı veri bütünlüğü ve karmaşık ilişki eşlemesi sağlamak.",
          solution: "Gelişmiş SQL kısıtlamaları, otomatik denetim için tetikleyiciler ve yüksek frekanslı tıbbi kayıt aramaları için optimize edilmiş indeksleme stratejileri uygulayan çok katmanlı bir şema tasarlandı.",
          link: "#",
          size: "medium-small",
          images: [],
          tags: "Veritabanı // SQL"
        }
      ]
    },
    footer: {
      email: "E-Posta",
      linkedin: "LinkedIn",
      github: "GitHub",
      cv: "Özgeçmiş İndir",
      title: "BİRLİKTE ÇALIŞALIM",
      cta: ["Hayalindekini", "inşa edelim."],
      desc: "Yeni fırsatlara, iş birliklerine ve ilginç sohbetlere her zaman açığım."
    }
  }
};
