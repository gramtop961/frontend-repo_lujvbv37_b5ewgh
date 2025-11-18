import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import IntroAndCredibility from './components/IntroAndCredibility'
import Integrations from './components/Integrations'

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main>
        <Hero />
        <IntroAndCredibility />
        <Integrations />
      </main>
      <footer className="border-t border-white/10 bg-black/90 py-10">
        <div className="mx-auto max-w-7xl px-6 text-sm text-gray-400">© 2025 Nebula Systems</div>
      </footer>
    </div>
  )
}

export default App
