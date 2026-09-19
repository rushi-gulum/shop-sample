import type { Category, Product } from "./types";

export const CATEGORIES: Category[] = [
  { id: "smartphones", name: "Smartphones", blurb: "5G, Android & multi-brand mobiles" },
  { id: "iphone", name: "iPhone", blurb: "Latest, Pro & previous-gen iPhones" },
  { id: "feature-phones", name: "Feature Phones", blurb: "Keypad phones with big batteries" },
  { id: "tablets", name: "Tablets", blurb: "iPad, Android & Windows tablets" },
  { id: "wearables", name: "Smartwatches", blurb: "Smartwatches & fitness bands" },
  { id: "audio", name: "Audio", blurb: "TWS, headphones, neckbands & speakers" },
  { id: "chargers", name: "Chargers & Power", blurb: "Wall, GaN & wireless chargers" },
  { id: "cables", name: "Cables", blurb: "USB-C, Lightning & braided cables" },
  { id: "powerbanks", name: "Power Banks", blurb: "10,000–20,000mAh & magnetic" },
  { id: "cases", name: "Cases & Covers", blurb: "Back covers for every device" },
  { id: "screen-protection", name: "Screen Protection", blurb: "Tempered glass & privacy glass" },
  { id: "stands-mounts", name: "Stands & Mounts", blurb: "Desk stands, grips & pop sockets" },
  { id: "creator-gear", name: "Creator Gear", blurb: "Gimbals, tripods, mics & lights" },
  { id: "car-accessories", name: "Car Accessories", blurb: "Car chargers, mounts & FM kits" },
  { id: "storage", name: "Storage", blurb: "microSD cards, pen drives & OTG" },
  { id: "gaming", name: "Gaming", blurb: "Triggers, controllers & coolers" },
  { id: "productivity", name: "Productivity", blurb: "Hubs, keyboards, stylus & mice" },
  { id: "connectivity", name: "Connectivity", blurb: "Hotspots & Bluetooth adapters" },
  { id: "cleaning-care", name: "Cleaning & Care", blurb: "Cleaning kits, cloths & blowers" },
  { id: "refurbished", name: "Refurbished", blurb: "Certified pre-owned & used phones" },
];

export const CATEGORY_MAP: Record<string, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c])
);

export const FREE_SHIPPING_THRESHOLD = 499; // ₹ — free delivery above this
export const STANDARD_SHIPPING = 79; // ₹ — flat delivery fee otherwise

export const PROMO_CODES: Record<string, { type: "percent"; value: number; label: string }> = {
  WELCOME15: { type: "percent", value: 15, label: "Welcome offer — 15% off your order" },
  FESTIVE10: { type: "percent", value: 10, label: "Festive sale — extra 10% off" },
  ZPRIME5: { type: "percent", value: 5, label: "Z Prime member — extra 5% off" },
};

const P = "/products";

export const PRODUCTS: Product[] = [
  // ==================== SMARTPHONES ====================
  {
    id: "s1",
    title: "Samsung Galaxy S24 Ultra 5G (Titanium Gray, 256 GB)",
    brand: "Samsung",
    category: "smartphones",
    price: 109999,
    compareAt: 129999,
    rating: 4.8,
    ratingCount: 18423,
    description:
      "Galaxy AI meets the Snapdragon 8 Gen 3. Built-in S Pen, 200MP camera, titanium frame and 7 years of OS upgrades. 1-year brand warranty.",
    image: `${P}/real/s1.jpg`,
    gallery: [`${P}/real/s1.jpg`, `${P}/real/s1-2.jpg`, `${P}/real/s1-3.jpg`],
    tags: ["5g", "android", "flagship", "camera-phone", "s-pen", "premium", "dual-sim", "bestseller"],
    featured: true,
    specs: [
      { label: "Display", value: "6.8\" QHD+ AMOLED 120Hz" },
      { label: "Processor", value: "Snapdragon 8 Gen 3" },
      { label: "Camera", value: "200MP + 50MP + 12MP + 10MP" },
      { label: "Battery", value: "5000 mAh, 45W fast charging" },
      { label: "Storage", value: "12 GB RAM, 256 GB" },
      { label: "Warranty", value: "1 year brand warranty" },
    ],
  },
  {
    id: "s2",
    title: "OnePlus 12 (Silky Black, 256 GB)",
    brand: "OnePlus",
    category: "smartphones",
    price: 64999,
    compareAt: 69999,
    rating: 4.7,
    ratingCount: 9621,
    description:
      "Hasselblad-tuned triple camera, Snapdragon 8 Gen 3, 100W SUPERVOOC charging and a 2K 120Hz ProXDR display.",
    image: `${P}/real/s2.jpg`,
    gallery: [`${P}/real/s2.jpg`, `${P}/real/s2-2.jpg`, `${P}/real/s2-3.jpg`],
    tags: ["5g", "android", "flagship", "gaming-phone", "fast-charging", "dual-sim"],
    featured: true,
    specs: [
      { label: "Display", value: "6.82\" 2K ProXDR 120Hz" },
      { label: "Processor", value: "Snapdragon 8 Gen 3" },
      { label: "Camera", value: "50MP Hasselblad triple" },
      { label: "Charging", value: "100W SUPERVOOC, 50W wireless" },
      { label: "Warranty", value: "1 year brand warranty" },
    ],
  },
  {
    id: "s3",
    title: "Google Pixel 8a (Aloe, 128 GB)",
    brand: "Google Pixel",
    category: "smartphones",
    price: 52999,
    compareAt: 54999,
    rating: 4.6,
    ratingCount: 4312,
    description:
      "Google Tensor G3 with 7 years of updates, best-in-class AI camera and Pixel's clean software experience.",
    image: `${P}/real/s3.jpg`,
    gallery: [`${P}/real/s3.jpg`, `${P}/real/s3-2.png`, `${P}/real/s3-3.jpg`],
    tags: ["5g", "android", "camera-phone", "mid-range", "compact", "ai"],
    specs: [
      { label: "Display", value: "6.1\" Actua 120Hz" },
      { label: "Processor", value: "Google Tensor G3" },
      { label: "Camera", value: "64MP + 13MP" },
      { label: "Updates", value: "7 years OS & security" },
    ],
  },
  {
    id: "s4",
    title: "Nothing Phone (2a) Plus (Metallic Gray, 256 GB)",
    brand: "Nothing",
    category: "smartphones",
    price: 27999,
    compareAt: 29999,
    rating: 4.5,
    ratingCount: 2893,
    description:
      "Iconic transparent Glyph design, 50MP dual camera and 3 years of Android updates. Made for India's creator generation.",
    image: `${P}/real/s4.jpg`,
    gallery: [`${P}/real/s4.jpg`, `${P}/real/s4-2.jpg`, `${P}/real/s4-3.jpg`],
    tags: ["5g", "android", "mid-range", "design", "glyph", "new"],
    newArrival: true,
    specs: [
      { label: "Display", value: "6.7\" AMOLED 120Hz" },
      { label: "Processor", value: "Dimensity 7350 Pro" },
      { label: "Camera", value: "50MP + 50MP" },
      { label: "Charging", value: "50W fast charging" },
    ],
  },
  {
    id: "s5",
    title: "POCO X6 Pro 5G (Black, 256 GB)",
    brand: "POCO",
    category: "smartphones",
    price: 26999,
    compareAt: 28999,
    rating: 4.4,
    ratingCount: 15782,
    description:
      "Dimensity 8300-Ultra beast with 120Hz CrystalRes AMOLED and 67W turbo charging — India's favourite performance phone.",
    image: `${P}/real/s5.png`,
    gallery: [`${P}/real/s5.png`, `${P}/real/s5-2.jpg`, `${P}/real/s5-3.jpg`],
    tags: ["5g", "android", "gaming-phone", "value-for-money", "mid-range", "fast-charging", "bestseller"],
    featured: true,
    specs: [
      { label: "Display", value: "6.67\" 1.5K AMOLED 120Hz" },
      { label: "Processor", value: "Dimensity 8300-Ultra" },
      { label: "Gaming", value: "WildBoost Optimisation 3.0" },
      { label: "Charging", value: "67W turbo (charger in box)" },
    ],
  },
  {
    id: "s6",
    title: "Redmi Note 13 5G (Chromatic Gray, 128 GB)",
    brand: "Redmi",
    category: "smartphones",
    price: 17999,
    compareAt: 19999,
    rating: 4.4,
    ratingCount: 24156,
    description:
      "108MP AI triple camera, 120Hz AMOLED and 33W fast charging. The value-for-money king under ₹20,000.",
    image: `${P}/real/s6.png`,
    gallery: [`${P}/real/s6.png`, `${P}/real/s6-2.jpg`, `${P}/real/s6-3.jpg`],
    tags: ["5g", "android", "value-for-money", "camera-phone", "budget", "bestseller"],
    specs: [
      { label: "Display", value: "6.67\" AMOLED 120Hz" },
      { label: "Camera", value: "108MP triple" },
      { label: "Battery", value: "5000 mAh, 33W" },
      { label: "Warranty", value: "1 year brand warranty" },
    ],
  },
  {
    id: "s7",
    title: "realme 12 Pro+ 5G (Submarine Blue, 256 GB)",
    brand: "realme",
    category: "smartphones",
    price: 29999,
    compareAt: 31999,
    rating: 4.5,
    ratingCount: 6210,
    description:
      "Periscope telephoto camera with 120x SuperZoom, luxury watch-inspired design and 5,000mAh battery.",
    image: `${P}/real/s7.jpg`,
    gallery: [`${P}/real/s7.jpg`, `${P}/real/s7-2.jpg`, `${P}/real/s7-3.jpg`],
    tags: ["5g", "android", "camera-phone", "mid-range", "telephoto"],
    specs: [
      { label: "Display", value: "6.7\" Curved AMOLED 120Hz" },
      { label: "Camera", value: "64MP periscope telephoto" },
      { label: "Battery", value: "5000 mAh, 67W" },
    ],
  },
  {
    id: "s8",
    title: "Motorola Edge 50 Pro (Black Beauty, 256 GB)",
    brand: "Motorola",
    category: "smartphones",
    price: 31999,
    compareAt: 35999,
    rating: 4.5,
    ratingCount: 3891,
    description:
      "125W turbo charging, Pantone-validated curved pOLED and near-stock Android 14 with 3 years of updates.",
    image: `${P}/real/s8.jpg`,
    gallery: [`${P}/real/s8.jpg`, `${P}/real/s8-2.jpg`, `${P}/real/s8-3.jpg`],
    tags: ["5g", "android", "mid-range", "fast-charging", "stock-android"],
    specs: [
      { label: "Display", value: "6.7\" 1.5K pOLED 144Hz" },
      { label: "Charging", value: "125W turbo + 50W wireless" },
      { label: "Camera", value: "50MP OIS triple" },
    ],
  },
  {
    id: "s9",
    title: "iQOO Z9 5G (Graphite Blue, 128 GB)",
    brand: "iQOO",
    category: "smartphones",
    price: 19999,
    compareAt: 21999,
    rating: 4.4,
    ratingCount: 8934,
    description:
      "Dimensity 7200, Sony IMX882 OIS camera and IP54 rating — the gaming favourite under ₹20,000.",
    image: `${P}/real/s9.jpg`,
    gallery: [`${P}/real/s9.jpg`, `${P}/real/s9-2.jpg`, `${P}/real/s9-3.jpg`],
    tags: ["5g", "android", "gaming-phone", "value-for-money", "ois"],
    specs: [
      { label: "Display", value: "6.67\" AMOLED 120Hz" },
      { label: "Processor", value: "Dimensity 7200" },
      { label: "Camera", value: "50MP Sony IMX882 OIS" },
    ],
  },
  {
    id: "s10",
    title: "vivo V29e 5G (Artistic Blue, 256 GB)",
    brand: "vivo",
    category: "smartphones",
    price: 26999,
    compareAt: 28999,
    rating: 4.3,
    ratingCount: 4102,
    description:
      "Ultra-slim curved AMOLED with 50MP Eye AF selfie camera and 80W FlashCharge. Built for portraits.",
    image: `${P}/real/s10.jpg`,
    gallery: [`${P}/real/s10.jpg`, `${P}/real/s10-2.png`, `${P}/real/s10-3.jpg`],
    tags: ["5g", "android", "camera-phone", "selfie", "mid-range", "slim"],
    specs: [
      { label: "Display", value: "6.78\" Curved AMOLED" },
      { label: "Selfie", value: "50MP Eye AF" },
      { label: "Charging", value: "80W FlashCharge" },
    ],
  },
  {
    id: "s11",
    title: "Xiaomi 14 (Black, 512 GB)",
    brand: "Xiaomi",
    category: "smartphones",
    price: 69999,
    compareAt: 74999,
    rating: 4.6,
    ratingCount: 1874,
    description:
      "Leica Summilux optical lens trio, Snapdragon 8 Gen 3 and a compact 6.36\" flagship you can use one-handed.",
    image: `${P}/real/s11.png`,
    gallery: [`${P}/real/s11.png`, `${P}/real/s11-2.jpg`, `${P}/real/s11-3.jpg`],
    tags: ["5g", "android", "flagship", "compact", "camera-phone", "leica"],
    specs: [
      { label: "Display", value: "6.36\" 1.5K LTPO 120Hz" },
      { label: "Camera", value: "Leica 50MP triple" },
      { label: "Storage", value: "12 GB RAM, 512 GB" },
    ],
  },
  {
    id: "s12",
    title: "Samsung Galaxy M35 5G (Thunder Blue, 128 GB)",
    brand: "Samsung",
    category: "smartphones",
    price: 18999,
    compareAt: 20999,
    rating: 4.3,
    ratingCount: 11205,
    description:
      "Exynos 1380, 6000mAh battery and Super AMOLED 120Hz — Samsung's best value-for-money 5G under ₹20,000.",
    image: `${P}/real/s12.jpg`,
    gallery: [`${P}/real/s12.jpg`, `${P}/real/s12-2.jpg`, `${P}/real/s12-3.jpg`],
    tags: ["5g", "android", "value-for-money", "big-battery", "budget"],
    newArrival: true,
    specs: [
      { label: "Display", value: "6.6\" Super AMOLED 120Hz" },
      { label: "Battery", value: "6000 mAh" },
      { label: "Processor", value: "Exynos 1380" },
    ],
  },

  // ==================== iPHONE ====================
  {
    id: "ip1",
    title: "iPhone 15 Pro Max (Natural Titanium, 256 GB)",
    brand: "Apple",
    category: "iphone",
    price: 149900,
    compareAt: 159900,
    rating: 4.9,
    ratingCount: 32415,
    description:
      "A17 Pro chip, titanium design, Action button and 5x telephoto camera. Genuine Indian unit with 1-year Apple India warranty and GST invoice.",
    image: `${P}/real/ip1.jpg`,
    gallery: [`${P}/real/ip1.jpg`, `${P}/real/ip1-2.png`, `${P}/real/ip1-3.jpg`],
    tags: ["5g", "ios", "flagship", "titanium", "premium", "256gb", "bestseller"],
    featured: true,
    specs: [
      { label: "Display", value: "6.7\" Super Retina XDR 120Hz" },
      { label: "Chip", value: "A17 Pro" },
      { label: "Camera", value: "48MP main + 5x telephoto" },
      { label: "Storage", value: "256 GB" },
      { label: "Warranty", value: "1 year Apple India warranty" },
    ],
  },
  {
    id: "ip2",
    title: "iPhone 15 (Blue, 128 GB)",
    brand: "Apple",
    category: "iphone",
    price: 72999,
    compareAt: 79900,
    rating: 4.8,
    ratingCount: 41230,
    description:
      "Dynamic Island, 48MP camera system and USB-C. The best-selling iPhone in India, now with festive pricing.",
    image: `${P}/real/ip2.jpg`,
    gallery: [`${P}/real/ip2.jpg`, `${P}/real/ip2-2.jpg`, `${P}/real/ip2-3.png`],
    tags: ["5g", "ios", "128gb", "usb-c", "bestseller", "latest-iphone"],
    featured: true,
    specs: [
      { label: "Display", value: "6.1\" Super Retina XDR" },
      { label: "Chip", value: "A16 Bionic" },
      { label: "Camera", value: "48MP + 12MP" },
      { label: "Warranty", value: "1 year Apple India warranty" },
    ],
  },
  {
    id: "ip3",
    title: "iPhone 14 (Midnight, 128 GB)",
    brand: "Apple",
    category: "iphone",
    price: 58999,
    compareAt: 69900,
    rating: 4.7,
    ratingCount: 28491,
    description:
      "Previous-generation favourite with A15 Bionic, Dual-camera system with Photonic Engine and all-day battery life.",
    image: `${P}/real/ip3.jpg`,
    gallery: [`${P}/real/ip3.jpg`, `${P}/real/ip3-2.png`, `${P}/real/ip3-3.png`],
    tags: ["5g", "ios", "previous-generation", "128gb", "value-for-money"],
    specs: [
      { label: "Display", value: "6.1\" Super Retina XDR" },
      { label: "Chip", value: "A15 Bionic" },
      { label: "Camera", value: "12MP dual" },
    ],
  },
  {
    id: "ip4",
    title: "iPhone 13 (Starlight, 128 GB)",
    brand: "Apple",
    category: "iphone",
    price: 49900,
    compareAt: 59900,
    rating: 4.7,
    ratingCount: 52104,
    description:
      "India's most-loved iPhone — A15 Bionic, dual 12MP cameras and Ceramic Shield. Still a value-for-money monster.",
    image: `${P}/real/ip4.jpg`,
    gallery: [`${P}/real/ip4.jpg`, `${P}/real/ip4-2.jpg`, `${P}/real/ip4-3.jpg`],
    tags: ["5g", "ios", "previous-generation", "128gb", "value-for-money", "bestseller"],
    specs: [
      { label: "Display", value: "6.1\" Super Retina XDR" },
      { label: "Chip", value: "A15 Bionic" },
      { label: "Camera", value: "12MP dual" },
    ],
  },
  {
    id: "ip5",
    title: "iPhone SE (3rd Gen, Midnight, 64 GB)",
    brand: "Apple",
    category: "iphone",
    price: 43999,
    compareAt: 49900,
    rating: 4.5,
    ratingCount: 8342,
    description:
      "The most affordable iPhone with A15 Bionic, Touch ID home button and compact 4.7\" Retina HD display.",
    image: `${P}/real/ip5.jpg`,
    gallery: [`${P}/real/ip5.jpg`, `${P}/real/ip5-2.jpg`, `${P}/real/ip5-3.jpg`],
    tags: ["ios", "entry-model", "compact", "touch-id", "64gb"],
    specs: [
      { label: "Display", value: "4.7\" Retina HD" },
      { label: "Chip", value: "A15 Bionic" },
      { label: "Home button", value: "Yes, with Touch ID" },
    ],
  },
  {
    id: "ip6",
    title: "iPhone 16 Plus (Ultramarine, 128 GB)",
    brand: "Apple",
    category: "iphone",
    price: 89900,
    compareAt: 89900,
    rating: 4.8,
    ratingCount: 12043,
    description:
      "Latest iPhone with Camera Control button, A18 chip and the biggest battery ever in an iPhone Plus.",
    image: `${P}/real/ip6.jpg`,
    gallery: [`${P}/real/ip6.jpg`, `${P}/real/ip6-2.jpg`, `${P}/real/ip6-3.jpg`],
    tags: ["5g", "ios", "latest-iphone", "128gb", "new", "camera-control"],
    newArrival: true,
    specs: [
      { label: "Display", value: "6.7\" Super Retina XDR" },
      { label: "Chip", value: "A18" },
      { label: "New", value: "Camera Control button" },
    ],
  },

  // ==================== FEATURE PHONES ====================
  {
    id: "f1",
    title: "Nokia 105 (2023 Edition, Charcoal)",
    brand: "Nokia",
    category: "feature-phones",
    price: 1199,
    compareAt: 1399,
    rating: 4.4,
    ratingCount: 32041,
    description:
      "Classic keypad phone with wireless FM radio, long-lasting battery and durable polycarbonate body. Perfect backup or senior-citizen phone.",
    image: `${P}/real/f1.png`,
    gallery: [`${P}/real/f1.png`, `${P}/real/f1-2.jpg`, `${P}/real/f1-3.jpg`],
    tags: ["basic", "keypad", "fm-radio", "senior-citizen", "dual-sim", "budget"],
    featured: true,
    specs: [
      { label: "Battery", value: "1000 mAh, days of standby" },
      { label: "Extras", value: "Wireless FM radio" },
      { label: "SIM", value: "Dual SIM" },
      { label: "Warranty", value: "1 year brand warranty" },
    ],
  },
  {
    id: "f2",
    title: "Nokia 150 (2023 Edition, Cyan)",
    brand: "Nokia",
    category: "feature-phones",
    price: 2099,
    compareAt: 2399,
    rating: 4.3,
    ratingCount: 15782,
    description:
      "Bright 2.4\" display, VGA camera with flash, MP3 player and weeks-long standby. The reliable everyday keypad phone.",
    image: `${P}/real/f2.jpg`,
    gallery: [`${P}/real/f2.jpg`, `${P}/real/f2-2.png`, `${P}/real/f2-3.jpg`],
    tags: ["basic", "keypad", "fm-radio", "dual-sim", "camera"],
    specs: [
      { label: "Display", value: "2.4\" QQVGA" },
      { label: "Battery", value: "1450 mAh" },
      { label: "Extras", value: "MP3 player, torch" },
    ],
  },
  {
    id: "f3",
    title: "Lava A7 Star 4G (Gold, Dual SIM)",
    brand: "Lava",
    category: "feature-phones",
    price: 3299,
    compareAt: 3599,
    rating: 4.2,
    ratingCount: 4218,
    description:
      "Made-in-India 4G keypad phone with 2575mAh battery, bright torch, Bhojpuri & 23 language support and 1-year warranty with free home service.",
    image: `${P}/real/f3.jpg`,
    gallery: [`${P}/real/f3.jpg`, `${P}/real/f3-2.jpg`, `${P}/real/f3-3.jpg`],
    tags: ["4g", "keypad", "big-battery", "dual-sim", "made-in-india", "senior-citizen"],
    specs: [
      { label: "Battery", value: "2575 mAh" },
      { label: "Network", value: "4G VoLTE" },
      { label: "Service", value: "Free at-home service in India" },
    ],
  },

  // ==================== TABLETS ====================
  {
    id: "t1",
    title: "Apple iPad 10th Gen 10.9\" (Blue, 64 GB, Wi-Fi)",
    brand: "Apple",
    category: "tablets",
    price: 32900,
    compareAt: 39900,
    rating: 4.7,
    ratingCount: 9842,
    description:
      "A14 Bionic, 10.9\" Liquid Retina display and landscape front camera. Great for students, note-taking and streaming.",
    image: `${P}/real/t1.jpg`,
    gallery: [`${P}/real/t1.jpg`, `${P}/real/t1-2.jpg`, `${P}/real/t1-3.jpg`],
    tags: ["ipad", "student", "entertainment", "64gb", "wifi", "bestseller"],
    featured: true,
    specs: [
      { label: "Display", value: "10.9\" Liquid Retina" },
      { label: "Chip", value: "A14 Bionic" },
      { label: "Storage", value: "64 GB" },
      { label: "Warranty", value: "1 year Apple India warranty" },
    ],
  },
  {
    id: "t2",
    title: "Apple iPad Air 11\" M2 (Space Gray, 128 GB)",
    brand: "Apple",
    category: "tablets",
    price: 57900,
    compareAt: 59900,
    rating: 4.8,
    ratingCount: 3412,
    description:
      "M2 chip with Apple Pencil Pro support — the work-and-creation tablet for designers, students and creators.",
    image: `${P}/real/t2.jpg`,
    gallery: [`${P}/real/t2.jpg`, `${P}/real/t2-2.jpg`, `${P}/real/t2-3.jpg`],
    tags: ["ipad", "work", "drawing", "creative", "m2", "new"],
    newArrival: true,
    specs: [
      { label: "Display", value: "11\" Liquid Retina" },
      { label: "Chip", value: "Apple M2" },
      { label: "Pencil", value: "Apple Pencil Pro support" },
    ],
  },
  {
    id: "t3",
    title: "Samsung Galaxy Tab S6 Lite (2024, Gray, 128 GB)",
    brand: "Samsung",
    category: "tablets",
    price: 27999,
    compareAt: 34999,
    rating: 4.5,
    ratingCount: 6721,
    description:
      "Comes with S Pen in the box — perfect for online classes, note-taking and Doodle sessions on a 10.4\" display.",
    image: `${P}/real/t3.jpg`,
    gallery: [`${P}/real/t3.jpg`, `${P}/real/t3-2.jpg`, `${P}/real/t3-3.jpg`],
    tags: ["android-tablet", "student", "s-pen", "stylus", "value-for-money"],
    specs: [
      { label: "Display", value: "10.4\" TFT 60Hz" },
      { label: "Included", value: "S Pen in box" },
      { label: "Battery", value: "7040 mAh" },
    ],
  },
  {
    id: "t4",
    title: "Redmi Pad SE 11\" (Graphite Gray, 128 GB, Wi-Fi)",
    brand: "Redmi",
    category: "tablets",
    price: 12999,
    compareAt: 15999,
    rating: 4.4,
    ratingCount: 14210,
    description:
      "11\" 90Hz FHD+ display with Dolby Atmos quad speakers — the best budget entertainment tablet for the family.",
    image: `${P}/real/t4.jpg`,
    gallery: [`${P}/real/t4.jpg`, `${P}/real/t4-2.jpg`, `${P}/real/t4-3.jpg`],
    tags: ["android-tablet", "entertainment", "kids", "budget", "value-for-money"],
    specs: [
      { label: "Display", value: "11\" FHD+ 90Hz" },
      { label: "Audio", value: "Dolby Atmos quad speakers" },
      { label: "Battery", value: "8000 mAh" },
    ],
  },

  // ==================== WEARABLES ====================
  {
    id: "w1",
    title: "Apple Watch SE (2nd Gen) GPS 40mm Midnight",
    brand: "Apple",
    category: "wearables",
    price: 27900,
    compareAt: 29900,
    rating: 4.7,
    ratingCount: 8213,
    description:
      "Crash Detection, sleep tracking and all the essentials of an Apple Watch at the friendliest price in India.",
    image: `${P}/real/w1.jpg`,
    gallery: [`${P}/real/w1.jpg`, `${P}/real/w1-2.jpg`, `${P}/real/w1-3.png`],
    tags: ["apple-watch", "fitness", "gps", "bestseller"],
    featured: true,
    specs: [
      { label: "Display", value: "Retina LTPO OLED" },
      { label: "Health", value: "Crash & fall detection" },
      { label: "Battery", value: "18 hours" },
      { label: "Warranty", value: "1 year Apple India warranty" },
    ],
  },
  {
    id: "w2",
    title: "Samsung Galaxy Watch6 LTE 44mm (Graphite)",
    brand: "Samsung",
    category: "wearables",
    price: 32999,
    compareAt: 40999,
    rating: 4.6,
    ratingCount: 4532,
    description:
      "Body composition analysis, sleep coaching and standalone LTE calling on a big sAMOLED round dial.",
    image: `${P}/real/w2.jpg`,
    gallery: [`${P}/real/w2.jpg`, `${P}/real/w2-2.jpg`, `${P}/real/w2-3.png`],
    tags: ["smartwatch", "lte", "amosled", "android", "calling"],
    specs: [
      { label: "Display", value: "1.5\" Super AMOLED" },
      { label: "Health", value: "Body composition, BIA" },
      { label: "Network", value: "Standalone 4G LTE" },
    ],
  },
  {
    id: "w3",
    title: "OnePlus Watch 2 (Black Steel)",
    brand: "OnePlus",
    category: "wearables",
    price: 24999,
    compareAt: 26999,
    rating: 4.5,
    ratingCount: 2187,
    description:
      "Wear OS 4 with dual-engine architecture, 100-hour battery in Smart Mode and stainless steel build.",
    image: `${P}/real/w3.jpg`,
    gallery: [`${P}/real/w3.jpg`, `${P}/real/w3-2.jpg`, `${P}/real/w3-3.jpg`],
    tags: ["wear-os", "smartwatch", "gps", "amosled", "new"],
    newArrival: true,
    specs: [
      { label: "OS", value: "Wear OS 4 + RTOS" },
      { label: "Battery", value: "100 hours smart mode" },
      { label: "Build", value: "Stainless steel" },
    ],
  },
  {
    id: "w4",
    title: "Noise ColorFit Pro 5 (Jet Black)",
    brand: "Noise",
    category: "wearables",
    price: 3499,
    compareAt: 6999,
    rating: 4.3,
    ratingCount: 32187,
    description:
      "Bluetooth calling with Noise Buzz, 1.85\" AMOLED display, 7-day battery and 100+ sports modes. India's #1 smartwatch brand.",
    image: `${P}/real/w4.png`,
    gallery: [`${P}/real/w4.png`, `${P}/real/w4-2.jpg`, `${P}/real/w4-3.png`],
    tags: ["smartwatch", "bluetooth-calling", "amosled", "value-for-money", "fitness", "bestseller"],
    featured: true,
    specs: [
      { label: "Display", value: "1.85\" AMOLED" },
      { label: "Calling", value: "Bluetooth calling + mic/speaker" },
      { label: "Battery", value: "7 days typical" },
    ],
  },
  {
    id: "w5",
    title: "boAt Wave Call 2 (Black)",
    brand: "boAt",
    category: "wearables",
    price: 1799,
    compareAt: 4499,
    rating: 4.2,
    ratingCount: 51402,
    description:
      "Dial Pad bluetooth calling, 1.83\" HD display, 700+ active modes and IPR68 dust & water resistance.",
    image: `${P}/real/w5.jpg`,
    gallery: [`${P}/real/w5.jpg`, `${P}/real/w5-2.jpg`, `${P}/real/w5-3.jpg`],
    tags: ["smartwatch", "bluetooth-calling", "value-for-money", "budget"],
    specs: [
      { label: "Display", value: "1.83\" HD" },
      { label: "Battery", value: "Up to 7 days" },
      { label: "Rating", value: "IP68" },
    ],
  },
  {
    id: "w6",
    title: "Fastrack Reflex Vox (Black)",
    brand: "Fastrack",
    category: "wearables",
    price: 2595,
    compareAt: 3995,
    rating: 4.1,
    ratingCount: 9231,
    description:
      "Bluetooth calling smartwatch from Fastrack with 1.85\" display, AI voice assistant andstress monitoring.",
    image: `${P}/real/w6.jpg`,
    gallery: [`${P}/real/w6.jpg`, `${P}/real/w6-2.jpg`, `${P}/real/w6-3.jpg`],
    tags: ["smartwatch", "bluetooth-calling", "fitness", "value-for-money"],
    specs: [
      { label: "Display", value: "1.85\" TFT" },
      { label: "Calling", value: "Bluetooth calling" },
      { label: "Battery", value: "Up to 5 days" },
    ],
  },

  // ==================== AUDIO ====================
  {
    id: "a1",
    title: "Sony WH-1000XM5 Wireless ANC Headphones (Black)",
    brand: "Sony",
    category: "audio",
    price: 29990,
    compareAt: 34990,
    rating: 4.8,
    ratingCount: 12403,
    description:
      "Industry-leading noise cancellation, 30-hour battery and crystal-clear calls. The gold standard for premium ANC headphones.",
    image: `${P}/real/a1.jpg`,
    gallery: [`${P}/real/a1.jpg`, `${P}/real/a1-2.jpg`, `${P}/real/a1-3.jpg`],
    tags: ["headphones", "anc", "wireless", "premium", "bestseller"],
    featured: true,
    specs: [
      { label: "Battery", value: "30 hours with ANC" },
      { label: "Noise cancelling", value: "Dual processor ANC" },
      { label: "Charging", value: "USB-C, 3 min = 3 hrs" },
      { label: "Warranty", value: "1 year brand warranty" },
    ],
  },
  {
    id: "a2",
    title: "Sony WH-CH720N Wireless ANC Headphones (Black)",
    brand: "Sony",
    category: "audio",
    price: 8990,
    compareAt: 14990,
    rating: 4.5,
    ratingCount: 21398,
    description:
      "Lightweight 192g ANC headphones with V1 processor, 35-hour battery and multipoint connection. Value-for-money ANC champion.",
    image: `${P}/real/a2.jpg`,
    gallery: [`${P}/real/a2.jpg`, `${P}/real/a2-2.jpg`, `${P}/real/a2-3.jpg`],
    tags: ["headphones", "anc", "wireless", "value-for-money"],
    specs: [
      { label: "Battery", value: "35 hours" },
      { label: "Weight", value: "192 g" },
      { label: "ANC", value: "Integrated Processor V1" },
    ],
  },
  {
    id: "a3",
    title: "Apple AirPods Pro (2nd Gen) with USB-C",
    brand: "Apple",
    category: "audio",
    price: 24900,
    compareAt: 26900,
    rating: 4.8,
    ratingCount: 18722,
    description:
      "Adaptive Audio, up to 2x more Active Noise Cancellation, Conversation Awareness and MagSafe USB-C case.",
    image: `${P}/real/a3.jpg`,
    gallery: [`${P}/real/a3.jpg`, `${P}/real/a3-2.jpg`, `${P}/real/a3-3.jpg`],
    tags: ["tws", "earbuds", "anc", "premium", "apple", "bestseller"],
    featured: true,
    specs: [
      { label: "Battery", value: "6 h + 30 h with case" },
      { label: "ANC", value: "Adaptive Audio" },
      { label: "Charging", value: "USB-C / MagSafe / Watch" },
      { label: "Rating", value: "IP54" },
    ],
  },
  {
    id: "a4",
    title: "Nothing Ear (a) (Black)",
    brand: "Nothing",
    category: "audio",
    price: 7999,
    compareAt: 8499,
    rating: 4.5,
    ratingCount: 6521,
    description:
      "45dB Smart ANC, LDAC hi-res audio and 42.5-hour total battery in an iconic transparent design.",
    image: `${P}/real/a4.jpg`,
    gallery: [`${P}/real/a4.jpg`, `${P}/real/a4-2.jpg`, `${P}/real/a4-3.jpg`],
    tags: ["tws", "earbuds", "anc", "design", "new"],
    newArrival: true,
    specs: [
      { label: "ANC", value: "45 dB Smart ANC" },
      { label: "Battery", value: "42.5 h total" },
      { label: "Codec", value: "LDAC hi-res" },
    ],
  },
  {
    id: "a5",
    title: "boAt Airdopes 311 Pro (Ash Grey)",
    brand: "boAt",
    category: "audio",
    price: 1299,
    compareAt: 2990,
    rating: 4.3,
    ratingCount: 84210,
    description:
      "50-hour playtime, Beast Mode low latency for gaming, ENx mic for clear calls and ASAP Charge. India's favourite TWS.",
    image: `${P}/real/a5.jpg`,
    gallery: [`${P}/real/a5.jpg`, `${P}/real/a5-2.png`, `${P}/real/a5-3.jpg`],
    tags: ["tws", "earbuds", "gaming-tws", "value-for-money", "bestseller", "budget"],
    featured: true,
    specs: [
      { label: "Battery", value: "50 hours total" },
      { label: "Low latency", value: "Beast Mode 50ms" },
      { label: "Charging", value: "ASAP Charge — 10 min = 180 min" },
      { label: "Rating", value: "IPX4" },
    ],
  },
  {
    id: "a6",
    title: "boAt Rockerz 235 Pro Bluetooth Neckband (Black & Red)",
    brand: "boAt",
    category: "audio",
    price: 899,
    compareAt: 1990,
    rating: 4.3,
    ratingCount: 65231,
    description:
      "Neckband with 40-hour battery, ENx environmental noise cancellation, Beast Mode for gaming and magnetic earbuds.",
    image: `${P}/real/a6.jpg`,
    gallery: [`${P}/real/a6.jpg`, `${P}/real/a6-2.jpg`, `${P}/real/a6-3.jpg`],
    tags: ["neckband", "bluetooth", "sports", "value-for-money", "budget"],
    specs: [
      { label: "Battery", value: "40 hours" },
      { label: "Magnetic", value: "Yes" },
      { label: "Rating", value: "IPX5" },
    ],
  },
  {
    id: "a7",
    title: "JBL Tune Beam TWS Earbuds (Blue)",
    brand: "JBL",
    category: "audio",
    price: 5499,
    compareAt: 8999,
    rating: 4.4,
    ratingCount: 9214,
    description:
      "JBL Pure Bass sound with True Adaptive Noise Cancelling and 48-hour total battery. Splash-proof for workouts.",
    image: `${P}/real/a7.jpg`,
    gallery: [`${P}/real/a7.jpg`, `${P}/real/a7-2.jpg`, `${P}/real/a7-3.jpg`],
    tags: ["tws", "earbuds", "anc", "sports"],
    specs: [
      { label: "Battery", value: "12 h + 36 h case" },
      { label: "ANC", value: "True Adaptive NC" },
      { label: "Rating", value: "IP54" },
    ],
  },
  {
    id: "a8",
    title: "JBL Go 3 Portable Bluetooth Speaker (Black)",
    brand: "JBL",
    category: "audio",
    price: 2999,
    compareAt: 3499,
    rating: 4.6,
    ratingCount: 24189,
    description:
      "Ultra-portable speaker with JBL Pro Sound and IP67 waterproof rating — take the party anywhere, from balcony to Goa.",
    image: `${P}/real/a8.jpg`,
    gallery: [`${P}/real/a8.jpg`, `${P}/real/a8-2.jpg`, `${P}/real/a8-3.jpg`],
    tags: ["speaker", "bluetooth", "portable", "waterproof", "mini-speaker"],
    specs: [
      { label: "Battery", value: "5 hours" },
      { label: "Rating", value: "IP67 waterproof" },
      { label: "Weight", value: "209 g" },
    ],
  },
  {
    id: "a9",
    title: "OnePlus Buds 3 (Splendid Blue)",
    brand: "OnePlus",
    category: "audio",
    price: 4999,
    compareAt: 5499,
    rating: 4.5,
    ratingCount: 3410,
    description:
      "Dual drivers with 49dB ANC, 3D spatial audio and 44-hour battery. Tuned for bassheads and binge-watchers.",
    image: `${P}/real/a9.jpg`,
    gallery: [`${P}/real/a9.jpg`, `${P}/real/a9-2.jpg`, `${P}/real/a9-3.png`],
    tags: ["tws", "earbuds", "anc", "new"],
    newArrival: true,
    specs: [
      { label: "ANC", value: "49 dB adaptive" },
      { label: "Drivers", value: "10.4mm + 6mm dual" },
      { label: "Battery", value: "44 hours total" },
    ],
  },

  // ==================== CHARGERS & POWER ====================
  {
    id: "c1",
    title: "Apple 20W USB-C Power Adapter",
    brand: "Apple",
    category: "chargers",
    price: 1899,
    compareAt: 1900,
    rating: 4.7,
    ratingCount: 45210,
    description:
      "Fast-charge your iPhone to 50% in around 30 minutes. Compact, original Apple adapter with 1-year warranty.",
    image: `${P}/real/c1.jpg`,
    gallery: [`${P}/real/c1.jpg`, `${P}/real/c1-2.jpg`, `${P}/real/c1-3.jpg`],
    tags: ["wall-charger", "20w", "usb-c", "pd", "apple"],
    specs: [
      { label: "Output", value: "20W USB-C PD" },
      { label: "Fast charge", value: "0–50% in ~30 min" },
      { label: "Warranty", value: "1 year Apple India warranty" },
    ],
  },
  {
    id: "c2",
    title: "Anker Nano 65W GaN II Wall Charger (Black)",
    brand: "Anker",
    category: "chargers",
    price: 3799,
    compareAt: 4999,
    rating: 4.7,
    ratingCount: 3210,
    description:
      "65W GaN II charger with two USB-C + one USB-A port — charge your phone, earbuds and laptop from one compact brick.",
    image: `${P}/real/c2.jpg`,
    gallery: [`${P}/real/c2.jpg`, `${P}/real/c2-2.png`, `${P}/real/c2-3.jpg`],
    tags: ["wall-charger", "65w", "gan", "pd", "pps", "multi-port", "fast-charging", "premium"],
    featured: true,
    specs: [
      { label: "Output", value: "65W max (PD 3.0, PPS)" },
      { label: "Ports", value: "2 × USB-C, 1 × USB-A" },
      { label: "Tech", value: "GaN II, foldable plug" },
    ],
  },
  {
    id: "c3",
    title: "Samsung 25W USB-C PD Travel Adapter",
    brand: "Samsung",
    category: "chargers",
    price: 1299,
    compareAt: 1499,
    rating: 4.6,
    ratingCount: 18204,
    description:
      "Super Fast Charging 25W adapter for Galaxy smartphones and tablets, with detachable USB-C cable included.",
    image: `${P}/real/c3.jpg`,
    gallery: [`${P}/real/c3.jpg`, `${P}/real/c3-2.jpg`, `${P}/real/c3-3.jpg`],
    tags: ["wall-charger", "25w", "usb-c", "pd", "samsung"],
    specs: [
      { label: "Output", value: "25W Super Fast Charge" },
      { label: "Includes", value: "USB-C to C cable" },
    ],
  },
  {
    id: "c4",
    title: "boAt WCD 25W Fast Charger (White)",
    brand: "boAt",
    category: "chargers",
    price: 649,
    compareAt: 1299,
    rating: 4.3,
    ratingCount: 26415,
    description:
      "25W PD + QC 3.0 dual-port adapter with smart IC protection and universal compatibility — value charger under ₹700.",
    image: `${P}/real/c4.jpg`,
    gallery: [`${P}/real/c4.jpg`, `${P}/real/c4-2.jpg`, `${P}/real/c4-3.jpg`],
    tags: ["wall-charger", "25w", "qc", "pd", "value-for-money", "budget"],
    specs: [
      { label: "Output", value: "25W (PD + QC 3.0)" },
      { label: "Ports", value: "USB-C + USB-A" },
      { label: "Protection", value: "Smart IC, multi-layer" },
    ],
  },
  {
    id: "c5",
    title: "boAt basePath 15W Wireless Charging Pad (White)",
    brand: "boAt",
    category: "chargers",
    price: 1299,
    compareAt: 2490,
    rating: 4.2,
    ratingCount: 8213,
    description:
      "Qi-certified 15W wireless charging pad with anti-slip silicone surface and multi-colour LED indicator.",
    image: `${P}/real/c5.jpg`,
    gallery: [`${P}/real/c5.jpg`, `${P}/real/c5-2.jpg`, `${P}/real/c5-3.jpg`],
    tags: ["wireless", "qi", "15w", "charging-pad", "value-for-money"],
    specs: [
      { label: "Output", value: "15W Qi wireless" },
      { label: "Safety", value: "Foreign object detection" },
    ],
  },
  {
    id: "c6",
    title: "Anker MagGo Magnetic Wireless Charger 15W (White)",
    brand: "Anker",
    category: "chargers",
    price: 3499,
    compareAt: 4499,
    rating: 4.6,
    ratingCount: 1842,
    description:
      "Snap-on magnetic 15W wireless charger for iPhone 12 and above, with ActiveShield temperature monitoring.",
    image: `${P}/real/c6.jpg`,
    gallery: [`${P}/real/c6.jpg`, `${P}/real/c6-2.jpg`, `${P}/real/c6-3.jpg`],
    tags: ["wireless", "magsafe", "magnetic", "15w", "new", "iphone"],
    newArrival: true,
    specs: [
      { label: "Output", value: "15W magnetic" },
      { label: "Compatible", value: "iPhone 12 series and above" },
      { label: "Safety", value: "ActiveShield 2.0" },
    ],
  },

  // ==================== CABLES ====================
  {
    id: "cb1",
    title: "boAt Type-C to Type-C 60W Braided Cable (1.5 m, Black)",
    brand: "boAt",
    category: "cables",
    price: 399,
    compareAt: 799,
    rating: 4.4,
    ratingCount: 42310,
    description:
      "60W fast-charging braided cable with 480Mbps data transfer, aluminium housing and 10,000+ bend lifespan.",
    image: `${P}/real/cb1.jpg`,
    gallery: [`${P}/real/cb1.jpg`, `${P}/real/cb1-2.jpg`, `${P}/real/cb1-3.png`],
    tags: ["usb-c", "braided", "fast-charging", "charging-cable", "value-for-money", "60w"],
    specs: [
      { label: "Power", value: "60W EPR" },
      { label: "Length", value: "1.5 m" },
      { label: "Data", value: "480 Mbps" },
    ],
  },
  {
    id: "cb2",
    title: "Xiaomi 6A Braided Type-C Cable (1.5 m, Black)",
    brand: "Xiaomi",
    category: "cables",
    price: 499,
    compareAt: 599,
    rating: 4.5,
    ratingCount: 15203,
    description:
      "6A ultra-fast charging cable supporting 100W turbo charging with nylon braid and zinc-alloy connectors.",
    image: `${P}/real/cb2.png`,
    gallery: [`${P}/real/cb2.png`, `${P}/real/cb2-2.jpg`, `${P}/real/cb2-3.jpg`],
    tags: ["usb-c", "braided", "fast-charging", "100w", "high-wattage"],
    specs: [
      { label: "Current", value: "6A (100W charging)" },
      { label: "Length", value: "1.5 m" },
    ],
  },
  {
    id: "cb3",
    title: "Apple USB-C to Lightning Cable (1 m)",
    brand: "Apple",
    category: "cables",
    price: 1899,
    compareAt: 1900,
    rating: 4.7,
    ratingCount: 21032,
    description:
      "Original Apple cable for fast charging iPhones and AirPods from USB-C adapters and power banks. MFi certified.",
    image: `${P}/real/cb3.jpg`,
    gallery: [`${P}/real/cb3.jpg`, `${P}/real/cb3-2.jpg`, `${P}/real/cb3-3.jpg`],
    tags: ["lightning", "apple", "fast-charging", "1m"],
    specs: [
      { label: "Type", value: "USB-C to Lightning" },
      { label: "Length", value: "1 m" },
      { label: "Warranty", value: "1 year Apple India warranty" },
    ],
  },
  {
    id: "cb4",
    title: "Portronics Konnect 3-in-1 Multi Cable (1.2 m)",
    brand: "Portronics",
    category: "cables",
    price: 549,
    compareAt: 999,
    rating: 4.2,
    ratingCount: 9312,
    description:
      "One cable for everything — Type-C, Lightning and Micro USB connectors with 3A fast charging. Perfect for travel.",
    image: `${P}/real/cb4.jpg`,
    gallery: [`${P}/real/cb4.jpg`, `${P}/real/cb4-2.jpg`, `${P}/real/cb4-3.jpg`],
    tags: ["multi-connector", "3-in-1", "lightning", "micro-usb", "fast-charging", "travel"],
    specs: [
      { label: "Connectors", value: "Type-C, Lightning, Micro USB" },
      { label: "Current", value: "3A fast charge" },
    ],
  },

  // ==================== POWER BANKS ====================
  {
    id: "pb1",
    title: "Anker PowerCore 20000mAh 22.5W Power Bank (Black)",
    brand: "Anker",
    category: "powerbanks",
    price: 4299,
    compareAt: 5499,
    rating: 4.7,
    ratingCount: 5210,
    description:
      "22.5W fast-charging 20,000mAh power bank with PowerIQ and USB-C PD — charges an iPhone 4+ times. Flight-safe.",
    image: `${P}/real/pb1.jpg`,
    gallery: [`${P}/real/pb1.jpg`, `${P}/real/pb1-2.jpg`, `${P}/real/pb1-3.jpg`],
    tags: ["20000mah", "fast-charging", "pd", "premium", "laptop-power-bank"],
    featured: true,
    specs: [
      { label: "Capacity", value: "20,000 mAh / 74 Wh" },
      { label: "Output", value: "22.5W + 20W PD" },
      { label: "Ports", value: "USB-C + 2 × USB-A" },
      { label: "Air travel", value: "Flight-safe" },
    ],
  },
  {
    id: "pb2",
    title: "Mi Pocket Power Bank Pro 10000mAh (Black)",
    brand: "Xiaomi",
    category: "powerbanks",
    price: 1499,
    compareAt: 1999,
    rating: 4.5,
    ratingCount: 31204,
    description:
      "22.5W fast charging in a pocket-sized metal body with dual outputs and low-power mode for earbuds & watches.",
    image: `${P}/real/pb2.jpg`,
    gallery: [`${P}/real/pb2.jpg`, `${P}/real/pb2-2.jpg`, `${P}/real/pb2-3.jpg`],
    tags: ["10000mah", "fast-charging", "value-for-money", "compact"],
    specs: [
      { label: "Capacity", value: "10,000 mAh" },
      { label: "Output", value: "22.5W" },
      { label: "Body", value: "Aluminium alloy" },
    ],
  },
  {
    id: "pb3",
    title: "Ambrane Stylo Max 20000mAh 22.5W Power Bank (Black)",
    brand: "Ambrane",
    category: "powerbanks",
    price: 1999,
    compareAt: 2999,
    rating: 4.4,
    ratingCount: 18420,
    description:
      "Made-in-India 20,000mAh power bank with 22.5W fast charging, triple output and sleek LED display.",
    image: `${P}/real/pb3.jpg`,
    gallery: [`${P}/real/pb3.jpg`, `${P}/real/pb3-2.png`, `${P}/real/pb3-3.jpg`],
    tags: ["20000mah", "fast-charging", "value-for-money", "made-in-india", "bisd-certified"],
    specs: [
      { label: "Capacity", value: "20,000 mAh" },
      { label: "Output", value: "22.5W" },
      { label: "Made in India", value: "Yes" },
    ],
  },
  {
    id: "pb4",
    title: "boAt EnergyShroom PB300 10000mAh Magnetic Power Bank",
    brand: "boAt",
    category: "powerbanks",
    price: 2499,
    compareAt: 3999,
    rating: 4.3,
    ratingCount: 4210,
    description:
      "MagSafe-compatible magnetic wireless power bank with 20W wired PD, snap-on charging and kickstand.",
    image: `${P}/real/pb4.jpg`,
    gallery: [`${P}/real/pb4.jpg`, `${P}/real/pb4-2.png`, `${P}/real/pb4-3.jpg`],
    tags: ["10000mah", "wireless", "magnetic", "magsafe", "new", "fast-charging"],
    newArrival: true,
    specs: [
      { label: "Capacity", value: "10,000 mAh" },
      { label: "Wireless", value: "7.5W magnetic" },
      { label: "Wired", value: "20W PD via USB-C" },
    ],
  },

  // ==================== CASES & COVERS ====================
  {
    id: "cs1",
    title: "Spigen Tough Armor Case for iPhone 15 Pro (Black)",
    brand: "Spigen",
    category: "cases",
    price: 1899,
    compareAt: 2999,
    rating: 4.6,
    ratingCount: 4210,
    description:
      "Military-grade drop protection with Air Cushion corners, raised lip for camera and built-in kickstand.",
    image: `${P}/real/cs1.jpg`,
    gallery: [`${P}/real/cs1.jpg`, `${P}/real/cs1-2.jpg`, `${P}/real/cs1-3.jpg`],
    tags: ["iphone-case", "rugged", "shockproof", "kickstand", "premium"],
    featured: true,
    specs: [
      { label: "Protection", value: "MIL-STD 810G-510.9" },
      { label: "Compatible", value: "iPhone 15 Pro" },
      { label: "Extras", value: "Built-in kickstand" },
    ],
  },
  {
    id: "cs2",
    title: "Nillkin Super Frosted Shield Case for Redmi Note 13 5G (Black)",
    brand: "Nillkin",
    category: "cases",
    price: 399,
    compareAt: 599,
    rating: 4.4,
    ratingCount: 8213,
    description:
      "Fingerprint-free matte frosted hard case with anti-slip texture — value-for-money daily cover.",
    image: `${P}/real/cs2.jpg`,
    gallery: [`${P}/real/cs2.jpg`, `${P}/real/cs2-2.jpg`, `${P}/real/cs2-3.jpg`],
    tags: ["redmi-case", "hard-case", "matte", "value-for-money", "budget"],
    specs: [
      { label: "Material", value: "PC frosted hard shell" },
      { label: "Compatible", value: "Redmi Note 13 5G" },
    ],
  },
  {
    id: "cs3",
    title: "DailyObjects Printed Designer Case for iPhone 15 (Geo Pop)",
    brand: "DailyObjects",
    category: "cases",
    price: 799,
    compareAt: 1299,
    rating: 4.5,
    ratingCount: 2103,
    description:
      "Vibrant designer printed case with dual-layer protection and raised edges — made in India, printed in India.",
    image: `${P}/real/cs3.png`,
    gallery: [`${P}/real/cs3.png`, `${P}/real/cs3-2.jpg`, `${P}/real/cs3-3.jpg`],
    tags: ["iphone-case", "printed", "designer", "made-in-india"],
    specs: [
      { label: "Print", value: "High-definition UV print" },
      { label: "Compatible", value: "iPhone 15" },
    ],
  },
  {
    id: "cs4",
    title: "Ringke Fusion Matte Clear Case for Galaxy S24 (Clear)",
    brand: "Ringke",
    category: "cases",
    price: 1099,
    compareAt: 1499,
    rating: 4.5,
    ratingCount: 1874,
    description:
      "Anti-yellowing clear back with shock-absorbing bumper and lanyard hole — show off your S24 in style.",
    image: `${P}/real/cs4.jpg`,
    gallery: [`${P}/real/cs4.jpg`, `${P}/real/cs4-2.jpg`, `${P}/real/cs4-3.jpg`],
    tags: ["samsung-case", "transparent", "clear", "shockproof"],
    specs: [
      { label: "Material", value: "PC + TPU hybrid" },
      { label: "Compatible", value: "Samsung Galaxy S24" },
    ],
  },

  // ==================== SCREEN PROTECTION ====================
  {
    id: "sp1",
    title: "Spigen Glas.tR EZ Fit Tempered Glass for iPhone 15 (2-Pack)",
    brand: "Spigen",
    category: "screen-protection",
    price: 1499,
    compareAt: 1999,
    rating: 4.7,
    ratingCount: 6210,
    description:
      "9H hardness tempered glass with auto-align EZ Fit tray — bubble-free installation in 10 seconds, pack of 2.",
    image: `${P}/real/sp1.jpg`,
    gallery: [`${P}/real/sp1.jpg`, `${P}/real/sp1-2.jpg`, `${P}/real/sp1-3.jpg`],
    tags: ["tempered-glass", "iphone", "9h", "full-cover", "premium"],
    featured: true,
    specs: [
      { label: "Hardness", value: "9H" },
      { label: "Install", value: "EZ Fit auto-align tray" },
      { label: "Pack", value: "2 tempered glasses" },
    ],
  },
  {
    id: "sp2",
    title: "Nillkin Amazing H+ Pro Tempered Glass for Redmi Note 13 5G",
    brand: "Nillkin",
    category: "screen-protection",
    price: 299,
    compareAt: 499,
    rating: 4.4,
    ratingCount: 12403,
    description:
      "0.33mm 9H tempered glass with anti-fingerprint oleophobic coating and complete edge coverage. Includes dust stickers.",
    image: `${P}/real/sp2.jpg`,
    gallery: [`${P}/real/sp2.jpg`, `${P}/real/sp2-2.jpg`, `${P}/real/sp2-3.jpg`],
    tags: ["tempered-glass", "redmi", "9h", "value-for-money", "budget"],
    specs: [
      { label: "Thickness", value: "0.33 mm" },
      { label: "Hardness", value: "9H" },
    ],
  },
  {
    id: "sp3",
    title: "Spigen Privacy Screen Protector for Galaxy S24 (Tempered)",
    brand: "Spigen",
    category: "screen-protection",
    price: 1699,
    compareAt: 2299,
    rating: 4.4,
    ratingCount: 932,
    description:
      "Keep your OTPs and chats private in the metro — 28° privacy filter with 9H tempered glass and full touch sensitivity.",
    image: `${P}/real/sp3.jpg`,
    gallery: [`${P}/real/sp3.jpg`, `${P}/real/sp3-2.jpg`, `${P}/real/sp3-3.jpg`],
    tags: ["privacy-glass", "samsung", "tempered-glass", "matte"],
    specs: [
      { label: "Privacy angle", value: "28°" },
      { label: "Hardness", value: "9H" },
    ],
  },

  // ==================== STANDS & MOUNTS ====================
  {
    id: "st1",
    title: "Portronics Modesk Plus Desktop Phone Stand (Black)",
    brand: "Portronics",
    category: "stands-mounts",
    price: 349,
    compareAt: 599,
    rating: 4.4,
    ratingCount: 21043,
    description:
      "Adjustable aluminium desk stand for video calls, movies and recipes — fits all phones and small tablets.",
    image: `${P}/real/st1.jpg`,
    gallery: [`${P}/real/st1.jpg`, `${P}/real/st1-2.jpg`, `${P}/real/st1-3.jpg`],
    tags: ["desk-stand", "adjustable", "foldable", "value-for-money", "budget"],
    specs: [
      { label: "Angle", value: "Adjustable" },
      { label: "Compatible", value: "Phones & 7–8\" tablets" },
    ],
  },
  {
    id: "st2",
    title: "Spigen O-Mag Magnetic Ring Stand (MagSafe, Black)",
    brand: "Spigen",
    category: "stands-mounts",
    price: 1299,
    compareAt: 1799,
    rating: 4.5,
    ratingCount: 1210,
    description:
      "Magnetic grip ring + kickstand that snaps on MagSafe — secure hold, rotatable viewing and magnetic car mount ready.",
    image: `${P}/real/st2.jpg`,
    gallery: [`${P}/real/st2.jpg`, `${P}/real/st2-2.jpg`, `${P}/real/st2-3.jpg`],
    tags: ["ring-stand", "magsafe", "magnetic", "grip", "premium"],
    specs: [
      { label: "Rotation", value: "360° ring" },
      { label: "MagSafe", value: "Yes" },
    ],
  },
  {
    id: "st3",
    title: "Amkette Pocket Stand Foldable Phone Stand (Black)",
    brand: "Amkette",
    category: "stands-mounts",
    price: 449,
    compareAt: 699,
    rating: 4.3,
    ratingCount: 3204,
    description:
      "Credit-card sized foldable stand that slips into your wallet — perfect for flights, desk and bedside.",
    image: `${P}/real/st3.jpg`,
    gallery: [`${P}/real/st3.jpg`, `${P}/real/st3-2.jpg`, `${P}/real/st3-3.jpg`],
    tags: ["foldable-stand", "travel", "pocket", "value-for-money"],
    specs: [
      { label: "Folded size", value: "Card-sized" },
      { label: "Material", value: "Steel + silicone pads" },
    ],
  },

  // ==================== CAR ACCESSORIES ====================
  {
    id: "ca1",
    title: "boAt Dual Port Rapid Car Charger 38W (Black)",
    brand: "boAt",
    category: "car-accessories",
    price: 499,
    compareAt: 999,
    rating: 4.4,
    ratingCount: 15203,
    description:
      "Dual-port 38W car charger with QC 3.0 + PD — fast-charge two phones together on your next road trip.",
    image: `${P}/real/ca1.jpg`,
    gallery: [`${P}/real/ca1.jpg`, `${P}/real/ca1-2.jpg`, `${P}/real/ca1-3.png`],
    tags: ["car-charger", "fast-car-charger", "multi-port", "qc", "value-for-money"],
    featured: false,
    specs: [
      { label: "Output", value: "38W total (QC3.0 + PD)" },
      { label: "Ports", value: "USB-C + USB-A" },
      { label: "Safety", value: "Over-voltage protection" },
    ],
  },
  {
    id: "ca2",
    title: "Spigen OneTap Magnetic Air Vent Car Mount (Black)",
    brand: "Spigen",
    category: "car-accessories",
    price: 1099,
    compareAt: 1499,
    rating: 4.5,
    ratingCount: 3210,
    description:
      "One-hand magnetic vent mount with powerful neodymium magnets and 360° rotation — holds firm on Indian roads.",
    image: `${P}/real/ca2.jpg`,
    gallery: [`${P}/real/ca2.jpg`, `${P}/real/ca2-2.jpg`, `${P}/real/ca2-3.jpg`],
    tags: ["air-vent-mount", "magnetic-mount", "car-mount", "premium"],
    specs: [
      { label: "Mount type", value: "Air vent, magnetic" },
      { label: "Rotation", value: "360°" },
    ],
  },
  {
    id: "ca3",
    title: "Portronics Auto 10 FM Transmitter with Charger (Black)",
    brand: "Portronics",
    category: "car-accessories",
    price: 1499,
    compareAt: 2499,
    rating: 4.2,
    ratingCount: 5421,
    description:
      "Bluetooth FM transmitter with USB fast charging, hands-free calling and music streaming for older cars.",
    image: `${P}/real/ca3.jpg`,
    gallery: [`${P}/real/ca3.jpg`, `${P}/real/ca3-2.jpg`, `${P}/real/ca3-3.jpg`],
    tags: ["fm-transmitter", "bluetooth-receiver", "car-charger", "hands-free"],
    specs: [
      { label: "Bluetooth", value: "5.0" },
      { label: "Ports", value: "USB + Type-C PD" },
      { label: "Calls", value: "Hands-free mic" },
    ],
  },

  // ==================== CREATOR GEAR ====================
  {
    id: "cg1",
    title: "DJI Osmo Mobile SE Smartphone Gimbal (Grey)",
    brand: "DJI",
    category: "creator-gear",
    price: 8990,
    compareAt: 10990,
    rating: 4.7,
    ratingCount: 2104,
    description:
      "3-axis stabilisation, magnetic quick-release clamp and ActiveTrack 6.0 — vlog-quality footage from any phone.",
    image: `${P}/real/cg1.jpg`,
    gallery: [`${P}/real/cg1.jpg`, `${P}/real/cg1-2.png`, `${P}/real/cg1-3.jpg`],
    tags: ["gimbal", "vlogging", "creator-kit", "new", "premium"],
    featured: true,
    newArrival: true,
    specs: [
      { label: "Stabilisation", value: "3-axis mechanical" },
      { label: "Tracking", value: "ActiveTrack 6.0" },
      { label: "Battery", value: "8 hours" },
    ],
  },
  {
    id: "cg2",
    title: "Digitek DTR 550 LW Tripod with Mobile Holder (Black)",
    brand: "Digitek",
    category: "creator-gear",
    price: 1199,
    compareAt: 1995,
    rating: 4.4,
    ratingCount: 15203,
    description:
      "Lightweight 4.5ft tripod with 360° ball head, mobile holder and Bluetooth remote — India's best-selling starter tripod.",
    image: `${P}/real/cg2.jpg`,
    gallery: [`${P}/real/cg2.jpg`, `${P}/real/cg2-2.jpg`, `${P}/real/cg2-3.jpg`],
    tags: ["tripod", "mini-tripod", "vlogging", "value-for-money", "remote"],
    specs: [
      { label: "Height", value: "Up to 4.5 ft" },
      { label: "Head", value: "360° ball head" },
      { label: "Includes", value: "Mobile holder + BT remote" },
    ],
  },
  {
    id: "cg3",
    title: "Hollyland Lark M1 Wireless Microphone Duo (Black)",
    brand: "Hollyland",
    category: "creator-gear",
    price: 5990,
    compareAt: 7990,
    rating: 4.6,
    ratingCount: 1874,
    description:
      "Dual wireless lav mics with 8h battery, noise cancellation and 200m range — plug-and-play with USB-C and Lightning.",
    image: `${P}/real/cg3.jpg`,
    gallery: [`${P}/real/cg3.jpg`, `${P}/real/cg3-2.jpg`, `${P}/real/cg3-3.webp`],
    tags: ["wireless-microphone", "vlogging", "creator-kit", "premium"],
    featured: true,
    specs: [
      { label: "Mics", value: "2 transmitters + receiver" },
      { label: "Battery", value: "8 h + case 20 h" },
      { label: "Range", value: "200 m LOS" },
    ],
  },
  {
    id: "cg4",
    title: "Emart 10\" Ring Light with Stand & Phone Holder",
    brand: "Emart",
    category: "creator-gear",
    price: 1299,
    compareAt: 1999,
    rating: 4.3,
    ratingCount: 6210,
    description:
      "10-inch LED ring light with 3 colour temperatures, 10 brightness levels and adjustable tripod — for reels, classes and calls.",
    image: `${P}/real/cg4.jpg`,
    gallery: [`${P}/real/cg4.jpg`, `${P}/real/cg4-2.jpg`, `${P}/real/cg4-3.jpg`],
    tags: ["ring-light", "led", "vlogging", "video-light", "value-for-money"],
    specs: [
      { label: "Size", value: "10 inch, 3 colour modes" },
      { label: "Stand", value: "Adjustable up to 1.6 m" },
    ],
  },

  // ==================== STORAGE ====================
  {
    id: "sg1",
    title: "SanDisk Ultra 128GB microSDXC Card (120 MB/s) + Adapter",
    brand: "SanDisk",
    category: "storage",
    price: 949,
    compareAt: 1450,
    rating: 4.6,
    ratingCount: 42105,
    description:
      "128GB microSD with up to 120MB/s read speeds, A1 app performance and full-size SD adapter in the box.",
    image: `${P}/real/sg1.jpg`,
    gallery: [`${P}/real/sg1.jpg`, `${P}/real/sg1-2.jpg`, `${P}/real/sg1-3.jpg`],
    tags: ["microsd", "128gb", "memory-card", "value-for-money", "bestseller"],
    featured: true,
    specs: [
      { label: "Capacity", value: "128 GB" },
      { label: "Speed", value: "Up to 120 MB/s read" },
      { label: "Rating", value: "A1 app class" },
    ],
  },
  {
    id: "sg2",
    title: "Samsung EVO Plus 256GB microSDXC Card (130 MB/s)",
    brand: "Samsung",
    category: "storage",
    price: 1699,
    compareAt: 2399,
    rating: 4.7,
    ratingCount: 18722,
    description:
      "256GB EVO Plus with 4K UHD recording support, 130MB/s read and 10-year limited warranty.",
    image: `${P}/real/sg2.jpg`,
    gallery: [`${P}/real/sg2.jpg`, `${P}/real/sg2-2.jpg`, `${P}/real/sg2-3.jpg`],
    tags: ["microsd", "256gb", "memory-card", "4k"],
    specs: [
      { label: "Capacity", value: "256 GB" },
      { label: "Speed", value: "130 MB/s read" },
      { label: "Warranty", value: "10-year limited" },
    ],
  },
  {
    id: "sg3",
    title: "SanDisk Ultra Dual Drive Luxe 128GB OTG USB-C Flash Drive",
    brand: "SanDisk",
    category: "storage",
    price: 1049,
    compareAt: 1500,
    rating: 4.6,
    ratingCount: 9214,
    description:
      "Dual connector OTG pen drive — USB-C and USB-A in one metal body. Free up phone storage in seconds.",
    image: `${P}/real/sg3.png`,
    gallery: [`${P}/real/sg3.png`, `${P}/real/sg3-2.jpg`, `${P}/real/sg3-3.png`],
    tags: ["pen-drive", "otg", "usb-c", "128gb", "flash-drive"],
    specs: [
      { label: "Connectors", value: "USB-C + USB-A" },
      { label: "Capacity", value: "128 GB" },
      { label: "Body", value: "Metal, retractable" },
    ],
  },

  // ==================== GAMING ====================
  {
    id: "g1",
    title: "Cosmic Byte Mobile Gaming Triggers R1+L1 (Black/Orange)",
    brand: "Cosmic Byte",
    category: "gaming",
    price: 349,
    compareAt: 699,
    rating: 4.2,
    ratingCount: 8213,
    description:
      "Capacitive-conduction triggers for BGMI & Free Fire — squeeze to shoot without lifting your thumbs. Fits all phones.",
    image: `${P}/real/g1.jpg`,
    gallery: [`${P}/real/g1.jpg`, `${P}/real/g1-2.jpg`, `${P}/real/g1-3.jpg`],
    tags: ["gaming-triggers", "bgmi", "free-fire", "value-for-money", "budget"],
    specs: [
      { label: "Type", value: "Capacitive triggers" },
      { label: "Compatible", value: "All smartphones" },
    ],
  },
  {
    id: "g2",
    title: "GameSir G8 Galileo Type-C Mobile Gaming Controller",
    brand: "GameSir",
    category: "gaming",
    price: 5999,
    compareAt: 6999,
    rating: 4.6,
    ratingCount: 1240,
    description:
      "Console-grade telescopic controller with Hall-effect sticks and triggers — turn your phone into a handheld.",
    image: `${P}/real/g2.jpg`,
    gallery: [`${P}/real/g2.jpg`, `${P}/real/g2-2.jpg`, `${P}/real/g2-3.jpg`],
    tags: ["bluetooth-controller", "usb-c-controller", "gaming", "premium", "cloud-gaming"],
    featured: true,
    specs: [
      { label: "Sticks", value: "Hall effect anti-drift" },
      { label: "Connection", value: "USB-C plug & play" },
      { label: "Compatible", value: "Android & iPhone 15+" },
    ],
  },
  {
    id: "g3",
    title: "Black Shark FunCooler 3 Pro Magnetic Phone Cooler",
    brand: "Black Shark",
    category: "gaming",
    price: 2999,
    compareAt: 3999,
    rating: 4.5,
    ratingCount: 2104,
    description:
      "Semiconductor cooling fan drops phone temperature by up to 20°C during long BGMI sessions — with RGB and magnetic clamp.",
    image: `${P}/real/g3.png`,
    gallery: [`${P}/real/g3.png`, `${P}/real/g3-2.jpg`, `${P}/real/g3-3.jpg`],
    tags: ["phone-cooler", "cooling-fan", "gaming", "rgb", "new"],
    newArrival: true,
    specs: [
      { label: "Cooling", value: "Up to −20°C" },
      { label: "Mount", value: "Magnetic + clamp" },
      { label: "Lighting", value: "RGB" },
    ],
  },
  {
    id: "g4",
    title: "Cosmic Byte Aegis Gaming Headset with RGB (Black/Red)",
    brand: "Cosmic Byte",
    category: "gaming",
    price: 1499,
    compareAt: 2499,
    rating: 4.4,
    ratingCount: 10243,
    description:
      "50mm drivers, noise-cancelling boom mic and RGB lighting — India's favourite budget gaming headset.",
    image: `${P}/real/g4.jpg`,
    gallery: [`${P}/real/g4.jpg`, `${P}/real/g4-2.jpg`, `${P}/real/g4-3.jpg`],
    tags: ["gaming-headset", "rgb", "value-for-money", "gaming"],
    specs: [
      { label: "Drivers", value: "50 mm" },
      { label: "Mic", value: "Detachable boom" },
      { label: "Lighting", value: "RGB" },
    ],
  },

  // ==================== PRODUCTIVITY ====================
  {
    id: "pr1",
    title: "Apple Pencil (USB-C)",
    brand: "Apple",
    category: "productivity",
    price: 7900,
    compareAt: 7900,
    rating: 4.7,
    ratingCount: 3210,
    description:
      "Pixel-perfect precision for iPad — attach magnetically, pair and charge via USB-C. Perfect for notes and sketches.",
    image: `${P}/real/pr1.jpg`,
    gallery: [`${P}/real/pr1.jpg`, `${P}/real/pr1-2.jpg`, `${P}/real/pr1-3.png`],
    tags: ["stylus", "apple", "ipad", "drawing", "premium"],
    specs: [
      { label: "Compatibility", value: "iPad 10, iPad Air/Pro" },
      { label: "Charging", value: "USB-C" },
      { label: "Attachment", value: "Magnetic" },
    ],
  },
  {
    id: "pr2",
    title: "Logitech K380 Multi-Device Bluetooth Keyboard (Dark Gray)",
    brand: "Logitech",
    category: "productivity",
    price: 2495,
    compareAt: 2995,
    rating: 4.7,
    ratingCount: 15420,
    description:
      "Type on 3 devices at once — phone, tablet and laptop — with 2-year battery and quiet laptop-style keys.",
    image: `${P}/real/pr2.jpg`,
    gallery: [`${P}/real/pr2.jpg`, `${P}/real/pr2-2.jpg`, `${P}/real/pr2-3.jpg`],
    tags: ["bluetooth-keyboard", "multi-device", "work", "bestseller"],
    featured: true,
    specs: [
      { label: "Devices", value: "3 Easy-Switch channels" },
      { label: "Battery", value: "2 years (2 × AAA)" },
      { label: "OS", value: "Android, iPadOS, Windows, macOS" },
    ],
  },
  {
    id: "pr3",
    title: "Portronics Mport 31C 6-in-1 USB-C Hub (Grey)",
    brand: "Portronics",
    category: "productivity",
    price: 1499,
    compareAt: 2499,
    rating: 4.4,
    ratingCount: 4210,
    description:
      "Turn one USB-C port into six — 4K HDMI, 100W PD passthrough, USB 3.0 ×2 and SD/microSD card reader.",
    image: `${P}/real/pr3.png`,
    gallery: [`${P}/real/pr3.png`, `${P}/real/pr3-2.png`, `${P}/real/pr3-3.jpg`],
    tags: ["usb-c-hub", "card-reader", "hdmi", "work", "value-for-money"],
    specs: [
      { label: "Ports", value: "6-in-1" },
      { label: "Video", value: "4K@30Hz HDMI" },
      { label: "PD", value: "100W passthrough" },
    ],
  },
  {
    id: "pr4",
    title: "Logitech MX Anywhere 3S Wireless Mouse (Graphite)",
    brand: "Logitech",
    category: "productivity",
    price: 6495,
    compareAt: 7495,
    rating: 4.8,
    ratingCount: 3210,
    description:
      "MagSpeed scrolling, 8K DPI tracking on any surface and quiet clicks — the premium travel mouse for work anywhere.",
    image: `${P}/real/pr4.jpg`,
    gallery: [`${P}/real/pr4.jpg`, `${P}/real/pr4-2.jpg`, `${P}/real/pr4-3.jpg`],
    tags: ["bluetooth-mouse", "work", "premium", "new"],
    newArrival: true,
    specs: [
      { label: "DPI", value: "8000, any surface" },
      { label: "Battery", value: "70 days, USB-C quick charge" },
      { label: "Connection", value: "Bluetooth + Bolt" },
    ],
  },

  // ==================== CONNECTIVITY ====================
  {
    id: "cn1",
    title: "JioFi JMR1040 Portable 4G Wi-Fi Hotspot (Black)",
    brand: "Jio",
    category: "connectivity",
    price: 999,
    compareAt: 1999,
    rating: 4.2,
    ratingCount: 15203,
    description:
      "True 4G hotspot for up to 10 devices with 2300mAh battery — reliable internet for travel and work-from-anywhere.",
    image: `${P}/real/cn1.jpg`,
    gallery: [`${P}/real/cn1.jpg`, `${P}/real/cn1-2.jpg`, `${P}/real/cn1-3.png`],
    tags: ["4g-hotspot", "wifi", "portable", "value-for-money", "jio"],
    specs: [
      { label: "Devices", value: "Up to 10 connected" },
      { label: "Battery", value: "2300 mAh" },
      { label: "Network", value: "4G LTE" },
    ],
  },
  {
    id: "cn2",
    title: "TP-Link UB500 Bluetooth 5.3 USB Adapter for PC",
    brand: "TP-Link",
    category: "connectivity",
    price: 1199,
    compareAt: 1599,
    rating: 4.5,
    ratingCount: 6210,
    description:
      "Add Bluetooth 5.3 to any PC or laptop — pair your earbuds, keyboard and phone with stable, low-latency connections.",
    image: `${P}/real/cn2.jpg`,
    gallery: [`${P}/real/cn2.jpg`, `${P}/real/cn2-2.jpg`, `${P}/real/cn2-3.jpg`],
    tags: ["bluetooth-adapter", "usb", "pc", "bluetooth"],
    specs: [
      { label: "Version", value: "Bluetooth 5.3" },
      { label: "Range", value: "Up to 20 m" },
    ],
  },

  // ==================== CLEANING & CARE ====================
  {
    id: "cl1",
    title: "Wolpin 6-in-1 Electronics Cleaning Kit (Phone, Earbuds & Laptop)",
    brand: "Wolpin",
    category: "cleaning-care",
    price: 299,
    compareAt: 499,
    rating: 4.4,
    ratingCount: 12403,
    description:
      "Cleaning pen for earbud meshes, soft brush, spray, microfiber cloth and dust-absorber sheets — keep every gadget spotless.",
    image: `${P}/real/cl1.jpg`,
    gallery: [`${P}/real/cl1.jpg`, `${P}/real/cl1-2.jpg`, `${P}/real/cl1-3.jpg`],
    tags: ["cleaning-kit", "earbud-cleaning", "microfiber", "value-for-money"],
    newArrival: true,
    specs: [
      { label: "Contents", value: "6 tools" },
      { label: "For", value: "Phones, earbuds, laptops" },
    ],
  },
  {
    id: "cl2",
    title: "Scotch-Brite Microfiber Cloth Pack of 3 (Multi-colour)",
    brand: "Scotch-Brite",
    category: "cleaning-care",
    price: 149,
    compareAt: 249,
    rating: 4.5,
    ratingCount: 21043,
    description:
      "Streak-free microfiber cloths for phone screens, tablets, laptops and glasses — lint-free and washable 100+ times.",
    image: `${P}/real/cl2.jpg`,
    gallery: [`${P}/real/cl2.jpg`, `${P}/real/cl2-2.jpg`, `${P}/real/cl2-3.jpg`],
    tags: ["microfiber-cloth", "screen-cleaning", "value-for-money", "pack"],
    specs: [
      { label: "Pack", value: "3 cloths (30 × 30 cm)" },
      { label: "Washable", value: "Yes, 100+ cycles" },
    ],
  },

  // ==================== REFURBISHED ====================
  {
    id: "rf1",
    title: "Refurbished iPhone 13 128GB (Superb Condition)",
    brand: "Apple",
    category: "refurbished",
    price: 38999,
    compareAt: 59900,
    rating: 4.4,
    ratingCount: 821,
    description:
      "Certified refurbished iPhone 13 in superb condition — 40+ point quality check, 6-month Z Shop warranty, new box with cable. No scratches, battery health above 85%.",
    image: `${P}/real/rf1.jpg`,
    gallery: [`${P}/real/rf1.jpg`, `${P}/real/rf1-2.png`, `${P}/real/rf1-3.jpg`],
    tags: ["refurbished", "certified-pre-owned", "ios", "128gb", "value-for-money"],
    specs: [
      { label: "Condition", value: "Superb — no visible scratches" },
      { label: "Battery health", value: "Above 85%" },
      { label: "Warranty", value: "6 months Z Shop warranty" },
      { label: "In box", value: "Device + new charging cable" },
    ],
  },
  {
    id: "rf2",
    title: "Refurbished Samsung Galaxy S21 FE 5G (Superb Condition)",
    brand: "Samsung",
    category: "refurbished",
    price: 19999,
    compareAt: 36999,
    rating: 4.3,
    ratingCount: 612,
    description:
      "Pre-owned Galaxy S21 FE 5G, fully tested on 42+ parameters with 6-month warranty. Flagship experience at half the price.",
    image: `${P}/real/rf2.jpg`,
    gallery: [`${P}/real/rf2.jpg`, `${P}/real/rf2-2.png`, `${P}/real/rf2-3.jpg`],
    tags: ["refurbished", "certified-pre-owned", "android", "5g", "value-for-money"],
    specs: [
      { label: "Condition", value: "Superb" },
      { label: "Warranty", value: "6 months Z Shop warranty" },
    ],
  },
  {
    id: "rf3",
    title: "Refurbished OnePlus Nord 2T 128GB (Good Condition)",
    brand: "OnePlus",
    category: "refurbished",
    price: 14999,
    compareAt: 28999,
    rating: 4.2,
    ratingCount: 431,
    description:
      "Good-condition Nord 2T with minor signs of use, 80W SUPERVOOC charging and 6-month warranty — honest savings on a solid phone.",
    image: `${P}/real/rf3.jpg`,
    gallery: [`${P}/real/rf3.jpg`, `${P}/real/rf3-2.jpg`, `${P}/real/rf3-3.jpg`],
    tags: ["refurbished", "used-phone", "android", "5g", "value-for-money"],
    specs: [
      { label: "Condition", value: "Good — minor marks" },
      { label: "Warranty", value: "6 months Z Shop warranty" },
    ],
  },
  {
    id: "rf4",
    title: "Used iPhone 11 64GB (Good Condition)",
    brand: "Apple",
    category: "refurbished",
    price: 17999,
    compareAt: 43900,
    rating: 4.1,
    ratingCount: 923,
    description:
      "Budget entry into the iPhone world — used iPhone 11 with verified battery health, 6-month warranty and 7-day replacement.",
    image: `${P}/real/rf4.jpg`,
    gallery: [`${P}/real/rf4.jpg`, `${P}/real/rf4-2.png`, `${P}/real/rf4-3.jpg`],
    tags: ["refurbished", "used-phone", "ios", "exchange-device", "value-for-money"],
    specs: [
      { label: "Condition", value: "Good" },
      { label: "Replacement", value: "7-day replacement" },
      { label: "Warranty", value: "6 months Z Shop warranty" },
    ],
  },
];

export const PRODUCT_MAP: Record<string, Product> = Object.fromEntries(
  PRODUCTS.map((p) => [p.id, p])
);

export const BRANDS: string[] = Array.from(new Set(PRODUCTS.map((p) => p.brand))).sort();

export function productsByCategory(categoryId: string): Product[] {
  return PRODUCTS.filter((p) => p.category === categoryId);
}

export function featuredProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function newArrivals(): Product[] {
  return PRODUCTS.filter((p) => p.newArrival);
}

export function dealProducts(): Product[] {
  return PRODUCTS.filter((p) => p.compareAt && p.compareAt > p.price).sort((a, b) => {
    const da = 1 - a.price / (a.compareAt || 1);
    const db = 1 - b.price / (b.compareAt || 1);
    return db - da;
  });
}

export function discountPercent(p: Product): number | null {
  if (!p.compareAt || p.compareAt <= p.price) return null;
  return Math.round((1 - p.price / p.compareAt) * 100);
}

export function relatedProducts(p: Product, count = 4): Product[] {
  const same = PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id);
  const others = PRODUCTS.filter((x) => x.category !== p.category && x.id !== p.id);
  return [...same, ...others].slice(0, count);
}

export function bundleFor(p: Product): Product[] {
  const same = PRODUCTS.filter(
    (x) => x.category === p.category && x.id !== p.id
  ).slice(0, 2);
  if (same.length >= 2) return same;
  return PRODUCTS.filter((x) => x.id !== p.id).slice(0, 2);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);
  return PRODUCTS.filter((p) => {
    const cat = CATEGORY_MAP[p.category];
    const haystack = [p.title, p.brand, cat?.name ?? "", ...(p.tags ?? []), p.description]
      .join(" ")
      .toLowerCase();
    return terms.every((t) => haystack.includes(t));
  }).sort((a, b) => b.rating - a.rating);
}

// ---------- Reviews (deterministic mock) ----------

export interface Review {
  id: string;
  author: string;
  rating: number; // 1..5
  date: string; // relative display date
  title: string;
  body: string;
  verified: boolean;
  helpful: number;
}

const REVIEW_AUTHORS = [
  "Aarav Mehta",
  "Priya Sharma",
  "Rohit Verma",
  "Sneha Iyer",
  "Arjun Reddy",
  "Kavya Nair",
  "Aditya Kumar",
  "Ishita Bose",
  "Vikram Singh",
  "Neha Gupta",
  "Karthik Rao",
  "Ananya Das",
  "Rahul Joshi",
  "Divya Menon",
  "Imran Sheikh",
  "Pooja Bhatt",
];

const REVIEW_CONTENT: Record<number, { title: string; body: string }[]> = {
  5: [
    { title: "Value for money, hands down", body: "Quality is outstanding and delivery was a day early. Packaging was proper and the product feels premium. Would happily buy again from Z Shop." },
    { title: "Absolutely love it", body: "I was a bit skeptical at this price, but after two weeks of daily use I am impressed. Working perfectly with my Jio 5G. Cannot imagine going back." },
    { title: "Best purchase this year", body: "Does everything advertised and then some. Friends have already asked where I got it. Zero regrets — five stars well earned. Genuine product with proper GST invoice." },
    { title: "Fantastic quality", body: "You can tell real thought went into the design. Everything just works, straight out of the box. Highly recommended for the price." },
  ],
  4: [
    { title: "Great overall", body: "Really solid for the price. Docking one star only because the packaging was a bit flimsy — the product itself is excellent and I would buy it again." },
    { title: "Very happy with it", body: "Been using it for a month now with no complaints. A small learning curve at first, but once set up it performs beautifully. COD delivery was smooth." },
    { title: "Close to perfect", body: "Nearly flawless experience. I wish it came in more colours, but performance and build quality are genuinely impressive for the money." },
  ],
  3: [
    { title: "Does the job", body: "It works as described, but I expected slightly better finishing at this price point. Fine if you catch it on sale; hard to recommend at full price." },
    { title: "Good, not great", body: "Halfway through my first week and it is fine so far. Nothing spectacular, nothing broken. A safe middle-of-the-road choice." },
  ],
  2: [
    { title: "Not for me", body: "Had higher hopes based on the other reviews. A couple of small issues appeared within the first week, though customer support was responsive and polite." },
  ],
  1: [
    { title: "Disappointed", body: "Stopped working properly within days of arriving. The return process was easy at least, and the pickup happened next day. Expected better quality control." },
  ],
};

const REVIEW_DAY_GAPS = [2, 4, 9, 14, 21, 33, 47, 62, 88, 120];

function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function relativeDate(daysAgo: number): string {
  if (daysAgo <= 1) return "yesterday";
  if (daysAgo < 7) return `${daysAgo} days ago`;
  if (daysAgo < 30) {
    const w = Math.floor(daysAgo / 7);
    return w === 1 ? "1 week ago" : `${w} weeks ago`;
  }
  const m = Math.floor(daysAgo / 30);
  return m === 1 ? "1 month ago" : `${m} months ago`;
}

/** Deterministic pseudo-random reviews for a product (same output every render/SSR). */
export function reviewsFor(productId: string): Review[] {
  const p = PRODUCT_MAP[productId];
  if (!p) return [];
  const seed = hashString(productId);
  const count = 4 + (seed % 3); // 4..6 reviews
  const rating = p.rating;

  const reviews: { review: Review; daysAgo: number }[] = [];
  const usedAuthorIdx = new Set<number>();
  const usedContentKeys = new Set<string>();
  for (let i = 0; i < count; i++) {
    // deterministic star pick biased by the product rating
    const roll = ((seed >>> (i * 3 + 1)) % 100) / 100;
    let stars: number;
    if (rating >= 4.5) stars = roll < 0.68 ? 5 : roll < 0.94 ? 4 : 3;
    else if (rating >= 4.0) stars = roll < 0.52 ? 5 : roll < 0.9 ? 4 : 3;
    else if (rating >= 3.5) stars = roll < 0.34 ? 5 : roll < 0.74 ? 4 : roll < 0.94 ? 3 : 2;
    else stars = roll < 0.2 ? 5 : roll < 0.55 ? 4 : roll < 0.85 ? 3 : 2;

    const pool = REVIEW_CONTENT[stars];
    let cIdx = (seed >>> (i * 5 + 2)) % pool.length;
    let guard = 0;
    while (usedContentKeys.has(`${stars}:${cIdx}`) && guard < pool.length * 2) {
      cIdx = (cIdx + 1) % pool.length;
      guard++;
    }
    usedContentKeys.add(`${stars}:${cIdx}`);
    const content = pool[cIdx];

    let aIdx = (seed >>> (i * 4 + 3)) % REVIEW_AUTHORS.length;
    guard = 0;
    while (usedAuthorIdx.has(aIdx) && guard < REVIEW_AUTHORS.length) {
      aIdx = (aIdx + 1) % REVIEW_AUTHORS.length;
      guard++;
    }
    usedAuthorIdx.add(aIdx);
    const author = REVIEW_AUTHORS[aIdx];

    const daysAgo = REVIEW_DAY_GAPS[(seed >>> (i * 3 + 5)) % REVIEW_DAY_GAPS.length];

    reviews.push({
      daysAgo,
      review: {
        id: `${productId}-r${i}`,
        author,
        rating: stars,
        date: relativeDate(daysAgo),
        title: content.title,
        body: content.body,
        verified: i % 4 !== 3,
        helpful: 3 + ((seed >>> (i * 6 + 4)) % 46),
      },
    });
  }
  // newest first
  return reviews.sort((a, b) => a.daysAgo - b.daysAgo).map((r) => r.review);
}

/** Deterministic 5→1 star distribution that averages roughly to the product rating. */
export function ratingBreakdown(p: Product): { stars: number; pct: number; count: number }[] {
  const r = p.rating;
  const five = Math.round(Math.min(82, Math.max(25, (r - 2.2) * 34)));
  const one = Math.round(Math.min(18, Math.max(1, (5 - r) * 7)));
  const four = Math.round((100 - five - one) * 0.52);
  const three = Math.round((100 - five - one - four) * 0.55);
  const two = Math.max(0, 100 - five - four - three - one);
  return [five, four, three, two, one].map((pct, i) => ({
    stars: 5 - i,
    pct,
    count: Math.round((pct / 100) * p.ratingCount),
  }));
}
