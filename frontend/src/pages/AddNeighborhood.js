import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddNeighborhood = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    city: '',
    safety: 3,
    rent: 3,
    entertainment: 3,
    transport: 3
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/neighborhoods', form)
      .then(res => {
        setMessage('✅ Neighborhood added successfully!');
        setForm({ name: '', city: '', safety: 3, rent: 3, entertainment: 3, transport: 3 });
      })
      .catch(() => setMessage('❌ Failed to add neighborhood.'));
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow space-y-4">
      <h2 className="text-2xl font-bold text-center text-blue-600">Add Neighborhood</h2>
      {message && <p className="text-center text-sm text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Neighborhood Name" className="w-full p-2 border rounded" required />
        <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="w-full p-2 border rounded" required />
        {['safety', 'rent', 'entertainment', 'transport'].map((field) => (
          <div key={field}>
            <label className="block font-medium capitalize">{field}</label>
            <input
              type="number"
              name={field}
              min="1"
              max="5"
              value={form[field]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        ))}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Add Neighborhood
        </button>
      </form>
    </div>
  );
};

export default AddNeighborhood;
