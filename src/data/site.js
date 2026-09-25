// Company facts — all taken from the SAIL Creative profile (2026 edition).
// Source paragraph from the profile, shown in both languages on the About page.
export const companyStatement = {
  en: "SAIL Creative is a SAUDI based company providing innovative marketing & advertisement solutions. Runs by a team that believes in creativity, excellence, and distinctiveness. We’ll Sail together with our clients to the safe shore by assisting with a unique, dedicated & original solutions.",
  ar: "سيل هي شركة سعودية تقدم حلول تسويق وإعلان مبتكرة. يديرها فريق يؤمن بالإبداع والتميز. سنبحر مع عملائنا إلى شاطئ الأمان من خلال المساعدة بحلول فريدة ومخصصة.",
};

export const site = {
  name: "SAIL Creative",
  since: 2020,
  website: "https://www.sail-ksa.com",
  websiteLabel: "www.sail-ksa.com",
  social: {
    instagram: "https://www.instagram.com/sailksa/",
    linkedin: "https://www.linkedin.com/company/sail-ksa/posts/?feedView=all",
    whatsapp: "https://api.whatsapp.com/message/HOD27ZPEG4UZM1?autoload=1&app_absent=0",
  },
};

export const nav = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "work", href: "/work" },
  { key: "events", href: "/events" },
  { key: "contact", href: "/contact" },
];

export const categories = ["branding", "marketing", "media", "events", "digital"];

// The integrated line: one idea carried from strategy to execution.
export const capabilityLine = [
  { en: "Strategy", ar: "الاستراتيجية", note: { en: "Marketing strategy & planning", ar: "الاستراتيجية التسويقية والتخطيط" } },
  { en: "Brand", ar: "العلامة", note: { en: "Name, logo, identity and guidelines", ar: "الاسم والشعار والهوية والدليل الإرشادي" } },
  { en: "Creative", ar: "الإبداع", note: { en: "Creation & design, in print and digital", ar: "الابتكار والتصميم للمطبوع والرقمي" } },
  { en: "Content", ar: "المحتوى", note: { en: "Content & marketing management", ar: "إدارة المحتوى والتسويق" } },
  { en: "Digital", ar: "الرقمي", note: { en: "Websites and mobile apps", ar: "المواقع وتطبيقات الجوال" } },
  { en: "Campaign", ar: "الحملة", note: { en: "Campaigns & public relations", ar: "الحملات والعلاقات العامة" } },
  { en: "Production", ar: "الإنتاج", note: { en: "Photography, video & motion", ar: "التصوير والفيديو والموشن" } },
  { en: "Experience", ar: "التجربة", note: { en: "Events and activations", ar: "الفعاليات والأنشطة" } },
  { en: "Execution", ar: "التنفيذ", note: { en: "Planning, logistics & on-site management", ar: "التخطيط واللوجستيات والإدارة الميدانية" } },
];

// Branding is a journey, not a logo — steps mirror scopes in the portfolio.
export const brandJourney = [
  { en: "Market research", ar: "بحث السوق" },
  { en: "Strategy & positioning", ar: "الاستراتيجية والتموضع" },
  { en: "Naming", ar: "ابتكار الاسم" },
  { en: "Logo & identity", ar: "الشعار والهوية" },
  { en: "Visual system", ar: "النظام البصري" },
  { en: "Applications", ar: "التطبيقات" },
  { en: "Brand guidelines", ar: "دليل العلامة" },
];

// Event journey — capabilities verbatim from the profile's Event Management pages.
export const eventJourney = [
  {
    id: "concept",
    en: "Concept",
    ar: "الفكرة",
    items: [
      { en: "Planning & ideation", ar: "التخطيط والابتكار" },
      { en: "Branding creation and custom marketing strategy", ar: "ابتكار العلامة وخطة تسويقية مخصصة" },
    ],
  },
  {
    id: "planning",
    en: "Planning",
    ar: "التخطيط",
    items: [
      { en: "Budget creation & management", ar: "إعداد الميزانية وإدارتها" },
      { en: "Detailed critical path and timelines", ar: "مسار حرج وجداول زمنية مفصلة" },
      { en: "Social media planning", ar: "تخطيط وسائل التواصل" },
      { en: "Sponsorship packages specific to your event", ar: "باقات رعاية مخصصة لفعاليتك" },
    ],
  },
  {
    id: "design",
    en: "Design",
    ar: "التصميم",
    items: [
      { en: "Floor plan layout and décor planning", ar: "تخطيط المساحات والديكور" },
      { en: "Menu creation specific to your event", ar: "قائمة طعام مخصصة للفعالية" },
      { en: "Speaker and sponsor management", ar: "إدارة المتحدثين والرعاة" },
    ],
  },
  {
    id: "logistics",
    en: "Logistics",
    ar: "اللوجستيات",
    items: [
      { en: "Venue booking and contract negotiation", ar: "حجز المواقع والتفاوض على العقود" },
      { en: "Online registration set up and management", ar: "إعداد التسجيل الإلكتروني وإدارته" },
      { en: "Local professionals: entertainers, photographers, caterers, AV specialists, florists", ar: "شبكة متخصصين محليين: فنانون ومصورون ومقدمو طعام وخبراء صوت وصورة ومنسقو زهور" },
    ],
  },
  {
    id: "execution",
    en: "Execution",
    ar: "التنفيذ",
    items: [
      { en: "Execution of every detail of your event", ar: "تنفيذ كل تفصيلة في فعاليتك" },
      { en: "Stage management", ar: "إدارة المسرح" },
      { en: "Detailed timelines, show flows & MC scripts", ar: "جداول زمنية وسير العرض ونصوص مقدم الحفل" },
    ],
  },
  {
    id: "onsite",
    en: "On-site",
    ar: "في الموقع",
    items: [
      { en: "Onsite set up and day-of management", ar: "التجهيز الميداني وإدارة يوم الحدث" },
      { en: "Volunteer management", ar: "إدارة المتطوعين" },
      { en: "Crowd management", ar: "إدارة الحشود" },
    ],
  },
  {
    id: "post",
    en: "Post-event",
    ar: "ما بعد الحدث",
    items: [
      { en: "Tear down and clean-up", ar: "الفك والتنظيف" },
      { en: "Post event summary and follow up", ar: "ملخص ما بعد الحدث والمتابعة" },
    ],
  },
];

export const eventSpecialties = [
  { en: "Conferences, symposiums & destination meetings", ar: "المؤتمرات والندوات والاجتماعات" },
  { en: "Long service awards & staff recognition events", ar: "جوائز الخدمة الطويلة وفعاليات تكريم الموظفين" },
  { en: "Silent & live auctions", ar: "مزادات صامتة ومباشرة" },
  { en: "Parties & themed events", ar: "المناسبات ذات الطابع الخاص" },
  { en: "Ground breakings & building openings", ar: "مناسبات الافتتاحات الرسمية" },
  { en: "Media & PR events", ar: "أحداث وسائل الإعلام والعلاقات العامة" },
  { en: "Private events & celebrations", ar: "المناسبات والاحتفالات الخاصة" },
];

// Media production phases — from the profile's "Scope of services" page.
export const mediaPhases = [
  {
    id: "pre",
    title: { en: "Pre-Production", ar: "ما قبل الإنتاج" },
    tag: { en: "Vision", ar: "الرؤية" },
    items: [
      { en: "Mood board & concept development", ar: "لوحة الإلهام وتطوير الفكرة" },
      { en: "Storyboarding & scripting", ar: "القصص المصورة وكتابة النصوص" },
      { en: "Location scouting", ar: "استكشاف المواقع" },
      { en: "Talent & styling", ar: "المواهب والتنسيق" },
    ],
  },
  {
    id: "prod",
    title: { en: "Production", ar: "الإنتاج" },
    tag: { en: "Execution", ar: "التنفيذ" },
    items: [
      { en: "Professional photography", ar: "التصوير الفوتوغرافي الاحترافي" },
      { en: "Cinematography & videography", ar: "التصوير السينمائي والفيديو" },
      { en: "Lighting & sound engineering", ar: "هندسة الإضاءة والصوت" },
      { en: "On-site creative direction", ar: "التوجيه الإبداعي في الموقع" },
    ],
  },
  {
    id: "post",
    title: { en: "Post-Production", ar: "ما بعد الإنتاج" },
    tag: { en: "Final polish", ar: "اللمسة الأخيرة" },
    items: [
      { en: "Photo retouching", ar: "معالجة الصور" },
      { en: "Video editing & montage", ar: "المونتاج" },
      { en: "Color grading", ar: "تصحيح الألوان" },
      { en: "Sound design & scoring", ar: "تصميم الصوت والموسيقى" },
      { en: "Motion graphics & VFX", ar: "الموشن جرافيك والمؤثرات" },
    ],
  },
];

export const eventIntro = {
  en: "SAIL Creative is a full service, professional event planning company that specializes in corporate events, dinner galas, fundraisers, long service awards, grand openings, conferences and private events. We handle all details involved with the event process so you can focus on what’s important to you.",
  ar: "سيل كرييتف شركة تخطيط احترافية كاملة الخدمات متخصصة في أحداث الشركات وحفلات العشاء وجمع التبرعات وجوائز الخدمة الطويلة والافتتاح الكبير والمؤتمرات والمناسبات الخاصة. نتعامل مع جميع التفاصيل المتعلقة بعملية الحدث حتى تتمكن من التركيز على ما هو مهم بالنسبة لك.",
};
