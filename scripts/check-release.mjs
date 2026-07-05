import { access, readFile, readdir } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { join } from "node:path";

const requiredFiles = [
  "README.md",
  "LICENSE",
  "CHANGELOG.md",
  "CONTRIBUTING.md",
  "SECURITY.md",
  "CODE_OF_CONDUCT.md",
  ".env.example",
  "next.config.mjs",
  "wrangler.example.jsonc",
  "app/layout.tsx",
  "app/page.tsx",
  "app/kb/page.tsx",
  "app/upload/page.tsx",
  "app/about/page.tsx",
  "app/globals.css",
  "components/app-shell.tsx",
  "components/chat-panel.tsx",
  "lib/example-data.ts",
  "lib/api.ts",
  "scripts/prepare-next-pages.mjs",
  "worker/open-campus-worker.mjs",
  "docs/architecture.md",
  "docs/adaptation-guide.md",
  "docs/deployment.md",
  "docs/release-checklist.md",
  "docs/security-and-privacy.md",
  "docs/production-sync-log.md",
  "templates/campus-template/README.md",
  "templates/campus-template/campus.config.json",
  "examples/cityuinfo/README.md",
  "examples/cityuinfo/campus.config.example.json",
  "supabase/migrations/0001_open_campus_kb_schema.sql"
];

const secretPatterns = [
  /sk-or-v1-[A-Za-z0-9_-]+/g,
  /sb_secret_[A-Za-z0-9_-]+/g,
  /sb_publishable_[A-Za-z0-9_-]+/g,
  /ghp_[A-Za-z0-9_]+/g,
  /cfut_[A-Za-z0-9_-]+/g,
  /ADMIN_PASSWORD[ \t]*=[ \t]*[^\r\n#]+/g,
  /SUPABASE_SERVICE_ROLE_KEY[ \t]*=[ \t]*[^\r\n#]+/g,
  /OPENROUTER_API_KEY[ \t]*=[ \t]*[^\r\n#]+/g
];

const ignoredDirs = new Set(["node_modules", ".wrangler", ".git", ".next", "out", "tmp"]);
const textExtensions = new Set([
  ".md",
  ".mjs",
  ".js",
  ".ts",
  ".tsx",
  ".css",
  ".json",
  ".jsonc",
  ".sql",
  ".example",
  ".gitignore"
]);

function fail(message) {
  console.error(`release-check failed: ${message}`);
  process.exitCode = 1;
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir) {
  const out = [];
  for (const item of await readdir(dir, { withFileTypes: true })) {
    if (ignoredDirs.has(item.name)) continue;
    const path = join(dir, item.name);
    if (item.isDirectory()) out.push(...await walk(path));
    else out.push(path);
  }
  return out;
}

function extnameLoose(path) {
  const name = path.replace(/\\/g, "/").split("/").pop() || "";
  if (name === ".gitignore") return ".gitignore";
  if (name.endsWith(".env.example")) return ".example";
  const dot = name.lastIndexOf(".");
  return dot === -1 ? "" : name.slice(dot);
}

for (const file of requiredFiles) {
  if (!await exists(file)) fail(`missing required file: ${file}`);
}

for (const file of [
  "examples/cityuinfo/campus.config.example.json",
  "examples/cityuinfo/mock-site-settings.json",
  "templates/campus-template/campus.config.json",
  "templates/campus-template/site-settings.example.json"
]) {
  try {
    JSON.parse(await readFile(file, "utf8"));
  } catch (error) {
    fail(`invalid JSON in ${file}: ${error.message}`);
  }
}

const syntax = spawnSync(process.execPath, ["--check", "worker/open-campus-worker.mjs"], { encoding: "utf8" });
if (syntax.status !== 0) fail(`Worker syntax check failed:\n${syntax.stderr || syntax.stdout}`);

const seed = spawnSync(process.execPath, ["scripts/seed-example-documents.mjs"], { encoding: "utf8" });
if (seed.status !== 0) fail(`seed script failed:\n${seed.stderr || seed.stdout}`);
else {
  try {
    const parsed = JSON.parse(seed.stdout);
    if (!Array.isArray(parsed.documents) || parsed.documents.length < 1) fail("seed script returned no documents");
  } catch (error) {
    fail(`seed script did not return JSON: ${error.message}`);
  }
}

for (const file of await walk(".")) {
  if (!textExtensions.has(extnameLoose(file))) continue;
  const text = await readFile(file, "utf8");
  for (const pattern of secretPatterns) {
    pattern.lastIndex = 0;
    const match = pattern.exec(text);
    if (match) fail(`possible secret pattern in ${file}: ${match[0].slice(0, 18)}...`);
  }
}

if (process.exitCode) process.exit(process.exitCode);
console.log("release-check passed");
