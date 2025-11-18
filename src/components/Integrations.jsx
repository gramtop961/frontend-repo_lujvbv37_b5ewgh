import React from 'react'

const items = [
  'dbt for transformations and testing',
  'Airflow for orchestration and scheduling',
  'Spark for large-scale compute',
  'Fivetran/airbyte for ingestion',
  'Snowflake/BigQuery/Redshift for warehousing',
  'Great Expectations for data quality',
]

export default function Integrations() {
  return (
    <section className="relative w-full bg-black py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h3 className="text-emerald-400">Integrations</h3>
        <ul className="mt-4 space-y-3 text-gray-300">
          {items.map((text, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
              <span className="font-mono text-sm leading-relaxed">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
