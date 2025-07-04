import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    total: 0,
    cities: [],
    avg: {
      safety: 0,
      rent: 0,
      entertainment: 0,
      transport: 0
    }
  });

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) navigate('/login');

    axios.get('http://localhost:5000/api/neighborhoods')
      .then(res => {
        const neighborhoods = res.data;
        const total = neighborhoods.length;
        const cities = [...new Set(neighborhoods.map(n => n.city))];

        const sum = {
          safety: 0, rent: 0, entertainment: 0, transport: 0
        };

        neighborhoods.forEach(n => {
          sum.safety += n.safety;
          sum.rent += n.rent;
          sum.entertainment += n.entertainment;
          sum.transport += n.transport;
        });

        const avg = {
          safety: (sum.safety / total).toFixed(1),
          rent: (sum.rent / total).toFixed(1),
          entertainment: (sum.entertainment / total).toFixed(1),
          transport: (sum.transport / total).toFixed(1)
        };

        setData({ total, cities, avg });
      })
      .catch(err => console.error("Dashboard error:", err));
  }, [navigate]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow space-y-6">
      <h2 className="text-2xl font-bold text-blue-700 text-center">📊 Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
        <div className="p-4 border rounded bg-blue-50">
          <h3 className="text-xl font-semibold">Total Neighborhoods</h3>
          <p className="text-3xl font-bold text-blue-700">{data.total}</p>
        </div>

        <div className="p-4 border rounded bg-blue-50">
          <h3 className="text-xl font-semibold">Cities Covered</h3>
          <p className="text-lg">{data.cities.join(', ') || 'N/A'}</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Average Ratings</h3>
        <ul className="space-y-1">
          <li>🔒 Safety: {data.avg.safety}</li>
          <li>💰 Rent: {data.avg.rent}</li>
          <li>🎉 Entertainment: {data.avg.entertainment}</li>
          <li>🚇 Transport: {data.avg.transport}</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
