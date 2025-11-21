import React, { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function Profile() {
  const [email, setEmail] = useState(() => localStorage.getItem('email') || 'demo@student.edu')
  const [profile, setProfile] = useState({ name: '', major: '', year: '', avatar: '' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    setError('')
    if (!email) return
    try {
      const res = await fetch(`${API}/api/profile/${encodeURIComponent(email)}`)
      if (!res.ok) throw new Error('Unable to load profile')
      const data = await res.json()
      setProfile({
        name: data.name || '',
        major: data.major || '',
        year: data.year || '',
        avatar: data.avatar || ''
      })
      if (data.name) localStorage.setItem('name', data.name)
    } catch (e) {
      setError(e.message)
    }
  }

  useEffect(() => { load() }, [email])

  const save = async () => {
    setSaving(true)
    setError('')
    try {
      const res = await fetch(`${API}/api/profile/${encodeURIComponent(email)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      })
      if (!res.ok) throw new Error('Failed to save')
      const data = await res.json()
      if (data?.name) localStorage.setItem('name', data.name)
    } catch (e) { setError(e.message) } finally { setSaving(false) }
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
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        <button onClick={save} className="mt-4 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white">
          {saving ? 'Saving...' : 'Save changes'}
        </button>
      </div>
    </section>
  )
}
