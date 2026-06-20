import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api.js'
import { saveUser, saveToken } from '../utils/storage.js'

export default function Signup({ onSignup }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await api.post('/auth/register', {
        name: name.trim(),
        email: email.trim(),
        password
      })
      saveToken(response.data.token)
      saveUser(response.data.user)
      onSignup(response.data.user)
      navigate('/dashboard')
    } catch (error) {
      const message =
        error.response?.data?.message === 'Email already exists.'
          ? 'This email is already registered. Please login or reset your password.'
          : error.response?.data?.message || 'Registration failed'
      alert(message)
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-xl">
      <h1 className="text-3xl font-semibold text-brand-700">Sign Up</h1>
      <p className="mt-2 text-slate-600">Create your account and start managing research tasks. Use this email/password pair for login later.</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <label className="block text-sm font-medium text-slate-700">
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-2 w-full rounded-3xl border border-slate-300 px-4 py-3 focus:border-brand-500 focus:outline-none"
          />
        </label>
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
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-2 w-full rounded-3xl border border-slate-300 px-4 py-3 focus:border-brand-500 focus:outline-none"
          />
        </label>
        <button className="w-full rounded-3xl bg-brand-600 px-4 py-3 text-white hover:bg-brand-700">Create account</button>
      </form>
    </div>
  )
}
