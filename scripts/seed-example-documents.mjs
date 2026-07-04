import { readFile, readdir } from "node:fs/promises";
import { join, resolve } from "node:path";

const seedDir = resolve("examples/cityuinfo/seed-documents");

function parseFrontMatter(markdown) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: markdown };
  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    const index = line.indexOf(":");
    if (index === -1) continue;
    const key = line.slice(0, index).trim();
    const raw = line.slice(index + 1).trim();
    meta[key] = raw === "true" ? true : raw === "false" ? false : raw;
  }
  return { meta, body: match[2].trim() };
}

const files = (await readdir(seedDir)).filter((name) => name.endsWith(".md")).sort();
const documents = [];
for (const file of files) {
  const markdown = await readFile(join(seedDir, file), "utf8");
  const { meta, body } = parseFrontMatter(markdown);
  documents.push({
    slug: file.replace(/\.md$/, ""),
    title: meta.title || file,
    category: meta.category || "student_life",
    source_type: meta.source_type || "student_notes",
    official_source: Boolean(meta.official_source),
    applicable_year: meta.applicable_year || null,
    language: meta.language || "mixed",
    status: "published",
    summary: body.split(/\n+/).find((line) => line && !line.startsWith("#")) || "",
    body
  });
}

console.log(JSON.stringify({ documents }, null, 2));
