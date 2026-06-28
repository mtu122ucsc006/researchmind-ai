import { useState, useEffect } from 'react'
import api from '../api/api.js'

export default function ReferenceLibrary() {
  const [references, setReferences] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [link, setLink] = useState('');

  // Load references from backend
useEffect(() => {
  loadReferences()
}, [])

const loadReferences = async () => {
  try {
    const res = await api.get('/references')
    setReferences(res.data)
  } catch (err) {
    console.error(err)
    alert('Unable to load references.')
  }
}

  const addReference = async () => {
  if (!title.trim()) return;

  try {
    const newRef = {
      title: title.trim(),
      author: author.trim(),
      year: year.trim(),
      link: link.trim()
    };

    await api.post('/references', newRef);

    await loadReferences();

    setTitle('');
    setAuthor('');
    setYear('');
    setLink('');

  } catch (err) {
    console.error(err);
    alert('Unable to save reference');
  }
};

  const deleteReference = async (id) => {
  try {
    await api.delete(`/references/${id}`);
    await loadReferences();
  } catch (err) {
    console.error(err);
    alert('Unable to delete reference');
  }
};

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Reference Library</h1>

      <div className="bg-white p-4 rounded shadow mb-6">
        <input
          className="w-full border p-2 mb-2 rounded"
          placeholder="Reference Title (Paper / Book / Article)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-2 rounded"
          placeholder="Author Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-2 rounded"
          placeholder="Year of Publication"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-2 rounded"
          placeholder="Reference Link (DOI / URL)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        <button
          onClick={addReference}
          disabled={!title.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Add Reference
        </button>
      </div>

      <div className="space-y-4">
        {references.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No references added yet. Add your first academic source.
          </p>
        ) : (
          references.map((ref) => (
            <div key={ref.id} className="bg-gray-50 p-4 rounded shadow">

              <h2 className="font-semibold text-lg text-slate-800">
                {ref.title}
              </h2>

              <p className="text-sm text-gray-600 mt-1">
                👤 {ref.author || 'Unknown Author'} | 📅 {ref.year || 'N/A'}
              </p>

              {ref.link && (
                <a
                  href={ref.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 text-sm underline mt-1 inline-block"
                >
                  View Source
                </a>
              )}

              <div className="mt-3">
                <button
                  onClick={() => deleteReference(ref.id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}