// EntryForm.js
import React, { useState } from 'react';
import { Car } from 'lucide-react';
import EntryFormInput from './EntryFormInput';
import TokenDisplay from './TokenDisplay';
import axios from 'axios';
import { ENTRY_URL } from './apiConfig';

function EntryForm() {
  const [formData, setFormData] = useState({
    ownerName: '',
    vehicleRegistrationNumber: ''
  });
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    try {
      const response = await axios.post('http://localhost:8083/parking', formData);
  
      if (response.data && response.data.token) {
        setToken(response.data.token); // Correctly access token
      } else {
        throw new Error('Token generation failed. Please check backend response.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate token. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleGenerateNewToken = () => {
    setToken('');
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="p-8">
        <div className="flex items-center justify-center mb-6">
          <Car className="h-12 w-12 text-indigo-600" />
          <h2 className="ml-3 text-2xl font-bold text-gray-800">Vehicle Entry</h2>
        </div>

        {!token ? (
          <EntryFormInput
            formData={formData}
            setFormData={setFormData}
            error={error}
            loading={loading}
            onSubmit={handleSubmit}
          />
        ) : (
          <TokenDisplay token={token} onGenerateNew={handleGenerateNewToken} />
        )}
      </div>
    </div>
  );
}

export default EntryForm;
