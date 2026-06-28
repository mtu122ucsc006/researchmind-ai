import { useState, useEffect } from 'react'
import api from '../api/api.js'
import { getToken } from '../utils/storage.js'

export default function ResearchAssistant() {
  const [messages, setMessages] = useState([
    {
      from: 'ai',
      text: 'Hello! I am ResearchMind AI, your academic research assistant. Ask me anything about your research topic!'
    }
  ])
  const [input, setInput] = useState('')
  const [uploads, setUploads] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    const trimmed = input.trim().toLowerCase()

    if (!trimmed) return

    // 🚨 GREETING FILTER
    const greetings = ['hi', 'hii', 'hello', 'hey']
    if (greetings.includes(trimmed)) {
      setMessages((prev) => [
        ...prev,
        { from: 'user', text: input },
        { from: 'ai', text: 'Please ask a research question.' }
      ])
      setInput('')
      return
    }

    const userMessage = { from: 'user', text: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const token = getToken()

      const context = uploads
        .map((u) => u.text || '')
        .join('\n\n')
        .slice(0, 15000)

      const response = await api.post(
  '/chat',
  {
    message: `
You are an expert academic assistant for students.

STRICT RULES:
- Do NOT repeat user input
- Do NOT say "please ask a question"
- Do NOT give only pros/cons unless asked
- Always explain in simple clear points
- Maximum 8 lines only
- Always give useful academic explanation
- Use bullet points if needed

FORMAT (only if pros/cons asked):
Pros:
- point 1
- point 2

Cons:
- point 1
- point 2

If question is general:
- Give clear explanation in simple points (NOT essay)
- Add 1 small example if needed

QUESTION:
${input}
    `,
    context
  },
  { headers: { Authorization: `Bearer ${token}` } }
)

      setMessages((prev) => [
        ...prev,
        { from: 'ai', text: response.data.reply }
      ])
    } catch (error) {
      console.error('Assistant Error:', error)
      setMessages((prev) => [
        ...prev,
        {
          from: 'ai',
          text: 'Unable to reach the assistant. Check if backend is running.'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        const token = getToken()
        const res = await api.get('/documents', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setUploads(res.data)
      } catch (error) {
        console.error('Document Load Error:', error)
      }
    })()
  }, [])

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-3xl bg-white p-6 shadow-xl">
        <h1 className="text-2xl font-semibold text-brand-700">
          Research Assistant
        </h1>
        <p className="mt-2 text-slate-600">
          Ask questions and receive AI-backed research guidance.
        </p>
      </div>

      {/* Chat */}
      <div className="rounded-3xl bg-white p-6 shadow-xl">

        <div className="space-y-4 max-h-[400px] overflow-y-auto">

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-end gap-2 ${
                message.from === 'user'
                  ? 'flex-row-reverse'
                  : 'flex-row'
              }`}
            >
              <div
                className={`max-w-[90%] rounded-3xl px-5 py-4 ${
                  message.from === 'ai'
                    ? 'bg-slate-100 text-slate-700'
                    : 'bg-brand-600 text-white ml-auto'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-end gap-2">
              <div className="bg-slate-100 rounded-3xl px-5 py-4 text-slate-500 text-sm">
                ⏳ Thinking...
              </div>
            </div>
          )}

        </div>

        {/* Input */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 rounded-3xl border border-slate-300 px-4 py-3 focus:border-brand-500 focus:outline-none"
            placeholder="Ask about your research topic..."
            disabled={loading}
          />

          <button
            onClick={handleSend}
            disabled={loading}
            className="rounded-3xl bg-brand-600 px-6 py-3 text-white hover:bg-brand-700 disabled:opacity-50"
          >
            {loading ? '⏳' : 'Send'}
          </button>

        </div>

      </div>
    </div>
  )
}