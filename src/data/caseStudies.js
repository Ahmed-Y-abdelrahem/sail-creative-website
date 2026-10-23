
import { projects } from "./projects";

const t = (en, ar) => ({ en, ar });

export const caseStudySectors = [
  {
    id: "food-beverage",
    title: t("Food & Beverage", "المطاعم والمقاهي"),
    description: t(
      "Distinctive brands and memorable experiences for restaurants, cafés and food concepts.",
      "هويات مميزة وتجارب متكاملة للمطاعم والمقاهي ومشاريع الأغذية."
    ),
    slugs: ["tricycle", "carte-restaurant", "manafesh"],
  },
  {
    id: "healthcare",
    title: t("Healthcare & Wellness", "الصحة والرعاية"),
    description: t(
      "Clear, trusted identities and communications for healthcare and wellness brands.",
      "هويات وحلول تواصل تعزز الثقة في العلامات الصحية."
    ),
    slugs: ["taj-azal", "afya", "bella-center"],
  },
  {
    id: "beauty",
    title: t("Beauty & Lifestyle", "الجمال والعناية"),
    description: t(
      "Brand experiences that express personality, quality and attention to detail.",
      "تجارب علامات تجارية تعكس الشخصية والجودة والاهتمام بالتفاصيل."
    ),
    slugs: ["shavery", "fayya", "we-one"],
  },
  {
    id: "real-estate",
    title: t("Real Estate & Hospitality", "العقارات والضيافة"),
    description: t(
      "Creative solutions for properties, hospitality and living spaces.",
      "حلول إبداعية للقطاع العقاري والضيافة والمساحات السكنية."
    ),
    slugs: ["beut-almisk", "stayin", "namar-door"],
  },
  {
    id: "technology",
    title: t("Technology & Digital", "التكنولوجيا والحلول الرقمية"),
    description: t(
      "Making digital products and complex ideas easier to understand and connect with.",
      "تحويل المنتجات الرقمية والأفكار التقنية إلى تجارب واضحة وجذابة."
    ),
    slugs: ["tawlead", "baab-app", "enigma"],
  },
  {
    id: "industry",
    title: t("Industry & Manufacturing", "الصناعة والمنتجات"),
    description: t(
      "Brand communication and creative execution for industrial and product businesses.",
      "تواصل بصري وتنفيذ إبداعي لشركات الصناعة والمنتجات."
    ),
    slugs: ["gerflor", "armadio", "ucicoat"],
  },
  {
    id: "events",
    title: t("Events & Exhibitions", "الفعاليات والمعارض"),
    description: t(
      "Experiences that bring brands and audiences together.",
      "تجارب تجمع العلامات التجارية بجمهورها على أرض الواقع."
    ),
    slugs: ["radicon", "gulf-consult", "luini-bakery"],
  },
  {
    id: "education",
    title: t(
      "Education & Professional Services",
      "التعليم والخدمات المهنية"
    ),
    description: t(
      "Visual storytelling for education, training and professional organizations.",
      "حلول بصرية لمؤسسات التعليم والتدريب والخدمات المهنية."
    ),
    slugs: ["alkhaleej", "the-city-school", "sumou"],
  },
  {
    id: "production",
    title: t(
      "Food & Product Photography",
      "الأغذية وتصوير المنتجات"
    ),
    description: t(
      "Photography and content that highlight products, details and experiences.",
      "تصوير ومحتوى يبرز المنتجات والتفاصيل والتجارب."
    ),
    slugs: ["gulf-cattle", "le-gout", "bistro-catering"],
  },
];

export const caseStudies = caseStudySectors.map((sector) => ({
  ...sector,
  projects: sector.slugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter(Boolean),
}));
