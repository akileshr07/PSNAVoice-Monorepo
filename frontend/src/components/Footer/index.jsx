import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700 mb-2">
            PSNA Voice - Your Platform for Change
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Making our college better, together.
          </p>
          <div className="flex items-center justify-center text-gray-400 text-sm">
            <span>Made with</span>
            <Heart className="h-4 w-4 mx-1 text-red-500" />
            <span>by PSNA Students</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;