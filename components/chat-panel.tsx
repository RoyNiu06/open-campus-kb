"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import { BookOpen, Github, RotateCcw, Send, ThumbsDown, ThumbsUp } from "lucide-react";
import { campus } from "@/lib/example-data";
import { askExample, ChatSource } from "@/lib/api";
import { useLanguage } from "./language-provider";
import { SimpleMarkdown } from "./markdown";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: ChatSource[];
  engineMode?: "course_engine" | "hybrid" | "rag";
  reaction?: "up" | "down" | null;
};

function relevanceClass(value?: number) {
  if (!value) return "weak";
  if (value >= 82) return "high";
  if (value >= 62) return "medium";
  if (value >= 42) return "low";
  return "weak";
}

export function ChatPanel() {
  const { copy, locale } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const turnCount = useMemo(() => messages.filter((item) => item.role === "user").length, [messages]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const clean = question.trim();
    if (!clean || loading) return;
    const userMessage: Message = { id: crypto.randomUUID(), role: "user", content: clean };
    const pendingId = crypto.randomUUID();
    setQuestion("");
    setLoading(true);
    setMessages((current) => [...current, userMessage, { id: pendingId, role: "assistant", content: "..." }]);

    const response = await askExample(clean, locale);
    setMessages((current) =>
      current.map((message) =>
        message.id === pendingId
          ? { ...message, content: response.answer, sources: response.sources, engineMode: response.engineMode }
          : message
      )
    );
    setLoading(false);
  };

  const react = (id: string, reaction: "up" | "down") => {
    setMessages((current) =>
      current.map((message) =>
        message.id === id ? { ...message, reaction: message.reaction === reaction ? null : reaction } : message
      )
    );
  };

  return (
    <section className="chat-panel">
      <div className="panel-header compact-header">
        <div className="title-stack">
          <div className="chat-title-row">
            <h1>{copy.title}</h1>
            <a className="github-link" href={campus.repo} target="_blank" rel="noreferrer">
              <Github size={13} /> GitHub
            </a>
            <a className="github-link" href={campus.plannerUrl} target="_blank" rel="noreferrer">
              <BookOpen size={13} /> Course Engine
            </a>
          </div>
          <p>{copy.subtitle}</p>
        </div>
        <div className="chat-header-actions">
          <span className="points-badge">5h demo: 30</span>
          <button className="icon-button" type="button" onClick={() => setMessages([])} aria-label={copy.reset}>
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      <div className="messages">
        {messages.length === 0 ? (
          <div className="empty-chat-wrap">
            <div className="empty-chat-text">
              <div className="empty-chat-links">
                <span>{copy.relevanceGuide}</span>
              </div>
              <p>{copy.empty}</p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <article key={message.id} className={`message ${message.role}`}>
              <div className="message-label">{message.role === "user" ? "You" : campus.name}</div>
              {message.role === "assistant" && message.engineMode && message.engineMode !== "rag" ? (
                <div className="engine-note">
                  {message.engineMode === "course_engine" ? copy.engineCourse : copy.engineHybrid}
                </div>
              ) : null}
              <div className="bubble">
                <SimpleMarkdown text={message.content} />
              </div>
              {message.sources?.length ? (
                <div className="source-list" aria-label={copy.sources}>
                  {message.sources.map((source, index) => (
                    <span className="source-chip" key={`${source.id}-${index}`}>
                      <span className="source-index">[{source.citation || index + 1}]</span>
                      <span className="source-title">{source.title}</span>
                      <span className={`relevance-badge ${relevanceClass(source.relevance)}`}>
                        {source.relevance ?? "-"}
                      </span>
                    </span>
                  ))}
                </div>
              ) : null}
              {message.role === "assistant" && message.content !== "..." ? (
                <div className="answer-feedback-actions">
                  <button
                    className={`mini-icon-button ${message.reaction === "up" ? "active" : ""}`}
                    type="button"
                    aria-label={copy.like}
                    onClick={() => react(message.id, "up")}
                  >
                    <ThumbsUp size={13} />
                  </button>
                  <button
                    className={`mini-icon-button ${message.reaction === "down" ? "active" : ""}`}
                    type="button"
                    aria-label={copy.dislike}
                    onClick={() => react(message.id, "down")}
                  >
                    <ThumbsDown size={13} />
                  </button>
                  <a
                    className="mini-text-button"
                    href={`/about/?feedback=${encodeURIComponent(message.id)}`}
                  >
                    {copy.feedback}
                  </a>
                </div>
              ) : null}
            </article>
          ))
        )}
      </div>

      <form className="chat-form compact-chat-form" onSubmit={submit}>
        <textarea
          ref={textareaRef}
          value={question}
          placeholder={turnCount > 12 ? "Context is getting long. Reset before continuing." : copy.placeholder}
          onChange={(event) => setQuestion(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              event.currentTarget.form?.requestSubmit();
            }
          }}
        />
        <button className="button send-button" type="submit" disabled={loading}>
          <Send size={16} />
        </button>
      </form>
    </section>
  );
}
