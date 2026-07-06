"use client";

import { FormEvent, useState } from "react";
import { submitDemoUpload } from "@/lib/api";
import { useLanguage } from "@/components/language-provider";

const modes = ["file", "text", "link", "batch"] as const;

export default function UploadPage() {
  const { copy } = useLanguage();
  const [mode, setMode] = useState<(typeof modes)[number]>("file");
  const [message, setMessage] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("Submitting demo material...");
    const form = new FormData(event.currentTarget);
    form.set("mode", mode);
    const result = await submitDemoUpload(form);
    setMessage(result.message || "Submitted as pending demo material.");
    event.currentTarget.reset();
  };

  return (
    <section className="upload-panel stack">
      <div className="page-head compact">
        <div>
          <h1>{copy.uploadTitle}</h1>
          <p>{copy.uploadSubtitle}</p>
        </div>
      </div>
      <div className="segmented-control">
        {modes.map((item) => (
          <button key={item} type="button" className={mode === item ? "active" : ""} onClick={() => setMode(item)}>
            {item}
          </button>
        ))}
      </div>
      <form className="form-grid" onSubmit={submit}>
        <div className="field">
          <label>Title</label>
          <input name="title" required maxLength={120} />
        </div>
        <div className="field">
          <label>Source type</label>
          <select name="source_type">
            <option value="school_official">School official</option>
            <option value="student_union_official">Student organization official</option>
            <option value="student_notes">Student notes</option>
          </select>
        </div>
        {mode === "file" ? (
          <div className="field full">
            <label>File</label>
            <input type="file" name="file" />
            <small className="helper-text">Production should store files privately and parse only after admin approval.</small>
          </div>
        ) : null}
        {mode === "text" ? (
          <div className="field full">
            <label>Text</label>
            <textarea name="text" minLength={30} maxLength={3000} required />
            <small className="helper-text">Short text can be embedded as one record; longer text can be chunked after review.</small>
          </div>
        ) : null}
        {mode === "link" ? (
          <>
            <div className="field full">
              <label>URL</label>
              <input name="url" type="url" required />
            </div>
            <div className="field full">
              <label>Summary</label>
              <textarea name="summary" minLength={30} maxLength={300} required />
            </div>
          </>
        ) : null}
        {mode === "batch" ? (
          <>
            <div className="field">
              <label>Batch folder name</label>
              <input name="batch_name" maxLength={120} placeholder="Example: 2026 orientation files" required />
            </div>
            <div className="field">
              <label>Publication month</label>
              <input name="published_month" placeholder="2026.7" />
            </div>
            <div className="field full">
              <label>Files</label>
              <input type="file" name="files" multiple />
              <small className="helper-text">
                Production can apply shared tags, trust tier, source URL, and notes to a batch, then let admins edit each file separately.
              </small>
            </div>
          </>
        ) : null}
        <div className="field full">
          <button className="button" type="submit">Submit for review</button>
          {message ? <div className="status-box">{message}</div> : null}
        </div>
      </form>
    </section>
  );
}
