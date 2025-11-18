import React from 'react'
import Spline from '@splinetool/react-spline'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative mx-auto min-h-[84vh] w-full overflow-hidden pt-28">
      {/* Spline background */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/Gt5HUob8aGDxOUep/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/70 to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="max-w-3xl py-20">
          <p className="mb-4 inline-flex items-center gap-2 rounded-md border border-emerald-500/30 bg-black/50 px-3 py-1 text-xs font-semibold tracking-wider text-emerald-300/90">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Autonomous Data Platform
          </p>

          <h1 className="text-balance text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl">
            Data infrastructure
            <br />
            <span className="text-white/90">that builds itself</span>
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-gray-300">
            Orchestrate ingestion, transformation, and governance with AI-native agents.
            Plug into your stack: dbt, Airflow, Spark, and more. Secure, scalable, and production-ready.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button className="group inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-black transition-all hover:shadow-[0_0_0_3px_rgba(16,185,129,0.35)]">
              <span className="flex h-6 w-6 items-center justify-center rounded-[4px] bg-emerald-600/10">
                <ArrowRight size={16} className="text-emerald-600" />
              </span>
              Start free
            </button>
            <button className="group inline-flex items-center gap-2 rounded-md bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-400">
              <span className="flex h-6 w-6 items-center justify-center rounded-[4px] bg-black/20">
                <ArrowUpRight size={16} className="text-white" />
              </span>
              Book a demo
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
