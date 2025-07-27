import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import './App.css';
import Welcome from './pages/Welcome';
import ProtectedRoute from './security/ProtectedRoute';
import Logout from './pages/Logout';
import Nav from './components/Nav';
import Home from './pages/Home';
import UserDashboard from './pages/dashboard/UserDashboard';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<ProtectedRoute><Welcome /></ProtectedRoute>} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
}


export default App;