import React from 'react'
import { Boxes, Workflow, Database, ShieldCheck, Cloud, ArrowRight, FileDown } from 'lucide-react'

const products = [
  {
    name: 'Autonomous Orchestrator',
    tagline: 'Plan and run pipelines that improve themselves.',
    bullets: ['Agent-driven DAG planning', 'For Platform & Data Eng', 'Fewer failures, faster cycles'],
    icon: Workflow,
    specs: ['Stores: Snowflake, BigQuery, Redshift', 'API: /api/pipelines/*', 'Auth: OIDC/SAML, PAT', 'SLA: 99.9%'],
  },
  {
    name: 'Semantic Transform',
    tagline: 'AI-generated models aligned to business semantics.',
    bullets: ['dbt-native modeling', 'For Analytics Eng', 'Tests & docs auto-maintained'],
    icon: Boxes,
    specs: ['Stores: Snowflake, BigQuery', 'API: /api/models/*', 'Auth: OIDC, API keys', 'SLA: 99.9%'],
  },
  {
    name: 'Observability Guard',
    tagline: 'Detect drifts, quality issues and regressions in real time.',
    bullets: ['Great Expectations-compatible', 'For SRE & Data QA', 'Auto-remediation hooks'],
    icon: ShieldCheck,
    specs: ['Stores: S3/GCS', 'API: /api/quality/*', 'Auth: OIDC', 'SLA: 99.95%'],
  },
  {
    name: 'Unified Metadata Hub',
    tagline: 'Track lineage and governance from source to BI.',
    bullets: ['OpenLineage pipelines', 'For Governance', 'PII-aware policies'],
    icon: Database,
    specs: ['Stores: Postgres/Mongo', 'API: /api/metadata/*', 'Auth: SSO', 'SLA: 99.9%'],
  },
]

export default function Products() {
  return (
    <section className="relative w-full border-t border-white/10 bg-black py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-2xl font-bold tracking-tight">Company Products</h2>
        <p className="mt-2 max-w-2xl text-sm text-gray-300">Explore our suite. Each product integrates seamlessly via shared metadata, unified auth, and event-driven contracts.</p>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => {
            const Icon = p.icon
            return (
              <article key={p.name} className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#0b0b0b]/70 p-5 transition-colors hover:border-emerald-400/50">
                <div className="mb-3 inline-flex items-center gap-2 text-emerald-400">
                  <Icon size={18} />
                  <span className="text-sm font-semibold">{p.name}</span>
                </div>
                <div className="text-sm text-gray-200">{p.tagline}</div>
                <ul className="mt-3 space-y-1">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-xs text-gray-300"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500"></span>{b}</li>
                  ))}
                </ul>
                <div className="mt-4">
                  <div className="text-[11px] uppercase tracking-wide text-gray-400">Key technical specs</div>
                  <ul className="mt-1 space-y-1">
                    {p.specs.map((s) => (
                      <li key={s} className="text-[11px] text-gray-300">{s}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-5 flex gap-2">
                  <button onClick={() => window.dispatchEvent(new CustomEvent('analytics', { detail: { action: 'cta_product_learn', product: p.name } }))} className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-1.5 text-xs text-white hover:border-emerald-400/60">
                    Learn more <ArrowRight size={14} />
                  </button>
                  <button onClick={() => window.dispatchEvent(new CustomEvent('analytics', { detail: { action: 'cta_product_pdf', product: p.name } }))} className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-black hover:bg-emerald-400">
                    <FileDown size={14} /> One‑pager
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
