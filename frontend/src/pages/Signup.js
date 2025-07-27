import React, { useState } from 'react';

export default function SignUp() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'driver',
    password: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {  
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || 'Registration successful!');
        setForm({ name: '', email: '', phone: '', role: 'driver', password: '' });
      } else {
        setMessage(data.message || 'Registration failed');
      }
    } catch (err) {
      setMessage('Error connecting to server');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
      <div className="card shadow-lg border-0 p-4" style={{ maxWidth: 500, width: "100%" }}>
        <div className="text-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3062/3062634.png"
            alt="Sign Up"
            style={{ width: 70, marginBottom: 10 }}
          />
          <h2 className="mb-0">Sign Up</h2>
          <p className="text-muted">Create your account to get started!</p>
        </div>
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
            />
          </div>
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
            <label className="form-label fw-bold">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="Enter your phone number"
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Role</label>
            <select
              className="form-select"
              name="role"
              value={form.role}
              onChange={handleChange}
              required
            >
              <option value="driver">Driver</option>
              <option value="employee">Employee</option>
            </select>
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
              placeholder="Create a password"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 fw-bold">Sign Up</button>
        </form>
        <div className="text-center mt-3">
          <span className="text-muted">Already have an account? </span>
          <a href="/login" className="fw-bold text-primary text-decoration-none">Login</a>
        </div>
      </div>
    </div>
  );
}