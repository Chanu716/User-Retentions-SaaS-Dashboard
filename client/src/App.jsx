import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useAuth } from './context/AuthCore'
import Overview from './pages/Overview'
import Retention from './pages/Retention'
import Cohorts from './pages/Cohorts'
import FeatureUsage from './pages/FeatureUsage'
import Login from './pages/Login'
import Register from './pages/Register'
import JsonServerDemo from './pages/JsonServerDemo'

const Nav = () => {
  const { user, logout } = useAuth() || {}
  return (
    <nav className="card" style={{ padding: '0.6rem 1rem', marginBottom: '1rem' }}>
      <div className="container nav-inner">
        <div className="nav-left">
          <Link to="/" className="brand accent">Company</Link>
          <div className="nav-links" style={{ marginLeft: 12 }}>
            <Link to="/" className="muted">Overview</Link>
            <Link to="/retention" className="muted">Retention</Link>
            <Link to="/cohorts" className="muted">Cohorts</Link>
            <Link to="/feature-usage" className="muted">Feature Usage</Link>
            <Link to="/json-demo" className="muted">JSON Demo</Link>
          </div>
        </div>
        <div>
          {user ? (
            <>
              <span className="muted" style={{ marginRight: 12 }}>Hi, {user.name || user.email}</span>
              <button className="btn-accent" onClick={() => { logout(); window.location.pathname = '/' }}>Sign out</button>
            </>
          ) : (
            <Link to="/login" className="btn-accent">Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <main className="page">
        <div className="container">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/dashboard" element={<Overview />} />
          <Route path="/retention" element={<Retention />} />
          <Route path="/cohorts" element={<Cohorts />} />
          <Route path="/feature-usage" element={<FeatureUsage />} />
          <Route path="/json-demo" element={<JsonServerDemo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        </div>
      </main>
    </div>
  )
}

export default App
