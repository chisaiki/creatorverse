import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../client';

// Helper to unslugify (reverse slugify) for display, but we use slug for lookup
function unslugify(slug) {
  return slug.replace(/-/g, ' ');
}

const ViewCreator = () => {
    const { name } = useParams();
    const [creator, setCreator] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [removing, setRemoving] = useState(false);

    useEffect(() => {
        async function fetchCreator() {
            setLoading(true);
            // Find the creator whose slugified name matches the URL param
            const { data, error } = await supabase.from('creatorsdb').select('*');
            if (!error && data) {
                const match = data.find(c => c.name && c.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-') === name);
                setCreator(match || null);
            }
            setLoading(false);
        }
        fetchCreator();
    }, [name]);

    async function handleRemove() {
        if (!creator) return;
        setRemoving(true);
        await supabase.from('creatorsdb').delete().eq('id', creator.id);
        setRemoving(false);
        navigate('/');
    }

    function handleEdit() {
        if (!creator) return;
        navigate(`/edit?id=${creator.id}`);
    }

    if (loading) return <p style={{ color: '#000' }}>Loading...</p>;
    if (!creator) return <p style={{ color: '#000' }}>Creator not found.</p>;

    return (
        <div style={{ maxWidth: 500, margin: '2rem auto', border: '1px solid #ccc', borderRadius: 8, padding: '2rem', background: '#fff', color: '#000' }}>
            <h2 style={{ color: '#000' }}>{creator.name}</h2>
            <a href={creator.url} target="_blank" rel="noopener noreferrer" style={{ color: '#000', textDecoration: 'underline' }}>{creator.url}</a>
            <p style={{ color: '#000' }}>{creator.description}</p>
            {creator.imageurl && <img src={creator.imageurl} alt={creator.name} style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', marginTop: '1rem', borderRadius: 8 }} />}
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                <button onClick={handleEdit} style={{ padding: '0.5rem 1.5rem', border: '2px solid #333', borderRadius: '8px', background: '#fff', color: '#000', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>Edit</button>
                <button onClick={handleRemove} disabled={removing} style={{ padding: '0.5rem 1.5rem', border: '2px solid #c00', borderRadius: '8px', background: '#fff', color: '#c00', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>Remove</button>
            </div>
        </div>
    );
}

export default ViewCreator;