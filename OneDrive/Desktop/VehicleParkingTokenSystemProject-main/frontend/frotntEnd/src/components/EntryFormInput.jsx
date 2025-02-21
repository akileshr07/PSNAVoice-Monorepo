// EntryFormInput.js
import React from 'react';
import { ENTRY_URL, EXIT_URL } from './apiConfig';
import axios from 'axios';

function EntryFormInput({ formData, setFormData, error, loading, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Driver Name
        </label>
        <input
          type="text"
          id="name"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.ownerName }
          onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="vehicleNumber" className="block text-sm font-medium text-gray-700">
          Vehicle Registration Number
        </label>
        <input
          type="text"
          id="vehicleNumber"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.vehicleRegistrationNumber }
          onChange={(e) => setFormData({ ...formData, vehicleRegistrationNumber: e.target.value })}
        />
      </div>

      {error && <div className="text-red-600 text-sm">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {loading ? 'Processing...' : 'Generate Token'}
      </button>
    </form>
  );
}

export default EntryFormInput;
