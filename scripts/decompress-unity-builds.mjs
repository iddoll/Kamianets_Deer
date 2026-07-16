import { brotliDecompressSync, gunzipSync } from "node:zlib";
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.argv[2] ?? "dist";
const buildsRoot = join(root, "builds");
const isPublicSource = root.replace(/\\/g, "/").endsWith("/public");

for (const gameId of ["game-1", "game-2", "game-3", "game-4"]) {
  const buildDir = join(buildsRoot, gameId, "Build");
  const indexPath = join(buildsRoot, gameId, "index.html");

  if (!existsSync(buildDir)) continue;

  for (const file of readdirSync(buildDir)) {
    const fullPath = join(buildDir, file);

    if (file.endsWith(".br")) {
      const outName = file.slice(0, -3);
      writeFileSync(join(buildDir, outName), brotliDecompressSync(readFileSync(fullPath)));
      console.log(`decompressed ${gameId}/Build/${outName}`);
    } else if (file.endsWith(".gz")) {
      const outName = file.slice(0, -3);
      writeFileSync(join(buildDir, outName), gunzipSync(readFileSync(fullPath)));
      console.log(`decompressed ${gameId}/Build/${outName}`);
    }
  }

  if (!existsSync(indexPath)) continue;

  let html = readFileSync(indexPath, "utf8");
  const patched = html
    .replace(/\.data\.br/g, ".data")
    .replace(/\.framework\.js\.br/g, ".framework.js")
    .replace(/\.wasm\.br/g, ".wasm")
    .replace(/\.data\.gz/g, ".data")
    .replace(/\.framework\.js\.gz/g, ".framework.js")
    .replace(/\.wasm\.gz/g, ".wasm");

  if (patched !== html) {
    writeFileSync(indexPath, patched);
    console.log(`patched ${gameId}/index.html`);
  } else if (!isPublicSource) {
    console.log(`patched ${gameId}/index.html for GitHub Pages`);
  }
}
