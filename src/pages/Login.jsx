import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function Login() {
  const nav = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Login failed')
      // store a very simple auth state
      localStorage.setItem('token', data.token)
      localStorage.setItem('email', data.profile?.email || form.email)
      localStorage.setItem('name', data.profile?.name || '')
      const redirectTo = location.state?.from || '/home'
      nav(redirectTo, { replace: true })
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="max-w-md mx-auto">
      <h2 className="text-white text-3xl font-bold mb-4">Welcome back</h2>
      <form onSubmit={submit} className="rounded-2xl border border-white/10 p-5 bg-white/5">
        <input placeholder="Email" type="email" className="w-full mb-3 px-3 py-2 rounded-lg bg-slate-900/60 border border-white/10 text-white outline-none" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
        <input placeholder="Password" type="password" className="w-full mb-3 px-3 py-2 rounded-lg bg-slate-900/60 border border-white/10 text-white outline-none" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required />
        {error && <p className="text-red-400 mt-1 text-sm">{error}</p>}
        <button disabled={loading} className="mt-2 w-full px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-60">
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </section>
  )
}
