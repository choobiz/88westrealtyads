import sharp from "sharp";
import { readdirSync, mkdirSync } from "fs";
import { join } from "path";

const INPUT_DIR = "raw-images/stock";
const OUTPUT_DIR = "public/images/deals";

mkdirSync(OUTPUT_DIR, { recursive: true });

const images = [
  // Hero images — 1200px wide, high quality
  { input: "hero-deals.jpg", output: "hero-deals.webp", width: 1200, height: 675, quality: 85 },
  { input: "hero-ftb.jpg", output: "hero-ftb.webp", width: 1200, height: 675, quality: 85 },

  // Deal card images — 800px wide
  { input: "deal-1-burrard.jpg", output: "deal-burrard.webp", width: 800, height: 450, quality: 82 },
  { input: "deal-2-aspire.jpg", output: "deal-aspire.webp", width: 800, height: 450, quality: 82 },
  { input: "deal-3-park.jpg", output: "deal-park.webp", width: 800, height: 450, quality: 82 },
  { input: "deal-4-marine.jpg", output: "deal-marine.webp", width: 800, height: 450, quality: 82 },
  { input: "deal-5-langley.jpg", output: "deal-langley.webp", width: 800, height: 450, quality: 82 },
];

for (const img of images) {
  const inputPath = join(INPUT_DIR, img.input);
  const outputPath = join(OUTPUT_DIR, img.output);

  try {
    const result = await sharp(inputPath)
      .resize(img.width, img.height, { fit: "cover", position: "center" })
      .webp({ quality: img.quality })
      .toFile(outputPath);

    const sizeKB = Math.round(result.size / 1024);
    console.log(`✓ ${img.output} — ${result.width}x${result.height} — ${sizeKB}KB`);
  } catch (err) {
    console.error(`✗ ${img.output} — ${err.message}`);
  }
}

console.log("\nDone! Output directory:", OUTPUT_DIR);
