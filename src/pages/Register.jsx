import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function Register() {
  const nav = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', major: '', year: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error((await res.json()).detail || 'Failed')
      nav('/profile', { state: { email: form.email } })
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="max-w-xl mx-auto">
      <h2 className="text-white text-3xl font-bold mb-4">Create your account</h2>
      <form onSubmit={submit} className="rounded-2xl border border-white/10 p-5 bg-white/5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input placeholder="Full name" className="px-3 py-2 rounded-lg bg-slate-900/60 border border-white/10 text-white outline-none" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
          <input placeholder="Email" type="email" className="px-3 py-2 rounded-lg bg-slate-900/60 border border-white/10 text-white outline-none" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
          <input placeholder="Password" type="password" className="px-3 py-2 rounded-lg bg-slate-900/60 border border-white/10 text-white outline-none" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required />
          <input placeholder="Major (optional)" className="px-3 py-2 rounded-lg bg-slate-900/60 border border-white/10 text-white outline-none" value={form.major} onChange={e=>setForm({...form, major:e.target.value})} />
          <select className="px-3 py-2 rounded-lg bg-slate-900/60 border border-white/10 text-white outline-none" value={form.year} onChange={e=>setForm({...form, year:e.target.value})}>
            <option value="">Year</option>
            {['Freshman','Sophomore','Junior','Senior','Graduate'].map(y=> <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        {error && <p className="text-red-400 mt-3 text-sm">{error}</p>}
        <button disabled={loading} className="mt-4 w-full px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-60">
          {loading ? 'Creating...' : 'Create account'}
        </button>
      </form>
    </section>
  )
}
