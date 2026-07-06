import { documents, KnowledgeTag } from "./example-data";

const API_BASE = process.env.NEXT_PUBLIC_OPEN_CAMPUS_API_BASE || "";

export type ChatSource = {
  id: string;
  title: string;
  tags?: KnowledgeTag[];
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
  engineMode?: "course_engine" | "hybrid" | "rag";
  timings?: {
    pre_chat_ms?: number;
    first_delta_ms?: number;
    total_ms?: number;
  };
};

function endpoint(path: string) {
  if (!API_BASE) return path;
  return `${API_BASE.replace(/\/$/, "")}${path}`;
}

export async function askExample(question: string, locale: string): Promise<ChatResponse> {
  const started = performance.now();
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
    const words = normalized
      .split(/[^a-z0-9\u4e00-\u9fff]+/)
      .filter((word) => word.length >= 2);
    const isCourseQuestion = /course|programme|program|major|credit|prerequisite|study plan|选课|選課|课程|課程|专业|專業|学分|學分|先修/i.test(question);
    const scored = documents
      .map((doc) => {
        const text = `${doc.title} ${doc.tags.join(" ")} ${doc.trust} ${doc.summary} ${doc.text}`.toLowerCase();
        const keywordScore = words.reduce((sum, word) => sum + (text.includes(word) ? 1 : 0), 0);
        const routeBoost = isCourseQuestion && doc.tags.includes("courses_programmes") ? 2 : 0;
        const engineBoost = isCourseQuestion && doc.id === "mock-course-engine" ? 3 : 0;
        const trustBoost = doc.trust === "school_official" ? 0.5 : 0;
        const score = keywordScore + routeBoost + engineBoost + trustBoost;
        return { doc, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    const sources = scored.map(({ doc, score }, index) => ({
      id: doc.id,
      title: doc.title,
      tags: doc.tags,
      source_type: doc.trust,
      file_type: doc.type,
      applicable_year: doc.year,
      citation: index + 1,
      relevance: score ? Math.min(96, Math.round(48 + score * 9)) : 32
    }));

    const engineMode = isCourseQuestion ? "course_engine" : "rag";
    const modeLine =
      engineMode === "course_engine"
        ? "Course Engine route selected for this mock answer.\n\n"
        : "";

    return {
      engineMode,
      timings: {
        pre_chat_ms: Math.round(performance.now() - started),
        first_delta_ms: 0,
        total_ms: Math.round(performance.now() - started)
      },
      answer: `${modeLine}This local fallback used mock documents only.\n\n${sources
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
