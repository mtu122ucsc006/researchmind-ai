import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { findUserByEmail, saveUser, updateUser } from '../db.js'

dotenv.config()
const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret'

if (!process.env.JWT_SECRET) {
  console.warn('Warning: JWT_SECRET is not set. Using fallback secret for local development.')
}

function createToken(payload) {
  return jwt.sign(payload, JWT_SECRET)
}

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please fill all fields.' })
  }

  const existing = await findUserByEmail(email)
  if (existing) {
    return res.status(400).json({ message: 'Email already exists.' })
  }

  const hashed = await bcrypt.hash(password, 10)
  const newUser = {
    id: Date.now(),
    name,
    email,
    password: hashed,
    institution: '',
    department: ''
  }
  await saveUser(newUser)

  const token = createToken({ id: newUser.id })
  return res.json({ token, user: { id: newUser.id, name, email, institution: '', department: '' } })
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: 'Please fill all fields.' })
  }

  const user = await findUserByEmail(email)
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials.' })
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials.' })
  }

  const token = createToken({ id: user.id })
  const profile = {
    id: user.id,
    name: user.name,
    email: user.email,
    institution: user.institution,
    department: user.department
  }
  return res.json({ token, user: profile })
})

router.post('/reset-password', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and new password.' })
  }

  const user = await findUserByEmail(email)
  if (!user) {
    return res.status(400).json({ message: 'No account found for that email.' })
  }

  const hashed = await bcrypt.hash(password, 10)
  await updateUser(user.id, { password: hashed })
  res.json({ message: 'Password reset successful.' })
})

export default router
