import { M } from "./media";

/*
 * All company services.
 * Each service contains:
 * - English + Arabic content
 * - Capabilities
 * - Related projects
 * - Theme
 * - Media used across the website
 */

export const services = [
  // =========================================================
  // 01 — BRANDING
  // =========================================================
  {
    slug: "branding",
    category: "branding",

    title: {
      en: "Branding",
      ar: "بناء الهوية والعلامة",
    },

    short: {
      en: "Brand",
      ar: "العلامة",
    },

    statement: {
      en: "Building memorable brands with a clear identity, strategy and story.",
      ar: "نبني علامات تجارية مميزة بهوية واستراتيجية وقصة واضحة.",
    },

    capabilities: [
      {
        en: "Brand analysis & market research",
        ar: "تحليل العلامة وبحث السوق",
      },
      {
        en: "Brand strategy",
        ar: "استراتيجية العلامة",
      },
      {
        en: "Naming & visual identity",
        ar: "ابتكار الاسم والهوية البصرية",
      },
      {
        en: "Logo & corporate identity",
        ar: "تصميم الشعار والهوية المؤسسية",
      },
      {
        en: "Rebranding",
        ar: "إعادة بناء وتطوير العلامة",
      },
      {
        en: "Packaging & print design",
        ar: "تصميم التغليف والمطبوعات",
      },
      {
        en: "Brand guidelines",
        ar: "إعداد دليل الهوية البصرية",
      },
    ],

    projects: ["tawlead", "manafesh", "taj-azal", "we-one"],

    theme: {
      bg: "#0c1520",
      fg: "#f6f4ef",
      accent: "#12a594",
      tone: "dark",
    },

    media: [
      M("tawlead/logo"),
      M("frag/manafesh-bag"),
      M("frag/we-one-box"),
    ],

    direction: "left",
  },

  // =========================================================
  // 02 — MARKETING
  // =========================================================
  {
    slug: "marketing",
    category: "marketing",

    title: {
      en: "Digital Marketing",
      ar: "التسويق الرقمي",
    },

    short: {
      en: "Marketing",
      ar: "التسويق",
    },

    statement: {
      en: "Data-driven marketing strategies, content and campaigns built for measurable growth.",
      ar: "استراتيجيات تسويق ومحتوى وحملات مبنية على البيانات لتحقيق نمو قابل للقياس.",
    },

    capabilities: [
      {
        en: "Marketing strategy & planning",
        ar: "الاستراتيجية التسويقية والتخطيط",
      },
      {
        en: "Social media management",
        ar: "إدارة حسابات التواصل الاجتماعي",
      },
      {
        en: "Content strategy & creation",
        ar: "استراتيجية وصناعة المحتوى",
      },
      {
        en: "Paid advertising & media buying",
        ar: "الإعلانات المدفوعة وشراء المساحات الإعلانية",
      },
      {
        en: "Performance marketing",
        ar: "التسويق القائم على الأداء",
      },
      {
        en: "Campaign management",
        ar: "إدارة الحملات التسويقية",
      },
      {
        en: "Influencer marketing",
        ar: "التسويق عبر المؤثرين",
      },
      {
        en: "Analytics & performance reporting",
        ar: "تحليل الأداء والتقارير",
      },
    ],

    projects: ["tricycle", "namar-door", "gerflor", "enigma"],

    theme: {
      bg: "#f0ece4",
      fg: "#101b28",
      accent: "#ff6a1f",
      tone: "light",
    },

    media: [
      M("namar-door/col1"),
      M("gerflor/col3"),
      M("enigma/col2"),
    ],

    direction: "right",
  },

  // =========================================================
  // 03 — MEDIA PRODUCTION
  // =========================================================
  {
    slug: "media-production",
    category: "media",

    title: {
      en: "Media Production",
      ar: "الإنتاج المرئي",
    },

    short: {
      en: "Media",
      ar: "الإنتاج",
    },

    statement: {
      en: "Creative visual production from concept and shooting to editing and final delivery.",
      ar: "إنتاج بصري متكامل من الفكرة والتصوير وحتى المونتاج والتسليم النهائي.",
    },

    capabilities: [
      {
        en: "Creative concepts & moodboards",
        ar: "تطوير الأفكار ولوحات الإلهام",
      },
      {
        en: "Storyboarding & scripting",
        ar: "القصص المصورة وكتابة النصوص",
      },
      {
        en: "Professional photography",
        ar: "التصوير الفوتوغرافي الاحترافي",
      },
      {
        en: "Videography & cinematography",
        ar: "تصوير الفيديو والتصوير السينمائي",
      },
      {
        en: "Video editing & color grading",
        ar: "المونتاج وتصحيح الألوان",
      },
      {
        en: "Motion graphics",
        ar: "الموشن جرافيك",
      },
      {
        en: "Sound design",
        ar: "تصميم وهندسة الصوت",
      },
      {
        en: "Event coverage",
        ar: "تغطية الفعاليات",
      },
    ],

    projects: ["le-gout", "shavery", "88-port", "bistro-catering"],

    theme: {
      bg: "#070b10",
      fg: "#f6f4ef",
      accent: "#ff6a1f",
      tone: "dark",
    },

    media: [
      M("le-gout/top"),
      M("88-port/top"),
      M("shavery/bottom"),
    ],

    direction: "up",
  },

  // =========================================================
  // 04 — EVENT MANAGEMENT
  // =========================================================
  {
    slug: "event-management",
    category: "events",

    title: {
      en: "Event Management",
      ar: "إدارة الفعاليات",
    },

    short: {
      en: "Events",
      ar: "الفعاليات",
    },

    statement: {
      en: "Planning and executing memorable events from concept to final production.",
      ar: "تخطيط وتنفيذ فعاليات متكاملة من الفكرة وحتى الإنتاج النهائي.",
    },

    capabilities: [
      {
        en: "Corporate events",
        ar: "فعاليات الشركات",
      },
      {
        en: "Conferences & exhibitions",
        ar: "المؤتمرات والمعارض",
      },
      {
        en: "Product launches",
        ar: "فعاليات إطلاق المنتجات",
      },
      {
        en: "Grand openings",
        ar: "حفلات الافتتاح",
      },
      {
        en: "Media & PR events",
        ar: "فعاليات الإعلام والعلاقات العامة",
      },
      {
        en: "Private events & celebrations",
        ar: "المناسبات والاحتفالات الخاصة",
      },
    ],

    projects: ["fayya", "radicon", "luini-bakery", "the-city-school"],

    theme: {
      bg: "#0a5a60",
      fg: "#f6f4ef",
      accent: "#ff8a5c",
      tone: "dark",
    },

    media: [
      M("fayya/event-1"),
      M("radicon/event-1"),
      M("luini-bakery/event"),
    ],

    direction: "left",
  },

  // =========================================================
  // 05 — WEB & DIGITAL SOLUTIONS
  // =========================================================
  {
    slug: "digital-solutions",
    category: "digital",

    title: {
      en: "Web Development",
      ar: "تطوير المواقع",
    },

    short: {
      en: "Web",
      ar: "المواقع",
    },

    statement: {
      en: "Fast, responsive and scalable websites designed around your business and your users.",
      ar: "مواقع سريعة ومتجاوبة وقابلة للتوسع مصممة لخدمة أعمالك وتجربة عملائك.",
    },

    capabilities: [
      {
        en: "Corporate websites",
        ar: "مواقع الشركات",
      },
      {
        en: "Landing pages",
        ar: "صفحات الهبوط",
      },
      {
        en: "E-commerce development",
        ar: "تطوير المتاجر الإلكترونية",
      },
      {
        en: "UI/UX design",
        ar: "تصميم واجهات وتجربة المستخدم",
      },
      {
        en: "Responsive development",
        ar: "تطوير متوافق مع جميع الأجهزة",
      },
      {
        en: "Website performance optimization",
        ar: "تحسين سرعة وأداء المواقع",
      },
      {
        en: "Website maintenance & support",
        ar: "صيانة ودعم المواقع",
      },
    ],

    projects: ["tawlead", "beut-almisk", "sumou", "baab-app"],

    theme: {
      bg: "#e6eaee",
      fg: "#101b28",
      accent: "#12a594",
      tone: "light",
    },

    media: [
      M("tawlead/phones"),
      M("tawlead/ios"),
      M("tawlead/billboard"),
    ],

    direction: "right",
  },

  // =========================================================
  // 06 — SOFTWARE DEVELOPMENT
  // =========================================================
  {
    slug: "software-development",
    category: "software",

    title: {
      en: "Software Development",
      ar: "تطوير البرمجيات",
    },

    short: {
      en: "Software",
      ar: "البرمجيات",
    },

    statement: {
      en: "Custom software solutions built around real business processes, performance and scalability.",
      ar: "حلول برمجية مخصصة مبنية حول احتياجات الأعمال الحقيقية والأداء وقابلية التوسع.",
    },

    capabilities: [
      {
        en: "Custom software development",
        ar: "تطوير البرمجيات المخصصة",
      },
      {
        en: "Web applications",
        ar: "تطبيقات الويب",
      },
      {
        en: "Business systems",
        ar: "أنظمة إدارة الأعمال",
      },
      {
        en: "Dashboard development",
        ar: "تطوير لوحات التحكم",
      },
      {
        en: "API development & integrations",
        ar: "تطوير وربط واجهات API",
      },
      {
        en: "Database solutions",
        ar: "حلول قواعد البيانات",
      },
      {
        en: "System integration",
        ar: "تكامل الأنظمة",
      },
      {
        en: "Maintenance & technical support",
        ar: "الصيانة والدعم التقني",
      },
    ],

    projects: [],

    theme: {
      bg: "#101b28",
      fg: "#f6f4ef",
      accent: "#12a594",
      tone: "dark",
    },

    // مؤقتاً بدون صور حتى نضيف صور مشاريع Software حقيقية
    media: [],

    direction: "left",
  },

  // =========================================================
  // 07 — SOFTWARE TESTING & QA
  // =========================================================
  {
    slug: "software-testing",
    category: "software",

    title: {
      en: "Software Testing & QA",
      ar: "اختبار البرمجيات وضمان الجودة",
    },

    short: {
      en: "Testing",
      ar: "الاختبار",
    },

    statement: {
      en: "Testing digital products for reliability, usability, compatibility and performance before they reach your customers.",
      ar: "اختبار المنتجات الرقمية لضمان الجودة وسهولة الاستخدام والتوافق والأداء قبل وصولها إلى العملاء.",
    },

    capabilities: [
      {
        en: "Functional testing",
        ar: "الاختبارات الوظيفية",
      },
      {
        en: "UI/UX testing",
        ar: "اختبار واجهة وتجربة المستخدم",
      },
      {
        en: "Responsive testing",
        ar: "اختبار التوافق مع الأجهزة المختلفة",
      },
      {
        en: "Cross-browser testing",
        ar: "اختبار التوافق مع المتصفحات",
      },
      {
        en: "Performance testing",
        ar: "اختبار الأداء",
      },
      {
        en: "Regression testing",
        ar: "اختبارات الانحدار البرمجي",
      },
      {
        en: "API testing",
        ar: "اختبار واجهات API",
      },
      {
        en: "Quality assurance",
        ar: "ضمان الجودة",
      },
    ],

    projects: [],

    theme: {
      bg: "#f0ece4",
      fg: "#101b28",
      accent: "#ff6a1f",
      tone: "light",
    },

    media: [],

    direction: "right",
  },

  // =========================================================
  // 08 — SEO + AEO + GEO
  // =========================================================
  {
    slug: "search-optimization",
    category: "marketing",

    title: {
      en: "SEO + AEO + GEO",
      ar: "تحسين الظهور في محركات البحث والذكاء الاصطناعي",
    },

    short: {
      en: "Search",
      ar: "الظهور",
    },

    statement: {
      en: "Helping brands become discoverable across search engines, answer engines and AI-powered discovery experiences.",
      ar: "نساعد العلامات التجارية على الظهور في محركات البحث ومحركات الإجابة وتجارب البحث المدعومة بالذكاء الاصطناعي.",
    },

    capabilities: [
      {
        en: "Search Engine Optimization (SEO)",
        ar: "تحسين محركات البحث (SEO)",
      },
      {
        en: "Answer Engine Optimization (AEO)",
        ar: "تحسين محركات الإجابة (AEO)",
      },
      {
        en: "Generative Engine Optimization (GEO)",
        ar: "تحسين الظهور في محركات الذكاء الاصطناعي (GEO)",
      },
      {
        en: "Technical SEO",
        ar: "تحسين SEO التقني",
      },
      {
        en: "On-page SEO",
        ar: "تحسين صفحات الموقع",
      },
      {
        en: "Keyword research",
        ar: "بحث وتحليل الكلمات المفتاحية",
      },
      {
        en: "Content optimization",
        ar: "تحسين المحتوى",
      },
      {
        en: "Search performance analysis",
        ar: "تحليل أداء الظهور والبحث",
      },
    ],

    projects: [],

    theme: {
      bg: "#0a5a60",
      fg: "#f6f4ef",
      accent: "#ff8a5c",
      tone: "dark",
    },

    media: [],

    direction: "up",
  },

  // =========================================================
  // 09 — CONSULTING & TRAINING
  // =========================================================
  {
    slug: "consulting-training",
    category: null,

    title: {
      en: "Consulting & Training",
      ar: "الاستشارات والتدريب",
    },

    short: {
      en: "Consulting",
      ar: "الاستشارات",
    },

    statement: {
      en: "Practical marketing and digital expertise transferred to your business and your team.",
      ar: "خبرات عملية في التسويق والحلول الرقمية ننقلها إلى أعمالك وفريقك.",
    },

    capabilities: [
      {
        en: "Marketing consulting",
        ar: "الاستشارات التسويقية",
      },
      {
        en: "Digital strategy consulting",
        ar: "استشارات الاستراتيجية الرقمية",
      },
      {
        en: "Team training",
        ar: "تدريب فرق العمل",
      },
      {
        en: "Marketing workshops",
        ar: "ورش العمل التسويقية",
      },
      {
        en: "Strategic plans for new projects",
        ar: "إعداد الخطط الاستراتيجية للمشاريع الجديدة",
      },
    ],

    projects: [],

    theme: {
      bg: "#f6f4ef",
      fg: "#101b28",
      accent: "#ff6a1f",
      tone: "light",
    },

    media: [],

    direction: "up",
  },
];

// Fast lookup by service slug
export const serviceBySlug = Object.fromEntries(
  services.map((service) => [service.slug, service])
);