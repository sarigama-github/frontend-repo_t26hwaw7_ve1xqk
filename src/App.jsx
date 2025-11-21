import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import Home from './pages/Home'
import About from './pages/About'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Courses from './pages/Courses'
import ProtectedRoute from './components/ProtectedRoute'
import './index.css'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 selection:bg-blue-600/30 selection:text-white">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_0%,rgba(59,130,246,0.25),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(59,130,246,0.08),transparent),linear-gradient(245deg,rgba(147,197,253,0.06),transparent)]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 40 40\"><path fill=\"%231e293b\" d=\"M0 39h40v1H0zM39 0v40h1V0z\"/></svg>')] opacity-40 mix-blend-overlay" />
      </div>

      <BrowserRouter>
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
