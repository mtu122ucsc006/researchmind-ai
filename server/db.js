import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dataPath = path.join(__dirname, 'data.json')

export async function readData() {
  const raw = await fs.readFile(dataPath, 'utf-8')
  return JSON.parse(raw)
}

export async function writeData(data) {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf-8')
}

export async function findUserByEmail(email) {
  const data = await readData()
  return data.users.find((user) => user.email === email)
}

export async function findUserById(id) {
  const data = await readData()
  return data.users.find((user) => user.id === id)
}

export async function saveUser(user) {
  const data = await readData()
  data.users.push(user)
  await writeData(data)
}

export async function updateUser(id, updates) {
  const data = await readData()
  const user = data.users.find((item) => item.id === id)
  if (!user) return null
  Object.assign(user, updates)
  await writeData(data)
  return user
}

export async function getNotesForUser(userId) {
  const data = await readData()
  return data.notes.filter((note) => note.userId === userId)
}

export async function addNote(note) {
  const data = await readData()
  data.notes.unshift(note)
  await writeData(data)
  return note
}

export async function updateNote(id, updates) {
  const data = await readData()
  const note = data.notes.find((item) => item.id === id)
  if (!note) return null
  Object.assign(note, updates)
  await writeData(data)
  return note
}

export async function deleteNote(id) {
  const data = await readData()
  data.notes = data.notes.filter((item) => item.id !== id)
  await writeData(data)
}

export async function getProjectsForUser(userId) {
  const data = await readData()
  return data.projects.filter((project) => project.userId === userId)
}

export async function addProject(project) {
  const data = await readData()
  data.projects.unshift(project)
  await writeData(data)
  return project
}

export async function updateProject(id, updates) {
  const data = await readData()
  const project = data.projects.find((item) => item.id === id)
  if (!project) return null
  Object.assign(project, updates)
  await writeData(data)
  return project
}

export async function deleteProject(id) {
  const data = await readData()
  data.projects = data.projects.filter((item) => item.id !== id)
  await writeData(data)
}

export async function getReferencesForUser(userId) {
  const data = await readData()
  return data.references.filter((reference) => reference.userId === userId)
}

export async function addReference(reference) {
  const data = await readData()
  data.references.unshift(reference)
  await writeData(data)
  return reference
}

export async function updateReference(id, updates) {
  const data = await readData()
  const reference = data.references.find((item) => item.id === id)
  if (!reference) return null
  Object.assign(reference, updates)
  await writeData(data)
  return reference
}

export async function deleteReference(id) {
  const data = await readData()
  data.references = data.references.filter((item) => item.id !== id)
  await writeData(data)
}

export async function getUploadsForUser(userId) {
  const data = await readData()
  return (data.uploads || []).filter((u) => u.userId === userId)
}

export async function addUpload(upload) {
  const data = await readData()
  data.uploads = data.uploads || []
  data.uploads.unshift(upload)
  await writeData(data)
  return upload
}
