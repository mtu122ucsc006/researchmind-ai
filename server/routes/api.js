import express from 'express'
import { authMiddleware } from '../middlewares/auth.js'
import {
  getNotesForUser, addNote, updateNote, deleteNote, updateUser, findUserById,
  getProjectsForUser, addProject, updateProject, deleteProject,
  getReferencesForUser, addReference, updateReference, deleteReference,
  addUpload, getUploadsForUser
} from '../db.js'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import pdfParse from 'pdf-parse'

const router = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const upload = multer({ dest: path.join(__dirname, '../uploads') })

const GROQ_API_KEY = process.env.GROQ_API_KEY

async function callGroq(prompt, systemPrompt = '') {
  const response = await fetch(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
          { role: 'user', content: prompt }
        ],
        max_tokens: 1000
      })
    }
  )
  if (!response.ok) {
    const errText = await response.text()
    console.error('Groq API error:', response.status, errText)
    throw new Error(`Groq API error: ${response.status}`)
  }
  const data = await response.json()
  return data.choices?.[0]?.message?.content || 'No response'
}

router.post('/chat', async (req, res) => {
  const { message, context } = req.body
  try {
    const systemPrompt = context && context.length > 50
      ? `You are ResearchMind AI, an academic research assistant. Use this document context:\n\n${context}`
      : `You are ResearchMind AI, an academic research assistant. Help with research topics, paper structure, citations, and literature reviews.`
    const reply = await callGroq(message, systemPrompt)
    res.json({ reply })
  } catch (error) {
    console.error('Groq error:', error.message)
    res.status(500).json({ reply: 'AI service error. Check GROQ_API_KEY in .env file.' })
  }
})

router.post('/ai/generate-paper', (req, res) => {
  const { topic } = req.body
  res.json({
    title: `Exploring ${topic}`,
    abstract: `This abstract describes the academic value of studying ${topic}.`,
    introduction: `The introduction situates ${topic} within current research.`,
    conclusion: `The conclusion summarizes the key findings for ${topic}.`
  })
})

router.post('/ai/citation', (req, res) => {
  const { author, title, year } = req.body
  res.json({
    apa: `${author}. (${year}). ${title}.`,
    mla: `${author}. "${title}." ${year}.`,
    ieee: `${author}, "${title}," ${year}.`
  })
})

router.post('/ai/literature', (req, res) => {
  const { topic } = req.body
  res.json({
    summary: `A literature review for ${topic} highlights main findings, trends, and research gaps.`
  })
})

router.use(authMiddleware)

// ✅ FIXED — fresh read from data.json instead of stale req.user (JWT payload)
router.get('/profile', async (req, res) => {
  const user = await findUserById(req.user.id)
  if (!user) return res.status(404).json({ message: 'User not found' })
  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    institution: user.institution || '',
    department: user.department || '',
    bio: user.bio || '',
    phone: user.phone || '',
    location: user.location || '',
    academicYear: user.academicYear || '',
    researchInterests: user.researchInterests || '',
    linkedin: user.linkedin || '',
    github: user.github || '',
    avatar: user.avatar || ''
  })
})

// ✅ FIXED — accepts all fields, returns clean object (no password leak)
router.put('/profile', async (req, res) => {
  const {
    name, institution, department,
    bio, phone, location, academicYear,
    researchInterests, linkedin, github, avatar
  } = req.body
  const updated = await updateUser(req.user.id, {
    name, institution, department,
    bio, phone, location, academicYear,
    researchInterests, linkedin, github, avatar
  })
  if (!updated) return res.status(404).json({ message: 'User not found' })
  res.json({
    user: {
      id: updated.id,
      name: updated.name,
      email: updated.email,
      institution: updated.institution || '',
      department: updated.department || '',
      bio: updated.bio || '',
      phone: updated.phone || '',
      location: updated.location || '',
      academicYear: updated.academicYear || '',
      researchInterests: updated.researchInterests || '',
      linkedin: updated.linkedin || '',
      github: updated.github || '',
      avatar: updated.avatar || ''
    }
  })
})

router.get('/notes', async (req, res) => {
  const notes = await getNotesForUser(req.user.id)
  res.json(notes)
})

router.post('/notes', async (req, res) => {
  const { title, content } = req.body
  const note = await addNote({ id: Date.now(), userId: req.user.id, title, content })
  res.json(note)
})

router.put('/notes/:id', async (req, res) => {
  const note = await updateNote(Number(req.params.id), req.body)
  if (!note) return res.status(404).json({ message: 'Note not found' })
  res.json(note)
})

router.delete('/notes/:id', async (req, res) => {
  await deleteNote(Number(req.params.id))
  res.json({ message: 'Deleted' })
})

router.get('/projects', async (req, res) => {
  const projects = await getProjectsForUser(req.user.id)
  res.json(projects)
})

router.post('/projects', async (req, res) => {
  const { title, deadline } = req.body
  const project = await addProject({ id: Date.now(), userId: req.user.id, title, deadline, completed: false })
  res.json(project)
})

router.put('/projects/:id', async (req, res) => {
  const project = await updateProject(Number(req.params.id), req.body)
  if (!project) return res.status(404).json({ message: 'Project not found' })
  res.json(project)
})

router.delete('/projects/:id', async (req, res) => {
  await deleteProject(Number(req.params.id))
  res.json({ message: 'Deleted' })
})

router.get('/references', async (req, res) => {
  const references = await getReferencesForUser(req.user.id)
  res.json(references)
})

router.post('/references', async (req, res) => {
  const { author, title, year, notes } = req.body
  const reference = await addReference({ id: Date.now(), userId: req.user.id, author, title, year, notes })
  res.json(reference)
})

router.put('/references/:id', async (req, res) => {
  const reference = await updateReference(Number(req.params.id), req.body)
  if (!reference) return res.status(404).json({ message: 'Reference not found' })
  res.json(reference)
})

router.delete('/references/:id', async (req, res) => {
  await deleteReference(Number(req.params.id))
  res.json({ message: 'Deleted' })
})

router.get('/documents', async (req, res) => {
  const uploads = await getUploadsForUser(req.user.id)
  res.json(uploads.map((u) => ({ id: u.id, name: u.name, size: u.size, type: u.type, uploadedAt: u.uploadedAt, text: u.text })))
})

router.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Please upload a document.' })
  const filePath = req.file.path
  const fileBuffer = fs.readFileSync(filePath)
  let text = ''
  try {
    if (req.file.mimetype === 'application/pdf') {
      const data = await pdfParse(fileBuffer)
      text = data.text
    } else {
      text = fileBuffer.toString('utf-8')
    }
  } catch (e) { text = '' }
  try {
    const record = {
      id: Date.now(), userId: req.user.id, name: req.file.originalname,
      filename: req.file.filename, size: req.file.size, type: req.file.mimetype,
      text: text.slice(0, 50000), uploadedAt: new Date().toISOString()
    }
    await addUpload(record)
    res.json({
      document: {
        name: req.file.originalname, size: req.file.size, type: req.file.mimetype,
        text: text.slice(0, 5000),
        summary: `Document ${req.file.originalname} uploaded. Extracted ${text.length} characters.`
      }
    })
  } catch (e) {
    console.error('Failed to save upload metadata', e)
    res.status(500).json({ message: 'Upload failed.' })
  }
})

router.get('/uploads', async (req, res) => {
  const uploads = await getUploadsForUser(req.user.id)
  res.json(uploads.map((u) => ({ id: u.id, name: u.name, size: u.size, type: u.type, uploadedAt: u.uploadedAt })))
})

export default router