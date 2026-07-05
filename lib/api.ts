import { documents } from "./example-data";

const API_BASE = process.env.NEXT_PUBLIC_OPEN_CAMPUS_API_BASE || "";

export type ChatSource = {
  id: string;
  title: string;
  tag?: string;
  category?: string;
  source_type?: string;
  file_type?: string;
  applicable_year?: string;
  citation?: number;
  relevance?: number;
};

export type ChatResponse = {
  answer: string;
  sources: ChatSource[];
};

function endpoint(path: string) {
  if (!API_BASE) return path;
  return `${API_BASE.replace(/\/$/, "")}${path}`;
}

export async function askExample(question: string, locale: string): Promise<ChatResponse> {
  try {
    const response = await fetch(endpoint("/api/chat"), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ question, locale })
    });
    if (!response.ok) throw new Error(`API returned ${response.status}`);
    return await response.json();
  } catch {
    const normalized = question.toLowerCase();
    const scored = documents
      .map((doc) => {
        const text = `${doc.title} ${doc.tag} ${doc.summary} ${doc.text}`.toLowerCase();
        const score = normalized
          .split(/[^a-z0-9\u4e00-\u9fff]+/)
          .filter((word) => word.length >= 2)
          .reduce((sum, word) => sum + (text.includes(word) ? 1 : 0), 0);
        return { doc, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    const sources = scored.map(({ doc, score }, index) => ({
      id: doc.id,
      title: doc.title,
      tag: doc.tag,
      source_type: doc.trust,
      file_type: doc.type,
      applicable_year: doc.year,
      citation: index + 1,
      relevance: score ? Math.min(96, 58 + score * 12) : 36
    }));

    return {
      answer: `This local fallback used mock documents only.\n\n${sources
        .map((source) => `[${source.citation}] ${source.title}`)
        .join("\n")}\n\nReplace this fallback with the Worker API, embeddings, and reviewed sources before production.`,
      sources
    };
  }
}

export async function submitDemoUpload(form: FormData) {
  const response = await fetch(endpoint("/api/upload"), { method: "POST", body: form });
  if (!response.ok) throw new Error(`Upload returned ${response.status}`);
  return response.json();
}
