const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

async function optimizeDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await optimizeDirectory(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if ([".jpg", ".jpeg", ".png"].includes(ext)) {
        try {
          const inputBuffer = fs.readFileSync(fullPath);
          const originalSize = inputBuffer.length;
          
          const image = sharp(inputBuffer);
          const metadata = await image.metadata();

          let pipeline = sharp(inputBuffer);

          // Resize if absurdly large (e.g. > 1600px width/height)
          if (metadata.width > 1600 || metadata.height > 1600) {
            pipeline = pipeline.resize({
              width: metadata.width > metadata.height ? 1600 : undefined,
              height: metadata.height >= metadata.width ? 1600 : undefined,
              fit: "inside",
              withoutEnlargement: true,
            });
          }

          let buffer;
          if (ext === ".png") {
            buffer = await pipeline
              .png({ quality: 80, compressionLevel: 9, effort: 8 })
              .toBuffer();
          } else {
            buffer = await pipeline
              .jpeg({ quality: 82, mozjpeg: true, progressive: true })
              .toBuffer();
          }

          // Only overwrite if optimized buffer is smaller
          if (buffer.length < originalSize) {
            fs.writeFileSync(fullPath, buffer);
            const savedKb = ((originalSize - buffer.length) / 1024).toFixed(1);
            console.log(
              `Optimized: ${entry.name} | ${(originalSize / 1024).toFixed(1)} KB -> ${(buffer.length / 1024).toFixed(1)} KB (Saved ${savedKb} KB)`
            );
          } else {
            console.log(`Skipped: ${entry.name} (${(originalSize / 1024).toFixed(1)} KB)`);
          }
        } catch (err) {
          console.error(`Error optimizing ${fullPath}:`, err.message);
        }
      }
    }
  }
}

async function run() {
  console.log("Starting image optimization with sharp...");
  const publicDir = path.join(__dirname, "..", "public");
  await optimizeDirectory(publicDir);
  console.log("Image optimization complete!");
}

run();
