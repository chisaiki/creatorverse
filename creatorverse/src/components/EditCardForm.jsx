import React, { useState, useEffect } from 'react';
import { supabase } from '../client';

export default function EditCardForm({ id, initial, onEdit }) {
  const [form, setForm] = useState(initial || { name: '', url: '', description: '', imageurl: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initial) setForm(initial);
  }, [initial]);

  async function editCard(e) {
    e.preventDefault();
    if (!form.name || !form.url || !form.description || !form.imageurl) return;
    setLoading(true);
    const { error } = await supabase.from('creatorsdb').update(form).eq('id', id);
    setLoading(false);
    if (!error && onEdit) onEdit(form);
  }

  return (
    <form onSubmit={editCard} style={{
      margin: '2rem auto',
      maxWidth: 400,
      padding: '2rem',
      border: '1px solid #ccc',
      borderRadius: '10px',
      background: '#fafbfc',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.2rem',
      boxShadow: '0 2px 12px rgba(0,0,0,0.04)'
    }}>
      <h2 style={{ margin: 0, color: '#222', textAlign: 'center' }}>Edit Creator</h2>
      <label style={{ color: '#222', fontWeight: 'bold' }}>
        Name
        <input
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.3rem', borderRadius: '6px', border: '1px solid #bbb' }}
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
      </label>
      <label style={{ color: '#222', fontWeight: 'bold' }}>
        URL
        <input
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.3rem', borderRadius: '6px', border: '1px solid #bbb' }}
          placeholder="URL"
          value={form.url}
          onChange={e => setForm({ ...form, url: e.target.value })}
        />
      </label>
      <label style={{ color: '#222', fontWeight: 'bold' }}>
        Description
        <input
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.3rem', borderRadius: '6px', border: '1px solid #bbb' }}
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
      </label>
      <label style={{ color: '#222', fontWeight: 'bold' }}>
        Image URL
        <input
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.3rem', borderRadius: '6px', border: '1px solid #bbb' }}
          placeholder="Image URL"
          value={form.imageurl}
          onChange={e => setForm({ ...form, imageurl: e.target.value })}
        />
      </label>
      <button type="submit" disabled={loading} style={{
        padding: '0.7rem',
        borderRadius: '6px',
        border: '2px solid #0074d9',
        background: loading ? '#eee' : '#0074d9',
        color: loading ? '#888' : '#fff',
        fontWeight: 'bold',
        fontSize: '1.1rem',
        cursor: loading ? 'not-allowed' : 'pointer',
        marginTop: '1rem'
      }}>
        {loading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}
