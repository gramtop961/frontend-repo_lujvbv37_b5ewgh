import React, { useEffect, useMemo, useRef, useState } from 'react'
import { MessageSquare, ShieldAlert, Clock, Play, QrCode, ArrowRight } from 'lucide-react'

const mockHeadlines = [
  {
    id: 1,
    title: 'New CVE-2025-10421 detected affecting popular HTTP library',
    severity: 'high',
    time: '2m ago',
    summary: 'Remote code execution possible under specific header parsing conditions.',
  },
  {
    id: 2,
    title: 'Patch available for X package (2.4.1) – upgrade recommended',
    severity: 'medium',
    time: '12m ago',
    summary: 'Fixes input validation bypass leading to privilege escalation.',
  },
  {
    id: 3,
    title: 'Supply-chain alert: package yanked from registry after compromise',
    severity: 'critical',
    time: '28m ago',
    summary: 'Malicious versions detected. Pin hashes and audit lockfiles.',
  },
]

function SeverityBadge({ level }) {
  const color = level === 'critical' ? 'bg-emerald-600' : level === 'high' ? 'bg-emerald-500' : 'bg-emerald-400'
  const label = level.charAt(0).toUpperCase() + level.slice(1)
  return (
    <span className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-black ${color}`}>{label}</span>
  )
}

function useNewsFeed() {
  const [items, setItems] = useState(mockHeadlines)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    const controller = new AbortController()

    async function fetchNews() {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL || ''}/api/cyber/news`, {
          signal: controller.signal,
          headers: { 'Cache-Control': 'max-age=300' },
        })
        if (!res.ok) throw new Error('Network error')
        const data = await res.json()
        if (active && Array.isArray(data?.items)) setItems(data.items)
      } catch (e) {
        // keep mock items for SEO fallback
        if (active) setError(e.message)
      }
    }

    fetchNews()
    const id = setInterval(fetchNews, 5 * 60 * 1000)
    return () => {
      active = false
      controller.abort()
      clearInterval(id)
    }
  }, [])

  return { items, error }
}

export default function WhatsAppCyberSection() {
  const { items } = useNewsFeed()
  const [showQR, setShowQR] = useState(false)
  const [showDemo, setShowDemo] = useState(false)
  const modalRef = useRef(null)

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setShowDemo(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const deepLink = 'https://wa.me/1234567890?text=Subscribe%20me%20to%20Cyber%20Alerts'

  return (
    <section className="relative w-full border-t border-white/10 bg-black py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">WhatsApp Bot — <span className="text-emerald-400">Cybersecurity News & Alerts</span></h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-300">Real-time CVE headlines and actionable patches delivered directly to WhatsApp. Subscribe to receive critical alerts and weekly summaries.</p>
          </div>
          <div className="hidden sm:flex gap-3">
            <a
              href={deepLink}
              onClick={() => window.dispatchEvent(new CustomEvent('analytics', { detail: { action: 'cta_whatsapp_subscribe' } }))}
              className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-0"
            >
              <MessageSquare size={16} /> Subscribe via WhatsApp
            </a>
            <button
              onClick={() => { setShowDemo(true); window.dispatchEvent(new CustomEvent('analytics', { detail: { action: 'cta_see_demo' } })) }}
              className="inline-flex items-center gap-2 rounded-md border border-white/10 px-4 py-2 text-sm font-semibold text-white hover:border-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <Play size={16} /> See Demo
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* Left: vertical feed */}
          <div>
            <ul className="space-y-4" aria-label="Cybersecurity headlines">
              {items.map((item) => (
                <li key={item.id} className="rounded-lg border border-white/10 bg-black/40 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <SeverityBadge level={item.severity} />
                    <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={12} /> {item.time}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-xs text-gray-300">{item.summary}</p>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex gap-3 sm:hidden">
              <a
                href={deepLink}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-400"
              >
                <MessageSquare size={16} /> Subscribe via WhatsApp
              </a>
              <button onClick={() => setShowDemo(true)} className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-white/10 px-4 py-2 text-sm font-semibold text-white hover:border-emerald-400/60">
                <Play size={16} /> See Demo
              </button>
            </div>
          </div>

          {/* Right: mock WhatsApp card */}
          <div>
            <div className="rounded-xl border border-white/10 bg-[#0b0b0b]/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-white">
                  <ShieldAlert size={16} className="text-emerald-400" /> Cyber Alerts
                </div>
                <button
                  onClick={() => setShowQR(v => !v)}
                  className="inline-flex items-center gap-1 rounded-md border border-white/10 px-2 py-1 text-[11px] text-gray-200 hover:border-emerald-400/60"
                  aria-expanded={showQR}
                >
                  <QrCode size={14} /> QR
                </button>
              </div>

              {showQR && (
                <div className="mb-3 rounded-lg border border-white/10 p-3 text-center">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https%3A%2F%2Fwa.me%2F1234567890" alt="WhatsApp subscribe QR" className="mx-auto" />
                  <p className="mt-2 text-[11px] text-gray-400">Scan to Subscribe</p>
                </div>
              )}

              <div role="log" aria-live="polite" aria-relevant="additions" className="space-y-2">
                <div className="rounded-md bg-[#111]/90 p-2 text-xs text-gray-200">New CVE-2025-XXXX detected – reviewing impact…</div>
                <div className="rounded-md bg-[#0e1a15] p-2 text-xs text-emerald-200">Patch available for X package. Apply in pipeline step.</div>
                <div className="rounded-md bg-[#111]/90 p-2 text-xs text-gray-200">Weekly digest ready. 7 new advisories.</div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <input
                  type="tel"
                  inputMode="tel"
                  placeholder="WhatsApp number"
                  className="w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  aria-label="WhatsApp number"
                />
                <a
                  href={deepLink}
                  className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-400"
                >
                  <ArrowRight size={14} /> Subscribe
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDemo && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-6" onClick={() => setShowDemo(false)}>
          <div ref={modalRef} className="w-full max-w-lg rounded-xl border border-white/10 bg-[#0b0b0b] p-5" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 text-sm font-semibold">WhatsApp Bot Demo</div>
            <div className="h-64 overflow-hidden rounded-lg border border-white/10 bg-black/60 p-3">
              <div className="animate-pulse rounded-md bg-[#0e1a15] p-2 text-xs text-emerald-200">[00:01] CVE detected → generating advisory…</div>
              <div className="mt-2 rounded-md bg-[#111] p-2 text-xs text-gray-200">[00:03] Impact: High on service A.</div>
              <div className="mt-2 rounded-md bg-[#0e1a15] p-2 text-xs text-emerald-200">[00:05] Patch PR opened in repo.</div>
            </div>
            <div className="mt-4 flex justify-end">
              <button onClick={() => setShowDemo(false)} className="rounded-md border border-white/10 px-3 py-1.5 text-xs text-white hover:border-emerald-400/60">Close</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
