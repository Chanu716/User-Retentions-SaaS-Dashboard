import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthCore'
import PageHeader from '../components/PageHeader'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [adminCode, setAdminCode] = useState('')
  const [error, setError] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await register(name, email, password, adminCode || undefined)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="page container p-6">
      <div className="max-w-md mx-auto">
        <PageHeader title="Create an account" subtitle="Register to access the dashboard" />
        <div className="card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input className="w-full p-3 border rounded bg-transparent" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
            <input className="w-full p-3 border rounded bg-transparent" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
            <input type="password" className="w-full p-3 border rounded bg-transparent" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
            <input className="w-full p-3 border rounded bg-transparent" placeholder="Admin code (dev only)" value={adminCode} onChange={e=>setAdminCode(e.target.value)} />
            {error && <div className="text-red-400">{error}</div>}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button className="btn-accent">Create account</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
