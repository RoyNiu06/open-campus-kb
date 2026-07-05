import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const outDir = "out";

await mkdir(outDir, { recursive: true });
await writeFile(
  join(outDir, "_redirects"),
  [
    "/* /index.html 200"
  ].join("\n")
);
await writeFile(
  join(outDir, "_headers"),
  [
    "/*",
    "  X-Frame-Options: DENY",
    "  X-Content-Type-Options: nosniff",
    "  Referrer-Policy: strict-origin-when-cross-origin"
  ].join("\n")
);

try {
  await copyFile("examples/cityuinfo/campus.config.example.json", join(outDir, "campus.config.example.json"));
} catch {
  // Optional convenience file for static preview packages.
}

console.log(`Prepared Next Pages output at ${outDir}`);
