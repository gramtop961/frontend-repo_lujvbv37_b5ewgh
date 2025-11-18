import React from 'react'

const logos = [
  { name: 'Snowflake', src: 'https://images.unsplash.com/photo-1457269449834-928af64c684d?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxTbm93Zmxha2V8ZW58MHwwfHx8MTc2MzQ4OTI3NXww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80' },
  { name: 'AWS', src: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
  { name: 'Google Cloud', src: 'https://images.unsplash.com/photo-1457269449834-928af64c684d?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxTbm93Zmxha2V8ZW58MHwwfHx8MTc2MzQ4OTI3NXww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80' },
  { name: 'Azure', src: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg' },
  { name: 'Databricks', src: 'https://images.unsplash.com/photo-1457269449834-928af64c684d?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxTbm93Zmxha2V8ZW58MHwwfHx8MTc2MzQ4OTI3NXww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80' }
]

export default function IntroAndCredibility() {
  return (
    <section className="relative w-full border-t border-white/10 bg-black/80 py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-emerald-400">Autonomous by design</h2>
            <p className="mt-3 text-gray-300">
              Our AI agents plan, deploy, and continuously optimize your pipelines across ingestion, transformation, and governance. Compatible with your tools out-of-the-box: dbt, Airflow, Spark, and more.
            </p>
          </div>
          <div>
            <h3 className="text-emerald-400">Trusted by high-performing data teams</h3>
            <p className="mt-2 text-gray-300">Built for scale, security, and compliance in enterprise environments.</p>
            <div className="mt-5 flex flex-wrap items-center justify-start gap-6 opacity-90">
              {logos.map(logo => (
                <img key={logo.name} src={logo.src} alt={logo.name} className="h-8 w-auto object-contain" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
