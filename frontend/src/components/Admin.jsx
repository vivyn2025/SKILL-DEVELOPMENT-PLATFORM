import React from 'react'
import { useNavigate } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_API || 'http://localhost:4000'

export default function Admin({token}){
  const navigate = useNavigate()
  const [title, setTitle] = React.useState('')
  const [skills, setSkills] = React.useState('')
  const [msg, setMsg] = React.useState('')

  function submit(e){
    e.preventDefault()
    if (!title) return setMsg('Title required')
    const skillArr = skills.split(',').map(s=>s.trim()).filter(s=>s)
    fetch(`${API_BASE}/api/admin/courses`, { method:'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type':'application/json' }, body:JSON.stringify({title,skills:skillArr,content:{blocks:[]}}) })
      .then(r=>r.json())
      .then(d=>{ if (d.error) setMsg(d.error); else { setMsg('Course created!'); setTitle(''); setSkills(''); setTimeout(()=>navigate('/dashboard'),1000); } })
      .catch(e=>setMsg('Error: '+e.message))
  }

  return (
    <div style={{padding:20,fontFamily:'Arial'}}>
      <button onClick={()=>navigate('/dashboard')}>Back</button>
      <h2>Create Course</h2>
      <form onSubmit={submit}>
        <div style={{marginBottom:10}}><input placeholder="Course Title" value={title} onChange={e=>setTitle(e.target.value)} style={{width:'100%',padding:8}} /></div>
        <div style={{marginBottom:10}}><input placeholder="Skills (comma-separated)" value={skills} onChange={e=>setSkills(e.target.value)} style={{width:'100%',padding:8}} /></div>
        <button type="submit">Create</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  )
}
