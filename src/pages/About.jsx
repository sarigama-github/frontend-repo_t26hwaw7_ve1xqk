import React from 'react'

export default function About() {
  return (
    <section className="max-w-3xl">
      <h2 className="text-white text-3xl font-bold">About</h2>
      <p className="text-slate-300 mt-3">
        This project is a minimal student-built organizer to manage weekly schedules and study plans. It focuses on clarity, speed and a clean vibe over heavy features. You can register, set a profile and quickly add classes or study blocks to your timetable.
      </p>
      <div className="grid sm:grid-cols-2 gap-3 mt-6">
        {["Minimal UI", "Nice fonts", "Soft gradients", "Fast"].map((t, i) => (
          <div className="rounded-xl border border-white/10 p-4 bg-white/5" key={i}>
            <p className="text-blue-300 text-sm">{t}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
