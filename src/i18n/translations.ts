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
        techStack: "Tech Stack",
        viewCaseStudy: "See Details"
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
      subtitle1: "Sistemleri Tasarlamak. Dijital Gerçeklikler İnşa Etmek.",
      subtitle2: "Bilgisayar & Endüstri Mühendisliği @ TED Üniversitesi",
      scroll: "Kaydır",
      cursor: {
        explore: "Keşfet",
        back: "Geri"
      },
      liveProduct: "Canlı Önizleme",
      archive: "Arşiv",
      projectMeta: {
        year: "Yıl",
        role: "Rol",
        category: "Kategori",
        platform: "Platform",
        challenge: "Mevcut Problem",
        solution: "Çözüm Yaklaşımı",
        next: "Sıradaki Proje",
        techStack: "Kullanılan Teknolojiler",
        viewCaseStudy: "Projeyi İncele"
      }
    },
    about: {
      title: "Hakkımda",
      text: "Ben Ömer. TED Üniversitesi'nde Bilgisayar ve Endüstri Mühendisliği okuyorum — yalnızca akademik bir zorunluluktan değil; sistemlerin en temel seviyede nasıl inşa edildiği ve en uç noktaya kadar nasıl optimize edilebileceği beni gerçekten cezbettiği için. Bence en ilginç ve çözmesi en keyifli problemler tam bu kesişim noktasında ortaya çıkıyor.\n\nProjelerimi hayata geçirirken yapay zekayı günü kurtaran basit bir kısayol olarak değil, temel bir metodoloji, adeta bir zanaat olarak ele alıyorum. Tüm bu çabanın arkasında; aktif bir finans asistanı, koca bir topluluğun uçtan uca dijital vizyonu ve gerçek dünyada insanlar tarafından bizzat kullanılan somut ürünler yatıyor."
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
          description: "Yapay zeka destekli fiş tarama, envanter, hedef, varlık ve bütçe takibi özelliklerine sahip kapsamlı kişisel finans asistanı.",
          fullDescription: "Piyasadaki finans uygulamalarının yetersizliklerinden yola çıkarak, gerçekten işe yarayacak bir ürün ortaya koyma tutkusuyla geliştirdiğim kişisel bir proje. Vera Finance; yapay zeka vizyon modelleriyle saniyeler içinde fişlerinizi dijitalleştiren, akıllı envanter yönetimi ve detaylı gelir-gider takibi sunan bir ekosistem. Özellikle gerçek hayatta bizzat yaşadığımız bir probleme doğrudan teknolojik bir çözüm üretmesi ve artık aktif kullanıma hazır olması projeye olan inancımı artırıyor.",
          challenge: "Binlerce kullanıcının finansal verisini ve mikro işlemini akıcı, gerçek zamanlı bir şekilde işlerken; aynı zamanda yapay zeka operasyonlarındaki doğruluğu maksimumda, gecikme süresini (latency) ise minimumda tutabilmek.",
          solution: "Büyük dil ve vizyon modellerindeki işlem kalıplarını saniyeler içinde analiz edip ayıklayan özel bir vektör veritabanı kuruldu. Finansal verilerin hata payı olmaksızın doğru kategorilere ayrılması için ince ayar (fine-tune) yapılmış modellere dayanan oldukça verimli ve maliyet etkin bir Serverless (sunucusuz) mimari inşa edildi.",
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
          description: "IEEE TEDU Öğrenci Toplulukları için sıfırdan oluşturulmuş resmi tanıtım ve blog platformu.",
          fullDescription: "Topluluğumuzun güçlü bir mühendislik vizyonu olmasına rağmen, bunu yansıtacak dijital bir yüzünün eksik olduğunu fark ettim. Bunun üzerine inisiyatif alıp tüm topluluk komitelerini tek çatı altında toplayan bu tanıtım ve etkinlik platformunu sıfırdan kodladım. Sonucun görsel açıdan oldukça modern, premium ve bir o kadar da sade olması, ortaya çıkardığımız işin başarısını kanıtlar nitelikte.",
          challenge: "Birbirinden farklı 6'dan fazla alt komitenin sürekli ve aktif bir biçimde akıttığı yoğun ve dinamik içeriği ölçeklenebilir bir formatta yönetmek. Aynı zamanda bu veri yoğunluğunu, bilhassa mobil cihazlarda pürüzsüz ve yüksek performanslı bir kullanıcı deneyimi eşliğinde sunabilmek.",
          solution: "Topluluk yöneticilerinin gönderilerini kod yazmadan paylaşabilmesi için Firebase altyapısında gerçek zamanlı, tepkisel (reactive) bir mimari oluşturuldu. Özellikle yüksek çözünürlüklü grafiklerin ve görsel komite kartlarının performans kaybı yaratmaması adına dinamik önbellekleme (caching) ve akıllı imaj optimizasyonları devreye alındı.",
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
          description: "Büyük ölçekli, varsayımsal bir genel hastane modeli için inşa edilmiş kapsamlı ilişkisel veritabanı yönetim ekosistemi.",
          fullDescription: "Bir üniversite bitirme projesi kapsamında ekip olarak geliştirilen bu proje; binlerce personeli, kliniği ve hastayı barındıran hipotetik bir hastanenin uçtan uca altyapısını modellediğimiz dev bir sistem. C# ve MsSQL ekseninde şekillenen bu yapıda tüm veritabanı şemasını en ince ayrıntılarına kadar bizzat tasarlayıp normalize etmiş olmak, arka ucu tamamen ayakta tutmayı sağlayan kritik bir basamaktı ve projenin en başarılı kısımlarından biriydi.",
          challenge: "Aynı anda binlerce doktor ve hastanın aktif işlem yapabileceği bu son derece eşzamanlı (high-concurrency) ekosistemde; 20'yi aşkın iç içe geçmiş tablonun veri yozlaşmasına (data corruption) uğramaması ve karmaşık bağıntı haritasının kusursuz işletilmesini garanti edebilmek.",
          solution: "Veri tutarlılığını sağlamlaştırmak için kapsamlı ve katı SQL kuralları (constraints) devreye sokuldu. İdari takip süreçlerini her işlemde otomatize etmek için dinamik arka plan tetikleyicileri (triggers) programlandı; ve devasa tıbbi arşivlerde saniyelik tarama süreleri elde edebilmek adına çok katmanlı, efektif bir indeksleme algoritması kurgulandı.",
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
      cv: "CV İndir",
      title: "BİRLİKTE ÇALIŞALIM",
      cta: ["Geleceği birlikte", "inşa edelim."],
      desc: "Vizyoner fikirlere, yeni girişimlere, cesur projelere ve ufuk açıcı sohbetlere her zaman açığım."
    }
  }
};
