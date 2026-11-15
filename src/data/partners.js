
/**
 * SAIL partner wall.
 * Logo files are stored in /public/partners.
 *
 * Notes:
 * - 017.webp is excluded because it repeats Bawan.
 * - 018.webp is Bawan Wood Industries.
 * - Brand names remain unchanged when they are
 *   distinctive trademarks without a clear translation.
 * - Descriptive names have Arabic translations.
 */

const t = (en, ar = en) => ({ en, ar });

const names = {
  1: t("Shavery & Co."),
  2: t("Enigma"),
  3: t("Baab", "باب"),
  4: t("Tawlead", "توليد"),
  5: t("Cart Restaurant", "مطعم كارت"),
  6: t("Tricycle"),
  7: t("Tawiya", "توعية"),
  8: t("Namar", "نمار"),
  9: t(
    "Fayya Beauty Salon & Spa",
    "صالون وسبا فيّا للتجميل"
  ),
  10: t("Chayt"),
  11: t("Armadio"),
  12: t(
    "Bella Physical Therapy Center",
    "مركز بيلا للعلاج الطبيعي"
  ),
  14: t("Gerflor"),
  15: t("Green Light", "الضوء الأخضر"),
  16: t("Arnon"),
  18: t(
    "Bawan Wood Industries",
    "بوان للصناعات الخشبية"
  ),
  19: t("UTEC"),
  20: t("Bawan", "بوان"),
  24: t("We One 1"),
  26: t("Taj Azal", "تاج أزال"),
  28: t("88 Port"),
  31: t("Aram Art", "آرام للفنون"),
  32: t("Stay In"),
  33: t("Gulf Cattle", "المواشي الخليجية"),
  35: t("BAN"),
  36: t(
    "Bistro Catering",
    "بيسترو لخدمات الضيافة"
  ),
  37: t("FIX"),
  38: t("Blake Urban Kitchen"),
  39: t("Bling Bay"),
  40: t("The BLK"),
  41: t("Cloud", "سحابة"),
  42: t("The City School", "مدرسة المدينة"),
  44: t("Deraah", "درعة"),
  45: t("Dine Eatery"),
  47: t("El-Faleh", "الفالح"),
  48: t("Falafel & Co", "فلافل وشركاه"),
  49: t("SARF"),
  50: t("Linde"),
  51: t("Le Goût Chocolatier"),
  52: t("Layers", "طبقات"),
  53: t("La Gondola"),
  54: t("Kyla"),
  55: t("KiiN"),
  57: t("Kazoya"),
  58: t("Katoosh"),
  59: t("Joe’s Diner"),
  60: t(
    "Golden Rawafed Company",
    "شركة الروافد الذهبية"
  ),
  63: t("L’italiano"),
  64: t("Luini Bakery", "مخبز لويني"),
  66: t("Nawar", "نوار"),
  67: t("Nano-Ceramic", "نانو سيراميك"),
  68: t("Mora"),
  69: t("Beut AlMisk", "بيوت المسك"),
  71: t("Maxim"),
  72: t("Mary"),
  73: t("Makani", "مكاني"),
  74: t("Sidra", "سدرة"),
  76: t("Optimus"),
  77: t("Pepsi"),
  78: t("Pizzapoli"),
  79: t("Café Quindío"),
  80: t("Ramada by Wyndham"),
  81: t("Renad", "رناد"),
  82: t("Rollsrice"),
  83: t(
    "Rais International Schools",
    "مدارس رايس العالمية"
  ),
  84: t("Sumou AlHayat", "سمو الحياة"),
  85: t("Saldwich"),
  87: t("PC"),
  89: t("Squash"),
  91: t("Toast Hub"),
  92: t("UCICOAT"),
  93: t(
    "Hazim Real Estate",
    "حازم العقارية"
  ),
  94: t("Vicoli"),
  96: t("Radicon"),
  97: t("Zyro"),
  98: t("Aszu"),
};

// Keep original file numbering and IDs.
const excludedPartnerIds = new Set([17]);

export const partners = Array.from(
  { length: 100 },
  (_, i) => ({
    id: i + 1,
    src: `/partners/${String(i + 1).padStart(
      3,
      "0"
    )}.webp`,
    name: names[i + 1]?.en || null,
    nameAr: names[i + 1]?.ar || null,
  })
).filter(
  (partner) => !excludedPartnerIds.has(partner.id)
);

// Three interleaved rows for the animated partner wall.
export const partnerRows = [0, 1, 2].map(
  (row) =>
    partners.filter(
      (_, index) => index % 3 === row
    )
);
