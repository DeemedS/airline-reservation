"use client";

import { useState, useEffect } from 'react'
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import formatDate from '@/helpers/formatDate';
import formatTime from '@/helpers/formatTime';

interface Flight {
  _id: string;
  from: string;
  to: string;
  date: string;
  arrival: string;
  departure: string;
  code: string;
  fare: number;
}

const Page = () => {
  
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true)
  const Router = useRouter();
  const { id } = useParams();

  const fetchFlight = async () => {
    try {
      const res = await axios.get('/api/admin/handleFlights');
      setFlights(res.data.flight);
      setLoading(false);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchFlight()
  }, [])

  const handleEdit = (flightId: string) => {
    Router.push(`/admin/${id}/manage-flights/${flightId}`);
  };

  const handleDelete = async (flightId: string) => {
    try {

      const confirmDelete = window.confirm('Are you sure you want to delete this user?');
      if (confirmDelete) {
        await axios.delete('/api/admin/handleFlights', {
          data: { flightId }
        });
        setFlights(flights.filter(flight => flight._id !== flightId));
        window.alert('Flight deleted successfully');
      }
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="lg:ml-64 px-6 py-8">
      <div className="bg-white rounded-md border-none p-10 mb-4 shadow-md h-[800px] overflow-x-scroll">
      <h1 className="text-2xl font-semibold mb-4">Manage Flights</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mb-4"
        onClick={() => Router.push(`/admin/${id}/manage-flights/addFlight`)}>
          Add Flights
        </button>

      <table className="min-w-full divide-y divide-gray-200 border-collapse border ">
          <thead className="bg-blue-500">
            <tr>
              <th scope="col" className="border px-3 py-3">
                <span className="block py-3 text-xs font-medium text-white uppercase tracking-wider items-center">ID</span>
              </th>
              <th scope="col" className="border px-3 py-3">
                <span className="block py-3 text-xs font-medium text-white uppercase tracking-wider items-center">Code</span>
              </th>
              <th scope="col" className="border  px-3 py-3">
                <span className="block py-3 text-xs font-medium text-white uppercase tracking-wider items-center">Date</span>
              </th>
              <th scope="col" className="border  px-3 py-3">
                <span className="block py-3 text-xs font-medium text-white uppercase tracking-wider items-center">Time</span>
              </th>
              <th scope="col" className="border  px-3 py-3 ">
                <span className="block py-3 text-xs font-medium text-white uppercase tracking-wider items-center">Edit</span>
              </th>
              <th scope="col" className="border  px-3 py-3 ">
                <span className="block py-3 text-xs font-medium text-white uppercase tracking-wider items-center">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {flights.length === 0 && !loading && <tr><td>No flights found</td></tr>}
            {loading ? <tr><td>Loading...</td></tr> : flights.map((flight, index) => (
              <tr key={index}>
                <td className="border py-2 text-center whitespace-nowrap text-sm text-gray-900">
                  {index + 1}
                </td>
                <td className="border py-2 text-center whitespace-nowrap text-sm text-gray-900">
                  {flight.code}
                </td>
                <td className="border py-2 text-center whitespace-nowrap text-sm text-gray-900">
                  {formatDate(flight.date)}
                </td>
                <td className="border py-2 text-center whitespace-nowrap text-sm text-gray-900">
                  {formatTime(flight.departure)}  
                </td>
                <td className="border py-2 text-center whitespace-nowrap text-sm text-gray-900 ">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => handleEdit(flight._id)}>
                    Edit
                  </button>
                </td>
                <td className="border py-2 text-center whitespace-nowrap text-sm text-gray-900 ">
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => handleDelete(flight._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Page