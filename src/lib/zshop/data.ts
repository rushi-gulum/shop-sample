import type { Category, CurrencyCode, CurrencyInfo, Product } from "./types";

export const CATEGORIES: Category[] = [
  { id: "audio", name: "Audio", blurb: "Headphones, speakers and audio gear" },
  { id: "beauty", name: "Beauty", blurb: "Skincare, makeup and personal care" },
  { id: "books", name: "Books", blurb: "Bestsellers, new releases and classics" },
  { id: "computers", name: "Computers", blurb: "Laptops, accessories and peripherals" },
  { id: "electronics", name: "Electronics", blurb: "Phones, drones, TVs and smart tech" },
  { id: "fashion", name: "Fashion", blurb: "Everyday carry, footwear and style" },
  { id: "grocery", name: "Grocery", blurb: "Gourmet food, drinks and pantry staples" },
  { id: "home-kitchen", name: "Home & Kitchen", blurb: "Appliances and essentials for the home" },
  { id: "sports-outdoors", name: "Sports & Outdoors", blurb: "Training gear and outdoor equipment" },
  { id: "toys-games", name: "Toys & Games", blurb: "Play, build and learn" },
];

export const CATEGORY_MAP: Record<string, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c])
);

export const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  USD: { code: "USD", label: "US Dollar", symbol: "$", rate: 1 },
  EUR: { code: "EUR", label: "Euro", symbol: "€", rate: 0.93 },
  GBP: { code: "GBP", label: "British Pound", symbol: "£", rate: 0.8 },
  CNY: { code: "CNY", label: "Chinese Yuan", symbol: "¥", rate: 7.24 },
  JPY: { code: "JPY", label: "Japanese Yen", symbol: "¥", rate: 156.4 },
};

export const FREE_SHIPPING_THRESHOLD = 99;
export const STANDARD_SHIPPING = 9.99;

export const PROMO_CODES: Record<string, { type: "percent"; value: number; label: string }> = {
  WELCOME15: { type: "percent", value: 15, label: "Welcome offer — 15% off your order" },
  ZPRIME5: { type: "percent", value: 5, label: "Z Prime member — extra 5% off" },
};

const P = "/products";

export const PRODUCTS: Product[] = [
  // ---------- Audio ----------
  {
    id: "a1",
    title: "AirSound Pro Max Wireless Headphones",
    brand: "Soundwave",
    category: "audio",
    price: 349,
    compareAt: 449,
    rating: 4.7,
    ratingCount: 8231,
    description:
      "Active noise cancellation, 40-hour battery, spatial audio, lossless audio via USB-C. Studio-grade sound with plush memory-foam ear cushions.",
    image: `${P}/headphones.jpg`,
    gallery: [`${P}/headphones.jpg`, `${P}/headphones2.jpg`, `${P}/earbuds.jpg`],
    tags: ["headphones", "anc", "wireless", "bestseller"],
    featured: true,
    specs: [
      { label: "Battery life", value: "40 hours" },
      { label: "Noise cancelling", value: "Adaptive ANC" },
      { label: "Connectivity", value: "Bluetooth 5.4 / USB-C" },
      { label: "Weight", value: "268 g" },
    ],
  },
  {
    id: "a2",
    title: "Earbuds X3 Pro Wireless Earbuds",
    brand: "Soundwave",
    category: "audio",
    price: 129.99,
    compareAt: 179.99,
    rating: 4.6,
    ratingCount: 5634,
    description:
      "True wireless earbuds with adaptive ANC, wireless charging case, 30-hour total battery, IPX5 water resistance and crystal-clear calls.",
    image: `${P}/earbuds.jpg`,
    gallery: [`${P}/earbuds.jpg`, `${P}/headphones.jpg`],
    tags: ["earbuds", "anc", "wireless"],
    featured: true,
    specs: [
      { label: "Battery life", value: "8 h + 22 h case" },
      { label: "Water resistance", value: "IPX5" },
      { label: "Charging", value: "USB-C / Qi wireless" },
    ],
  },
  {
    id: "a3",
    title: "BoomBox 360 Bluetooth Speaker",
    brand: "JBLab",
    category: "audio",
    price: 129.99,
    compareAt: 159.99,
    rating: 4.5,
    ratingCount: 3421,
    description:
      "Portable 360° speaker with deep bass, 24-hour playtime, IP67 waterproof rating and party-link pairing for up to 100 speakers.",
    image: `${P}/speaker.jpg`,
    tags: ["speaker", "bluetooth", "party"],
    specs: [
      { label: "Battery life", value: "24 hours" },
      { label: "Water resistance", value: "IP67" },
      { label: "Output", value: "60 W" },
    ],
  },
  {
    id: "a4",
    title: "Studio Monitor Speakers (Pair)",
    brand: "Presonus",
    category: "audio",
    price: 299,
    compareAt: 379,
    rating: 4.8,
    ratingCount: 521,
    description:
      "Active studio monitors with woven-composite woofers, 100W class-AB amplification and accurate, mix-ready sound for creators.",
    image: `${P}/studiospeakers.jpg`,
    tags: ["studio", "monitors", "producer"],
    specs: [
      { label: "Power", value: "2 × 50 W" },
      { label: "Frequency response", value: "45 Hz – 22 kHz" },
      { label: "Inputs", value: "XLR / TRS / RCA" },
    ],
  },

  // ---------- Beauty ----------
  {
    id: "b1",
    title: "HydraBoost Vitamin C Serum",
    brand: "TruSkin",
    category: "beauty",
    price: 24.99,
    compareAt: 39.99,
    rating: 4.6,
    ratingCount: 18734,
    description:
      "20% Vitamin C with Hyaluronic Acid and Vitamin E. Brightens, hydrates, and reduces fine lines.",
    image: `${P}/serum.jpg`,
    tags: ["skincare", "vitamin-c", "bestseller"],
    featured: true,
    specs: [
      { label: "Volume", value: "30 ml" },
      { label: "Key actives", value: "20% Vit C, HA, Vit E" },
      { label: "Skin type", value: "All" },
    ],
  },
  {
    id: "b2",
    title: "Luxe Matte Lipstick Set (6 shades)",
    brand: "Maybelline",
    category: "beauty",
    price: 34.99,
    compareAt: 49.99,
    rating: 4.4,
    ratingCount: 5432,
    description:
      "Long-lasting matte finish, hydrating formula, six everyday shades. Cruelty-free and vegan.",
    image: `${P}/lipstick.jpg`,
    tags: ["makeup", "lipstick", "matte"],
    newArrival: true,
    specs: [
      { label: "Shades", value: "6" },
      { label: "Finish", value: "Matte" },
      { label: "Vegan", value: "Yes" },
    ],
  },
  {
    id: "b3",
    title: "Glow Ritual Face Mask Set",
    brand: "Apricot",
    category: "beauty",
    price: 29,
    compareAt: 39,
    rating: 4.5,
    ratingCount: 987,
    description:
      "Twelve sheet masks with niacinamide, green tea and ceramides for an instant hydrated, lit-from-within glow.",
    image: `${P}/facemask.jpg`,
    tags: ["skincare", "masks", "glow"],
    newArrival: true,
    specs: [
      { label: "Count", value: "12 masks" },
      { label: "Key actives", value: "Niacinamide, ceramides" },
    ],
  },

  // ---------- Books ----------
  {
    id: "k1",
    title: "Atomic Habits Hardcover",
    brand: "Penguin",
    category: "books",
    price: 14.99,
    compareAt: 27,
    rating: 4.8,
    ratingCount: 28743,
    description:
      "An Easy & Proven Way to Build Good Habits & Break Bad Ones. The #1 New York Times bestseller by James Clear.",
    image: `${P}/book.jpg`,
    tags: ["book", "self-help", "bestseller"],
    featured: true,
    specs: [
      { label: "Pages", value: "320" },
      { label: "Format", value: "Hardcover" },
      { label: "Publisher", value: "Avery / Penguin" },
    ],
  },
  {
    id: "k2",
    title: "Sapiens: A Brief History of Humankind",
    brand: "Harper",
    category: "books",
    price: 19.99,
    compareAt: 29.99,
    rating: 4.7,
    ratingCount: 15632,
    description:
      "Yuval Noah Harari explores how biology and history have defined us — from Stone Age bands to the age of AI.",
    image: `${P}/book2.jpg`,
    tags: ["book", "history", "bestseller"],
    specs: [
      { label: "Pages", value: "464" },
      { label: "Format", value: "Paperback" },
    ],
  },
  {
    id: "k3",
    title: "The Pragmatic Programmer, 20th Anniversary",
    brand: "Addison-Wesley",
    category: "books",
    price: 39.99,
    compareAt: 59.99,
    rating: 4.7,
    ratingCount: 3210,
    description:
      "The definitive guide to modern software craftsmanship — updated with new topics, tips and career advice.",
    image: `${P}/book3.jpg`,
    tags: ["book", "coding", "career"],
    specs: [
      { label: "Pages", value: "352" },
      { label: "Format", value: "Paperback" },
    ],
  },

  // ---------- Computers ----------
  {
    id: "c1",
    title: "UltraBook Pro 14\" Laptop, 16GB RAM / 1TB SSD",
    brand: "AsusROG",
    category: "computers",
    price: 1499,
    compareAt: 1699,
    rating: 4.6,
    ratingCount: 4312,
    description:
      "Feather-light aluminum unibody with a 14\" 3K OLED display, latest-gen CPU, 16-hour battery and silent vapor-chamber cooling.",
    image: `${P}/laptop.jpg`,
    tags: ["laptop", "oled", "ultrabook"],
    featured: true,
    specs: [
      { label: "Display", value: "14\" 3K OLED 120Hz" },
      { label: "Memory", value: "16 GB LPDDR5" },
      { label: "Storage", value: "1 TB NVMe SSD" },
      { label: "Battery", value: "Up to 16 hours" },
    ],
  },
  {
    id: "c2",
    title: "MechType RGB Mechanical Keyboard",
    brand: "AsusROG",
    category: "computers",
    price: 149,
    compareAt: 199,
    rating: 4.5,
    ratingCount: 2341,
    description:
      "Hot-swappable tactile switches, per-key RGB, gasket mount, tri-mode connectivity and a knurled aluminum volume knob.",
    image: `${P}/keyboard.jpg`,
    tags: ["keyboard", "mechanical", "rgb"],
    specs: [
      { label: "Layout", value: "75%" },
      { label: "Switches", value: "Hot-swap tactile" },
      { label: "Connectivity", value: "USB-C / 2.4G / BT" },
    ],
  },
  {
    id: "c3",
    title: "GlideMaster Wireless Mouse",
    brand: "AsusROG",
    category: "computers",
    price: 69,
    compareAt: 89,
    rating: 4.4,
    ratingCount: 5432,
    description:
      "26K DPI optical sensor, 8 programmable buttons, 90-hour battery and silent clicks in an ergonomic shell.",
    image: `${P}/mouse.jpg`,
    tags: ["mouse", "wireless", "ergonomic"],
    specs: [
      { label: "Sensor", value: "26,000 DPI" },
      { label: "Battery", value: "90 hours" },
    ],
  },
  {
    id: "c4",
    title: "ViewMax 27\" 4K IPS Monitor",
    brand: "ViewMax",
    category: "computers",
    price: 399,
    compareAt: 499,
    rating: 4.6,
    ratingCount: 1873,
    description:
      "27-inch 4K UHD IPS panel with 99% DCI-P3, USB-C 90W power delivery, height-adjustable stand and factory calibration.",
    image: `${P}/monitor.jpg`,
    tags: ["monitor", "4k", "usb-c"],
    specs: [
      { label: "Panel", value: "27\" IPS 4K" },
      { label: "Color", value: "99% DCI-P3" },
      { label: "Hub", value: "USB-C 90 W" },
    ],
  },

  // ---------- Electronics ----------
  {
    id: "e1",
    title: "Galaxy S24 Ultra Smartphone",
    brand: "Samsong",
    category: "electronics",
    price: 1299,
    compareAt: 1499,
    rating: 4.7,
    ratingCount: 5432,
    description:
      "6.8\" QHD+ AMOLED, Snapdragon 8 Gen 3, 12GB RAM, 512GB storage, 200MP camera with AI-powered editing and S Pen.",
    image: `${P}/smartphone.jpg`,
    tags: ["phone", "android", "flagship"],
    featured: true,
    specs: [
      { label: "Display", value: "6.8\" QHD+ AMOLED" },
      { label: "Camera", value: "200 MP quad" },
      { label: "Storage", value: "512 GB" },
      { label: "Battery", value: "5,000 mAh" },
    ],
  },
  {
    id: "e2",
    title: "RC Drone Pro 4K with GPS",
    brand: "DJI",
    category: "electronics",
    price: 449,
    compareAt: 599,
    rating: 4.6,
    ratingCount: 892,
    description:
      "4K camera drone with 3-axis gimbal, 30-min flight, GPS return-to-home, foldable design.",
    image: `${P}/drone.jpg`,
    tags: ["drone", "camera", "gps"],
    newArrival: true,
    specs: [
      { label: "Camera", value: "4K/60 with 3-axis gimbal" },
      { label: "Flight time", value: "30 minutes" },
      { label: "Range", value: "10 km" },
    ],
  },
  {
    id: "e3",
    title: "FitTrack Smartwatch Series 9",
    brand: "Samsong",
    category: "electronics",
    price: 399,
    compareAt: 449,
    rating: 4.5,
    ratingCount: 6543,
    description:
      "Always-on LTPO display, ECG and SpO2 tracking, dual-band GPS, crash detection and 36-hour battery in titanium.",
    image: `${P}/smartwatch.jpg`,
    tags: ["watch", "fitness", "wearable"],
    specs: [
      { label: "Display", value: "1.9\" always-on LTPO" },
      { label: "Battery", value: "36 hours" },
      { label: "Sensors", value: "ECG, SpO2, GPS" },
    ],
  },
  {
    id: "e4",
    title: "TabPro 11\" Tablet 256GB",
    brand: "Samsong",
    category: "electronics",
    price: 799,
    compareAt: 899,
    rating: 4.6,
    ratingCount: 2109,
    description:
      "11-inch 120Hz LCD, quad speakers, desktop-class chipset and stylus support — a laptop alternative in tablet form.",
    image: `${P}/tablet.jpg`,
    tags: ["tablet", "stylus", "120hz"],
    specs: [
      { label: "Display", value: "11\" 120 Hz" },
      { label: "Storage", value: "256 GB" },
      { label: "Audio", value: "Quad speakers" },
    ],
  },
  {
    id: "e5",
    title: "Cinema 65\" 4K OLED TV",
    brand: "ViewMax",
    category: "electronics",
    price: 1299,
    compareAt: 1799,
    rating: 4.8,
    ratingCount: 987,
    description:
      "Self-lit OLED with infinite contrast, 144Hz gaming mode, Dolby Vision IQ and an ultra-slim Gallery design.",
    image: `${P}/tv.jpg`,
    tags: ["tv", "oled", "4k"],
    specs: [
      { label: "Panel", value: "65\" 4K OLED" },
      { label: "Refresh", value: "144 Hz" },
      { label: "HDR", value: "Dolby Vision IQ" },
    ],
  },
  {
    id: "e6",
    title: "AquaFresh Sonic Toothbrush",
    brand: "Philips",
    category: "electronics",
    price: 79.99,
    compareAt: 99.99,
    rating: 4.5,
    ratingCount: 15432,
    description:
      "Sonic electric toothbrush with smart pressure sensor, 5 modes, 2-week battery and travel case.",
    image: `${P}/toothbrush.jpg`,
    tags: ["toothbrush", "sonic", "care"],
    newArrival: true,
    specs: [
      { label: "Modes", value: "5" },
      { label: "Battery", value: "2 weeks" },
      { label: "Timer", value: "2-min smart" },
    ],
  },

  // ---------- Fashion ----------
  {
    id: "f1",
    title: "Classic Leather Sneakers",
    brand: "Feather",
    category: "fashion",
    price: 89.99,
    compareAt: 129.99,
    rating: 4.5,
    ratingCount: 3421,
    description:
      "Full-grain leather sneakers with cushioned insole, breathable lining, durable rubber outsole. Goes with everything.",
    image: `${P}/sneakers.jpg`,
    tags: ["sneakers", "leather", "unisex"],
    featured: true,
    specs: [
      { label: "Upper", value: "Full-grain leather" },
      { label: "Sole", value: "Vulcanized rubber" },
      { label: "Sizes", value: "US 6 – 13" },
    ],
  },
  {
    id: "f2",
    title: "Metro Organizer Backpack 20L",
    brand: "Bellroy",
    category: "fashion",
    price: 139,
    compareAt: 169,
    rating: 4.7,
    ratingCount: 2156,
    description:
      "Water-resistant woven fabric, padded 16\" laptop bay, quick-access pockets and a comfy contoured back panel.",
    image: `${P}/backpack.jpg`,
    tags: ["backpack", "commute", "laptop"],
    specs: [
      { label: "Capacity", value: "20 L" },
      { label: "Laptop", value: "Up to 16\"" },
      { label: "Material", value: "Recycled weave" },
    ],
  },
  {
    id: "f3",
    title: "Slimline Leather Wallet",
    brand: "Bellroy",
    category: "fashion",
    price: 59,
    compareAt: 79,
    rating: 4.6,
    ratingCount: 4321,
    description:
      "Premium vegetable-tanned leather with quick-draw card access, RFID protection and slim everyday profile.",
    image: `${P}/wallet.jpg`,
    tags: ["wallet", "leather", "rfid"],
    specs: [
      { label: "Cards", value: "Up to 12" },
      { label: "Material", value: "Veg-tanned leather" },
    ],
  },

  // ---------- Home & Kitchen ----------
  {
    id: "h1",
    title: "AirFry Max XL Air Fryer",
    brand: "Ninja",
    category: "home-kitchen",
    price: 119.99,
    compareAt: 159.99,
    rating: 4.7,
    ratingCount: 8901,
    description:
      "6-quart digital air fryer with 8 presets, dual-fan technology, dishwasher-safe basket. Healthier frying with up to 75% less fat.",
    image: `${P}/airfryer.jpg`,
    tags: ["airfryer", "kitchen", "healthy"],
    featured: true,
    specs: [
      { label: "Capacity", value: "6 qt" },
      { label: "Presets", value: "8" },
      { label: "Power", value: "1,750 W" },
    ],
  },
  {
    id: "h2",
    title: "Barista Express Espresso Machine",
    brand: "BrewMaster",
    category: "home-kitchen",
    price: 549,
    compareAt: 699,
    rating: 4.8,
    ratingCount: 3421,
    description:
      "Built-in conical burr grinder, PID temperature control, microfoam steam wand and 15-bar Italian pump for café-quality espresso.",
    image: `${P}/espresso.jpg`,
    tags: ["espresso", "coffee", "cafe"],
    specs: [
      { label: "Grinder", value: "Conical burr, 30 settings" },
      { label: "Pressure", value: "15 bar" },
      { label: "Water tank", value: "2 L" },
    ],
  },
  {
    id: "h3",
    title: "CleanBot Robot Vacuum X20",
    brand: "Ninja",
    category: "home-kitchen",
    price: 429,
    compareAt: 599,
    rating: 4.5,
    ratingCount: 6543,
    description:
      "LiDAR navigation, 5,000 Pa suction, self-emptying base, mopping module and app scheduling with room mapping.",
    image: `${P}/vacuum.jpg`,
    tags: ["vacuum", "robot", "smart-home"],
    specs: [
      { label: "Suction", value: "5,000 Pa" },
      { label: "Base", value: "Self-empty 60 days" },
      { label: "Runtime", value: "180 minutes" },
    ],
  },
  {
    id: "h4",
    title: "ChefPro 10-Piece Knife Set",
    brand: "BrewMaster",
    category: "home-kitchen",
    price: 129,
    compareAt: 179,
    rating: 4.6,
    ratingCount: 1234,
    description:
      "German stainless steel knives with full-tang balance, ergonomic handles, acacia wood block and built-in sharpener.",
    image: `${P}/knives.jpg`,
    tags: ["knives", "kitchen", "steel"],
    specs: [
      { label: "Pieces", value: "10" },
      { label: "Steel", value: "German X50CrMoV15" },
    ],
  },

  // ---------- Sports & Outdoors ----------
  {
    id: "s1",
    title: "Adjustable Dumbbell Set 5-52.5 lbs",
    brand: "Bowflex",
    category: "sports-outdoors",
    price: 429,
    compareAt: 529,
    rating: 4.8,
    ratingCount: 3421,
    description:
      "Space-saving adjustable dumbbells, replaces 15 sets. Quick-select weight dial system.",
    image: `${P}/dumbbells.jpg`,
    tags: ["dumbbells", "strength", "home-gym"],
    featured: true,
    specs: [
      { label: "Weight range", value: "5 – 52.5 lbs" },
      { label: "Increments", value: "2.5 lbs" },
      { label: "Replaces", value: "15 dumbbell sets" },
    ],
  },
  {
    id: "s2",
    title: "ZenFlow Premium Yoga Mat",
    brand: "Bowflex",
    category: "sports-outdoors",
    price: 39,
    compareAt: 59,
    rating: 4.6,
    ratingCount: 8765,
    description:
      "6mm natural rubber mat with non-slip texture, alignment lines, carry strap and closed-cell sweat-proof surface.",
    image: `${P}/yogamat.jpg`,
    tags: ["yoga", "mat", "fitness"],
    specs: [
      { label: "Thickness", value: "6 mm" },
      { label: "Material", value: "Natural rubber" },
    ],
  },
  {
    id: "s3",
    title: "AeroShell Cycling Helmet",
    brand: "Feather",
    category: "sports-outdoors",
    price: 89,
    compareAt: 119,
    rating: 4.5,
    ratingCount: 987,
    description:
      "In-mold polycarbonate shell with rotational impact protection, 18 vents, dial fit system and rear LED light.",
    image: `${P}/helmet.jpg`,
    tags: ["helmet", "cycling", "safety"],
    specs: [
      { label: "Vents", value: "18" },
      { label: "Safety", value: "Rotational impact" },
      { label: "Light", value: "Rear LED" },
    ],
  },

  // ---------- Grocery ----------
  {
    id: "g1",
    title: "Artisan Olive Oil Trio Gift Set",
    brand: "Brightland",
    category: "grocery",
    price: 79,
    compareAt: 99,
    rating: 4.7,
    ratingCount: 432,
    description:
      "Three premium extra-virgin olive oils from California, Italy, and Spain. Beautifully packaged.",
    image: `${P}/oliveoil.jpg`,
    tags: ["olive-oil", "gourmet", "gift"],
    newArrival: true,
    featured: true,
    specs: [
      { label: "Bottles", value: "3 × 375 ml" },
      { label: "Origin", value: "CA / IT / ES" },
    ],
  },
  {
    id: "g2",
    title: "Premium Matcha Green Tea Powder 100g",
    brand: "Encha",
    category: "grocery",
    price: 39,
    compareAt: 49,
    rating: 4.6,
    ratingCount: 1876,
    description:
      "Ceremonial-grade Japanese matcha from Uji. Stone-ground, vibrant green, smooth flavor.",
    image: `${P}/matcha.jpg`,
    tags: ["matcha", "tea", "organic"],
    newArrival: true,
    specs: [
      { label: "Grade", value: "Ceremonial" },
      { label: "Origin", value: "Uji, Japan" },
      { label: "Net weight", value: "100 g" },
    ],
  },
  {
    id: "g3",
    title: "Organic Cold Brew Coffee Concentrate 32oz",
    brand: "Grady's",
    category: "grocery",
    price: 24.99,
    compareAt: 29.99,
    rating: 4.5,
    ratingCount: 3421,
    description:
      "Smooth, low-acid cold brew concentrate. Just add water or milk. Makes 16 servings.",
    image: `${P}/coldbrew.jpg`,
    tags: ["coffee", "cold-brew", "organic"],
    newArrival: true,
    specs: [
      { label: "Volume", value: "32 oz" },
      { label: "Servings", value: "16" },
      { label: "Roast", value: "Medium" },
    ],
  },

  // ---------- Toys & Games ----------
  {
    id: "t1",
    title: "BrainBoost STEM Robot Kit",
    brand: "Makeblock",
    category: "toys-games",
    price: 89.99,
    compareAt: 109.99,
    rating: 4.6,
    ratingCount: 567,
    description:
      "Build and code your own robot with 50+ parts, sensors, and app-based programming in Scratch and Python.",
    image: `${P}/robotkit.jpg`,
    tags: ["stem", "robot", "coding"],
    newArrival: true,
    specs: [
      { label: "Parts", value: "50+" },
      { label: "Coding", value: "Scratch / Python" },
      { label: "Age", value: "8+" },
    ],
  },
  {
    id: "t2",
    title: "BuildBlox Space Station 1200pc",
    brand: "LEGO",
    category: "toys-games",
    price: 99.99,
    compareAt: 129.99,
    rating: 4.8,
    ratingCount: 2341,
    description:
      "Build an epic space station with 1200 pieces, 6 minifigures, motorized parts. Hours of creative play.",
    image: `${P}/lego.jpg`,
    tags: ["building", "space", "creative"],
    newArrival: true,
    specs: [
      { label: "Pieces", value: "1200" },
      { label: "Minifigures", value: "6" },
      { label: "Age", value: "9+" },
    ],
  },
  {
    id: "t3",
    title: "CuddleCloud Teddy Bear 18\"",
    brand: "Playful Co.",
    category: "toys-games",
    price: 29.99,
    compareAt: 39.99,
    rating: 4.7,
    ratingCount: 4321,
    description:
      "Ultra-soft plush teddy bear with embroidered eyes, recycled filling and a machine-washable hug-ready body.",
    image: `${P}/teddy.jpg`,
    tags: ["plush", "teddy", "gift"],
    specs: [
      { label: "Height", value: "18 inches" },
      { label: "Material", value: "Recycled plush" },
    ],
  },
  {
    id: "t4",
    title: "Quest Realms Strategy Board Game",
    brand: "Playful Co.",
    category: "toys-games",
    price: 34.99,
    compareAt: 49.99,
    rating: 4.7,
    ratingCount: 876,
    description:
      "A cooperative adventure board game with modular maps, 5 heroes, 60-minute sessions and endless replayability.",
    image: `${P}/boardgame.jpg`,
    tags: ["boardgame", "strategy", "family"],
    specs: [
      { label: "Players", value: "1 – 5" },
      { label: "Play time", value: "45 – 60 min" },
      { label: "Age", value: "10+" },
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
  "Priya Sharma",
  "Marcus Chen",
  "Elena Rodriguez",
  "Tom Okafor",
  "Hana Kim",
  "Jonas Müller",
  "Ava Thompson",
  "Leo Fernández",
  "Mei Lin",
  "Sam Patel",
  "Nora Haddad",
  "Chris Novak",
];

const REVIEW_CONTENT: Record<number, { title: string; body: string }[]> = {
  5: [
    { title: "Exceeded expectations", body: "Quality is outstanding and it arrived a day early. The details feel premium and it does exactly what it promises. Would happily buy again." },
    { title: "Absolutely love it", body: "I was a bit skeptical at this price, but after two weeks of daily use I am impressed. It has become part of my routine and I cannot imagine going back." },
    { title: "Best purchase this year", body: "Does everything advertised and then some. Friends have already asked where I got it. Zero regrets — five stars well earned." },
    { title: "Fantastic quality", body: "You can tell real thought went into the design. Everything just works, straight out of the box. Highly recommended." },
  ],
  4: [
    { title: "Great overall", body: "Really solid for the price. Docking one star only because the packaging was a bit flimsy — the product itself is excellent and I would buy it again." },
    { title: "Very happy with it", body: "Been using it for a month now with no complaints. A small learning curve at first, but once set up it performs beautifully." },
    { title: "Close to perfect", body: "Nearly flawless experience. I wish it came in more colors, but performance and build quality are genuinely impressive for the money." },
  ],
  3: [
    { title: "Does the job", body: "It works as described, but I expected slightly better finishing at this price point. Fine if you catch it on sale; hard to recommend at full price." },
    { title: "Good, not great", body: "Halfway through my first week and it is fine so far. Nothing spectacular, nothing broken. A safe middle-of-the-road choice." },
  ],
  2: [
    { title: "Not for me", body: "Had higher hopes based on the other reviews. A couple of small issues appeared within the first week, though customer support was responsive and polite." },
  ],
  1: [
    { title: "Disappointed", body: "Stopped working properly within days of arriving. The return process was easy at least, but I expected much better quality control." },
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
