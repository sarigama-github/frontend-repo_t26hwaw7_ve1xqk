import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-500 shadow shadow-blue-500/30" />
          <span className="text-white font-semibold">Campus Scheduler</span>
        </Link>
        <nav className="flex items-center gap-4 text-slate-300">
          {[
            { to: '/', label: 'Landing' },
            { to: '/home', label: 'Home' },
            { to: '/about', label: 'About' },
            { to: '/register', label: 'Register' },
            { to: '/profile', label: 'Profile' },
          ].map((i) => (
            <NavLink key={i.to} to={i.to} className={({isActive}) => `px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/10 ${isActive ? 'text-white bg-white/10' : ''}`}>
              {i.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
