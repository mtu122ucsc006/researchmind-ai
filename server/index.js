import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import apiRoutes from './routes/api.js'

dotenv.config()

const app = express()

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://researchmind-ai-pink.vercel.app'
  ],
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

app.use('/api/auth', authRoutes)
app.use('/api', apiRoutes)

app.get('/', (req, res) => res.json({ message: 'ResearchMind AI backend is running' }))

app.use((err, req, res, next) => {
  console.error('Server error:', err)
  res.status(500).json({ error: err.message || 'Internal server error' })
})

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

server.on('error', (error) => {
  console.error('Backend failed to start:', error)
  process.exit(1)
})
