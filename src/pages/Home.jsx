import React, { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

export default function Home() {
  const [email, setEmail] = useState('demo@student.edu')
  const [items, setItems] = useState([])
  const [title, setTitle] = useState('Study Session')
  const [day, setDay] = useState('Mon')
  const [start, setStart] = useState('10:00')
  const [end, setEnd] = useState('12:00')

  const load = async () => {
    try {
      const res = await fetch(`${API}/api/schedule/${email}`)
      const data = await res.json()
      setItems(Array.isArray(data) ? data : [])
    } catch (e) {}
  }

  useEffect(() => { load() }, [])

  const add = async (e) => {
    e.preventDefault()
    try {
      await fetch(`${API}/api/schedule`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ owner_email: email, title, day, start_time: start, end_time: end })
      })
      setTitle('')
      load()
    } catch (e) {}
  }

  return (
    <section>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          <div className="grid grid-cols-5 gap-3">
            {days.map((d) => (
              <div key={d} className="rounded-xl border border-white/10 p-3 bg-white/5">
                <p className="text-blue-300 text-sm mb-2">{d}</p>
                <div className="space-y-2">
                  {items.filter(i => i.day === d).map((i) => (
                    <div key={i._id} className="rounded-lg p-2 bg-blue-600/20 border border-blue-400/20 text-white text-sm">
                      <p className="font-medium">{i.title}</p>
                      <p className="text-white/70">{i.start_time} - {i.end_time}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:w-1/3">
          <form onSubmit={add} className="rounded-2xl border border-white/10 p-4 bg-white/5 sticky top-6">
            <p className="text-white font-semibold mb-3">Quick add</p>
            <label className="block text-sm text-slate-300 mb-1">Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full mb-3 px-3 py-2 rounded-lg bg-slate-900/60 border border-white/10 text-white outline-none" />

            <label className="block text-sm text-slate-300 mb-1">Title</label>
            <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full mb-3 px-3 py-2 rounded-lg bg-slate-900/60 border border-white/10 text-white outline-none" />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-slate-300 mb-1">Day</label>
                <select value={day} onChange={e=>setDay(e.target.value)} className="w-full mb-3 px-3 py-2 rounded-lg bg-slate-900/60 border border-white/10 text-white outline-none">
                  {days.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1">Start</label>
                <input type="time" value={start} onChange={e=>setStart(e.target.value)} className="w-full mb-3 px-3 py-2 rounded-lg bg-slate-900/60 border border-white/10 text-white outline-none" />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1">End</label>
                <input type="time" value={end} onChange={e=>setEnd(e.target.value)} className="w-full mb-3 px-3 py-2 rounded-lg bg-slate-900/60 border border-white/10 text-white outline-none" />
              </div>
            </div>

            <button className="w-full mt-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white">Add</button>
          </form>
        </div>
      </div>
    </section>
  )
}
