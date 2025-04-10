import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquarePlus, School } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-indigo-600 text-white shadow-lg z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <School className="h-8 w-8" />
            <span className="text-xl font-bold">PSNA Voice</span>
          </Link>
          
          <Link
            to="/submit"
            className="flex items-center space-x-2 bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            <MessageSquarePlus className="h-5 w-5" />
            <span className="font-medium">Share Feedback</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;