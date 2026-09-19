import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";
import path from "path";

const OUT = path.join(process.cwd(), "public", "products");
fs.mkdirSync(OUT, { recursive: true });

const BG =
  "professional e-commerce product photography, centered, soft studio lighting, seamless light gray background (#f0f0f0), no text, no watermark, high quality, detailed";

const IMAGES: Array<{ file: string; prompt: string }> = [
  // ---------- Phones ----------
  { file: "iphone-pro.png", prompt: `Premium flagship smartphone with brushed titanium frame and large triple camera module, standing upright at slight angle, ${BG}` },
  { file: "iphone.png", prompt: `Modern smartphone with dual diagonal cameras in pastel blue finish, minimalist product shot, ${BG}` },
  { file: "android-ultra.png", prompt: `Large flagship android smartphone in dark gray titanium with integrated stylus pen placed beside it, quad camera system, ${BG}` },
  { file: "android-flagship.png", prompt: `Sleek android smartphone with large circular triple camera module in deep green, premium curved display, ${BG}` },
  { file: "android-budget.png", prompt: `Modern mid-range android smartphone in matte black with vertical triple camera, thin bezels, ${BG}` },
  { file: "nothing-phone.png", prompt: `Smartphone with fully transparent glass back panel showing internal components and thin white LED light strips, ${BG}` },
  { file: "foldable-phone.png", prompt: `Foldable smartphone half open showing large inner flexible display with slim crease, dark green hinge, ${BG}` },
  { file: "feature-phone.png", prompt: `Classic keypad feature phone with small color screen and large physical buttons in dark blue, retro mobile phone, ${BG}` },

  // ---------- Audio ----------
  { file: "earbuds-white.png", prompt: `Premium white true wireless earbuds with glossy charging case opened, ${BG}` },
  { file: "neckband.png", prompt: `Sporty wireless neckband earphones in matte black with red accents, flexible neck band design, ${BG}` },
  { file: "smartwatch-amoled.png", prompt: `Premium round dial smartwatch with black metal case and fluoroelastomer strap, vibrant AMOLED display, ${BG}` },

  // ---------- Chargers & Power ----------
  { file: "charger.png", prompt: `Compact white GaN fast wall charger with dual USB-C ports, minimal square design, ${BG}` },
  { file: "wireless-charger.png", prompt: `White magnetic wireless charging pad with smartphone lying flat on it, minimal design, ${BG}` },
  { file: "cable.png", prompt: `Braided USB-C to USB-C fast charging cable coiled neatly, black nylon braid with metal connectors, ${BG}` },
  { file: "powerbank.png", prompt: `Slim matte black 20000mAh power bank with dual USB ports and small LED indicators, ${BG}` },

  // ---------- Cases & Protection ----------
  { file: "phone-case.png", prompt: `Crystal clear transparent smartphone case with reinforced corners, floating product shot, ${BG}` },
  { file: "printed-case.png", prompt: `Smartphone case with colorful abstract geometric printed design in warm tones, ${BG}` },
  { file: "tempered-glass.png", prompt: `Tempered glass screen protector being applied to a smartphone with dust removal sticker and microfiber cloth nearby, ${BG}` },

  // ---------- Stands & Mounts ----------
  { file: "phone-stand.png", prompt: `Silver aluminum desktop smartphone stand holding a phone at comfortable viewing angle, ${BG}` },
  { file: "car-mount.png", prompt: `Magnetic air vent car phone mount holding a smartphone inside modern car interior, close-up, ${BG}` },
  { file: "car-charger.png", prompt: `Dual USB-C metal car charger adapter in car 12V socket, dark interior detail shot, ${BG}` },

  // ---------- Creator gear ----------
  { file: "gimbal.png", prompt: `Black foldable 3-axis smartphone gimbal stabilizer with phone mounted, ergonomic grip, ${BG}` },
  { file: "tripod.png", prompt: `Compact aluminum tripod with smartphone mounted on top, flexible legs, ${BG}` },
  { file: "mic.png", prompt: `Wireless lavalier microphone system with two small clip transmitters and charging case, ${BG}` },
  { file: "ring-light.png", prompt: `10 inch LED ring light on tripod stand with smartphone holder centered in the ring, ${BG}` },

  // ---------- Storage ----------
  { file: "microsd.png", prompt: `microSD memory card inserted into SD card adapter, red and gray design, macro product shot, ${BG}` },
  { file: "pendrive.png", prompt: `Dual USB-C flash drive with silver metal body and retractable connector, ${BG}` },

  // ---------- Gaming ----------
  { file: "gaming-trigger.png", prompt: `Mobile gaming trigger buttons attached to top corner of smartphone for shooter games, black and orange, ${BG}` },
  { file: "controller.png", prompt: `Telescopic mobile gaming controller grip with smartphone mounted, black with subtle RGB accents, ${BG}` },
  { file: "phone-cooler.png", prompt: `Magnetic semiconductor phone cooling fan attached to back of smartphone, small RGB fan visible, ${BG}` },

  // ---------- Productivity / Connectivity / Care ----------
  { file: "usb-hub.png", prompt: `6-in-1 USB-C hub adapter with HDMI, ethernet and USB ports in space gray aluminum, ${BG}` },
  { file: "stylus.png", prompt: `White stylus pen for tablet with flat magnetic edge and glossy tip, ${BG}` },
  { file: "hotspot.png", prompt: `Small white portable 4G WiFi hotspot pocket router with LED indicator, ${BG}` },
  { file: "cleaning-kit.png", prompt: `Electronics cleaning kit with spray bottle, microfiber cloth, soft brush and earbud cleaning tools arranged neatly, ${BG}` },
];

async function main() {
  const zai = await ZAI.create();
  const CONCURRENCY = 2;
  let index = 0;
  let done = 0;
  const results: string[] = [];

  async function sleep(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
  }

  async function worker(wid: number) {
    while (index < IMAGES.length) {
      const i = index++;
      const { file, prompt } = IMAGES[i];
      const out = path.join(OUT, file);
      if (fs.existsSync(out) && fs.statSync(out).size > 20000) {
        results.push(`SKIP ${file} (exists)`);
        done++;
        continue;
      }
      for (let attempt = 1; attempt <= 5; attempt++) {
        try {
          const response = await zai.images.generations.create({
            prompt,
            size: "1024x1024",
          });
          const b64 = response?.data?.[0]?.base64;
          if (!b64) throw new Error("empty base64");
          fs.writeFileSync(out, Buffer.from(b64, "base64"));
          results.push(`OK ${file}`);
          done++;
          console.log(`[worker ${wid}] OK (${done}/${IMAGES.length}) ${file}`);
          break;
        } catch (err) {
          const msg = String(err);
          const isRate = msg.includes("429") || msg.toLowerCase().includes("too many");
          console.error(`[worker ${wid}] attempt ${attempt} failed for ${file}: ${msg.slice(0, 120)}`);
          if (attempt === 5) {
            results.push(`FAIL ${file}`);
            done++;
          } else {
            await sleep(isRate ? 12000 * attempt : 2000 * attempt);
          }
        }
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, (_, k) => worker(k + 1)));

  fs.writeFileSync(
    path.join(process.cwd(), "scripts", "gen-images-result.json"),
    JSON.stringify({ total: IMAGES.length, results }, null, 2)
  );
  console.log("DONE. " + results.filter((r) => r.startsWith("OK")).length + " generated, " + results.filter((r) => r.startsWith("SKIP")).length + " skipped, " + results.filter((r) => r.startsWith("FAIL")).length + " failed");
}

main().catch((e) => {
  console.error("FATAL", e);
  process.exit(1);
});
