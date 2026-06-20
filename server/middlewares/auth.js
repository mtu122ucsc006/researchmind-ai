// FILE: server/middlewares/auth.js

import jwt from 'jsonwebtoken'
import { findUserById } from '../db.js'
import dotenv from 'dotenv'
dotenv.config()

export async function authMiddleware(req, res, next) {
  const authHeader = req.header('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: no token provided' })
  }

  const token = authHeader.replace('Bearer ', '').trim()

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret')
    let user = await findUserById(Number(payload.id))
    if (!user) user = await findUserById(String(payload.id))
    if (!user) return res.status(401).json({ message: 'Unauthorized: user not found' })
    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: invalid token' })
  }
}