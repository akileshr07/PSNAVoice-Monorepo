// TokenDisplay.js
import React from 'react';

function TokenDisplay({ token, onGenerateNew }) {
  return (
    <div className="text-center">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900">Your Parking Token</h3>
        <div className="mt-2 text-3xl font-bold text-indigo-600">{token}</div>
      </div>
      <p className="text-sm text-gray-500">
        Please save this token. You'll need it when exiting the parking lot.
      </p>
      <button
        onClick={onGenerateNew}
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
      >
        Generate New Token
      </button>
    </div>
  );
}

export default TokenDisplay;
