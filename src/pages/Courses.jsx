import React, { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function Courses() {
  const [email, setEmail] = useState(() => localStorage.getItem('email') || 'demo@student.edu')
  const [form, setForm] = useState({ code: '', title: '', instructor: '', credits: 3 })
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  const load = async () => {
    if (!email) return
    try {
      const res = await fetch(`${API}/api/courses/${encodeURIComponent(email)}`)
      const data = await res.json()
      setItems(Array.isArray(data) ? data : [])
    } catch {}
  }

  useEffect(() => { load() }, [email])

  const add = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = { ...form, owner_email: email }
      await fetch(`${API}/api/courses`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      setForm({ code: '', title: '', instructor: '', credits: 3 })
      load()
    } finally { setLoading(false) }
  }

  const remove = async (id) => {
    try {
      await fetch(`${API}/api/courses/${id}?owner_email=${encodeURIComponent(email)}`, { method: 'DELETE' })
      load()
    } catch {}
  }

  return (
    <section>
      <h2 className="text-white text-3xl font-bold mb-4">Courses</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <form onSubmit={add} className="rounded-2xl border border-white/10 p-5 bg-white/5">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="text-sm text-slate-300">Owner Email</label>
              <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-slate-900/60 border border-white/10 text-white outline-none" />
            </div>
            <input placeholder="Code (e.g., MATH101)" className="px-3 py-2 rounded-lg bg-slate-900/60 border border-white/10 text-white outline-none" value={form.code} onChange={e=>setForm({...form, code:e.target.value})} required />
            <input placeholder="Title" className="px-3 py-2 rounded-lg bg-slate-900/60 border border-white/10 text-white outline-none" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} required />
            <input placeholder="Instructor" className="px-3 py-2 rounded-lg bg-slate-900/60 border border-white/10 text-white outline-none" value={form.instructor} onChange={e=>setForm({...form, instructor:e.target.value})} />
            <input placeholder="Credits" type="number" min="0" max="10" className="px-3 py-2 rounded-lg bg-slate-900/60 border border-white/10 text-white outline-none" value={form.credits} onChange={e=>setForm({...form, credits:Number(e.target.value)})} />
          </div>
          <button disabled={loading} className="mt-3 w-full px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-60">
            {loading ? 'Adding...' : 'Add course'}
          </button>
        </form>

        <div className="rounded-2xl border border-white/10 p-5 bg-white/5">
          <p className="text-white font-semibold mb-3">Your courses</p>
          <div className="space-y-2">
            {items.length === 0 && <p className="text-slate-400 text-sm">No courses yet.</p>}
            {items.map((c) => (
              <div key={c._id} className="flex items-center justify-between gap-3 rounded-lg bg-white/5 border border-white/10 px-3 py-2">
                <div>
                  <p className="text-white font-medium">{c.code} · {c.title}</p>
                  <p className="text-slate-400 text-sm">{c.instructor || '—'} • {c.credits ?? '—'} credits</p>
                </div>
                <button onClick={() => remove(c._id)} className="px-3 py-1.5 rounded-lg bg-red-600/80 text-white hover:bg-red-500">Remove</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
