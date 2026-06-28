import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from "../api/api.js"
import { saveUser, saveToken } from '../utils/storage.js'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await api.post('/auth/login', { email: email.trim(), password })
      saveToken(response.data.token)
      saveUser(response.data.user)
      onLogin(response.data.user)
      navigate('/dashboard')
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'Login failed. Check your email/password or reset your password.'
      alert(message)
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-xl">
      <h1 className="text-3xl font-semibold text-brand-700">Login</h1>
      <p className="mt-2 text-slate-600">Access your research dashboard and tools. Use the email and password you created in this app; Google account login is not supported.</p>
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
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-2 w-full rounded-3xl border border-slate-300 px-4 py-3 focus:border-brand-500 focus:outline-none"
          />
        </label>
        <button className="w-full rounded-3xl bg-brand-600 px-4 py-3 text-white hover:bg-brand-700">Login</button>
      </form>
      <p className="mt-4 text-sm text-slate-600">
        Forgot password?{' '}
        <Link to="/reset" className="font-semibold text-brand-700 hover:underline">
          Reset it here
        </Link>
      </p>
      <p className="mt-2 text-sm text-slate-600">
        New to ResearchMind AI?{' '}
        <Link to="/signup" className="font-semibold text-brand-700 hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  )
}
