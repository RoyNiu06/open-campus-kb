"use client";

import { useMemo, useState } from "react";
import { FileText } from "lucide-react";
import { documents, trustLabel } from "@/lib/example-data";
import { useLanguage } from "@/components/language-provider";

export default function KnowledgePage() {
  const { copy, locale } = useLanguage();
  const [tag, setTag] = useState("all");
  const tags = useMemo(() => ["all", ...Array.from(new Set(documents.map((doc) => doc.tag)))], []);
  const filtered = tag === "all" ? documents : documents.filter((doc) => doc.tag === tag);

  return (
    <>
      <div className="page-head">
        <div>
          <h1>{copy.kbTitle}</h1>
          <p>{copy.kbSubtitle}</p>
        </div>
      </div>
      <div className="filters">
        {tags.map((item) => (
          <button key={item} className={`filter-chip ${tag === item ? "active" : ""}`} onClick={() => setTag(item)}>
            {item === "all" ? "All" : item}
          </button>
        ))}
      </div>
      <div className="kb-grid">
        {filtered.map((doc) => (
          <article key={doc.id} className="kb-card">
            <div className="kb-meta">
              <span className="tag">{doc.type}</span>
              <span className="tag">{doc.tag}</span>
              <span className="tag">{doc.year}</span>
              <span className="tag trust-official">{trustLabel(doc.trust, locale)}</span>
            </div>
            <h2>{doc.title}</h2>
            <p>{doc.summary}</p>
            <details>
              <summary>
                <FileText size={14} /> Preview
              </summary>
              <p>{doc.text}</p>
            </details>
          </article>
        ))}
      </div>
    </>
  );
}
