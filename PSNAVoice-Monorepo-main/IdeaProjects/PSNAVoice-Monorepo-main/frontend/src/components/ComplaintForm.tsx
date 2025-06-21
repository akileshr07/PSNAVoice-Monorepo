import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send } from 'lucide-react';
import API from './apiConfig'; // Adjust path if needed

const departments = [
  'Academic Affairs',
  'Student Services',
  'Infrastructure',
  'Hostel',
  'Transportation',
  'Canteen',
  'Library',
  'Sports',
  'Other'
];

const ComplaintForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    content: '',
    authorName: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
     const response = await fetch(API.COMPLAINTS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit complaint');
      }

      // Navigate to homepage or show success message
      navigate('/');
    } catch (error) {
      console.error('Error submitting complaint:', error);
      alert('There was an error submitting your complaint. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Share Your Feedback</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title <span className="text-gray-500">({formData.title.length}/150 characters)</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value.slice(0, 150) })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Brief summary of your feedback"
            required
            maxLength={150}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Department
          </label>
          <select
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          >
            <option value="">Select a department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Name (Optional)
          </label>
          <input
            type="text"
            value={formData.authorName}
            onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Anonymous"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Feedback Details
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-32"
            placeholder="Describe your feedback in detail..."
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
        >
          <Send className="h-5 w-5" />
          <span>Submit Feedback</span>
        </button>
      </form>
    </div>
  );
};

export default ComplaintForm;
