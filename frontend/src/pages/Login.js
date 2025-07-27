import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || 'Login successful!');
        localStorage.setItem('token', data.token);

        setTimeout(() => {
          if (data.user && data.user.role === 'admin') {
            navigate('/admin-dashboard');
          } else if (data.user && data.user.role === 'driver') {
            navigate('/driver-dashboard');
          } else {
            navigate('/user-dashboard');
          }
        }, 1000);
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (err) {
      setMessage('Error connecting to server');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
      <div className="card shadow-lg border-0 p-4" style={{ maxWidth: 400, width: "100%" }}>
        <div className="text-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3062/3062634.png"
            alt="Login"
            style={{ width: 70, marginBottom: 10 }}
          />
          <h2 className="mb-0">Login</h2>
          <p className="text-muted">Welcome back! Please login to your account.</p>
        </div>
        {message && (
          <div className={`alert ${message.toLowerCase().includes('success') ? 'alert-success' : 'alert-danger'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 fw-bold">Login</button>
        </form>
        <div className="text-center mt-3">
          <span className="text-muted">Don't have an account? </span>
          <a href="/signup" className="fw-bold text-primary text-decoration-none">Sign Up</a>
        </div>
      </div>
    </div>
  );
}