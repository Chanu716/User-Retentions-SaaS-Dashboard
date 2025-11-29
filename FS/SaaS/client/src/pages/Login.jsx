import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthCore'
import PageHeader from '../components/PageHeader'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="page container p-6">
      <div className="max-w-md mx-auto">
        <PageHeader title="Sign in" subtitle="Access the dashboard" />
        <div className="card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input className="w-full p-3 border rounded bg-transparent" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
            <input type="password" className="w-full p-3 border rounded bg-transparent" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
            {error && <div className="text-red-400">{error}</div>}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button className="btn-accent">Sign in</button>
              <Link to="/register" className="muted" style={{ marginLeft: 12 }}>Create account</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
