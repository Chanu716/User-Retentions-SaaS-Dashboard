import React, { useEffect, useState } from 'react';

function JsonServerDemo() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const apiBase = 'http://localhost:3001';

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/items`);
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error('Fetch items error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async (e) => {
    e.preventDefault();
    if (!title) return;
    try {
      const res = await fetch(`${apiBase}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, completed: false })
      });
      const created = await res.json();
      setItems(prev => [...prev, created]);
      setTitle('');
    } catch (err) {
      console.error('Add item error', err);
    }
  };

  const toggleComplete = async (item) => {
    try {
      const res = await fetch(`${apiBase}/items/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !item.completed })
      });
      const updated = await res.json();
      setItems(prev => prev.map(i => i.id === updated.id ? updated : i));
    } catch (err) {
      console.error('Toggle error', err);
    }
  };

  const removeItem = async (id) => {
    try {
      await fetch(`${apiBase}/items/${id}`, { method: 'DELETE' });
      setItems(prev => prev.filter(i => i.id !== id));
    } catch (err) {
      console.error('Delete error', err);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>JSON Server Demo (CRUD)</h2>
        <p className="muted">Using <code>json-server</code> on <strong>http://localhost:3001</strong></p>

        <form onSubmit={addItem} style={{ marginBottom: 12 }}>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New item title" />
          <button className="btn-accent" style={{ marginLeft: 8 }}>Add</button>
        </form>

        {loading ? <div>Loading...</div> : (
          <ul>
            {items.map(item => (
              <li key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input type="checkbox" checked={!!item.completed} onChange={() => toggleComplete(item)} />
                <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>{item.title}</span>
                <button className="muted" style={{ marginLeft: 'auto' }} onClick={() => removeItem(item.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default JsonServerDemo;
