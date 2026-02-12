import React from 'react'
import { useParams } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_API || 'http://localhost:4000'

export default function Course({ token }){
  const { id } = useParams();
  const [course, setCourse] = React.useState(null);
  const [progress, setProgress] = React.useState(0);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(()=>{
    fetch(`${API_BASE}/api/courses/${id}`).then(r=>r.json()).then(d=>setCourse(d)).catch(()=>setCourse(null))
    if (token) {
      fetch(`${API_BASE}/api/progress`, { headers: { Authorization: `Bearer ${token}` } }).then(r=>r.json()).then(d=>{
        const p = (d || []).find(x=>x.courseId === Number(id));
        if (p) setProgress(p.progress);
      }).catch(()=>{})
    }
  },[id, token])

  function save(p){
    if (!token) return alert('login required');
    setSaving(true);
    fetch(`${API_BASE}/api/progress`, { method:'POST', headers:{'Content-Type':'application/json', Authorization:`Bearer ${token}`}, body:JSON.stringify({ courseId: Number(id), progress: p }) })
      .then(r=>r.json()).then(()=>setSaving(false)).catch(()=>setSaving(false))
  }

  if (!course) return <div style={{padding:20}}>Loading...</div>

  return (
    <div style={{padding:20}}>
      <h1>{course.title}</h1>
      <div>
        <pre style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(course.content, null, 2)}</pre>
      </div>
      <div style={{marginTop:20}}>
        <label>Progress: {progress}%</label>
        <input type="range" min="0" max="100" value={progress} onChange={e=>setProgress(Number(e.target.value))} />
        <button onClick={()=>save(progress)} disabled={saving}>{saving? 'Saving...':'Save progress'}</button>
      </div>
    </div>
  )
}
