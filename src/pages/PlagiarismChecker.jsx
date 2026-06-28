import { useState } from 'react'
import api from "../api/api.js"
import { getToken } from '../utils/storage'

export default function PlagiarismChecker() {

  const [text,setText]=useState("")
  const [report,setReport]=useState("")
  const [loading,setLoading]=useState(false)

  const checkPlagiarism=async()=>{

    if(!text.trim()){
      alert("Paste your content first.")
      return
    }

    try{

      setLoading(true)

      const token=getToken()

      const response=await api.post(
        "/ai/plagiarism",
        {text},
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      )

      setReport(response.data.report)

    }catch(err){

      alert("Unable to check.")

    }finally{

      setLoading(false)

    }

  }

  return(

<div className="space-y-6">

<div className="rounded-3xl bg-white p-6 shadow-xl">

<h1 className="text-2xl font-bold text-brand-700">
AI Plagiarism Checker
</h1>

<p className="mt-2 text-slate-600">
Paste your research content and receive an AI writing quality report.
</p>

<textarea
rows={12}
value={text}
onChange={(e)=>setText(e.target.value)}
placeholder="Paste your research content..."
className="mt-5 w-full rounded-xl border p-4"
/>

<button
onClick={checkPlagiarism}
disabled={loading}
className="mt-5 rounded-xl bg-brand-600 px-6 py-3 text-white"
>

{loading ? "Checking..." : "Check"}

</button>

</div>

{report && (

<div className="rounded-3xl bg-white p-6 shadow-xl">

<h2 className="text-xl font-bold mb-4">
Analysis Report
</h2>

<div className="whitespace-pre-wrap">

{report}

</div>

</div>

)}

</div>

)

}