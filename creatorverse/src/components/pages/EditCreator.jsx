import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../../client';
import EditCardForm from '../EditCardForm';

// Page to allow the user to edit a content creator
export default function EditCreator() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCreator() {
      setLoading(true);
      const { data, error } = await supabase.from('creatorsdb').select('*').eq('id', id).single();
      if (!error) setCreator(data);
      setLoading(false);
    }
    if (id) fetchCreator();
  }, [id]);

  function handleEdit(updated) {
    navigate(`/view/${updated.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-')}`);
  }

  if (loading) return <p>Loading...</p>;
  if (!creator) return <p>Creator not found.</p>;

  return (
    <div>
      <h1>Edit Creator</h1>
      <p>This is the Edit Creator page. Here you can edit existing content creators.</p>
      <EditCardForm id={id} initial={creator} onEdit={handleEdit} />
    </div>
  );
}