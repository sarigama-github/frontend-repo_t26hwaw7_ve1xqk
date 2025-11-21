import React from 'react'

export default function GlassCard({ children, className = '' }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 ${className}`}>
      {children}
    </div>
  )
}
