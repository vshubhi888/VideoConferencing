import React, { useEffect, useState } from 'react';

export default function Welcome() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('No token found. Please login.');
      return;
    }
    
    fetch('http://localhost:8080/api/users/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
        } else {
          setMessage(data.message || 'Could not fetch user data.');
        }
      })
      .catch(() => setMessage('Error fetching user data.'));
  }, []);

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h2 className="mb-3">Welcome, User!</h2>
        {user ? (
          <>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <p>Phone: {user.phone}</p>
          </>
        ) : (
          <p>{message || "Loading..."}</p>
        )}
      </div>
    </div>
  );
}