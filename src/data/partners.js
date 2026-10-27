
/**
 * SAIL partner wall.
 * Logo files are stored in /public/partners.
 *
 * Notes:
 * - 017.webp is excluded from display because it
 *   repeats the Bawan brand shown in 020.webp.
 * - 018.webp is retained as Bawan Wood Industries.
 * - The restaurant logo reads "Cart Restaurant".
 */

const names = {
  1: "Shavery & Co.",
  2: "Enigma",
  3: "Baab",
  4: "Tawlead",
  5: "Cart Restaurant",
  6: "Tricycle",
  7: "Tawiya",
  8: "Namar",
  9: "Fayya Beauty Salon & Spa",
  10: "Chayt",
  11: "Armadio",
  12: "Bella Physical Therapy Center",
  14: "Gerflor",
  15: "Green Light",
  16: "Arnon",
  18: "Bawan Wood Industries",
  19: "UTEC",
  20: "Bawan",
  24: "We One 1",
  26: "Taj Azal",
  28: "88 Port",
  31: "Aram Art",
  32: "Stay In",
  33: "Gulf Cattle",
  35: "BAN",
  36: "Bistro Catering",
  37: "FIX",
  38: "Blake Urban Kitchen",
  39: "Bling Bay",
  40: "The BLK",
  41: "Cloud",
  42: "The City School",
  44: "Deraah",
  45: "Dine Eatery",
  47: "El-Faleh",
  48: "Falafel & Co",
  49: "SARF",
  50: "Linde",
  51: "Le Goût Chocolatier",
  52: "Layers",
  53: "La Gondola",
  54: "Kyla",
  55: "KiiN",
  57: "Kazoya",
  58: "Katoosh",
  59: "Joe’s Diner",
  60: "Golden Rawafed Company",
  63: "L’italiano",
  64: "Luini Bakery",
  66: "Nawar",
  67: "Nano-Ceramic",
  68: "Mora",
  69: "Beut AlMisk",
  71: "Maxim",
  72: "Mary",
  73: "Makani",
  74: "Sidra",
  76: "Optimus",
  77: "Pepsi",
  78: "Pizzapoli",
  79: "Café Quindío",
  80: "Ramada by Wyndham",
  81: "Renad",
  82: "Rollsrice",
  83: "Rais International Schools",
  84: "Sumou AlHayat",
  85: "Saldwich",
  87: "PC",
  89: "Squash",
  91: "Toast Hub",
  92: "UCICOAT",
  93: "Hazim Real Estate",
  94: "Vicoli",
  96: "Radicon",
  97: "Zyro",
  98: "Aszu",
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
    name: names[i + 1] || null,
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
