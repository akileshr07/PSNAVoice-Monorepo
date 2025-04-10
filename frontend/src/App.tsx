import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ComplaintFeed from './components/ComplaintFeed';
import ComplaintForm from './components/ComplaintForm';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<ComplaintFeed />} />
          <Route path="/submit" element={<ComplaintForm />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;