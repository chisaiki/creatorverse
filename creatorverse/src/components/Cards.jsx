import React, { useEffect, useState } from 'react';
import { supabase } from '../client';
import AddCardForm from './AddCardForm';
import { useNavigate } from 'react-router-dom';

// Helper to slugify names for URLs
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');
}

export default function Cards({ hideAddForm = false, hideRemove = false, shortenUrl = false }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch cards from Supabase on mount
  useEffect(() => {
    fetchCards();
  }, []);

  async function fetchCards() {
    setLoading(true);
    const { data, error } = await supabase.from('creatorsdb').select('*');
    if (!error) setCards(data);
    setLoading(false);
  }

  async function removeCard(id) {
    const { error } = await supabase.from('creatorsdb').delete().eq('id', id);
    if (!error) setCards(cards.filter(card => card.id !== id));
  }

  function handleAddCard(newCard) {
    setCards([...cards, newCard]);
  }

  function handleCardClick(name) {
    navigate(`/view/${slugify(name)}`);
  }

  function getShortUrl(url) {
    if (!url) return '';
    const atIdx = url.indexOf('@');
    return atIdx !== -1 ? url.slice(atIdx + 1) : url;
  }

  return (
    <div>
      <h2 style={{ color: '#000' }}>Creators</h2>
      {!hideAddForm && (
        <AddCardForm onAdd={handleAddCard} />
      )}
      {loading && <p style={{ color: '#000' }}>Loading...</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {cards.map(card => (
          <div
            key={card.id}
            style={{ display: 'flex', alignItems: 'stretch', border: '1px solid #ccc', borderRadius: '8px', background: '#fff', overflow: 'hidden', width: '380px', height: '380px', minWidth: '380px', minHeight: '380px', maxWidth: '380px', maxHeight: '380px', boxSizing: 'border-box', cursor: 'pointer' }}
            onClick={() => handleCardClick(card.name)}
          >
            <div style={{ flex: 1, padding: '1rem', color: '#000', display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}>
              <h3 style={{ color: '#000', margin: '0 0 1rem 0' }}>{card.name}</h3>
              <a href={card.url} target="_blank" rel="noopener noreferrer" style={{ color: '#0074d9', textDecoration: 'underline', wordBreak: 'break-all', marginBottom: '1rem' }} onClick={e => e.stopPropagation()}>
                {shortenUrl ? getShortUrl(card.url) : card.url}
              </a>
              <p style={{ color: '#000', margin: 0 }}>{card.description}</p>
              {!hideRemove && (
                <button onClick={e => { e.stopPropagation(); removeCard(card.id); }} style={{ color: '#000', marginTop: '1rem' }}>Remove</button>
              )}
            </div>
            {card.imageurl && (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f7f7', minWidth: 0 }}>
                <img src={card.imageurl} alt={card.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0 8px 8px 0' }} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
