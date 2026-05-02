import sharp from "sharp";
import { stat, readFile } from "node:fs/promises";

const TASKS = [
  // [src, outBase, targetWidth, quality]
  ["public/images/developer/hero-vancouver-skyline.jpg", "public/images/developer/hero-vancouver-skyline", 1920, 78],
  ["public/images/shared/properties/condo-modern-glass.jpg", "public/images/shared/properties/condo-modern-glass", 1000, 78],
  ["public/images/shared/properties/condo-minimalist.jpg", "public/images/shared/properties/condo-minimalist", 1000, 78],
  ["public/images/shared/properties/condo-courtyard.jpg", "public/images/shared/properties/condo-courtyard", 1000, 78],
  ["public/images/shared/properties/townhouse-brick.jpg", "public/images/shared/properties/townhouse-brick", 1000, 78],
  ["public/images/shared/properties/detached-craftsman.jpg", "public/images/shared/properties/detached-craftsman", 1000, 78],
  ["public/images/shared/properties/detached-suburban.jpg", "public/images/shared/properties/detached-suburban", 1000, 78],
  ["public/images/shared/lifestyle/investor-laptop.jpg", "public/images/shared/lifestyle/investor-laptop", 1200, 80],
  ["public/images/shared/lifestyle/owner-keys.jpg", "public/images/shared/lifestyle/owner-keys", 1200, 80],
];

for (const [src, outBase, w, q] of TASKS) {
  const before = (await stat(src)).size;
  const buf = await readFile(src);
  const pipeline = sharp(buf).resize({ width: w, withoutEnlargement: true });
  await pipeline.clone().jpeg({ quality: q, mozjpeg: true }).toFile(`${outBase}.jpg`);
  await pipeline.clone().webp({ quality: q }).toFile(`${outBase}.webp`);
  const jpgAfter = (await stat(`${outBase}.jpg`)).size;
  const webpAfter = (await stat(`${outBase}.webp`)).size;
  console.log(
    `${outBase}: ${(before/1024).toFixed(0)}KB → jpg ${(jpgAfter/1024).toFixed(0)}KB · webp ${(webpAfter/1024).toFixed(0)}KB`,
  );
}
