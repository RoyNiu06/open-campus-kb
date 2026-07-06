const CAMPUS = {
  project: {
    id: "cityuinfo-example",
    name: "CityUInfo Example",
    version: "v3.0.1-example",
    official: false
  },
  locales: ["zh-CN", "zh-HK", "en"],
  repo: "https://github.com/RoyNiu06/open-campus-kb",
  liveReference: "https://cityuinfo.royilab.com",
  plannerUrl: "https://example.edu/study-planner",
  tags: {
    admission_registration: { "zh-CN": "入学注册", "zh-HK": "入學註冊", en: "Admission" },
    courses_programmes: { "zh-CN": "课程与专业", "zh-HK": "課程與專業", en: "Courses" },
    residence: { "zh-CN": "宿舍", "zh-HK": "宿舍", en: "Residence" },
    endorsement_id: { "zh-CN": "签注与身份", "zh-HK": "簽注與身份", en: "Endorsement" },
    it_accounts: { "zh-CN": "IT 与账号", "zh-HK": "IT 與帳號", en: "IT" },
    campus_info: { "zh-CN": "校园信息", "zh-HK": "校園資訊", en: "Campus" },
    hk_life: { "zh-CN": "香港生活", "zh-HK": "香港生活", en: "HK life" },
    encyclopedia: { "zh-CN": "综合百科", "zh-HK": "綜合百科", en: "Encyclopedia" },
    other: { "zh-CN": "其他", "zh-HK": "其他", en: "Other" }
  },
  trust: {
    school_official: { "zh-CN": "学校官方", "zh-HK": "學校官方", en: "School official" },
    student_union_official: { "zh-CN": "学生组织官方", "zh-HK": "學生組織官方", en: "Student organization official" },
    student_notes: { "zh-CN": "同学整理", "zh-HK": "同學整理", en: "Student notes" }
  }
};

const DOCUMENTS = [
  {
    id: "pre-arrival-checklist",
    title: "Pre-arrival Checklist Example",
    tags: ["admission_registration", "hk_life"],
    source_type: "student_notes",
    file_type: "markdown",
    published_month: "2026-07",
    summary: "Mock checklist for documents, accommodation, arrival, account activation, and local setup.",
    text: "Before departure, students should check official deadlines, prepare identity documents and admission letters, confirm accommodation arrangements, save emergency contacts, and plan arrival."
  },
  {
    id: "course-registration-faq",
    title: "Course Registration FAQ Example",
    tags: ["courses_programmes"],
    source_type: "student_notes",
    file_type: "markdown",
    published_month: "2026-07",
    summary: "Mock FAQ for course requirements, registration periods, waitlists, and uncertainty handling.",
    text: "Students should check programme requirements, course offering lists, prerequisite rules, and registration periods. If a course is full, follow the official waitlist or add/drop procedure."
  },
  {
    id: "mock-course-engine",
    title: "Course Engine Mock Programme Data",
    tags: ["courses_programmes"],
    source_type: "school_official",
    file_type: "short_text",
    published_month: "2026-07",
    summary: "Mock structured programme and course evidence for the Course Engine route.",
    text: "The Course Engine stores structured programme profiles, study plan rows, course codes, credits, prerequisites, assessment notes, and official catalogue links."
  },
  {
    id: "upload-review-policy",
    title: "Upload Review Policy Example",
    tags: ["encyclopedia"],
    source_type: "school_official",
    file_type: "markdown",
    published_month: "2026-07",
    summary: "Mock policy showing why uploaded files require admin review before becoming searchable.",
    text: "Uploaded files should not enter the searchable knowledge base automatically. Admin review should check source clarity, publication month, privacy, copyright, trust tier, manual weight, and ingestion status."
  }
];

const norm = (value) => String(value || "").toLowerCase();

function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: { "content-type": "application/json; charset=utf-8", ...(init.headers || {}) }
  });
}

function detectRoute(question) {
  if (/course|programme|program|major|credit|prerequisite|study plan|选课|選課|课程|課程|专业|專業|学分|學分|先修/i.test(question)) {
    return "course_engine";
  }
  if (/upload|review|source|citation|feedback|knowledge|资料|資料|来源|來源|反馈|反饋/i.test(question)) {
    return "hybrid";
  }
  return "rag";
}

function searchDocuments(question, engineMode) {
  const words = norm(question).split(/[^a-z0-9\u4e00-\u9fff]+/).filter((word) => word.length >= 2);
  const scored = DOCUMENTS.map((doc) => {
    const haystack = norm(`${doc.title} ${doc.tags.join(" ")} ${doc.source_type} ${doc.summary} ${doc.text}`);
    const keywordScore = words.reduce((sum, word) => sum + (haystack.includes(word) ? 1 : 0), 0);
    const routeBoost = engineMode === "course_engine" && doc.tags.includes("courses_programmes") ? 2 : 0;
    const engineBoost = engineMode === "course_engine" && doc.id === "mock-course-engine" ? 3 : 0;
    const trustBoost = doc.source_type === "school_official" ? 0.5 : 0;
    return { doc, score: keywordScore + routeBoost + engineBoost + trustBoost };
  });
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(({ doc, score }, index) => ({
      ...doc,
      citation: index + 1,
      relevance: score ? Math.min(96, Math.round(48 + score * 9)) : 32
    }));
}

function buildAnswer(question, locale) {
  const started = Date.now();
  const engineMode = detectRoute(question);
  const sources = searchDocuments(question, engineMode);
  const routeLine =
    engineMode === "course_engine"
      ? "Course Engine route selected. "
      : engineMode === "hybrid"
        ? "Hybrid retrieval route selected. "
        : "";
  const bullets = sources.map((source) => `- [${source.citation}] ${source.summary}`).join("\n");

  return {
    engineMode,
    answer: `${routeLine}This Worker demo used mock reviewed materials only.\n\n${bullets}\n\nReplace this demo with embeddings, a reviewed database, and real citations before production.`,
    sources: sources.map((source) => ({
      id: source.id,
      title: source.title,
      tags: source.tags,
      source_type: source.source_type,
      file_type: source.file_type,
      applicable_year: source.published_month,
      citation: source.citation,
      relevance: source.relevance
    })),
    timings: {
      pre_chat_ms: Date.now() - started,
      first_delta_ms: 0,
      total_ms: Date.now() - started
    },
    locale
  };
}

function streamChat(payload) {
  const encoder = new TextEncoder();
  const body = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(`event: meta\ndata: ${JSON.stringify({ engineMode: payload.engineMode, sources: payload.sources, timings: payload.timings })}\n\n`));
      const parts = payload.answer.match(/.{1,90}(\s|$)/g) || [payload.answer];
      for (const part of parts) {
        controller.enqueue(encoder.encode(`event: delta\ndata: ${JSON.stringify({ text: part })}\n\n`));
      }
      controller.enqueue(encoder.encode(`event: done\ndata: ${JSON.stringify({ ok: true })}\n\n`));
      controller.close();
    }
  });
  return new Response(body, {
    headers: {
      "content-type": "text/event-stream; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

async function uploadDemo(request) {
  const contentType = request.headers.get("content-type") || "";
  let title = "Untitled demo upload";
  let mode = "file";

  if (contentType.includes("application/json")) {
    const body = await request.json().catch(() => ({}));
    title = String(body.title || title).slice(0, 120);
    mode = String(body.mode || mode);
  } else if (contentType.includes("multipart/form-data")) {
    const form = await request.formData().catch(() => null);
    title = String(form?.get("title") || title).slice(0, 120);
    mode = String(form?.get("mode") || mode);
  }

  return json({
    ok: true,
    status: "pending_demo",
    title,
    mode,
    message: "Demo upload accepted. Production deployments should store material privately and wait for admin review before ingestion."
  }, { status: 202 });
}

async function feedbackDemo(request) {
  const body = await request.json().catch(() => ({}));
  return json({
    ok: true,
    status: "stored_demo",
    type: body.type || "suggestion",
    message: "Demo feedback accepted. Production deployments should store feedback server-side with rate limits and abuse checks."
  }, { status: 202 });
}

async function emailNotificationDemo(request) {
  if (request.method === "DELETE") return json({ ok: true, status: "deleted_demo" });
  const body = await request.json().catch(() => ({}));
  return json({
    ok: true,
    status: "bound_demo",
    email: String(body.email || "").slice(0, 160),
    message: "Demo notification address accepted. Production deployments should verify consent and protect this data."
  }, { status: 202 });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/health") return json({ ok: true, project: "open-campus-kb", example: CAMPUS.project.id });
    if (url.pathname === "/api/status") return json({ ok: true, version: CAMPUS.project.version, mode: "mock" });
    if (url.pathname === "/api/config") return json(CAMPUS);
    if (url.pathname === "/api/documents") return json({ documents: DOCUMENTS });
    if (url.pathname === "/api/upload" && request.method === "POST") return uploadDemo(request);
    if (url.pathname === "/api/feedback" && request.method === "POST") return feedbackDemo(request);
    if (url.pathname === "/api/email-notification" && ["POST", "DELETE"].includes(request.method)) return emailNotificationDemo(request);
    if (url.pathname === "/api/chat" && request.method === "POST") {
      const body = await request.json().catch(() => ({}));
      const question = String(body.question || "").trim();
      if (!question) return json({ error: "Question is required." }, { status: 400 });
      const payload = buildAnswer(question, body.locale || "en");
      if (body.stream || request.headers.get("accept")?.includes("text/event-stream")) return streamChat(payload);
      return json(payload);
    }
    return json({
      ok: true,
      message: "OpenCampusKB Worker API demo. Use the Next.js app for the frontend or call /api/chat, /api/documents, /api/upload, /api/feedback, and /api/email-notification."
    });
  }
};
