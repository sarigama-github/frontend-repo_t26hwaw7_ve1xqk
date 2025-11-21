import React from 'react'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <section className="text-center">
      <div className="mx-auto max-w-3xl">
        <span className="inline-block rounded-full bg-blue-500/10 text-blue-300 px-3 py-1 text-xs border border-blue-400/20 mb-4">Student-built • Minimal & Interactive</span>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
          Campus Scheduler
        </h1>
        <p className="text-slate-300 mt-4 text-lg">
          Organize classes, labs and study plans in a clean, minimal dashboard. Built with simple vibes and nice typography.
        </p>

        <div className="flex items-center justify-center gap-3 mt-8">
          <Link to="/register" className="px-5 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition shadow-lg shadow-blue-600/20">
            Create your account
          </Link>
          <Link to="/home" className="px-5 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition">
            Explore the demo
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10 text-left">
          {[
            { t: 'Quick add', d: 'Add classes or study blocks in two taps.' },
            { t: 'Timetable', d: 'See your week at a glance.' },
            { t: 'Reminders', d: 'Lightweight nudges for upcoming tasks.' },
            { t: 'Profiles', d: 'Show your major, year and vibe.' }
          ].map((f, i) => (
            <div key={i} className="rounded-xl border border-white/10 p-4 bg-white/5">
              <p className="text-sm text-blue-300 mb-1">{f.t}</p>
              <p className="text-slate-300/90 text-sm">{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
