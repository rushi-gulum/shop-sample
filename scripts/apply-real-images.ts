/**
 * Rewrites src/lib/zshop/data.ts so every product with downloaded real images
 * (public/products/real/<id>.*[,-2,-3]) points at them. Products without a
 * downloaded image keep their current (AI-generated) image as fallback.
 */
import fs from "fs";
import path from "path";
import { PRODUCTS } from "../src/lib/zshop/data";

const ROOT = process.cwd();
const REAL_DIR = path.join(ROOT, "public", "products", "real");
const DATA_TS = path.join(ROOT, "src", "lib", "zshop", "data.ts");

// map id -> sorted variants [{file, ext}]
const variants = new Map<string, string[]>();
for (const f of fs.readdirSync(REAL_DIR)) {
  const m = f.match(/^(.+?)(-2|-3)?\.(jpg|png|webp|avif|gif)$/);
  if (!m) continue;
  const id = m[1];
  const rank = m[2] ? (m[2] === "-2" ? 1 : 2) : 0;
  const list = variants.get(id) ?? [];
  list[rank] = f;
  variants.set(id, list);
}

let src = fs.readFileSync(DATA_TS, "utf8");
let updatedImage = 0;
let updatedGallery = 0;
let kept = 0;
const missing: string[] = [];

for (const p of PRODUCTS) {
  const files = (variants.get(p.id) ?? []).filter(Boolean);
  if (files.length === 0) {
    missing.push(p.id);
    continue;
  }

  const start = src.indexOf(`id: "${p.id}",`);
  if (start < 0) continue;
  const nextId = src.indexOf('id: "', start + 10);
  const end = nextId < 0 ? src.indexOf("\n];", start) : nextId;
  const segStart = src.lastIndexOf("{", start);
  const segEndCandidate = nextId < 0 ? src.indexOf("\n];", start) : src.lastIndexOf("},", nextId);
  const segEnd = segEndCandidate + 2;
  const seg = src.slice(segStart, segEnd);
  let newSeg = seg;

  const mainFile = files[0];
  const imageRe = /image: `\$\{P\}\/[^`]+`,/;
  if (imageRe.test(newSeg)) {
    newSeg = newSeg.replace(
      imageRe,
      `image: \`\${P}/real/${mainFile}\`,`
    );
    updatedImage++;
  }

  const galleryRe = /gallery: \[[^\]]*\],\n/;
  if (files.length >= 2) {
    const galleryItems = files
      .slice(0, 3)
      .map((f) => `\`\${P}/real/${f}\``)
      .join(", ");
    const galleryLine = `gallery: [${galleryItems}],\n`;
    if (galleryRe.test(newSeg)) {
      newSeg = newSeg.replace(galleryRe, galleryLine);
    } else {
      // no gallery existed — insert after image line
      newSeg = newSeg.replace(
        /(image: `\$\{P\}\/real\/[^`]+`,\n)/,
        `$1    ${galleryLine}`
      );
    }
    updatedGallery++;
  } else if (galleryRe.test(newSeg)) {
    // only one real image → drop gallery (it pointed at old mixed images)
    newSeg = newSeg.replace(galleryRe, "");
  }

  src = src.slice(0, segStart) + newSeg + src.slice(segEnd);
}

fs.writeFileSync(DATA_TS, src);
console.log(
  `data.ts updated: ${updatedImage} images re-pointed, ${updatedGallery} galleries rebuilt, ${kept} untouched, ${missing.length} without real image: ${missing.join(", ") || "none"}`
);
