import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function Profile() {
  const { state } = useLocation()
  const [email, setEmail] = useState(state?.email || 'demo@student.edu')
  const [profile, setProfile] = useState({ name: '', major: '', year: '', avatar: '' })
  const [saving, setSaving] = useState(false)

  const load = async () => {
    try {
      const res = await fetch(`${API}/api/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password: 'ignored' }) })
      const data = await res.json()
      if (data && data.profile) setProfile(data.profile)
    } catch (e) {}
  }

  useEffect(() => { load() }, [])

  const save = async () => {
    setSaving(true)
    try {
      await fetch(`${API}/api/profile/${email}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(profile) })
    } catch (e) {} finally { setSaving(false) }
  }

  return (
    <section className="max-w-2xl mx-auto">
      <h2 className="text-white text-3xl font-bold mb-4">Your profile</h2>
      <div className="rounded-2xl border border-white/10 p-5 bg-white/5">
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="text-sm text-slate-300">Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-slate-900/60 border border-white/10 text-white outline-none" />
          </div>
          <div>
            <label className="text-sm text-slate-300">Name</label>
            <input value={profile.name || ''} onChange={e=>setProfile({...profile, name:e.target.value})} className="w-full px-3 py-2 rounded-lg bg-slate-900/60 border border-white/10 text-white outline-none" />
          </div>
          <div>
            <label className="text-sm text-slate-300">Major</label>
            <input value={profile.major || ''} onChange={e=>setProfile({...profile, major:e.target.value})} className="w-full px-3 py-2 rounded-lg bg-slate-900/60 border border-white/10 text-white outline-none" />
          </div>
          <div>
            <label className="text-sm text-slate-300">Year</label>
            <select value={profile.year || ''} onChange={e=>setProfile({...profile, year:e.target.value})} className="w-full px-3 py-2 rounded-lg bg-slate-900/60 border border-white/10 text-white outline-none">
              <option value="">Select</option>
              {['Freshman','Sophomore','Junior','Senior','Graduate'].map(y=> <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm text-slate-300">Avatar URL</label>
            <input value={profile.avatar || ''} onChange={e=>setProfile({...profile, avatar:e.target.value})} className="w-full px-3 py-2 rounded-lg bg-slate-900/60 border border-white/10 text-white outline-none" />
          </div>
        </div>
        <button onClick={save} className="mt-4 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white">
          {saving ? 'Saving...' : 'Save changes'}
        </button>
      </div>
    </section>
  )
}
