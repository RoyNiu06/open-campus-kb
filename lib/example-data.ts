export type Locale = "zh-CN" | "zh-HK" | "en";

export const locales: Locale[] = ["zh-CN", "zh-HK", "en"];

export const localeLabels: Record<Locale, string> = {
  "zh-CN": "SC",
  "zh-HK": "TC",
  en: "EN"
};

export const campus = {
  name: "CityUInfo Example",
  version: "v3.0.1-example",
  repo: "https://github.com/RoyNiu06/open-campus-kb",
  liveReference: "https://cityuinfo.royilab.com",
  plannerUrl: "https://example.edu/study-planner"
};

export const tags = [
  "admission_registration",
  "courses_programmes",
  "residence",
  "endorsement_id",
  "it_accounts",
  "campus_info",
  "hk_life",
  "encyclopedia",
  "other"
] as const;

export type KnowledgeTag = (typeof tags)[number];

export const tagLabels: Record<KnowledgeTag, Record<Locale, string>> = {
  admission_registration: { "zh-CN": "入学注册", "zh-HK": "入學註冊", en: "Admission" },
  courses_programmes: { "zh-CN": "课程与专业", "zh-HK": "課程與專業", en: "Courses" },
  residence: { "zh-CN": "宿舍", "zh-HK": "宿舍", en: "Residence" },
  endorsement_id: { "zh-CN": "签注与身份", "zh-HK": "簽注與身份", en: "Endorsement" },
  it_accounts: { "zh-CN": "IT 与账号", "zh-HK": "IT 與帳號", en: "IT" },
  campus_info: { "zh-CN": "校园信息", "zh-HK": "校園資訊", en: "Campus" },
  hk_life: { "zh-CN": "香港生活", "zh-HK": "香港生活", en: "HK life" },
  encyclopedia: { "zh-CN": "综合百科", "zh-HK": "綜合百科", en: "Encyclopedia" },
  other: { "zh-CN": "其他", "zh-HK": "其他", en: "Other" }
};

export const dictionaries = {
  "zh-CN": {
    brandSub: "开源校园知识库示例",
    nav: { ask: "问答", kb: "知识库", upload: "上传", about: "说明" },
    title: "CityUInfo Example",
    subtitle: "脱敏示例：Pages 前端 + Worker API，展示资料审核、来源引用、匿名反馈、Course Engine 和 RAG 分流。",
    placeholder: "例如：大一选课一般怎么开始？",
    send: "发送",
    reset: "重置",
    sources: "参考资料",
    empty: "可以询问入学注册、选课、宿舍、签注、校园账号和香港生活。此示例只使用 mock 资料。",
    kbTitle: "知识库",
    kbSubtitle: "示例资料均为脱敏 mock 内容，用于说明标签、来源可信度、文件类型、发布日期和检索来源。",
    uploadTitle: "上传资料",
    uploadSubtitle: "示例上传不保存真实文件。生产环境应先进入后台审核，再解析、切块、embedding 入库。",
    aboutTitle: "关于这个示例",
    aboutBody: "OpenCampusKB 是从 CityUInfo 衍生出的开源通用版，可改造成学校、企业、项目小组或社群知识库。",
    feedback: "反馈",
    like: "有帮助",
    dislike: "没帮助",
    relevanceGuide: "相关度分数来自示例检索分，只用于展示 UI。生产环境可接入向量检索、关键词混合检索、Course Engine 和 rerank。",
    engineCourse: "Course Engine 加速已启动",
    engineHybrid: "Hybrid RAG 已启动"
  },
  "zh-HK": {
    brandSub: "開源校園知識庫示例",
    nav: { ask: "問答", kb: "知識庫", upload: "上傳", about: "說明" },
    title: "CityUInfo Example",
    subtitle: "脫敏示例：Pages 前端 + Worker API，展示資料審核、來源引用、匿名反饋、Course Engine 和 RAG 分流。",
    placeholder: "例如：大一選課一般怎樣開始？",
    send: "發送",
    reset: "重置",
    sources: "參考資料",
    empty: "可以查詢入學註冊、選課、宿舍、簽注、校園帳號和香港生活。此示例只使用 mock 資料。",
    kbTitle: "知識庫",
    kbSubtitle: "示例資料均為脫敏 mock 內容，用於說明標籤、來源可信度、文件類型、發布日期和檢索來源。",
    uploadTitle: "上傳資料",
    uploadSubtitle: "示例上傳不保存真實文件。生產環境應先進入後台審核，再解析、切塊、embedding 入庫。",
    aboutTitle: "關於這個示例",
    aboutBody: "OpenCampusKB 是從 CityUInfo 衍生出的開源通用版，可改造成學校、企業、項目小組或社群知識庫。",
    feedback: "反饋",
    like: "有幫助",
    dislike: "沒幫助",
    relevanceGuide: "相關度分數來自示例檢索分，只用於展示 UI。生產環境可接入向量檢索、關鍵詞混合檢索、Course Engine 和 rerank。",
    engineCourse: "Course Engine 加速已啟動",
    engineHybrid: "Hybrid RAG 已啟動"
  },
  en: {
    brandSub: "Open campus knowledge base example",
    nav: { ask: "Ask", kb: "Knowledge", upload: "Upload", about: "About" },
    title: "CityUInfo Example",
    subtitle: "A desensitized Pages + Worker example for reviewed sources, citations, anonymous feedback, Course Engine routing, and RAG.",
    placeholder: "Example: How does first-year course registration usually start?",
    send: "Send",
    reset: "Reset",
    sources: "Sources",
    empty: "Ask about enrolment, course registration, residence, entry endorsement, campus accounts, or student life. This example uses mock materials only.",
    kbTitle: "Knowledge Base",
    kbSubtitle: "All example materials are mock and desensitized. They demonstrate tags, trust tiers, file types, publication months, and retrieval sources.",
    uploadTitle: "Upload Material",
    uploadSubtitle: "The example upload does not store real files. Production deployments should review uploads before parsing, chunking, embedding, and indexing.",
    aboutTitle: "About This Example",
    aboutBody: "OpenCampusKB is the open-source framework derived from CityUInfo. It can be adapted for schools, companies, project teams, or community knowledge bases.",
    feedback: "Feedback",
    like: "Helpful",
    dislike: "Not helpful",
    relevanceGuide: "Relevance scores come from mock retrieval and only demonstrate the UI. Production can use vector search, hybrid keyword retrieval, Course Engine routing, and reranking.",
    engineCourse: "Course Engine acceleration enabled",
    engineHybrid: "Hybrid RAG enabled"
  }
} as const;

export type KnowledgeDoc = {
  id: string;
  title: string;
  tags: KnowledgeTag[];
  trust: "school_official" | "student_union_official" | "student_notes";
  year: string;
  type: "markdown" | "pdf" | "docx" | "link" | "short_text";
  summary: string;
  text: string;
};

export const documents: KnowledgeDoc[] = [
  {
    id: "pre-arrival-checklist",
    title: "Pre-arrival Checklist Example",
    tags: ["admission_registration", "hk_life"],
    trust: "student_notes",
    year: "2026-07",
    type: "markdown",
    summary: "Mock checklist for documents, accommodation, arrival, account activation, and local setup.",
    text: "Before departure, students should check official deadlines, prepare identity documents and admission letters, confirm accommodation arrangements, save emergency contacts, and plan arrival."
  },
  {
    id: "course-registration-faq",
    title: "Course Registration FAQ Example",
    tags: ["courses_programmes"],
    trust: "student_notes",
    year: "2026-07",
    type: "markdown",
    summary: "Mock FAQ for course requirements, registration periods, waitlists, and uncertainty handling.",
    text: "Students should check programme requirements, course offering lists, prerequisite rules, and registration periods. If a course is full, follow the official waitlist or add/drop procedure."
  },
  {
    id: "mock-course-engine",
    title: "Course Engine Mock Programme Data",
    tags: ["courses_programmes"],
    trust: "school_official",
    year: "2026-07",
    type: "short_text",
    summary: "Mock structured programme and course evidence for the Course Engine route.",
    text: "The Course Engine stores structured programme profiles, study plan rows, course codes, credits, prerequisites, assessment notes, and official catalogue links. It is better for precise course questions than pure RAG."
  },
  {
    id: "housing-faq",
    title: "Residence FAQ Example",
    tags: ["residence"],
    trust: "student_notes",
    year: "2026-07",
    type: "markdown",
    summary: "Mock residence FAQ for check-in preparation and privacy boundaries.",
    text: "For residence check-in, students may need identity documents, admission information, payment records, and documents requested by the housing office."
  },
  {
    id: "campus-it-faq",
    title: "Campus IT Account FAQ Example",
    tags: ["it_accounts"],
    trust: "school_official",
    year: "2026-07",
    type: "link",
    summary: "Mock IT account source for eID, portal, email, Wi-Fi, and learning systems.",
    text: "Students should activate the campus account, check portal access, configure email and Wi-Fi, and follow official IT guidance for account recovery."
  },
  {
    id: "upload-review-policy",
    title: "Upload Review Policy Example",
    tags: ["encyclopedia"],
    trust: "school_official",
    year: "2026-07",
    type: "markdown",
    summary: "Mock policy showing why uploaded files require admin review before becoming searchable.",
    text: "Uploaded files should not enter the searchable knowledge base automatically. Admin review should check source clarity, publication month, privacy, copyright, trust tier, manual weight, and ingestion status."
  }
];

export function trustLabel(value: KnowledgeDoc["trust"], locale: Locale) {
  const labels = {
    school_official: { "zh-CN": "学校官方", "zh-HK": "學校官方", en: "School official" },
    student_union_official: { "zh-CN": "学生组织官方", "zh-HK": "學生組織官方", en: "Student organization official" },
    student_notes: { "zh-CN": "同学整理", "zh-HK": "同學整理", en: "Student notes" }
  };
  return labels[value][locale];
}

export function tagLabel(value: KnowledgeTag, locale: Locale) {
  return tagLabels[value]?.[locale] || value;
}
