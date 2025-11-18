import React from 'react'
import { Menu, Home, Settings } from 'lucide-react'

const NavButton = ({ label, active }) => {
  return (
    <button
      className={`group relative inline-flex items-center gap-3 rounded-md border px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300
      ${active ? 'border-emerald-500/70 text-white' : 'border-white/10 text-white/80 hover:text-white hover:border-emerald-500/50'}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full transition-colors ${active ? 'bg-emerald-500' : 'bg-white/40 group-hover:bg-emerald-400'}`} />
      <span>{label}</span>
    </button>
  )
}

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mt-6 flex items-center justify-between rounded-xl border border-white/10 bg-black/50 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-black/40">
          <div className="flex items-center gap-3 text-white/70">
            <div className="flex h-9 w-9 items-center justify-center rounded-md border border-emerald-500/40 bg-black/60">
              <Menu size={18} className="text-emerald-400" />
            </div>
            <span className="text-sm font-semibold tracking-wider text-white">NEBULA</span>
          </div>
          <nav className="hidden gap-3 md:flex">
            <NavButton label="Overview" active />
            <NavButton label="Product" />
            <NavButton label="Docs" />
            <NavButton label="Pricing" />
            <NavButton label="Contact" />
          </nav>
          <div className="flex items-center gap-2">
            <button className="rounded-md border border-emerald-500/40 px-3 py-2 text-xs font-medium text-emerald-300/90 hover:text-white hover:border-emerald-400 transition-colors">Sign in</button>
          </div>
        </div>
      </div>
    </header>
  )
}
