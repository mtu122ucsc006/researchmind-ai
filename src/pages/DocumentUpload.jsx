import { useState } from 'react'
import api from '../api.js'
import { getToken } from '../utils/storage.js'

export default function DocumentUpload() {
  const [file, setFile] = useState(null)
  const [uploadResult, setUploadResult] = useState(null)
  const [error, setError] = useState('')

  const handleFileChange = (event) => {
    setFile(event.target.files[0])
    setUploadResult(null)
    setError('')
  }

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a document to upload.')
      return
    }

    try {
      const token = getToken()
      const formData = new FormData()
      formData.append('file', file) // ✅ Fixed: was 'document'

      const response = await api.post('/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setUploadResult(response.data.document) // ✅ Fixed: backend returns { document: {...} }
      setError('')
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed. Please try again.')
      setUploadResult(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-xl">
        <h1 className="text-2xl font-semibold text-brand-700">Document Upload</h1>
        <p className="mt-2 text-slate-600">Upload a PDF or text document to extract content and receive a quick AI-style summary.</p>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-xl">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">
            Select document
            <input type="file" accept=".pdf,.txt" onChange={handleFileChange} className="mt-3 block w-full rounded-3xl border border-slate-300 bg-white px-4 py-3" />
          </label>

          <button onClick={handleUpload} className="rounded-3xl bg-brand-600 px-6 py-3 text-white hover:bg-brand-700">
            Upload and summarize
          </button>

          {error && <p className="rounded-3xl bg-rose-100 p-4 text-sm text-rose-700">{error}</p>}

          {uploadResult && (
            <div className="rounded-3xl bg-slate-50 p-5 text-slate-700">
              <h2 className="text-xl font-semibold text-brand-700">Upload results</h2>
              <p className="mt-2"><strong>File:</strong> {uploadResult.name}</p>
              <p><strong>Type:</strong> {uploadResult.type}</p>
              <p><strong>Size:</strong> {(uploadResult.size / 1024).toFixed(2)} KB</p>
              <p className="mt-3 text-sm text-slate-600"><strong>Summary:</strong> {uploadResult.summary}</p>
              <pre className="mt-4 max-h-72 overflow-y-auto rounded-3xl bg-white p-4 text-xs text-slate-800">{uploadResult.text}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}