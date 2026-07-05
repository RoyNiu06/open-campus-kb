export type Locale = "zh-CN" | "zh-HK" | "en";

export const locales: Locale[] = ["zh-CN", "zh-HK", "en"];

export const localeLabels: Record<Locale, string> = {
  "zh-CN": "SC",
  "zh-HK": "TC",
  en: "EN"
};

export const campus = {
  name: "CityUInfo Example",
  version: "v2.4.0-example",
  repo: "https://github.com/RoyNiu06/open-campus-kb",
  liveReference: "https://cityuinfo.royilab.com"
};

export const dictionaries = {
  "zh-CN": {
    brandSub: "开源校园知识库示例",
    nav: { ask: "问答", kb: "知识库", upload: "上传", about: "说明" },
    title: "CityUInfo Example",
    subtitle: "基于 OpenCampusKB 的脱敏示例：Pages 前端 + Worker API，展示审核优先、来源引用和匿名反馈。",
    placeholder: "例如：到校前需要准备什么？",
    send: "发送",
    reset: "重置",
    sources: "参考资料",
    empty: "可以询问入学注册、选课、宿舍、签注、校园账号和香港生活。此示例仅使用 mock 资料。",
    kbTitle: "知识库",
    kbSubtitle: "示例资料均为脱敏 mock 内容，用于说明标签、来源可信度和年份。",
    uploadTitle: "上传资料",
    uploadSubtitle: "示例上传不会保存真实文件。生产部署应先进入后台审核，再解析、切块、embedding 入库。",
    aboutTitle: "关于这个示例",
    aboutBody: "OpenCampusKB 是 CityUInfo 衍生出的开源通用版，可改造成学校、企业、项目小组或社群知识库。",
    feedback: "反馈",
    like: "有帮助",
    dislike: "没帮助",
    relevanceGuide: "相关度分数来自示例检索分，只用于展示 UI 形态。生产环境可替换为向量检索、关键词混合检索和 rerank。"
  },
  "zh-HK": {
    brandSub: "開源校園知識庫示例",
    nav: { ask: "問答", kb: "知識庫", upload: "上傳", about: "說明" },
    title: "CityUInfo Example",
    subtitle: "基於 OpenCampusKB 的脫敏示例：Pages 前端 + Worker API，展示審核優先、來源引用和匿名反饋。",
    placeholder: "例如：到校前需要準備甚麼？",
    send: "發送",
    reset: "重置",
    sources: "參考資料",
    empty: "可以詢問入學註冊、選課、宿舍、簽注、校園帳號和香港生活。此示例僅使用 mock 資料。",
    kbTitle: "知識庫",
    kbSubtitle: "示例資料均為脫敏 mock 內容，用於說明標籤、來源可信度和年份。",
    uploadTitle: "上傳資料",
    uploadSubtitle: "示例上傳不會保存真實文件。生產部署應先進入後台審核，再解析、切塊、embedding 入庫。",
    aboutTitle: "關於這個示例",
    aboutBody: "OpenCampusKB 是 CityUInfo 衍生出的開源通用版，可改造成學校、企業、項目小組或社群知識庫。",
    feedback: "反饋",
    like: "有幫助",
    dislike: "沒幫助",
    relevanceGuide: "相關度分數來自示例檢索分，只用於展示 UI 形態。生產環境可替換為向量檢索、關鍵詞混合檢索和 rerank。"
  },
  en: {
    brandSub: "Open campus knowledge base example",
    nav: { ask: "Ask", kb: "Knowledge", upload: "Upload", about: "About" },
    title: "CityUInfo Example",
    subtitle: "A desensitized OpenCampusKB example using a Pages frontend and Worker API to demonstrate reviewed sources, citations, and anonymous feedback.",
    placeholder: "Example: What should I prepare before arrival?",
    send: "Send",
    reset: "Reset",
    sources: "Sources",
    empty: "Ask about enrolment, course registration, housing, entry endorsement, campus accounts, or student life. This example uses mock materials only.",
    kbTitle: "Knowledge Base",
    kbSubtitle: "All example materials are mock and desensitized. They demonstrate tags, trust tiers, and applicable years.",
    uploadTitle: "Upload Material",
    uploadSubtitle: "The example upload does not store real files. Production deployments should review uploads before parsing, chunking, embedding, and indexing.",
    aboutTitle: "About This Example",
    aboutBody: "OpenCampusKB is the open-source framework derived from CityUInfo. It can be adapted for schools, companies, project teams, or community knowledge bases.",
    feedback: "Feedback",
    like: "Helpful",
    dislike: "Not helpful",
    relevanceGuide: "Relevance scores come from mock retrieval and only demonstrate the UI shape. Production can use vector search, hybrid keyword retrieval, and reranking."
  }
} as const;

export type KnowledgeDoc = {
  id: string;
  title: string;
  tag: string;
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
    tag: "pre-arrival",
    trust: "student_notes",
    year: "2026/27",
    type: "markdown",
    summary: "Mock checklist for documents, accommodation, arrival, account activation, and local setup.",
    text: "Before departure, students should check official deadlines, prepare identity documents and admission letters, confirm accommodation arrangements, save emergency contacts, and plan arrival."
  },
  {
    id: "course-registration-faq",
    title: "Course Registration FAQ Example",
    tag: "course",
    trust: "student_notes",
    year: "2026/27",
    type: "markdown",
    summary: "Mock FAQ for requirements, registration periods, waitlists, and uncertainty handling.",
    text: "Students should check programme requirements, course offering lists, prerequisite rules, and registration periods. If a course is full, follow the official waitlist or add/drop procedure."
  },
  {
    id: "housing-faq",
    title: "Housing FAQ Example",
    tag: "housing",
    trust: "student_notes",
    year: "2026/27",
    type: "markdown",
    summary: "Mock housing FAQ for check-in preparation and privacy boundaries.",
    text: "For housing check-in, students may need identity documents, admission information, payment records, and documents requested by the housing office."
  },
  {
    id: "student-life-faq",
    title: "Student Life FAQ Example",
    tag: "student-life",
    trust: "student_union_official",
    year: "2026/27",
    type: "markdown",
    summary: "Mock student life FAQ for campus account, Wi-Fi, library, email, transport, phone plans, and banking.",
    text: "Common student life topics include campus account setup, Wi-Fi access, library services, student email, transportation, local phone plans, and bank account preparation."
  },
  {
    id: "upload-review-policy",
    title: "Upload Review Policy Example",
    tag: "governance",
    trust: "school_official",
    year: "2026/27",
    type: "markdown",
    summary: "Mock policy showing why uploaded files require admin review before becoming searchable.",
    text: "Uploaded files should not enter the searchable knowledge base automatically. Admin review should check source clarity, applicable year, privacy, copyright, and trust tier."
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
