import React from 'react';

function ParkingDetails({ parkingDetails, onReset }) {
  return (
    <div className="space-y-4">
      <div className="bg-gray-50 px-4 py-5 rounded-lg">
        <dl className="space-y-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Driver Name</dt>
            <dd className="mt-1 text-sm text-gray-900">{parkingDetails.ownerName}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Vehicle Number</dt>
            <dd className="mt-1 text-sm text-gray-900">{parkingDetails.vehicleRegistrationNumber}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Entry Time</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {new Date(parkingDetails.entryTime).toLocaleString()}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Parking Fee</dt>
            <dd className="mt-1 text-lg font-bold text-indigo-600">
              ₹{parkingDetails.parkingFee}
            </dd>
          </div>
        </dl>
      </div>
      <button
        onClick={onReset}
        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
      >
        Check Another Vehicle
      </button>
    </div>
  );
}

export default ParkingDetails;
