"use client";

import { useState, useEffect } from 'react'
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import formatDate from '@/helpers/formatDate';
import formatTime from '@/helpers/formatTime';
import Destinations from '@/models/destination';

interface Destination {
  _id: string;
  Name: string;
  Code: string;
  Abv: string;
  City: string;
}

const page = () => {
  
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true)
  const Router = useRouter();
  const { id } = useParams();

  const getDestinations = async() => {
    try {
      const res = await axios.get('http://localhost:3000/api/admin/handleLocations');
      console.log(res.data.destinations)
        setDestinations(res.data.destinations);
        
        setLoading(false);

    } catch (error) {
        console.error('Error loading destinations', error);
    }
};

  useEffect(() => {
    getDestinations()
  }, [])

  const handleEdit = (id: string) => {
    Router.push(`/admin/${id}/manage-locations/${id}`)
  }

  const handleDelete = async (locationId: string) => {
    try {

      const confirmDelete = window.confirm('Are you sure you want to delete this Destination?');
      if (confirmDelete) {
        await axios.delete('/api/admin/handleLocations', {
          data: { locationId }
        });
        setDestinations(destinations.filter(destinations => destinations._id !== locationId));
        window.alert('User deleted successfully');
      }
    } catch (error) {
      console.log(error);
    }
  };




  return (
    <div className="lg:ml-64 px-6 py-8">
      <div className="bg-white rounded-md border-none p-10 mb-4 shadow-md h-[800px] overflow-x-scroll">
      <h1 className="text-2xl font-semibold mb-4">Manage Destinations</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mb-4"
        onClick={() => Router.push(`/admin/${id}/manage-locations/addLocation`)}>
          Add Destinations
        </button>

      <table className="min-w-full divide-y divide-gray-200 border-collapse border ">
          <thead className="bg-blue-500">
            <tr>
              <th scope="col" className="border px-3 py-3">
                <span className="block py-3 text-xs font-medium text-white uppercase tracking-wider items-center">ID</span>
              </th>
              <th scope="col" className="border px-3 py-3">
                <span className="block py-3 text-xs font-medium text-white uppercase tracking-wider items-center">Name</span>
              </th>
              <th scope="col" className="border  px-3 py-3">
                <span className="block py-3 text-xs font-medium text-white uppercase tracking-wider items-center">Code</span>
              </th>
              <th scope="col" className="border  px-3 py-3">
                <span className="block py-3 text-xs font-medium text-white uppercase tracking-wider items-center">City</span>
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
            {destinations.length === 0 && !loading && <tr><td>No flights found</td></tr>}
            {loading ? <tr><td>Loading...</td></tr> : destinations.map((destination, index) => (
              <tr key={index}>
                <td className="border py-2 text-center whitespace-nowrap text-sm text-gray-900">
                  {index + 1}
                </td>
                <td className="border py-2 text-center whitespace-nowrap text-sm text-gray-900">
                  {destination.Name}
                </td>
                <td className="border py-2 text-center whitespace-nowrap text-sm text-gray-900">
                  {destination.Abv}
                </td>
                <td className="border py-2 text-center whitespace-nowrap text-sm text-gray-900">
                  {destination.City}  
                </td>
                <td className="border py-2 text-center whitespace-nowrap text-sm text-gray-900 ">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => handleEdit(destination._id)}>
                    Edit
                  </button>
                </td>
                <td className="border py-2 text-center whitespace-nowrap text-sm text-gray-900 ">
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => handleDelete(destination._id)}>
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

export default page