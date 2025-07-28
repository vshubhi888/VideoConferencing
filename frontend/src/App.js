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
import HostPage from './pages/HostPage';
import JoinPage from './pages/JoinPage';

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
        <Route path="/host" element={<HostPage />} />
        <Route path="/join" element={<JoinPage />} />
      </Routes>
    </Router>
  );
}


export default App;