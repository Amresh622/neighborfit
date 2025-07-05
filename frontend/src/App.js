import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AllNeighborhoods from './pages/AllNeighborhoods';
import RegisterForm from './pages/RegisterForm';
import AddNeighborhood from './pages/AddNeighborhood';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(loggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
  };

  return (
    <Router>
      <div className="p-4 bg-blue-100 min-h-screen">
        <nav className="flex flex-wrap gap-4 mb-6 justify-center">
          <Link to="/" className="text-blue-700 font-semibold">🏘️ Neighborhoods</Link>
          <Link to="/register" className="text-blue-700 font-semibold">🧠 Match Me</Link>
          <Link to="/add" className="text-blue-700 font-semibold">➕ Add</Link>
          {isAdmin && (
            <Link to="/dashboard" className="text-blue-700 font-semibold">📊 Dashboard</Link>
          )}
          {!isAdmin ? (
            <Link to="/login" className="text-blue-700 font-semibold">🔐 Login</Link>
          ) : (
            <button onClick={handleLogout} className="text-red-600 font-semibold hover:underline">🚪 Logout</button>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<AllNeighborhoods apiBaseUrl="http://localhost:5000" />} />
          <Route path="/register" element={<RegisterForm apiBaseUrl="http://localhost:5000" />} />
          <Route path="/add" element={<AddNeighborhood apiBaseUrl="http://localhost:5000" />} />
          <Route path="/dashboard" element={<Dashboard apiBaseUrl="http://localhost:5000" />} />
          <Route path="/login" element={<Login setIsAdmin={setIsAdmin} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
