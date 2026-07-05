"use client";

import { Github } from "lucide-react";
import { campus } from "@/lib/example-data";
import { useLanguage } from "@/components/language-provider";

export default function AboutPage() {
  const { copy } = useLanguage();

  return (
    <>
      <div className="page-head">
        <div>
          <h1>{copy.aboutTitle}</h1>
          <p>{copy.aboutBody}</p>
        </div>
      </div>
      <div className="about-grid">
        <section className="about-card">
          <h2>Pages + Workers</h2>
          <p>
            This example mirrors the newer production architecture: a Next app exported to Cloudflare Pages, with
            server-side API routes handled by a Worker under <code>/api/*</code>.
          </p>
        </section>
        <section className="about-card">
          <h2>Reviewed Ingestion</h2>
          <p>
            Public uploads are treated as pending material. A real deployment should let admins review metadata,
            source trust, privacy, copyright, and ingestion status before retrieval.
          </p>
        </section>
        <section className="about-card">
          <h2>Feedback Loop</h2>
          <p>
            The UI includes lightweight reaction and feedback entry points. Production deployments can store these
            anonymously to improve frequent questions and knowledge coverage.
          </p>
        </section>
        <section className="about-card">
          <h2>Version Log</h2>
          <ul>
            <li>{campus.version}: refreshed the CityUInfo example for Pages frontend plus Worker API architecture.</li>
            <li>v2.3.0-example: demonstrated citation numbering and relevance score chips.</li>
            <li>v2.2.0-example: documented text/link upload and short-knowledge retrieval patterns.</li>
          </ul>
        </section>
        <section className="about-card full about-github-card">
          <div>
            <h2>Open Source</h2>
            <p>
              OpenCampusKB is derived from the original CityUInfo product and generalized for other campuses,
              companies, and teams. If it helps you, a GitHub star is welcome.
            </p>
          </div>
          <a className="button github-cta" href={campus.repo} target="_blank" rel="noreferrer">
            <Github size={16} /> GitHub
          </a>
        </section>
      </div>
    </>
  );
}
