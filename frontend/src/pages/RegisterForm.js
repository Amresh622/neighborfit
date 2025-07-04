import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [form, setForm] = useState({
    name: '',
    safety: 3,
    rent: 3,
    entertainment: 3,
    transport: 3
  });

  const [match, setMatch] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sending match data:', form);

    axios.post('http://localhost:5000/api/match', form)
      .then(res => {
        setMatch(res.data);
        setError('');
      })
      .catch(() => {
        setError('❌ Failed to match. Try again.');
        setMatch(null);
      });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow space-y-4">
      <h2 className="text-2xl font-bold text-center text-green-700">Find Your Perfect Neighborhood</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" className="w-full p-2 border rounded" required />

        {['safety', 'rent', 'entertainment', 'transport'].map((field) => (
          <div key={field}>
            <label className="block font-medium capitalize">{field} (1–5)</label>
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

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Find Match
        </button>
      </form>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {match && (
        <div className="mt-6 bg-green-50 p-4 rounded-xl shadow text-center space-y-2">
          <h3 className="text-xl font-semibold text-green-800">Best Match: {match.name}</h3>
          <p className="text-sm text-gray-600">{match.city}</p>
          <p>Safety: {match.safety}</p>
          <p>Rent: {match.rent}</p>
          <p>Entertainment: {match.entertainment}</p>
          <p>Transport: {match.transport}</p>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
