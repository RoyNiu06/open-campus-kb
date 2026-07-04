const CAMPUS = {
  project: {
    id: "cityuinfo-example",
    name: "CityUInfo Example",
    version: "2.0.0-example",
    official: false
  },
  locales: ["zh-CN", "zh-HK", "en"],
  categories: {
    pre_arrival: { "zh-CN": "Pre-arrival", "zh-HK": "Pre-arrival", en: "Pre-arrival" },
    course_registration: { "zh-CN": "Course registration", "zh-HK": "Course registration", en: "Course registration" },
    housing: { "zh-CN": "Housing", "zh-HK": "Housing", en: "Housing" },
    student_life: { "zh-CN": "Student life", "zh-HK": "Student life", en: "Student life" },
    review_policy: { "zh-CN": "Review policy", "zh-HK": "Review policy", en: "Review policy" }
  },
  trust: {
    school_official: { "zh-CN": "School official", "zh-HK": "School official", en: "School official" },
    student_union_official: { "zh-CN": "Student organization official", "zh-HK": "Student organization official", en: "Student organization official" },
    student_notes: { "zh-CN": "Student notes", "zh-HK": "Student notes", en: "Student notes" }
  },
  copy: {
    "zh-CN": {
      brandSub: "Unofficial freshman info assistant",
      ask: "Ask OpenCampusKB",
      subtitle: "This example uses mock materials to demonstrate source-grounded Q&A, knowledge browsing, and reviewed uploads.",
      placeholder: "Example: What should I prepare before arrival?",
      send: "Send",
      reset: "Reset",
      nav: { ask: "Ask", kb: "Knowledge", upload: "Upload", about: "About" },
      noContext: "The example knowledge base does not contain enough reliable material. Add reviewed sources or check official information.",
      sources: "Sources",
      uploadTitle: "Upload Material",
      uploadBody: "This open-source example only demonstrates the submission workflow. In production, uploaded files should stay pending until admin review.",
      aboutTitle: "About OpenCampusKB",
      aboutBody: "OpenCampusKB is an open-source framework for campus knowledge bases and AI Q&A assistants. This CityUInfo example uses mock, desensitized data only.",
      chatEmpty: "Ask about enrolment, course registration, housing, entry endorsement, campus accounts, or student life. This example uses mock materials only."
    },
    "zh-HK": {
      brandSub: "Unofficial freshman info assistant",
      ask: "Ask OpenCampusKB",
      subtitle: "This example uses mock materials to demonstrate source-grounded Q&A, knowledge browsing, and reviewed uploads.",
      placeholder: "Example: What should I prepare before arrival?",
      send: "Send",
      reset: "Reset",
      nav: { ask: "Ask", kb: "Knowledge", upload: "Upload", about: "About" },
      noContext: "The example knowledge base does not contain enough reliable material. Add reviewed sources or check official information.",
      sources: "Sources",
      uploadTitle: "Upload Material",
      uploadBody: "This open-source example only demonstrates the submission workflow. In production, uploaded files should stay pending until admin review.",
      aboutTitle: "About OpenCampusKB",
      aboutBody: "OpenCampusKB is an open-source framework for campus knowledge bases and AI Q&A assistants. This CityUInfo example uses mock, desensitized data only.",
      chatEmpty: "Ask about enrolment, course registration, housing, entry endorsement, campus accounts, or student life. This example uses mock materials only."
    },
    en: {
      brandSub: "Unofficial freshman info assistant",
      ask: "Ask OpenCampusKB",
      subtitle: "This example uses mock materials to demonstrate source-grounded Q&A, knowledge browsing, and reviewed uploads.",
      placeholder: "Example: What should I prepare before arrival?",
      send: "Send",
      reset: "Reset",
      nav: { ask: "Ask", kb: "Knowledge", upload: "Upload", about: "About" },
      noContext: "The example knowledge base does not contain enough reliable material. Add reviewed sources or check official information.",
      sources: "Sources",
      uploadTitle: "Upload Material",
      uploadBody: "This open-source example only demonstrates the submission workflow. In production, uploaded files should stay pending until admin review.",
      aboutTitle: "About OpenCampusKB",
      aboutBody: "OpenCampusKB is an open-source framework for campus knowledge bases and AI Q&A assistants. This CityUInfo example uses mock, desensitized data only.",
      chatEmpty: "Ask about enrolment, course registration, housing, entry endorsement, campus accounts, or student life. This example uses mock materials only."
    }
  }
};

const DOCUMENTS = [
  {
    id: "pre-arrival-checklist",
    title: "Pre-arrival Checklist Example",
    category: "pre_arrival",
    source_type: "student_notes",
    file_type: "markdown",
    applicable_year: "2026/27",
    summary: "Mock checklist for documents, accommodation, arrival, account activation, and local setup.",
    text: "Before departure, students should check official admission portal deadlines, prepare identity documents and admission letters, confirm accommodation arrangements, save emergency contacts, and plan arrival. After arrival, they should activate the campus account, check email and student portal access, prepare for course registration, and set up local transportation and payment tools. Dates and requirements may change and should be verified with official sources."
  },
  {
    id: "course-registration-faq",
    title: "Course Registration FAQ Example",
    category: "course_registration",
    source_type: "student_notes",
    file_type: "markdown",
    applicable_year: "2026/27",
    summary: "Mock FAQ for course requirements, registration periods, waitlists, and uncertainty handling.",
    text: "Students should check official programme requirements, course offering lists, prerequisite rules, and registration periods. If a course is full, students should follow the official waitlist or add/drop procedure. The assistant should not promise seat availability or invent registration dates, quota rules, or department exceptions when reliable material is missing."
  },
  {
    id: "housing-faq",
    title: "Housing FAQ Example",
    category: "housing",
    source_type: "student_notes",
    file_type: "markdown",
    applicable_year: "2026/27",
    summary: "Mock housing FAQ for check-in preparation and privacy boundaries.",
    text: "For housing check-in, students may need identity documents, admission information, payment records, and documents requested by the housing office. Answers should include source names, applicable year, and a reminder to check the latest official housing notice. Do not include private room assignments, personal contact details, or unverified group chat rumours."
  },
  {
    id: "student-life-faq",
    title: "Student Life FAQ Example",
    category: "student_life",
    source_type: "student_notes",
    file_type: "markdown",
    applicable_year: "2026/27",
    summary: "Mock student life FAQ for campus account, Wi-Fi, library, email, transport, phone plans, and banking.",
    text: "Common student life topics include campus account setup, Wi-Fi access, library services, student email, transportation, local phone plans, and bank account preparation. For official services, answers should prioritize university pages and official emails. For local life tips, answers may use student notes but should label them as community experience."
  },
  {
    id: "upload-review-policy",
    title: "Upload Review Policy Example",
    category: "review_policy",
    source_type: "school_official",
    file_type: "markdown",
    applicable_year: "2026/27",
    summary: "Mock policy showing why uploaded files require admin review before becoming searchable.",
    text: "Uploaded files should not enter the searchable knowledge base automatically. Admin review should check whether the source is clear, applicable year is clear, the file contains private personal information, the document is allowed to be summarized or cited, and whether it should be marked official, student organization official, or student notes. Admin actions include approve and ingest, reject, edit metadata and approve, archive, and delete."
  }
];

const norm = (value) => String(value || "").toLowerCase();
const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));

function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: { "content-type": "application/json; charset=utf-8", ...(init.headers || {}) }
  });
}

function searchDocuments(question) {
  const words = norm(question).split(/[^a-z0-9\u4e00-\u9fff]+/).filter((word) => word.length >= 2);
  const scored = DOCUMENTS.map((doc) => {
    const haystack = norm(`${doc.title} ${doc.category} ${doc.summary} ${doc.text}`);
    const score = words.reduce((sum, word) => sum + (haystack.includes(word) ? 1 : 0), 0);
    return { doc, score };
  }).filter((item) => item.score > 0);

  return (scored.length ? scored : DOCUMENTS.slice(0, 2).map((doc) => ({ doc, score: 0 })))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item, index) => ({ ...item.doc, score: item.score, citation: index + 1 }));
}

function answerFromSources(question, locale) {
  const copy = CAMPUS.copy[locale] || CAMPUS.copy.en;
  const sources = searchDocuments(question);
  const hasSignal = sources.some((source) => source.score > 0);
  const bullets = sources.map((source) => `- [${source.citation}] ${source.summary}`).join("\n");
  const caveat = "This is mock content. Replace seed documents with reviewed campus sources before production use.";

  return {
    answer: hasSignal ? `Based on the reviewed example knowledge base:\n\n${bullets}\n\n${caveat}` : copy.noContext,
    sources: sources.map((source) => ({
      id: source.id,
      title: source.title,
      category: source.category,
      source_type: source.source_type,
      file_type: source.file_type,
      applicable_year: source.applicable_year
    }))
  };
}

async function uploadDemo(request) {
  const contentType = request.headers.get("content-type") || "";
  let title = "Untitled demo upload";

  if (contentType.includes("application/json")) {
    const body = await request.json().catch(() => ({}));
    title = String(body.title || title).slice(0, 120);
  } else if (contentType.includes("multipart/form-data")) {
    const form = await request.formData().catch(() => null);
    title = String(form?.get("title") || title).slice(0, 120);
  }

  return json({
    ok: true,
    status: "pending_demo",
    title,
    message: "Demo upload accepted. Production deployments should store files privately and wait for admin review before ingestion."
  }, { status: 202 });
}

function appHtml() {
  const config = JSON.stringify({ campus: CAMPUS, documents: DOCUMENTS });
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>OpenCampusKB CityUInfo Example</title>
  <style>
    :root{--bg:#f7f6f1;--surface:#fff;--ink:#17211f;--muted:#5d6a66;--line:#dce4df;--teal:#12736a;--amber:#b7791f}
    *{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}button,input,textarea,select{font:inherit}button{cursor:pointer}
    header{position:sticky;top:0;background:rgba(247,246,241,.94);border-bottom:1px solid var(--line);backdrop-filter:blur(14px);z-index:2}.bar{display:flex;align-items:center;gap:16px;justify-content:space-between;width:min(1120px,calc(100% - 28px));min-height:64px;margin:auto}
    .brand{font-weight:850}.brand small{display:block;color:var(--muted);font-size:12px}.nav,.lang,.actions{display:flex;gap:6px;align-items:center}.nav button,.lang button,.btn{border:1px solid var(--line);border-radius:8px;background:#fff;color:var(--ink);min-height:36px;padding:0 12px;font-weight:750}.nav button.active,.lang button.active,.btn.primary{border-color:var(--teal);background:var(--teal);color:#fff}
    main{width:min(1120px,calc(100% - 28px));margin:auto;padding:24px 0 56px}.notice{margin-bottom:16px;padding:12px 14px;border:1px solid #eadfca;border-radius:8px;background:#fff7e6;color:#614318;font-weight:650}
    .panel,.card{border:1px solid var(--line);border-radius:8px;background:#fff;padding:18px}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.stack{display:grid;gap:14px}.chat{display:grid;grid-template-rows:1fr auto;height:min(660px,calc(100dvh - 150px));min-height:440px}.messages{overflow:auto;display:grid;align-content:start;gap:12px;padding:6px}.msg{max-width:78%;border:1px solid var(--line);border-radius:8px;background:#f4f8f6;padding:12px}.msg.user{justify-self:end;background:#e7f2ef}.msg pre{white-space:pre-wrap;margin:0}.form{display:grid;grid-template-columns:1fr 110px;gap:10px}.form textarea{min-height:48px;resize:vertical}.field{display:grid;gap:6px}.field input,.field textarea,.field select{width:100%;border:1px solid var(--line);border-radius:8px;padding:10px;background:#fff}.chips{display:flex;gap:6px;flex-wrap:wrap}.tag{display:inline-flex;align-items:center;border:1px solid var(--line);border-radius:999px;padding:4px 8px;color:var(--muted);font-size:12px;font-weight:750}.muted{color:var(--muted)}a{color:var(--teal)}h1{margin:0 0 8px}h2{margin:0 0 8px;font-size:18px}
    @media(max-width:760px){.bar{flex-wrap:wrap;padding:10px 0}.nav{order:3;width:100%;overflow:auto}.grid{grid-template-columns:1fr}.chat{height:calc(100dvh - 150px)}.form{grid-template-columns:1fr 76px}.msg{max-width:94%}}
  </style>
</head>
<body>
  <header><div class="bar"><div class="brand">OpenCampusKB<small id="brandSub"></small></div><nav class="nav" id="nav"></nav><div class="lang" id="lang"></div></div></header>
  <main><div class="notice" id="notice"></div><div id="app"></div></main>
  <script>
    const BOOT=${config};
    let locale=localStorage.getItem("ockb-locale")||"en";
    let route=location.pathname.split("/").filter(Boolean)[0]||"ask";
    let messages=[];
    const $=s=>document.querySelector(s);
    const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\\\"":"&quot;","'":"&#39;"}[m]));
    const t=()=>BOOT.campus.copy[locale]||BOOT.campus.copy.en;
    const cat=id=>BOOT.campus.categories[id]?.[locale]||id;
    const trust=id=>BOOT.campus.trust[id]?.[locale]||id;
    function nav(){const copy=t();$("#brandSub").textContent=copy.brandSub;$("#notice").textContent=copy.subtitle;$("#nav").innerHTML=Object.entries(copy.nav).map(([id,label])=>'<button class="'+(route===id?'active':'')+'" onclick="go(\\''+id+'\\')">'+label+'</button>').join("");$("#lang").innerHTML=BOOT.campus.locales.map(l=>'<button class="'+(locale===l?'active':'')+'" onclick="setLang(\\''+l+'\\')">'+(l==='zh-CN'?'SC':l==='zh-HK'?'TC':'EN')+'</button>').join("")}
    function setLang(l){locale=l;localStorage.setItem("ockb-locale",l);render()} function go(r){route=r;history.pushState(null,"","/"+(r==="ask"?"":r+"/"));render()}
    async function ask(e){e.preventDefault();const q=$("#q").value.trim();if(!q)return;messages.push({role:"user",content:q},{role:"assistant",content:"..."});$("#q").value="";render();const res=await fetch("/api/chat",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({question:q,locale})});const data=await res.json();messages[messages.length-1]={role:"assistant",content:data.answer,sources:data.sources||[]};render()}
    async function submitUpload(e){e.preventDefault();const form=new FormData(e.currentTarget);const res=await fetch("/api/upload",{method:"POST",body:form});const data=await res.json();document.querySelector("#uploadMsg").textContent=data.message||"Submitted."}
    function askPage(){const copy=t();return '<section class="panel chat"><div class="messages">'+(messages.length?messages.map(m=>'<div class="msg '+(m.role==='user'?'user':'')+'"><pre>'+esc(m.content)+'</pre>'+(m.sources?.length?'<div class="chips">'+m.sources.map(s=>'<span class="tag">['+esc(s.id)+'] '+esc(s.title)+'</span>').join("")+'</div>':'')+'</div>').join(""):'<p class="muted">'+esc(copy.chatEmpty)+'</p>')+'</div><form class="form" onsubmit="ask(event)"><textarea id="q" placeholder="'+esc(copy.placeholder)+'"></textarea><button class="btn primary">'+copy.send+'</button></form></section>'}
    function kbPage(){return '<div class="grid">'+BOOT.documents.map(d=>'<article class="card"><div class="chips"><span class="tag">'+cat(d.category)+'</span><span class="tag">'+trust(d.source_type)+'</span><span class="tag">'+esc(d.file_type)+'</span><span class="tag">'+esc(d.applicable_year)+'</span></div><h2>'+esc(d.title)+'</h2><p class="muted">'+esc(d.summary)+'</p><details><summary>Preview source text</summary><p>'+esc(d.text)+'</p></details></article>').join("")+'</div>'}
    function uploadPage(){const copy=t();return '<section class="panel stack"><h1>'+copy.uploadTitle+'</h1><p class="muted">'+copy.uploadBody+'</p><form class="stack" onsubmit="submitUpload(event)"><div class="field"><label>Title</label><input name="title" required></div><div class="field"><label>Category</label><select name="category">'+Object.keys(BOOT.campus.categories).map(id=>'<option value="'+esc(id)+'">'+cat(id)+'</option>').join("")+'</select></div><div class="field"><label>File</label><input name="file" type="file"></div><button class="btn primary">Submit demo</button><div id="uploadMsg" class="muted"></div></form></section>'}
    function aboutPage(){const copy=t();return '<section class="panel stack"><h1>'+copy.aboutTitle+' <span class="tag">'+BOOT.campus.project.version+'</span></h1><p>'+copy.aboutBody+'</p><div class="grid"><section class="card"><h2>Reviewed KB</h2><p class="muted">Uploaded materials should be reviewed before ingestion.</p></section><section class="card"><h2>Source-grounded</h2><p class="muted">Answers cite mock source documents and avoid unsupported certainty.</p></section><section class="card"><h2>Portable</h2><p class="muted">Replace config, seed documents, and deployment secrets for your own campus.</p></section></div></section>'}
    function render(){nav();$("#app").innerHTML=route==="kb"?kbPage():route==="upload"?uploadPage():route==="about"?aboutPage():askPage();const box=document.querySelector(".messages");if(box)box.scrollTop=box.scrollHeight}
    addEventListener("popstate",()=>{route=location.pathname.split("/").filter(Boolean)[0]||"ask";render()});render();
  </script>
</body>
</html>`;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/health") return json({ ok: true, project: "open-campus-kb", example: CAMPUS.project.id });
    if (url.pathname === "/api/config") return json(CAMPUS);
    if (url.pathname === "/api/documents") return json({ documents: DOCUMENTS });
    if (url.pathname === "/api/upload" && request.method === "POST") return uploadDemo(request);
    if (url.pathname === "/api/chat" && request.method === "POST") {
      const body = await request.json().catch(() => ({}));
      const question = String(body.question || "").trim();
      if (!question) return json({ error: "Question is required." }, { status: 400 });
      return json(answerFromSources(question, body.locale || "en"));
    }
    return new Response(appHtml(), {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "no-store"
      }
    });
  }
};
