import React, { useState } from 'react';
export default function WeatherSearch({ onSearch }) {
  const [q, setQ] = useState('');
  return (
    <form onSubmit={(e)=>{ e.preventDefault(); if(q.trim()) onSearch(q.trim()); }} style={{flex:1}}>
      <input placeholder="Enter city (e.g., London)" value={q} onChange={e=>setQ(e.target.value)} style={{width:'100%',padding:8,borderRadius:6,border:'1px solid #ddd'}}/>
      <button type="submit" style={{marginLeft:8,padding:'8px 12px',borderRadius:6}}>Search</button>
    </form>
  );
}
