import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import TaskForm from './pages/TaskForm';
import TaskDetails from './pages/TaskDetails';

import PrivateRoute from './components/routing/PrivateRoute';

import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<PrivateRoute component={Dashboard} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/tasks/new" element={<PrivateRoute component={TaskForm} />} />
            <Route path="/tasks/edit/:id" element={<PrivateRoute component={TaskForm} />} />
            <Route path="/tasks/:id" element={<PrivateRoute component={TaskDetails} />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;