
import { M } from "./media";

/**
 * Every project comes from the SAIL Creative portfolio (2026 edition).
 * Overviews are tightened rewrites of the profile text — meaning is unchanged.
 * Nothing here is invented: no metrics, no years, no testimonials.
 *
 * layout  → how the project is presented in listings and previews
 * media   → ordered blocks the case-study page turns into scenes
 */
const cols = (base, n = 4) => Array.from({ length: n }, (_, i) => M(`${base}/col${i + 1}`));
const film = (base) => [M(`${base}/top`), M(`${base}/bottom`)];
const t = (en, ar) => ({ en, ar });

export const projects = [
  {
    slug: "tawlead",
    name: t("Tawlead", "Tawlead"),
    client: t("Tawlead", "Tawlead"),
    categories: ["branding", "digital"],
    layout: "board",
    featured: true,
    work: t("Brand Identity", "هوية العلامة"),
    scope: [
      t("Market Research", "بحث السوق"),
      t("Brand Naming", "ابتكار الاسم"),
      t("Logo Creation", "تصميم الشعار"),
      t("Full Visual Identity", "هوية بصرية متكاملة"),
      t("Application Visual Direction", "التوجه البصري للتطبيق"),
      t("Website Design & Development", "تصميم وتطوير الموقع"),
      t("Business Profile", "الملف التعريفي"),
      t("Proposal Design", "تصميم العروض"),
    ],
    overview: t(
      "Starting from a concept only, we built the full identity for a lead-generation platform. The name is a bilingual wordplay: the Arabic “Tawlead”, to generate, meets the English “leads”. The visual identity carries speed, growth and movement through a dynamic logo system, then extends across the app, website and business materials.",
      "انطلقنا من فكرة فقط لنبني الهوية الكاملة لمنصة توليد العملاء المحتملين. الاسم لعبة لغوية ثنائية اللغة: «توليد» بمعناها العربي، مع «leads» بالإنجليزية. تنقل الهوية البصرية السرعة والنمو والحركة عبر نظام شعار ديناميكي، ثم تمتد إلى التطبيق والموقع والمواد التجارية."
    ),
    brand: { bg: "#0d2a2f", fg: "#e3edef", accent: "#ff5b04" },
    swatches: ["#15222b", "#065055", "#ff5b04", "#e3edef"],
    cover: M("tawlead/board"),
    media: [
      { type: "board", img: M("tawlead/board") },
      { type: "collage", imgs: [M("tawlead/billboard"), M("tawlead/phones"), M("tawlead/card"), M("tawlead/ios")] },
      { type: "collage", imgs: [M("tawlead/logo"), M("tawlead/word-dark"), M("tawlead/word-light"), M("tawlead/pattern")] },
    ],
  },
  {
    slug: "shavery",
    name: t("Shavery & Co.", "Shavery & Co."),
    client: t("Shavery & Co. Luxury Salon", "Shavery & Co. Luxury Salon"),
    categories: ["branding", "marketing", "media"],
    layout: "board",
    featured: true,
    work: t("Brand Identity & Marketing", "هوية العلامة والتسويق"),
    scope: [
      t("Market Research", "بحث السوق"),
      t("Logo Creation", "تصميم الشعار"),
      t("Full Visual Identity", "هوية بصرية متكاملة"),
      t("Stationery & Print Materials Design", "تصميم القرطاسية والمطبوعات"),
      t("Packaging", "التغليف"),
      t("Photography & Videography", "التصوير الفوتوغرافي والفيديو"),
      t("Social Media Design & Management", "تصميم وإدارة وسائل التواصل"),
    ],
    overview: t(
      "A complete identity for a luxury men’s salon inspired by a classic, vintage aesthetic. The logo is ornate and hand-crafted, supported by one visual system across stationery, packaging and branded materials. Photography, video and social media design and management keep the premium presence consistent across every touchpoint.",
      "هوية متكاملة لصالون رجالي فاخر مستوحى من الطراز الكلاسيكي العتيق. شعار مزخرف مصنوع بعناية، يدعمه نظام بصري واحد عبر القرطاسية والتغليف والمواد المطبوعة. ويحافظ التصوير والفيديو وتصميم وإدارة وسائل التواصل على حضور فاخر متسق في كل نقطة تواصل."
    ),
    brand: { bg: "#1b0e0e", fg: "#ebcfaa", accent: "#d39956" },
    swatches: ["#130e0e", "#331613", "#82461d", "#d39956", "#ebcfaa"],
    cover: M("shavery/board"),
    media: [
      { type: "board", img: M("shavery/board") },
      { type: "film", rows: film("shavery"), note: t("Photography — moodboard", "التصوير — لوحة الإلهام") },
    ],
  },
  {
    slug: "fayya",
    name: t("Fayya", "Fayya"),
    client: t("Fayya Beauty Salon & Spa", "Fayya Beauty Salon & Spa"),
    categories: ["branding", "marketing", "events"],
    layout: "board",
    featured: true,
    work: t("Brand Identity Enhancement, Social Media & Events", "تطوير الهوية ووسائل التواصل والفعاليات"),
    scope: [
      t("Logo Enhancement", "تطوير الشعار"),
      t("Full Visual Identity Development", "تطوير الهوية البصرية"),
      t("Typography (Arabic & English)", "الخطوط (عربي وإنجليزي)"),
      t("Brand Elements & Patterns", "عناصر العلامة والأنماط"),
      t("Stationery Design", "تصميم القرطاسية"),
      t("Packaging", "التغليف"),
      t("Social Media Design & Management", "تصميم وإدارة وسائل التواصل"),
    ],
    overview: t(
      "We enhanced the existing identity to match the brand’s promise of relaxation and comfort: a softer logo, bilingual typography, custom elements and patterns, extended across stationery and packaging. Social content turns the brand into a sensory experience of care, softness and detail — and printables and events bring it into the room.",
      "طوّرنا الهوية القائمة لتنسجم مع وعد العلامة بالاسترخاء والراحة: شعار أنعم، وخطوط ثنائية اللغة، وعناصر وأنماط مخصصة، ممتدة عبر القرطاسية والتغليف. يحوّل محتوى التواصل العلامة إلى تجربة حسية من العناية والنعومة والتفاصيل، وتنقلها المطبوعات والفعاليات إلى المكان نفسه."
    ),
    brand: { bg: "#2b4a39", fg: "#f9f2e0", accent: "#c8982f" },
    swatches: ["#304738", "#afbf9e", "#c6b2a3", "#af8226", "#f9f2e0"],
    cover: M("fayya/board"),
    media: [
      { type: "board", img: M("fayya/board") },
      { type: "strips", imgs: cols("fayya"), note: t("Social media", "وسائل التواصل") },
      { type: "pano", img: M("fayya/printables"), note: t("Printables", "المطبوعات") },
      { type: "pano", img: M("fayya/winter"), note: t("Winter printables", "مطبوعات الشتاء") },
      { type: "pano", img: M("fayya/event-1"), note: t("Event", "فعالية") },
      { type: "pano", img: M("fayya/event-2"), note: t("Winter event", "فعالية الشتاء") },
      { type: "pano", img: M("fayya/event-3"), note: t("Green event", "الفعالية الخضراء") },
    ],
  },
  {
    slug: "manafesh",
    name: t("Manafesh", "Manafesh"),
    client: t("Manafesh", "Manafesh"),
    categories: ["branding"],
    layout: "board",
    featured: true,
    work: t("Brand Identity", "هوية العلامة"),
    scope: [
      t("Market Research", "بحث السوق"),
      t("Brand Naming", "ابتكار الاسم"),
      t("Logo Creation", "تصميم الشعار"),
      t("Slogan Creation", "صياغة الشعار اللفظي"),
      t("Full Visual Identity", "هوية بصرية متكاملة"),
    ],
    overview: t(
      "Built from the ground up. Market research on positioning, audience and competitors came first, then a distinctive, memorable name and several creative directions for the logo and identity. The result is a playful, engaging brand that stands out in a competitive market and stays simple to recall.",
      "بُنيت العلامة من الصفر. بدأنا ببحث السوق لفهم التموضع والجمهور والمنافسين، ثم ابتكرنا اسماً مميزاً لا يُنسى، وقدمنا عدة اتجاهات إبداعية للشعار والهوية. والنتيجة علامة مرحة وجذابة تتميز في سوق منافس وتبقى بسيطة وسهلة التذكر."
    ),
    brand: { bg: "#3a1a10", fg: "#fdf3dd", accent: "#d8632c" },
    swatches: ["#442118", "#552d23", "#94461f", "#aa5228", "#48401f", "#5e522a", "#796f48", "#877c50"],
    cover: M("manafesh/board"),
    media: [{ type: "board", img: M("manafesh/board") }, { type: "collage", imgs: [M("frag/manafesh-logo"), M("frag/manafesh-bag")] }],
  },
  {
    slug: "tricycle",
    name: t("Tricycle", "Tricycle"),
    client: t("Tricycle", "Tricycle"),
    categories: ["marketing", "media"],
    layout: "strips",
    featured: true,
    work: t("Integrated Marketing", "التسويق المتكامل"),
    scope: [
      t("Social Media Content", "محتوى وسائل التواصل"),
      t("Creative & Marketing Strategies", "الاستراتيجيات الإبداعية والتسويقية"),
      t("Paid Campaigns", "الحملات المدفوعة"),
      t("Photography Sessions", "جلسات التصوير"),
      t("Media Production", "الإنتاج المرئي"),
    ],
    overview: t(
      "A full marketing solution: creative monthly content and marketing plans tailored to the brand’s identity, professional photography sessions to show the products and the atmosphere, and paid campaigns that boosted reach, engagement and in-store visits.",
      "حل تسويقي متكامل: محتوى شهري إبداعي وخطط تسويقية مصممة وفق هوية العلامة، وجلسات تصوير احترافية تُظهر المنتجات والأجواء، وحملات مدفوعة رفعت الوصول والتفاعل والزيارات إلى المتجر."
    ),
    brand: { bg: "#33468a", fg: "#fbe6dc", accent: "#f4b9a8" },
    swatches: ["#33468a", "#f4b9a8", "#d9765a", "#fbe6dc"],
    cover: M("tricycle/col2"),
    media: [{ type: "strips", imgs: cols("tricycle"), note: t("Social media", "وسائل التواصل") }],
  },
  {
    slug: "taj-azal",
    name: t("Taj Azal", "Taj Azal"),
    client: t("Taj Azal Medical Group", "مجموعة تاج أزال الطبية"),
    categories: ["branding"],
    layout: "board",
    featured: false,
    work: t("Brand Identity", "هوية العلامة"),
    scope: [
      t("Logo Creation", "تصميم الشعار"),
      t("Full Visual Identity", "هوية بصرية متكاملة"),
      t("Stationery Design", "تصميم القرطاسية"),
      t("Print Materials", "المواد المطبوعة"),
      t("Packaging", "التغليف"),
    ],
    overview: t(
      "A complete identity for a medical complex specializing in dental and aesthetic services, positioned with a stronger emphasis on dental care and a refined, modern look. The logo pairs a dental-inspired structure with a subtle lotus, symbolizing beauty and care, and the system runs across stationery, print and packaging.",
      "هوية متكاملة لمجمع طبي متخصص في خدمات الأسنان والتجميل، بتموضع يركز أكثر على العناية بالأسنان ومظهر راقٍ وعصري. يجمع الشعار بين بنية مستوحاة من السن وزهرة لوتس خفيفة ترمز إلى الجمال والعناية، ويمتد النظام عبر القرطاسية والمطبوعات والتغليف."
    ),
    brand: { bg: "#17244a", fg: "#f1e3d2", accent: "#e5b275" },
    swatches: ["#192849", "#e5b275", "#a58968", "#5b7293", "#afc4dd", "#494949", "#efefef", "#e8d7c5"],
    cover: M("taj-azal/board"),
    media: [{ type: "board", img: M("taj-azal/board") }],
  },
  {
    slug: "stayin",
    name: t("Stay In", "Stay In"),
    client: t("Stay In Hotels & Resorts", "Stay In Hotels & Resorts"),
    categories: ["branding", "marketing", "media"],
    layout: "board",
    featured: false,
    work: t("Brand Identity & Marketing", "هوية العلامة والتسويق"),
    scope: [
      t("Market Research", "بحث السوق"),
      t("Logo Creation", "تصميم الشعار"),
      t("Full Visual Identity", "هوية بصرية متكاملة"),
      t("Brand Applications", "تطبيقات العلامة"),
      t("Marketing Strategy", "الاستراتيجية التسويقية"),
      t("Photography & Videography", "التصوير الفوتوغرافي والفيديو"),
      t("Social Media Design & Management", "تصميم وإدارة وسائل التواصل"),
    ],
    overview: t(
      "A modern hospitality concept of serviced apartments that combine hotel-level services with privacy and flexibility. Market research defined the positioning, then a distinctive logo and identity system extended across brand applications, marketing strategy, content production and social media management.",
      "مفهوم ضيافة عصري لشقق مخدومة تجمع خدمات الفنادق مع الخصوصية والمرونة. حدد بحث السوق التموضع، ثم صُمم شعار مميز ونظام هوية امتد عبر تطبيقات العلامة والاستراتيجية التسويقية وإنتاج المحتوى وإدارة وسائل التواصل."
    ),
    brand: { bg: "#0a4a78", fg: "#eee1cf", accent: "#e7aa04" },
    swatches: ["#eee1cf", "#92b5d2", "#e7aa04", "#084a78", "#c94a2a", "#4f6021"],
    cover: M("stayin/board"),
    media: [
      { type: "board", img: M("stayin/board") },
      { type: "collage", imgs: [M("frag/stayin-sign")] },
      { type: "film", rows: film("stayin"), note: t("Photography — moodboard", "التصوير — لوحة الإلهام") },
    ],
  },
  {
    slug: "we-one",
    name: t("We One 1", "We One 1"),
    client: t("We One 1", "We One 1"),
    categories: ["branding"],
    layout: "board",
    featured: false,
    work: t("Brand Identity", "هوية العلامة"),
    scope: [
      t("Brand Rebranding", "إعادة بناء العلامة"),
      t("Logo Creation", "تصميم الشعار"),
      t("Full Visual Identity", "هوية بصرية متكاملة"),
      t("Patterns Development", "تطوير الأنماط"),
      t("Stationery Design", "تصميم القرطاسية"),
      t("Print Materials", "المواد المطبوعة"),
      t("Packaging", "التغليف"),
    ],
    overview: t(
      "We rebranded an eyewear brand with plans for future product expansion, building a refined, scalable identity. The logo emphasizes the number “1” as a symbol of leadership and market position, and the system extends into custom patterns, stationery, eyewear boxes, shopping bags and print.",
      "أعدنا بناء علامة نظارات تخطط للتوسع في منتجاتها، بهوية راقية وقابلة للتوسع. يبرز الشعار الرقم «1» رمزاً للريادة والمكانة في السوق، ويمتد النظام إلى أنماط مخصصة وقرطاسية وعلب نظارات وأكياس تسوق ومواد مطبوعة."
    ),
    brand: { bg: "#0f2a3d", fg: "#f3e8d9", accent: "#ec6e22" },
    swatches: ["#ec6e22", "#0b273b", "#63b1d5", "#abcee0", "#f3e8d9", "#ebebeb"],
    cover: M("we-one/board"),
    media: [{ type: "board", img: M("we-one/board") }, { type: "collage", imgs: [M("frag/we-one-box")] }],
  },
  {
    slug: "sumou",
    name: t("Sumou AlHayat", "Sumou AlHayat"),
    client: t("Sumou AlHayat Family Counseling Center", "مركز سمو الحياة للإرشاد الأسري"),
    categories: ["branding", "marketing", "digital"],
    layout: "board",
    featured: false,
    work: t("Brand Identity & Marketing", "هوية العلامة والتسويق"),
    scope: [
      t("Market Research", "بحث السوق"),
      t("Logo Creation", "تصميم الشعار"),
      t("Full Visual Identity", "هوية بصرية متكاملة"),
      t("Stationery & Print Materials Design", "تصميم القرطاسية والمطبوعات"),
      t("Packaging Design", "تصميم التغليف"),
      t("Marketing Strategy", "الاستراتيجية التسويقية"),
      t("Social Media Design & Management", "تصميم وإدارة وسائل التواصل"),
      t("Website Design", "تصميم الموقع"),
    ],
    overview: t(
      "A calm, reassuring identity that reflects trust, care and emotional well-being. It is approachable and supportive, with one system across stationery, print and packaging — complemented by market research, marketing strategy, social media design and management, and a website that keeps the presence consistent, accessible and human-centered.",
      "هوية هادئة ومطمئنة تعكس الثقة والرعاية والصحة النفسية. قريبة وداعمة، بنظام واحد عبر القرطاسية والمطبوعات والتغليف، ويكمّلها بحث السوق والاستراتيجية التسويقية وتصميم وإدارة وسائل التواصل وموقع إلكتروني يحافظ على حضور متسق وسهل الوصول وإنساني."
    ),
    brand: { bg: "#062c4b", fg: "#e6eaee", accent: "#e8c23c" },
    swatches: ["#8fbec3", "#275b80", "#062c4b", "#dcdfe3", "#e8c23c", "#dfb04a"],
    cover: M("sumou/board"),
    media: [{ type: "board", img: M("sumou/board") }],
  },
  {
    slug: "beut-almisk",
    name: t("Beut AlMisk", "Beut AlMisk"),
    client: t("Beut AlMisk Real Estate Development", "بيوت المسك للتطوير العقاري"),
    categories: ["branding", "marketing", "digital"],
    layout: "board",
    featured: false,
    work: t("Branding & Marketing Solutions", "حلول العلامة والتسويق"),
    scope: [
      t("Logo Creation", "تصميم الشعار"),
      t("Full Brand Identity", "هوية علامة متكاملة"),
      t("Business Profile", "الملف التعريفي"),
      t("Website Design & Development", "تصميم وتطوير الموقع"),
      t("Social Media Management", "إدارة وسائل التواصل"),
    ],
    overview: t(
      "A complete brand identity that reflects the vision and modern direction of the project: logo creation, full visual identity and a business profile that carries the brand’s values and offerings. A user-friendly website and social media presence followed, all under one visual direction.",
      "هوية علامة متكاملة تعكس رؤية المشروع واتجاهه العصري: تصميم شعار وهوية بصرية كاملة وملف تعريفي يبرز قيم العلامة وما تقدمه. تبعه موقع إلكتروني سهل الاستخدام وحضور على وسائل التواصل بتوجه بصري موحّد."
    ),
    brand: { bg: "#1f0404", fg: "#eae8dd", accent: "#9b8c87" },
    swatches: ["#230000", "#4c2d2d", "#725b59", "#9b8c87", "#e2e2e0", "#eae8dd", "#596670", "#14332b"],
    cover: M("beut-almisk/board"),
    media: [{ type: "board", img: M("beut-almisk/board") }, { type: "collage", imgs: [M("frag/beut-leaf")] }],
  },
  {
    slug: "afya",
    name: t("AFYA", "AFYA"),
    client: t("AFYA", "عافية"),
    categories: ["branding"],
    layout: "board",
    featured: false,
    work: t("Brand Identity", "هوية العلامة"),
    scope: [
      t("Logo", "الشعار"),
      t("Full Visual Identity", "هوية بصرية متكاملة"),
      t("Color Palette", "لوحة الألوان"),
      t("Typography", "الخطوط"),
      t("Identity Applications", "تطبيقات الهوية"),
    ],
    overview: t(
      "A clean, modern, health-focused identity: the logo, the colour palette, the typography and every application, built as one cohesive and recognizable visual system that supports the brand’s core message.",
      "هوية نظيفة وعصرية تركز على الصحة: الشعار ولوحة الألوان والخطوط وجميع التطبيقات، مبنية كنظام بصري متماسك يسهل التعرف عليه ويدعم رسالة العلامة الأساسية."
    ),
    brand: { bg: "#233d8a", fg: "#f1e8dc", accent: "#5ac5c8" },
    swatches: ["#233d8a", "#5ac5c8", "#cde194", "#f1e8dc"],
    cover: M("afya/board"),
    media: [{ type: "board", img: M("afya/board") }, { type: "collage", imgs: [M("frag/afya-tee")] }],
  },
  {
    slug: "namar-door",
    name: t("Namar Door", "Namar Door"),
    client: t("Namar Door", "نمار"),
    categories: ["marketing"],
    layout: "strips",
    featured: false,
    work: t("Marketing", "التسويق"),
    scope: [
      t("Market Research", "بحث السوق"),
      t("Marketing Strategy", "الاستراتيجية التسويقية"),
      t("Social Media Design & Management", "تصميم وإدارة وسائل التواصل"),
      t("Campaigns Management", "إدارة الحملات"),
      t("Business Profile", "الملف التعريفي"),
    ],
    overview: t(
      "We repositioned Namar Door’s communication from purely sales-driven visuals to a lifestyle direction. The product now sits inside real residential spaces, in warmer wood-inspired tones with turquoise kept as the accent — supported by strategy, social media management and paid campaigns.",
      "أعدنا تموضع تواصل نمار من صور بيعية بحتة إلى توجه أقرب لأسلوب الحياة. يظهر المنتج الآن داخل مساحات سكنية حقيقية بدرجات دافئة مستوحاة من الخشب مع إبقاء التركوازي لوناً مميزاً، بدعم من الاستراتيجية وإدارة وسائل التواصل والحملات المدفوعة."
    ),
    brand: { bg: "#0b5761", fg: "#f4ecdd", accent: "#d1a273" },
    swatches: ["#0b5761", "#d1a273", "#f4ecdd", "#3b2a20"],
    cover: M("namar-door/col1"),
    media: [{ type: "strips", imgs: cols("namar-door"), note: t("Social media", "وسائل التواصل") }],
  },
  {
    slug: "armadio",
    name: t("Armadio", "Armadio"),
    client: t("Armadio", "ارماديو"),
    categories: ["marketing"],
    layout: "board",
    featured: false,
    work: t("Marketing", "التسويق"),
    scope: [
      t("Marketing Strategy", "الاستراتيجية التسويقية"),
      t("Social Media Design & Management", "تصميم وإدارة وسائل التواصل"),
      t("Print Materials", "المواد المطبوعة"),
    ],
    overview: t(
      "Ongoing social media design and management on a tailored marketing approach for a well-established Saudi agency specializing in product development and manufacturing solutions. Print followed: a range of materials including custom-designed, branded playing cards.",
      "تصميم وإدارة مستمرة لوسائل التواصل بنهج تسويقي مخصص لشركة سعودية راسخة متخصصة في تطوير المنتجات وحلول التصنيع. ثم المطبوعات: مجموعة مواد تشمل أوراق لعب مصممة خصيصاً بهوية العلامة."
    ),
    brand: { bg: "#0d3a30", fg: "#eee7da", accent: "#5cc8b8" },
    swatches: ["#0d3a30", "#5cc8b8", "#eee7da", "#0b0b0b"],
    cover: M("armadio/board"),
    media: [
      { type: "board", img: M("armadio/board") },
      { type: "pano", img: M("armadio/box"), note: t("Printables — new-branch box", "المطبوعات — علبة الفرع الجديد") },
      { type: "pano", img: M("armadio/cards-render"), note: t("Custom playing cards", "أوراق لعب مخصصة") },
      { type: "pano", img: M("armadio/cards"), note: t("The full deck", "المجموعة كاملة") },
    ],
  },
  {
    slug: "gerflor",
    name: t("Gerflor", "Gerflor"),
    client: t("Gerflor", "Gerflor"),
    categories: ["marketing"],
    layout: "strips",
    featured: false,
    work: t("Marketing", "التسويق"),
    scope: [
      t("Marketing Strategy", "الاستراتيجية التسويقية"),
      t("Social Media Design & Management", "تصميم وإدارة وسائل التواصل"),
    ],
    overview: t(
      "We managed Gerflor’s social media presence across the Middle East with a strategy that reflects the brand’s global position in high-quality flooring. The focus: translating technical product strengths into clear, engaging content that speaks to both performance and design, across commercial and residential settings.",
      "أدرنا حضور Gerflor على وسائل التواصل في الشرق الأوسط باستراتيجية تعكس مكانة العلامة العالمية في الأرضيات عالية الجودة. التركيز على ترجمة نقاط القوة التقنية للمنتج إلى محتوى واضح وجذاب يخاطب الأداء والتصميم معاً، في البيئات التجارية والسكنية."
    ),
    brand: { bg: "#0b1c5c", fg: "#f1efe9", accent: "#d2b48c" },
    swatches: ["#0b1c5c", "#d2b48c", "#f1efe9"],
    cover: M("gerflor/col3"),
    media: [{ type: "strips", imgs: cols("gerflor"), note: t("Social media", "وسائل التواصل") }],
  },
  {
    slug: "gulf-cattle",
    name: t("Gulf Cattle", "Gulf Cattle"),
    client: t("Gulf Cattle", "المواشي الخليجية"),
    categories: ["marketing", "media"],
    layout: "strips",
    featured: false,
    work: t("Marketing", "التسويق"),
    scope: [
      t("Social Media Design & Management", "تصميم وإدارة وسائل التواصل"),
      t("Print Materials", "المواد المطبوعة"),
      t("Campaigns Management", "إدارة الحملات"),
      t("Brand Identity Guidelines", "دليل هوية العلامة"),
      t("Photography & Videography", "التصوير الفوتوغرافي والفيديو"),
    ],
    overview: t(
      "Social media built around freshness, cleanliness and premium quality — the attributes that drive trust when buying fresh meat. A cold, clean, hygienic visual direction reinforces quality, while cooking applications and serving suggestions make the offer relatable, desirable and engaging.",
      "محتوى تواصل قائم على الطزاجة والنظافة والجودة العالية، وهي عوامل الثقة عند شراء اللحوم الطازجة. يعزز التوجه البصري البارد والنظيف والصحي انطباع الجودة، بينما تجعل تطبيقات الطهي واقتراحات التقديم العرض أقرب للجمهور وأكثر جاذبية وتفاعلاً."
    ),
    brand: { bg: "#24382e", fg: "#f5efe6", accent: "#e2472a" },
    swatches: ["#24382e", "#e2472a", "#f5efe6"],
    cover: M("gulf-cattle/col1"),
    media: [
      { type: "strips", imgs: cols("gulf-cattle"), note: t("Social media", "وسائل التواصل") },
      { type: "film", rows: film("gulf-cattle"), note: t("Photography — moodboard", "التصوير — لوحة الإلهام") },
    ],
  },
  {
    slug: "carte-restaurant",
    name: t("Cart Restaurant", "Cart Restaurant"),
    client: t("Cart Restaurant", "Cart Restaurant"),
    categories: ["marketing", "media"],
    layout: "strips",
    featured: false,
    work: t("Marketing", "التسويق"),
    scope: [
      t("Visual Identity Development", "تطوير الهوية البصرية"),
      t("Social Media Design & Management", "تصميم وإدارة وسائل التواصل"),
      t("Photography & Videography", "التصوير الفوتوغرافي والفيديو"),
      t("Production", "الإنتاج"),
      t("Print Materials", "المواد المطبوعة"),
    ],
    overview: t(
      "We refined the visual identity by simplifying the logo system — removing gradients and converting it into a clean, stroke-based mark — and built supporting elements for consistency across touchpoints. A dedicated photo and video shoot and managed social media elevate the dishes through premium visual storytelling.",
      "صقلنا الهوية البصرية بتبسيط نظام الشعار وإزالة التدرجات وتحويله إلى علامة نظيفة قائمة على الخطوط، وطورنا عناصر داعمة لتحقيق الاتساق في كل نقطة تواصل. وتسمو الأطباق عبر جلسة تصوير فوتوغرافي وفيديو مخصصة وإدارة لوسائل التواصل بسرد بصري فاخر."
    ),
    brand: { bg: "#4a1414", fg: "#f6ecdc", accent: "#d3a04a" },
    swatches: ["#4a1414", "#d3a04a", "#f6ecdc"],
    cover: M("carte-restaurant/col1"),
    media: [
      { type: "strips", imgs: cols("carte-restaurant"), note: t("Social media", "وسائل التواصل") },
      { type: "pano", img: M("carte-restaurant/printables"), note: t("Printables", "المطبوعات") },
      { type: "film", rows: film("carte-restaurant"), note: t("Photography — moodboard", "التصوير — لوحة الإلهام") },
    ],
  },
  {
    slug: "baab-app",
    name: t("Baab App", "Baab App"),
    client: t("Baab App", "باب"),
    categories: ["marketing"],
    layout: "strips",
    featured: false,
    work: t("Marketing", "التسويق"),
    scope: [
      t("Social Media Design & Management", "تصميم وإدارة وسائل التواصل"),
      t("Marketing Strategy", "الاستراتيجية التسويقية"),
    ],
    overview: t(
      "Social media for an app presented as a complete recruitment and career support tool for job seekers and business owners. The direction is clean, modern and tech-oriented, and the content stays on user benefits and the practical use of each feature.",
      "محتوى تواصل لتطبيق يُقدَّم كأداة متكاملة للتوظيف ودعم المسار المهني للباحثين عن عمل وأصحاب الأعمال. التوجه نظيف وعصري وتقني، والمحتوى يركز على فوائد المستخدم والاستخدام العملي لكل ميزة."
    ),
    brand: { bg: "#1477b3", fg: "#ffffff", accent: "#ffa85a" },
    swatches: ["#22aee0", "#b4a0e8", "#ffa85a", "#ffffff"],
    cover: M("baab-app/col2"),
    media: [{ type: "strips", imgs: cols("baab-app"), note: t("Social media", "وسائل التواصل") }],
  },
  {
    slug: "enigma",
    name: t("Enigma", "Enigma"),
    client: t("Enigma", "Enigma"),
    categories: ["marketing"],
    layout: "strips",
    featured: false,
    work: t("Marketing", "التسويق"),
    scope: [
      t("Social Media Design & Management", "تصميم وإدارة وسائل التواصل"),
      t("Marketing Strategy", "الاستراتيجية التسويقية"),
    ],
    overview: t(
      "Social media for an AI-powered experiential solutions provider specializing in interactive digital experiences for events and activations. Structured content planning translates complex technology into clear, engaging content about innovation, interactivity and audience participation.",
      "محتوى تواصل لمزوّد حلول تجريبية مدعومة بالذكاء الاصطناعي متخصص في التجارب الرقمية التفاعلية للفعاليات والأنشطة. يترجم تخطيط المحتوى المنظم التقنية المعقدة إلى محتوى واضح وجذاب حول الابتكار والتفاعل ومشاركة الجمهور."
    ),
    brand: { bg: "#3f1a6a", fg: "#f6f0ff", accent: "#7fd7ec" },
    swatches: ["#3f1a6a", "#7a3fb0", "#7fd7ec", "#f6f0ff"],
    cover: M("enigma/col2"),
    media: [{ type: "strips", imgs: cols("enigma"), note: t("Social media", "وسائل التواصل") }],
  },
  {
    slug: "bella-center",
    name: t("Bella Center", "Bella Center"),
    client: t("Bella Physical Therapy Center", "Bella Physical Therapy Center"),
    categories: ["marketing"],
    layout: "strips",
    featured: false,
    work: t("Marketing", "التسويق"),
    scope: [
      t("Social Media Design & Management", "تصميم وإدارة وسائل التواصل"),
      t("Marketing Strategy", "الاستراتيجية التسويقية"),
      t("Print Materials", "المواد المطبوعة"),
    ],
    overview: t(
      "Social media built on a clear, structured visual identity that reflects the brand’s position in beauty and aesthetic services. Treatments and services are shown in a clean, professional and informative way — results, procedures and before-and-after transformations that strengthen trust and credibility.",
      "محتوى تواصل مبني على هوية بصرية واضحة ومنظمة تعكس مكانة العلامة في خدمات التجميل. تُعرض العلاجات والخدمات بأسلوب نظيف ومهني وتعريفي — النتائج والإجراءات والتحولات قبل وبعد — بما يعزز الثقة والمصداقية."
    ),
    brand: { bg: "#0b6d61", fg: "#f2fbf8", accent: "#7ddfc8" },
    swatches: ["#0b6d61", "#12b39a", "#7ddfc8", "#f2fbf8"],
    cover: M("bella-center/col1"),
    media: [{ type: "strips", imgs: cols("bella-center"), note: t("Social media", "وسائل التواصل") }],
  },
  {
    slug: "luini-bakery",
    name: t("Luini Bakery", "Luini Bakery"),
    client: t("Luini Bakery", "Luini Bakery"),
    categories: ["events", "marketing"],
    layout: "pano",
    featured: false,
    work: t("Event Management & Printables", "إدارة الفعاليات والمطبوعات"),
    scope: [
      t("Opening Invitations", "دعوات الافتتاح"),
      t("Influencers & Advertisers Organization", "تنظيم المؤثرين والمعلنين"),
      t("Croissant-Shaped Stand", "منصة على شكل كرواسون"),
      t("Mirror Stickers", "ملصقات المرايا"),
      t("Outdoor Stickers", "ملصقات خارجية"),
      t("Logo-shaped Light", "إضاءة بشكل الشعار"),
    ],
    overview: t(
      "An opening treated as an experience: invitations, an organised guest list of influencers and advertisers, a croissant-shaped stand, mirror and outdoor stickers, and a logo-shaped light that washes the façade in colour. The printables carry the same purple world into menus, flyers and floor stickers.",
      "افتتاح صُمم كتجربة: دعوات وتنظيم لقائمة ضيوف من المؤثرين والمعلنين، ومنصة على شكل كرواسون، وملصقات للمرايا والواجهة، وإضاءة بشكل الشعار تصبغ الواجهة بالألوان. وتنقل المطبوعات العالم البنفسجي نفسه إلى القوائم والنشرات وملصقات الأرضيات."
    ),
    brand: { bg: "#3e2a72", fg: "#f4eefc", accent: "#d7b07a" },
    swatches: ["#3e2a72", "#6d4b9c", "#d7b07a", "#cfe5e8"],
    cover: M("luini-bakery/event"),
    media: [
      { type: "pano", img: M("luini-bakery/event"), note: t("Opening event", "افتتاح الفعالية") },
      { type: "pano", img: M("luini-bakery/printables"), note: t("Printables", "المطبوعات") },
    ],
  },
  {
    slug: "chayt",
    name: t("Chayt", "Chayt"),
    client: t("Chayt", "Chayt"),
    categories: ["marketing"],
    layout: "pano",
    featured: false,
    work: t("Printables", "المطبوعات"),
    scope: [
      t("Paper Cups", "أكواب ورقية"),
      t("Sticker Sheet", "ورقة ملصقات"),
      t("Tea Tags", "بطاقات الشاي"),
      t("Pizza Box", "علبة البيتزا"),
    ],
    overview: t(
      "Packaging and printables set in an illustrated winter world: paper cups with dielines, a sticker sheet, tea-bag tags and a pizza box — drawn, engineered and shown in use.",
      "تغليف ومطبوعات في عالم شتوي مرسوم: أكواب ورقية مع مخططات القص، وورقة ملصقات، وبطاقات الشاي، وعلبة بيتزا — مرسومة ومصممة هندسياً ومعروضة أثناء الاستخدام."
    ),
    brand: { bg: "#1f4636", fg: "#f0eadb", accent: "#e9c9b0" },
    swatches: ["#1f4636", "#5a0a2a", "#b9cfdc", "#f0eadb"],
    cover: M("chayt/board"),
    media: [{ type: "pano", img: M("chayt/board") }],
  },
  {
    slug: "ramadan-duas",
    name: t("Ramadan Duas", "Ramadan Duas"),
    client: t("SAIL Creative", "سيل"),
    categories: ["marketing"],
    layout: "pano",
    featured: false,
    work: t("Printables", "المطبوعات"),
    scope: [
      t("Illustrated Card Set", "مجموعة بطاقات مرسومة"),
      t("Box Packaging", "علبة التغليف"),
      t("Display Cards", "بطاقات العرض"),
    ],
    overview: t(
      "A set of Ramadan supplication cards in red, blue and olive, each with a palm-and-tent illustration, packed in a matching box and shown as display cards.",
      "مجموعة بطاقات أدعية رمضانية بألوان الأحمر والأزرق والزيتي، لكل منها رسم للنخيل والخيمة، مع علبة تغليف متناسقة وبطاقات عرض."
    ),
    brand: { bg: "#2c3d8a", fg: "#f6e6d0", accent: "#f0a040" },
    swatches: ["#2c3d8a", "#9a1e26", "#7a7a2a", "#f6e6d0"],
    cover: M("sail-ramadan-duas/board"),
    media: [{ type: "pano", img: M("sail-ramadan-duas/board") }],
  },
  {
    slug: "le-gout",
    name: t("Le Goût", "Le Goût"),
    client: t("Le Goût Chocolatier", "Le Goût Chocolatier"),
    categories: ["media"],
    layout: "film",
    featured: false,
    work: t("Photography", "التصوير الفوتوغرافي"),
    scope: [t("Moodboard", "لوحة الإلهام"), t("Storyboard", "القصة المصورة"), t("Photography", "التصوير الفوتوغرافي")],
    overview: t(
      "Product photography for a chocolatier, planned from a moodboard and storyboard: deep burgundy grounds, gold details, macro textures and gift boxes staged as small still lifes.",
      "تصوير منتجات لصانع شوكولاتة، خُطط انطلاقاً من لوحة إلهام وقصة مصورة: خلفيات بورغندي عميقة وتفاصيل ذهبية وقوام قريب وعلب هدايا مُنسّقة كطبيعة صامتة."
    ),
    brand: { bg: "#5c1230", fg: "#f8e8e0", accent: "#e7b7b0" },
    swatches: ["#5c1230", "#a02a4c", "#e7b7b0", "#f8e8e0"],
    cover: M("le-gout/top"),
    media: [{ type: "film", rows: film("le-gout"), note: t("Photography — moodboard & storyboard", "التصوير — لوحة الإلهام والقصة المصورة") }],
  },
  {
    slug: "88-port",
    name: t("88 Port", "88 Port"),
    client: t("88 Port Burger", "٨٨ بورت برجر"),
    categories: ["media"],
    layout: "film",
    featured: false,
    work: t("Photography", "التصوير الفوتوغرافي"),
    scope: [t("Moodboard", "لوحة الإلهام"), t("Photography", "التصوير الفوتوغرافي")],
    overview: t(
      "Photography for a burger concept, planned from a moodboard: heat, gloss and shadow — dark plates, sauce pours, steam off the grill and branded packaging.",
      "تصوير لمفهوم برجر، خُطط من لوحة إلهام: حرارة ولمعان وظلال — أطباق داكنة وصلصات تُسكب وبخار من الشواية وتغليف بهوية العلامة."
    ),
    brand: { bg: "#120d0d", fg: "#f4ece6", accent: "#d63a3a" },
    swatches: ["#120d0d", "#d63a3a", "#f4ece6"],
    cover: M("88-port/top"),
    media: [{ type: "film", rows: film("88-port"), note: t("Photography — moodboard", "التصوير — لوحة الإلهام") }],
  },
  {
    slug: "alkhaleej",
    name: t("Alkhaleej", "Alkhaleej"),
    client: t("Alkhaleej Training and Education", "الخليج للتدريب والتعليم"),
    categories: ["media"],
    layout: "film",
    featured: false,
    work: t("Photography", "التصوير الفوتوغرافي"),
    scope: [t("Moodboard", "لوحة الإلهام"), t("Storyboard", "القصة المصورة"), t("Photography", "التصوير الفوتوغرافي")],
    overview: t(
      "Photography for a training and education institute, planned from a moodboard and storyboard: reception, offices, meeting and training rooms and the building itself.",
      "تصوير لمعهد تدريب وتعليم، خُطط من لوحة إلهام وقصة مصورة: الاستقبال والمكاتب وقاعات الاجتماعات والتدريب والمبنى نفسه."
    ),
    brand: { bg: "#1f262d", fg: "#f2efe8", accent: "#f0952a" },
    swatches: ["#1f262d", "#f0952a", "#f2efe8"],
    cover: M("alkhaleej/bottom"),
    media: [{ type: "film", rows: film("alkhaleej"), note: t("Photography — moodboard & storyboard", "التصوير — لوحة الإلهام والقصة المصورة") }],
  },
  {
    slug: "bistro-catering",
    name: t("Bistro Catering", "Bistro Catering"),
    client: t("Bistro Catering", "Bistro Catering"),
    categories: ["media"],
    layout: "film",
    featured: false,
    work: t("Photography", "التصوير الفوتوغرافي"),
    scope: [t("Moodboard", "لوحة الإلهام"), t("Photography", "التصوير الفوتوغرافي")],
    overview: t(
      "Food photography for a catering brand, planned from a moodboard: abundant buffets, live stations, layered desserts and the hands that serve them, under warm light.",
      "تصوير أطعمة لعلامة تموين، خُطط من لوحة إلهام: بوفيهات وفيرة ومحطات حية وحلويات متعددة الطبقات والأيدي التي تقدمها، تحت إضاءة دافئة."
    ),
    brand: { bg: "#1b120a", fg: "#f7ecd9", accent: "#f0a030" },
    swatches: ["#1b120a", "#f0a030", "#f7ecd9"],
    cover: M("bistro-catering/top"),
    media: [{ type: "film", rows: film("bistro-catering"), note: t("Photography — moodboard", "التصوير — لوحة الإلهام") }],
  },
  {
    slug: "radicon",
    name: t("Radicon", "Radicon"),
    client: t("Radicon", "Radicon"),
    categories: ["events"],
    layout: "pano",
    featured: false,
    work: t("Event Management", "إدارة الفعاليات"),
    scope: [t("Event Management", "إدارة الفعاليات")],
    overview: t(
      "Two on-site activations from the event portfolio: a “Switch On” inclusion event with branded triangle walls and #switchers photo moments, and a Saudi-flag installation with hospitality laid out for guests.",
      "فعاليتان ميدانيتان من ملف الفعاليات: فعالية «Switch On» للشمولية بجدران مثلثة بهوية العلامة ولحظات تصوير بوسم #switchers، وتركيب بموضوع العلم السعودي مع ضيافة معدّة للضيوف."
    ),
    brand: { bg: "#1a1a1e", fg: "#f4f0ee", accent: "#e0303a" },
    swatches: ["#1a1a1e", "#e0303a", "#f4f0ee"],
    cover: M("radicon/event-1"),
    media: [
      { type: "pano", img: M("radicon/event-1"), note: t("Switch On", "Switch On") },
      { type: "pano", img: M("radicon/event-2"), note: t("Saudi flag installation", "تركيب العلم السعودي") },
    ],
  },
  {
    slug: "gulf-consult",
    name: t("Gulf Consult", "Gulf Consult"),
    client: t("Gulf Consult", "Gulf Consult"),
    categories: ["events"],
    layout: "pano",
    featured: false,
    work: t("Exhibition Stand", "جناح معرض"),
    scope: [t("Exhibition stand", "جناح معرض"), t("3D views", "عروض ثلاثية الأبعاد")],
    overview: t(
      "An exhibition stand concept: a suspended, illuminated sign above stone-textured counters, with a screen carrying the client’s story — shown in three views.",
      "فكرة جناح معرض: لوحة معلقة مضاءة فوق طاولات بملمس حجري، وشاشة تحمل قصة العميل — معروضة من ثلاث زوايا."
    ),
    brand: { bg: "#0d1a1c", fg: "#eef3f1", accent: "#3fb5a0" },
    swatches: ["#0d1a1c", "#3fb5a0", "#eef3f1"],
    cover: M("gulf-consult/board"),
    media: [{ type: "pano", img: M("gulf-consult/board") }],
  },
  {
    slug: "ucicoat",
    name: t("UCICOAT", "UCICOAT"),
    client: t("United Coatings Industries Ltd", "الشركة المتحدة لصناعة الطلاء"),
    categories: ["events"],
    layout: "pano",
    featured: false,
    work: t("Exhibition Stand", "جناح معرض"),
    scope: [t("Exhibition stand", "جناح معرض"), t("3D views", "عروض ثلاثية الأبعاد")],
    overview: t(
      "An exhibition stand built from the brand’s own ribbons of yellow, magenta and cyan, with a video wall and a reception desk — shown from front, corner and above.",
      "جناح معرض مبني من أشرطة العلامة الأصفر والأرجواني والسماوي، مع جدار عرض ومكتب استقبال — معروض من الأمام والزاوية ومن الأعلى."
    ),
    brand: { bg: "#17171a", fg: "#f7f3ea", accent: "#e8b830" },
    swatches: ["#17171a", "#e8b830", "#e0289a", "#30b8d8"],
    cover: M("ucicoat/board"),
    media: [{ type: "pano", img: M("ucicoat/board") }],
  },
  {
    slug: "the-city-school",
    name: t("The City School", "The City School"),
    client: t("The City School International – Saudi", "The City School International – Saudi"),
    categories: ["events"],
    layout: "pano",
    featured: false,
    work: t("Exhibition Stand", "جناح معرض"),
    scope: [t("Exhibition stand", "جناح معرض"), t("3D views", "عروض ثلاثية الأبعاد")],
    overview: t(
      "A “Back to School” stand made of oversized letters, a compass and a yellow staircase, with a blackboard wall and a contact-info desk — shown in three views.",
      "جناح «العودة إلى المدرسة» من حروف ضخمة وفرجار ودرج أصفر وجدار سبورة ومكتب لمعلومات التواصل — معروض من ثلاث زوايا."
    ),
    brand: { bg: "#0e2a55", fg: "#f4f6fb", accent: "#f0d020" },
    swatches: ["#0e2a55", "#1e5aa8", "#f0d020", "#f4f6fb"],
    cover: M("the-city-school/board"),
    media: [{ type: "pano", img: M("the-city-school/board") }],
  },
];

export const projectBySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));
export const featuredProjects = projects.filter((p) => p.featured);
export const primaryCategory = (p) => p.categories[0];

export const relatedProjects = (project, count = 3) =>
  projects
    .filter((p) => p.slug !== project.slug)
    .map((p) => ({ p, score: p.categories.filter((c) => project.categories.includes(c)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((x) => x.p);

export const nextProject = (project) => {
  const i = projects.findIndex((p) => p.slug === project.slug);
  return projects[(i + 1) % projects.length];
};
