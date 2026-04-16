export type Language = 'EN' | 'TR';

export const translations = {
  EN: {
    hero: {
      tags: ["SYS.01 // CMPE-IE", "VER_1.0.0", "39.92N, 32.85E // ANKARA"],
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
        techStack: "Tech Stack",
        viewCaseStudy: "See Details"
      }
    },
    about: {
      title: "About",
      text: "I'm Ömer. I study Computer Engineering and Industrial Engineering at TED University — the combination isn't accidental. I'm genuinely interested in both how systems are built and how they're made to run better. The problems at that intersection are the ones worth solving.\n\nI use AI throughout my work — not as a workaround, but as the actual method. So far that means a live fintech app used by real people, and a website built from scratch for a university society."
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
          description: "Personal finance tracker with AI receipt scanning, goal tracking, asset management, and budget tools.",
          fullDescription: "A personal project built to solve a problem I was actually dealing with. Vera Finance is a finance tracker with AI-powered receipt scanning, inventory management, and income and expense tracking. It started as something I needed and turned into something other people use.",
          challenge: "Processing and categorizing thousands of transactions in real time while keeping peoples data secure and private.",
          solution: "Built a serverless architecture with a specialized database for privacy.",
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
          description: "Official website for the IEEE TEDU Student Branch — built from scratch after I noticed the society had none.",
          fullDescription: "The society had no dedicated website. I noticed, took the initiative, and built one. It serves as an introduction and blog platform for the IEEE TEDU Student Branch, covering all active committees under one place.",
          challenge: "Building a reliable platform for years to come that would look attractive and be easy to maintain.",
          solution: "Designed and developed a responsive, component-driven architecture with a strong focus on visual hierarchy, ensuring an intuitive browsing experience across all device types.",
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
          description: "A relational database management system for a large-scale hypothetical hospital — built as a team project.",
          fullDescription: "A team project built for a university course. The system models the full infrastructure of a hypothetical hospital — thousands of staff, clinics, and patients. Built with C# and MS SQL. My contribution was designing and normalizing the entire database schema from scratch.",
          challenge: "Guaranteeing strict data integrity and accurate relationship mapping across 10+ interconnected tables in a high-concurrency environment.",
          solution: "Designed a multi-layered schema with comprehensive SQL constraints, automated audit triggers, and an optimized indexing strategy for fast medical record lookups at scale.",
          link: "#",
          size: "medium-small",
          images: [],
          tags: "Database // SQL"
        }
      ]
    },
    footer: {
      watermark: "LET'S WORK",
      heading1: "Let's build",
      heading2: "something real.",
      desc: "Open to opportunities, collaborations, and honest conversations about interesting problems.",
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub",
      cv: "Download CV"
    },
    system: {
      aboutBackdrop: "ABOUT",
      ieeeUrl: "ieee.tedu.edu.tr",
      ieeeOverview: "Overview",
      veraSwipe: "Swipe right and left",
      errorNotFound: "Project not found",
      copyright: "© 2026 Ömer Harmankaya"
    }
  },
  TR: {
    hero: {
      tags: ["SYS.01 // CMPE-IE", "VER_1.0.0", "39.92N, 32.85E // ANKARA"],
      title: ["ÖMER", "HARMANKAYA"],
      subtitle1: "Sistemleri Tasarlamak. Gerçeklikleri İnşa Etmek.",
      subtitle2: "Bilgisayar & Endüstri Mühendisliği @ TED Üniversitesi",
      scroll: "Kaydır",
      cursor: {
        explore: "Keşfet",
        back: "Geri"
      },
      liveProduct: "Projeyi İncele",
      archive: "Arşiv",
      projectMeta: {
        year: "Yıl",
        role: "Rol",
        category: "Kategori",
        platform: "Platform",
        challenge: "Zorluk",
        solution: "Çözüm",
        next: "Sıradaki Proje",
        techStack: "Teknoloji",
        viewCaseStudy: "İncele"
      }
    },
    about: {
      title: "Hakkımda",
      text: "Ben Ömer. TED Üniversitesi'nde Bilgisayar ve Endüstri Mühendisliği okuyorum — bu kombinasyon tesadüf değil. Sistemlerin nasıl inşa edildiği ve nasıl daha iyi çalıştırılabileceği beni gerçekten ilgilendiriyor. En ilginç problemler tam bu kesişim noktasında ortaya çıkıyor.\n\nYapay zekayı çalışmalarımın her aşamasında kullanıyorum — bir kısayol olarak değil, temel metodoloji olarak. Şimdiye kadar bunun sonucu: gerçek insanların kullandığı aktif bir finans uygulaması ve bir üniversite topluluğu için sıfırdan inşa edilmiş bir platform."
    },
    projects: {
      title: "Öne Çıkan Çalışmalar",
      items: [
        {
          id: 'vera',
          featured: true,
          title: "Vera Finance",
          year: "2026",
          category: "Fintech",
          platform: "Web / Mobil",
          role: "Kurucu & Geliştirici",
          description: "Yapay zeka destekli fiş tarama, hedef takibi, varlık yönetimi ve bütçe araçlarına sahip kapsamlı kişisel finans asistanı.",
          fullDescription: "Bizzat yaşadığım bir problemi çözmek için başlattığım kişisel proje. Vera Finance; yapay zeka görüntü işlemeyle fiş dijitalleştirme, envanter yönetimi ve gelir-gider takibi sunan bir finans asistanı. Başlangıçta sadece kendi ihtiyacım için geliştirdiğim bir araç, zamanla başkalarının da kullandığı aktif bir ürüne dönüştü.",
          challenge: "Binlerce işlemi gerçek zamanlı olarak işlerken kullanıcı verilerini güvenli ve gizli tutabilmek.",
          solution: "Sunucusuz mimari ile kullanıcı verilerini güvenli ve gizli tutmak.",
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
          title: "IEEE TEDU PLATFORMU",
          year: "2026",
          category: "Topluluk / Blog",
          platform: "Web",
          role: "Tasarım & Geliştirme",
          description: "IEEE TEDU Öğrenci Topluluğu'nun tüm komitelerini tek çatı altında toplayan resmi tanıtım ve blog platformu — topluluk adına inisiyatif alınarak sıfırdan geliştirildi.",
          fullDescription: "Topluluğun dijital bir varlığı yoktu. Fark ettim, inisiyatif aldım ve inşa ettim. Platform; IEEE TEDU'nun tüm aktif komitelerini, etkinliklerini ve içeriklerini tek bir yerde buluşturuyor.",
          challenge: "Uzun yıllar boyunca güvenilir kalacak, görsel olarak çekici ve kolay yönetilebilir bir platform oluşturmak.",
          solution: "Görsel hiyerarşi odaklı, reaktif ve bileşen tabanlı bir mimari tasarlanıp geliştirilerek tüm cihaz tiplerinde sezgisel bir gezinme deneyimi sağlandı.",
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
          title: "Hospital DBMS",
          year: "2025",
          category: "Veritabanı Sistemleri",
          platform: "Backend / SQL",
          role: "Sistem ve Şema Mimarisi",
          description: "Büyük ölçekli, varsayımsal bir hastane altyapısı için inşa edilmiş kapsamlı ilişkisel veritabanı yönetim sistemi — ekip projesi.",
          fullDescription: "Üniversite dersi kapsamında geliştirilen bir ekip projesi. Sistem; binlerce personeli, kliniği ve hastayı barındıran varsayımsal bir hastanenin uçtan uca altyapısını modelliyor. C# ve MS SQL ile geliştirildi. Projedeki katkım, veritabanı şemasının tamamını sıfırdan tasarlamak ve normalize etmekti.",
          challenge: "Yüksek eşzamanlılık (high-concurrency) ortamında 10'dan fazla iç içe tablonun veri bütünlüğünü ve karmaşık bağıntı haritasını koruyabilmek.",
          solution: "Kapsamlı SQL kısıtlamaları (constraints) tanımlandı. İdari süreçleri otomatize eden arka plan tetikleyicileri (triggers) yazıldı. Büyük tıbbi arşivlerde hızlı sorgulama için çok katmanlı indeksleme stratejisi kurgulandı.",
          link: "#",
          size: "medium-small",
          images: [],
          tags: "Veritabanı // SQL"
        }
      ]
    },
    footer: {
      watermark: "BİRLİKTE ÇALIŞALIM",
      heading1: "Birlikte bir şeyler",
      heading2: "inşa edelim.",
      desc: "Vizyoner fikirlere, yeni girişimlere, cesur projelere ve ufuk açıcı sohbetlere her zaman açığım.",
      email: "E-Posta",
      linkedin: "LinkedIn",
      github: "GitHub",
      cv: "CV İndir"
    },
    system: {
      aboutBackdrop: "ABOUT",
      ieeeUrl: "ieee.tedu.edu.tr",
      ieeeOverview: "Genel Bakış",
      veraSwipe: "Sağa ve sola kaydırın",
      errorNotFound: "Proje bulunamadı",
      copyright: "© 2026 Ömer Harmankaya"
    }
  }
};
