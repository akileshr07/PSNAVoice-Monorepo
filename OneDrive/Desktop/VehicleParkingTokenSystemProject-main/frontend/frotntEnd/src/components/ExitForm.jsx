import React, { useState } from 'react';
import { LogOut } from 'lucide-react';
import ParkingForm from './ParkingForm';
import ParkingDetails from './ParkingDetails';
import { EXIT_URL } from './apiConfig';
import axios from 'axios';

function ExitForm() {
  const [token, setToken] = useState('');
  const [parkingDetails, setParkingDetails] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const calculateParkingFee = (entryTime) => {
    const entry = new Date(entryTime);
    const exit = new Date();
    const hours = Math.ceil((exit - entry) / (1000 * 60 * 60));
    return hours * 20; // ₹20 per hour
  };

  const handleSubmit = async (e, token) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`http://localhost:8083/parking/exit/${token}`);
      if (response.data && response.data.entryTime) {
        const details = response.data;
        const parkingFee = calculateParkingFee(details.entryTime);

        setParkingDetails({
          ...details,
          parkingFee,
          name: details.ownerName, // Assuming the driver's name is in 'driverName' field
          vehicleNumber: details.vehicleRegistrationNumber, // Assuming vehicle number is in 'vehicleNumber' field
        });
      } else {
        throw new Error('Invalid token or parking details not found.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid token or server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setParkingDetails(null);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="p-8">
        <div className="flex items-center justify-center mb-6">
          <LogOut className="h-12 w-12 text-indigo-600" />
          <h2 className="ml-3 text-2xl font-bold text-gray-800">Vehicle Exit</h2>
        </div>

        {!parkingDetails ? (
          <ParkingForm onSubmit={handleSubmit} error={error} loading={loading} />
        ) : (
          <ParkingDetails parkingDetails={parkingDetails} onReset={handleReset} />
        )}
      </div>
    </div>
  );
}

export default ExitForm;
