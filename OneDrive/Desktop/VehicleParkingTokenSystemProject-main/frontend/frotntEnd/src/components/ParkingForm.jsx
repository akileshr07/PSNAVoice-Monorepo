// ParkingForm.js
import React, { useState } from 'react';

function ParkingForm({ onSubmit, error, loading }) {
  const [token, setToken] = useState('');

  return (
    <form onSubmit={(e) => onSubmit(e, token)} className="space-y-6">
      <div>
        <label htmlFor="token" className="block text-sm font-medium text-gray-700">
          Enter Parking Token
        </label>
        <input
          type="text"
          id="token"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
      </div>

      {error && <div className="text-red-600 text-sm">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {loading ? 'Processing...' : 'Get Parking Details'}
      </button>
    </form>
  );
}

export default ParkingForm;
