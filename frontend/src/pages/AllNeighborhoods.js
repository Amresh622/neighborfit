import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllNeighborhoods = () => {
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:5000/api/neighborhoods')
      .then(res => setNeighborhoods(res.data))
      .catch(err => console.error("Error fetching:", err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this neighborhood?")) {
      axios.delete(`http://localhost:5000/api/neighborhoods/${id}`)
        .then(() => fetchData())
        .catch(() => alert("Failed to delete"));
    }
  };

  const startEdit = (neighborhood) => {
    setEditingId(neighborhood.id);
    setEditForm({ ...neighborhood });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:5000/api/neighborhoods/${editingId}`, editForm)
      .then(() => {
        setEditingId(null);
        fetchData();
      })
      .catch(() => alert("Failed to update"));
  };

  const filteredNeighborhoods = neighborhoods.filter(n =>
    n.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">All Neighborhoods</h1>

      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Search by city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNeighborhoods.length === 0 && (
          <p className="text-center col-span-full text-gray-500">No neighborhoods found.</p>
        )}

        {filteredNeighborhoods.map((n) => (
          <div key={n.id} className="bg-white p-6 rounded-xl shadow space-y-2">
            {editingId === n.id ? (
              <>
                <input name="name" value={editForm.name} onChange={handleChange} className="w-full border p-2 rounded" />
                <input name="city" value={editForm.city} onChange={handleChange} className="w-full border p-2 rounded" />
                {['safety', 'rent', 'entertainment', 'transport'].map(field => (
                  <input
                    key={field}
                    type="number"
                    min="1"
                    max="5"
                    name={field}
                    value={editForm[field]}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                  />
                ))}
                {isAdmin && (
                  <div className="flex justify-between mt-2">
                    <button onClick={handleUpdate} className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
                    <button onClick={cancelEdit} className="bg-gray-300 px-3 py-1 rounded">Cancel</button>
                  </div>
                )}
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold text-gray-800">{n.name}</h2>
                <p className="text-gray-600">{n.city}</p>
                <p>Safety: {n.safety}</p>
                <p>Rent: {n.rent}</p>
                <p>Entertainment: {n.entertainment}</p>
                <p>Transport: {n.transport}</p>
                {isAdmin && (
                  <div className="flex justify-between mt-2">
                    <button onClick={() => startEdit(n)} className="text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(n.id)} className="text-red-600 hover:underline">Delete</button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllNeighborhoods;
