import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const execAsync = promisify(exec);

const OUT_DIR = path.join(process.cwd(), "public", "products", "real");
const TMP_DIR = path.join(process.cwd(), "scripts", "is-tmp");
fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(TMP_DIR, { recursive: true });

/** productId -> web image-search query (authentic product photos) */
const QUERIES: Record<string, string> = {
  // ---------- Smartphones ----------
  s1: "Samsung Galaxy S24 Ultra titanium gray smartphone official product image",
  s2: "OnePlus 12 silky black smartphone official product image",
  s3: "Google Pixel 8a aloe green smartphone official product image",
  s4: "Nothing Phone 2a Plus transparent smartphone official product image",
  s5: "POCO X6 Pro 5G black smartphone official product image",
  s6: "Redmi Note 13 5G chromatic gray smartphone official product image",
  s7: "realme 12 Pro Plus 5G submarine blue smartphone official product image",
  s8: "Motorola Edge 50 Pro black smartphone official product image",
  s9: "iQOO Z9 5G graphite blue smartphone official product image",
  s10: "vivo V29e artistic blue smartphone official product image",
  s11: "Xiaomi 14 black smartphone official product image",
  s12: "Samsung Galaxy M35 5G thunder blue smartphone official product image",
  // ---------- iPhone ----------
  ip1: "Apple iPhone 15 Pro Max natural titanium official product image",
  ip2: "Apple iPhone 15 blue official product image",
  ip3: "Apple iPhone 14 midnight official product image",
  ip4: "Apple iPhone 13 starlight official product image",
  ip5: "Apple iPhone SE third generation midnight official product image",
  ip6: "Apple iPhone 16 Plus ultramarine official product image",
  // ---------- Feature phones ----------
  f1: "Nokia 105 2023 feature phone official product image",
  f2: "Nokia 150 2023 feature phone official product image",
  f3: "Lava A7 Star keypad mobile phone product image",
  // ---------- Tablets ----------
  t1: "Apple iPad 10th generation blue official product image",
  t2: "Apple iPad Air M2 11 inch space gray official product image",
  t3: "Samsung Galaxy Tab S6 Lite 2024 with S Pen official product image",
  t4: "Redmi Pad SE graphite gray tablet official product image",
  // ---------- Wearables ----------
  w1: "Apple Watch SE 2nd generation 40mm midnight official product image",
  w2: "Samsung Galaxy Watch 6 44mm graphite official product image",
  w3: "OnePlus Watch 2 black steel smartwatch official product image",
  w4: "Noise ColorFit Pro 5 smartwatch jet black official product image",
  w5: "boAt Wave Call 2 smartwatch black official product image",
  w6: "Fastrack Reflex Vox smartwatch black official product image",
  // ---------- Audio ----------
  a1: "Sony WH-1000XM5 black wireless headphones official product image",
  a2: "Sony WH-CH720N black wireless headphones official product image",
  a3: "Apple AirPods Pro 2nd generation USB-C official product image",
  a4: "Nothing Ear a black true wireless earbuds official product image",
  a5: "boAt Airdopes 311 Pro TWS earbuds official product image",
  a6: "boAt Rockerz 235 Pro bluetooth neckband earphones official product image",
  a7: "JBL Tune Beam blue TWS earbuds official product image",
  a8: "JBL Go 3 black portable bluetooth speaker official product image",
  a9: "OnePlus Buds 3 splendid blue earbuds official product image",
  // ---------- Chargers ----------
  c1: "Apple 20W USB-C power adapter official product image",
  c2: "Anker Nano 65W GaN wall charger black product image",
  c3: "Samsung 25W USB-C travel adapter official product image",
  c4: "boAt 25W fast wall charger adapter product image",
  c5: "boAt basePath 15W wireless charging pad product image",
  c6: "Anker MagGo magnetic wireless charger white product image",
  // ---------- Cables ----------
  cb1: "boAt Type-C to Type-C braided fast charging cable product image",
  cb2: "Xiaomi 6A braided Type-C cable product image",
  cb3: "Apple USB-C to Lightning cable 1 meter official product image",
  cb4: "Portronics Konnect 3 in 1 multi charging cable product image",
  // ---------- Power banks ----------
  pb1: "Anker PowerCore 20000mAh power bank black product image",
  pb2: "Mi Pocket Power Bank Pro 10000mAh black product image",
  pb3: "Ambrane Stylo Max 20000mAh power bank product image",
  pb4: "boAt EnergyShroom PB300 magnetic wireless power bank product image",
  // ---------- Cases ----------
  cs1: "Spigen Tough Armor iPhone 15 Pro case black product image",
  cs2: "Nillkin Super Frosted Shield phone case black product image",
  cs3: "DailyObjects designer printed phone case product image",
  cs4: "Ringke Fusion matte clear samsung galaxy case product image",
  // ---------- Screen protection ----------
  sp1: "Spigen Glas.tR EZ Fit tempered glass screen protector iPhone product image",
  sp2: "Nillkin Amazing H+ Pro tempered glass screen protector product image",
  sp3: "privacy tempered glass screen protector for samsung galaxy product image",
  // ---------- Stands ----------
  st1: "Portronics Modesk Plus aluminum desk phone stand product image",
  st2: "Spigen MagSafe magnetic ring stand grip for iphone product image",
  st3: "Amkette foldable pocket phone stand product image",
  // ---------- Car ----------
  ca1: "boAt dual port fast car charger product image",
  ca2: "Spigen OneTap magnetic air vent car mount product image",
  ca3: "Portronics Auto 10 FM transmitter car charger product image",
  // ---------- Creator ----------
  cg1: "DJI Osmo Mobile SE smartphone gimbal official product image",
  cg2: "Digitek DTR 550 LW tripod with mobile holder product image",
  cg3: "Hollyland Lark M1 wireless lavalier microphone product image",
  cg4: "10 inch LED ring light with tripod stand and phone holder product image",
  // ---------- Storage ----------
  sg1: "SanDisk Ultra 128GB microSD memory card with SD adapter product image",
  sg2: "Samsung EVO Plus 256GB microSD memory card product image",
  sg3: "SanDisk Ultra Dual Drive Luxe USB-C OTG flash drive product image",
  // ---------- Gaming ----------
  g1: "Cosmic Byte mobile gaming triggers for BGMI product image",
  g2: "GameSir G8 Galileo Type-C mobile gaming controller product image",
  g3: "Black Shark FunCooler 3 Pro magnetic phone cooler product image",
  g4: "Cosmic Byte Aegis RGB gaming headset product image",
  // ---------- Productivity ----------
  pr1: "Apple Pencil USB-C official product image",
  pr2: "Logitech K380 multi device bluetooth keyboard dark gray product image",
  pr3: "Portronics Mport 31C 6-in-1 USB-C hub adapter product image",
  pr4: "Logitech MX Anywhere 3S graphite wireless mouse product image",
  // ---------- Connectivity ----------
  cn1: "JioFi JMR1040 portable 4G wifi hotspot device product image",
  cn2: "TP-Link UB500 bluetooth 5.3 USB adapter product image",
  // ---------- Cleaning ----------
  cl1: "electronics cleaning kit for phone earbuds laptop with brush and spray product image",
  cl2: "Scotch-Brite microfiber cleaning cloth pack product image",
  // ---------- Refurbished (base device photos) ----------
  rf1: "Apple iPhone 13 midnight official product image",
  rf2: "Samsung Galaxy S21 FE 5G graphite official product image",
  rf3: "OnePlus Nord 2T gray haze official product image",
  rf4: "Apple iPhone 11 black official product image",
};

interface SearchResult {
  success: boolean;
  results?: Array<{ original_url: string; source?: string }>;
  error?: string;
}

function sniffExt(bytes: Uint8Array): string | null {
  if (bytes.length < 12) return null;
  if (bytes[0] === 0xff && bytes[1] === 0xd8) return "jpg";
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return "png";
  if (
    bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
    bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50
  ) return "webp";
  if (bytes[4] === 0x66 && bytes[5] === 0x74 && bytes[6] === 0x79 && bytes[7] === 0x70) return "avif";
  if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) return "gif";
  return null;
}

async function download(url: string): Promise<{ bytes: Buffer; ext: string } | null> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(25_000) });
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 15_000) return null; // too small = broken/thumb
    const ext = sniffExt(buf);
    if (!ext) return null;
    return { bytes: buf, ext };
  } catch {
    return null;
  }
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function searchOne(id: string, query: string, wid: number): Promise<string> {
  // up to 7 attempts; the service rate-limits aggressively (429)
  for (let attempt = 1; attempt <= 7; attempt++) {
    let stdout = "";
    try {
      // NOTE: the CLI's `-o` flag is unreliable (writes nothing) — parse stdout.
      const res = await execAsync(
        `z-ai image-search -q ${JSON.stringify(query)} --count 4 --gl us --no-rank`,
        { timeout: 150_000, maxBuffer: 10 * 1024 * 1024 }
      );
      stdout = res.stdout;
    } catch {
      // CLI exited non-zero (often 429) — back off and retry
      if (attempt < 7) {
        await sleep(30_000 + Math.floor(Math.random() * 20_000));
        continue;
      }
      return `FAIL ${id}: search error after ${attempt} attempts`;
    }
    let data: SearchResult;
    try {
      // stdout has emoji preamble lines before the JSON block
      const brace = stdout.indexOf("{");
      if (brace < 0) throw new Error("no json in stdout");
      data = JSON.parse(stdout.slice(brace));
    } catch {
      // non-JSON output = error text (often 429) — back off and retry
      if (attempt < 7) {
        await sleep(30_000 + Math.floor(Math.random() * 20_000));
        continue;
      }
      return `FAIL ${id}: bad json after ${attempt} attempts`;
    }
    if (!data.success || !data.results || data.results.length === 0) {
      // genuine empty result — a retry rarely helps, but try twice total
      if (attempt < 2) {
        await sleep(20_000);
        continue;
      }
      return `FAIL ${id}: ${data.error ?? "no results"}`;
    }

    // download up to 3 valid variants (main + gallery)
    let saved = 0;
    for (const r of data.results) {
      if (saved >= 3) break;
      if (!r.original_url?.startsWith("http")) continue;
      const dl = await download(r.original_url);
      if (!dl) continue;
      const suffix = saved === 0 ? "" : `-${saved + 1}`;
      fs.writeFileSync(path.join(OUT_DIR, `${id}${suffix}.${dl.ext}`), dl.bytes);
      saved++;
    }
    return saved > 0 ? `OK ${id} (${saved} images)` : `FAIL ${id}: all downloads invalid`;
  }
  return `FAIL ${id}: exhausted`;
}

async function main() {
  const ids = Object.keys(QUERIES);
  const results: string[] = [];
  const CONCURRENCY = 2;
  let idx = 0;

  async function worker(wid: number) {
    while (idx < ids.length) {
      const i = idx++;
      const id = ids[i];
      const line = await searchOne(id, QUERIES[id], wid);
      results.push(line);
      console.log(`[w${wid}] (${results.length}/${ids.length}) ${line}`);
      // gentle pacing between searches
      await sleep(6_000 + Math.floor(Math.random() * 6_000));
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, (_, k) => worker(k + 1)));

  const ok = results.filter((r) => r.startsWith("OK")).length;
  const fail = results.filter((r) => r.startsWith("FAIL"));
  fs.writeFileSync(
    path.join(process.cwd(), "scripts", "real-images-report.json"),
    JSON.stringify({ total: ids.length, ok, failed: fail }, null, 2)
  );
  console.log(`\nDONE: ${ok}/${ids.length} products got real images.`);
  if (fail.length) console.log("Failures:\n" + fail.join("\n"));
}

main().catch((e) => {
  console.error("FATAL", e);
  process.exit(1);
});
