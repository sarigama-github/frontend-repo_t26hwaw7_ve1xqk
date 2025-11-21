import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const nav = useNavigate()
  const email = typeof window !== 'undefined' ? localStorage.getItem('email') : null

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('name')
    nav('/login')
  }

  const links = [
    { to: '/', label: 'Landing' },
    { to: '/home', label: 'Home', auth: true },
    { to: '/courses', label: 'Courses', auth: true },
    { to: '/about', label: 'About' },
    { to: '/register', label: 'Register' },
    { to: '/profile', label: 'Profile', auth: true },
  ]

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-500 shadow shadow-blue-500/30" />
          <span className="text-white font-semibold">Campus Scheduler</span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4 text-slate-300">
          {links.filter(l => !l.auth || !!email).map((i) => (
            <NavLink key={i.to} to={i.to} className={({isActive}) => `px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/10 ${isActive ? 'text-white bg-white/10' : ''}`}>
              {i.label}
            </NavLink>
          ))}
          {!email ? (
            <NavLink to="/login" className={({isActive}) => `px-3 py-1.5 rounded-lg bg-blue-600/90 text-white hover:bg-blue-500 ${isActive ? 'ring-2 ring-blue-400/50' : ''}`}>
              Login
            </NavLink>
          ) : (
            <button onClick={logout} className="px-3 py-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20">Logout</button>
          )}
        </nav>
      </div>
    </header>
  )
}
