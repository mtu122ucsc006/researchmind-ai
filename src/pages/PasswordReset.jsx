import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api.js'

export default function PasswordReset() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await api.post('/auth/reset-password', { email: email.trim(), password })
      setMessage('Password reset successful. Please login with your new password.')
      setEmail('')
      setPassword('')
      setTimeout(() => navigate('/login'), 1500)
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to reset password.')
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-xl">
      <h1 className="text-3xl font-semibold text-brand-700">Reset Password</h1>
      <p className="mt-2 text-slate-600">Enter your email and a new password to recover access.</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <label className="block text-sm font-medium text-slate-700">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-2 w-full rounded-3xl border border-slate-300 px-4 py-3 focus:border-brand-500 focus:outline-none"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          New Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-2 w-full rounded-3xl border border-slate-300 px-4 py-3 focus:border-brand-500 focus:outline-none"
          />
        </label>
        <button className="w-full rounded-3xl bg-brand-600 px-4 py-3 text-white hover:bg-brand-700">Reset Password</button>
      </form>
      {message && <p className="mt-4 rounded-3xl bg-slate-100 p-4 text-sm text-slate-700">{message}</p>}
    </div>
  )
}
