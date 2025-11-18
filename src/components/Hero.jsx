import React, { useEffect, useRef, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

// External, optimized planet imagery (WebP with PNG fallbacks)
const MARS_SRCSET = `https://images.unsplash.com/photo-1580428180163-c6b5dfb3ac55?auto=format&fit=crop&w=1600&q=60 1600w,
https://images.unsplash.com/photo-1580428180163-c6b5dfb3ac55?auto=format&fit=crop&w=2400&q=60 2400w` // proxy to web-optimized
const MARS_WEBP = 'https://assets.api-uploader.vercel.app/planets/mars@2400.webp'
const MARS_PNG = 'https://assets.api-uploader.vercel.app/planets/mars@2400.png'

const MARS_MOBILE_WEBP = 'https://assets.api-uploader.vercel.app/planets/mars@960.webp'
const MARS_MOBILE_PNG = 'https://assets.api-uploader.vercel.app/planets/mars@960.png'

// Earth-like closeup lazy asset
const EARTH_WEBP = 'https://assets.api-uploader.vercel.app/planets/earth-close@2000.webp'
const EARTH_PNG = 'https://assets.api-uploader.vercel.app/planets/earth-close@2000.png'

export default function Hero() {
  const planetRef = useRef(null)
  const earthRef = useRef(null)
  const overlayRef = useRef(null)
  const heroRef = useRef(null)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [earthLoaded, setEarthLoaded] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e) => setReducedMotion(e.matches)
    mq.addEventListener?.('change', handler)
    return () => mq.removeEventListener?.('change', handler)
  }, [])

  useEffect(() => {
    const hero = heroRef.current
    const planet = planetRef.current
    const earth = earthRef.current
    const overlay = overlayRef.current
    if (!hero || !planet || !overlay) return

    let rafId = null

    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        const rect = hero.getBoundingClientRect()
        const vh = window.innerHeight || document.documentElement.clientHeight
        // progress from 0 at hero top at top, to 1 when bottom reaches top
        const total = rect.height + vh
        const progress = Math.min(1, Math.max(0, (vh - rect.top) / total))

        if (!reducedMotion) {
          const scale = 1 + 0.12 * progress // 1 -> 1.12
          planet.style.transform = `translateZ(0) scale(${scale})`
        } else {
          planet.style.transform = 'none'
        }

        // Fade overlay to black as we approach end of hero
        const overlayOpacity = 0.7 + 0.3 * progress
        overlay.style.background = `linear-gradient(to bottom, rgba(0,0,0,${overlayOpacity}) 0%, rgba(0,0,0,${overlayOpacity}) 60%, rgba(0,0,0,1) 100%)`

        // Trigger earth morph near the end of intro (after 60% scroll)
        if (progress > 0.6 && earth) {
          if (!earthLoaded) {
            // ensure image triggers load by swapping data-src -> src when needed
            const picture = earth.querySelector('picture')
            if (picture && picture.dataset.lazy === 'true') {
              const sources = picture.querySelectorAll('source')
              sources.forEach((s) => {
                if (s.dataset.srcset) s.srcset = s.dataset.srcset
              })
              const img = picture.querySelector('img')
              if (img && img.dataset.src) img.src = img.dataset.src
              picture.dataset.lazy = 'false'
            }
            setEarthLoaded(true)
          }
          const local = (progress - 0.6) / 0.4 // 0..1
          const eased = Math.min(1, Math.max(0, local))
          const opacity = reducedMotion ? eased * 0.8 : eased // cap a bit lower for readability
          earth.style.opacity = String(opacity)
        } else if (earth) {
          earth.style.opacity = '0'
        }
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [earthLoaded, reducedMotion])

  return (
    <section ref={heroRef} className="relative mx-auto min-h-[88vh] w-full overflow-hidden pt-28">
      {/* Spline background */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/Gt5HUob8aGDxOUep/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        {/* Planet layer (Mars) - anchored left center, cover */}
        <div className="pointer-events-none absolute inset-0">
          <picture className="absolute inset-0 block select-none will-change-transform" aria-hidden="true">
            {/* Desktop/large WebP */}
            <source media="(min-width: 640px)" type="image/webp" srcSet={`${MARS_WEBP}`} />
            <source media="(min-width: 640px)" type="image/png" srcSet={`${MARS_PNG}`} />
            {/* Mobile light variant */}
            <source media="(max-width: 639px)" type="image/webp" srcSet={`${MARS_MOBILE_WEBP}`} />
            <source media="(max-width: 639px)" type="image/png" srcSet={`${MARS_MOBILE_PNG}`} />
            <img
              ref={planetRef}
              src={MARS_MOBILE_WEBP}
              alt="Stylized Mars planet illustration background"
              className="absolute h-full w-full object-cover object-left"
              sizes="(max-width: 640px) 100vw, 100vw"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              style={{ transform: 'translateZ(0) scale(1)' }}
            />
          </picture>
        </div>
        {/* Dark gradient overlay to ensure legibility */}
        <div ref={overlayRef} className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.7) 60%, rgba(0,0,0,1))' }} />
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
            <button onClick={() => window.dispatchEvent(new CustomEvent('analytics', { detail: { action: 'cta_start_free' } }))} className="group inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-black transition-all hover:shadow-[0_0_0_3px_rgba(16,185,129,0.35)]">
              <span className="flex h-6 w-6 items-center justify-center rounded-[4px] bg-emerald-600/10">
                <ArrowRight size={16} className="text-emerald-600" />
              </span>
              Start free
            </button>
            <button onClick={() => window.dispatchEvent(new CustomEvent('analytics', { detail: { action: 'cta_book_demo' } }))} className="group inline-flex items-center gap-2 rounded-md bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-400">
              <span className="flex h-6 w-6 items-center justify-center rounded-[4px] bg-black/20">
                <ArrowUpRight size={16} className="text-white" />
              </span>
              Book a demo
            </button>
          </div>
        </div>
      </div>

      {/* Earth-like morph layer (lazy) */}
      <div ref={earthRef} className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity" aria-hidden="true">
        <picture data-lazy="true" className="absolute inset-0 block">
          <source type="image/webp" data-srcset={`${EARTH_WEBP}`} />
          <source type="image/png" data-srcset={`${EARTH_PNG}`} />
          <img data-src={EARTH_WEBP} alt="Earth close-up texture" className="absolute h-full w-full object-cover object-center" />
        </picture>
        {/* final fade to pure black occurs via overlay intensifying */}
      </div>
    </section>
  )
}
