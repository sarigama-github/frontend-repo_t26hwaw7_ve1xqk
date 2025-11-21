import React, { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function Footer() {
  const [ann, setAnn] = useState([])
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/api/announcements`)
        const data = await res.json()
        setAnn(Array.isArray(data) ? data : [])
      } catch (e) {}
    })()
  }, [])

  return (
    <footer className="mt-12 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6 text-slate-300">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-white/80">Made with student vibes • Keep it simple</p>
          <div className="flex gap-2 flex-wrap">
            {ann.map((a, i) => (
              <span key={i} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/90 text-xs">{a.title}: {a.body}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
