"use client";

import { useState, useEffect } from 'react'
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { set } from 'mongoose';

interface BookFlights {
  _id: string;
  departureFlightId: string;
  returnFlghtId: string;
  seatCode: string;
  guestInfo: {
    firstName: string;
    lastName: string;
    middleName: string;
    birthday: string;
    age: string;
    nationality: string;
    gender: string;
    email: string;
    phone: string;
    secondaryPhone: string;
    addressline1: string;
    addressline2: string;
    city: string;
    region: string;
    zip: string;
  };
  bookingData: {
    selectedPackage: string;
    packageCost: string;
    referenceNumber: string;
  }
  paymentStatus: string;
  bookedDate: Date;
}


const page = () => {
  
  const [bookFlights, setBookFlights] = useState<BookFlights[]>([]);
  const [loading, setLoading] = useState(true)
  const Router = useRouter();
  const { id } = useParams();

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/admin/handleBookFlights');
      setBookFlights(res.data.bookFlights);
      setLoading(false);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleEdit = (bookingId: string) => {
    Router.push(`/admin/manage/manage-bookings/${bookingId}`);
  };

  const handleDelete = async (bookingId: string) => {
    try {

      const confirmDelete = window.confirm('Are you sure you want to delete this user?');
      if (confirmDelete) {
        await axios.delete('/api/admin/handleBookFlights', {
          data: { bookingId }
        });
        setBookFlights(bookFlights.filter((bookFlight) => bookFlight._id !== bookingId));
        window.alert('Booking deleted successfully');
      }
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="lg:ml-64 px-6 py-8">
      <div className="bg-white rounded-md border-none p-10 mb-4 shadow-md h-[800px] overflow-scroll">
        <h1 className="text-2xl font-semibold mb-4">Manage Booking</h1>

      <table className="min-w-full divide-y divide-gray-200 border-collapse border ">
          <thead className="bg-blue-500">
            <tr>
              <th scope="col" className="border px-3 py-3">
                <span className="block py-3 text-xs font-medium text-white uppercase tracking-wider items-center">ID</span>
              </th>
              <th scope="col" className="border px-3 py-3">
                <span className="block py-3 text-xs font-medium text-white uppercase tracking-wider items-center">Reference Number</span>
              </th>
              <th scope="col" className="border  px-3 py-3">
                <span className="block py-3 text-xs font-medium text-white uppercase tracking-wider items-center">Email</span>
              </th>
              <th scope="col" className="border  px-3 py-3 ">
                <span className="block py-3 text-xs font-medium text-white uppercase tracking-wider items-center">Payment Status</span>
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
            {bookFlights.length === 0 && !loading && <tr><td>No Booking found</td></tr>}
            {loading ? <tr><td>Loading...</td></tr> : bookFlights.map((bookFlight, index) => (
              <tr key={index}>
                <td className="border py-2 text-center whitespace-nowrap text-sm text-gray-900">
                  {index + 1}
                </td>
                <td className="border py-2 text-center whitespace-nowrap text-sm text-gray-900">
                  {bookFlight.bookingData.referenceNumber}
                </td>
                <td className="border py-2 text-center whitespace-nowrap text-sm text-gray-900">
                  {bookFlight.guestInfo.email}
                </td>
                <td className="border py-2 text-center whitespace-nowrap text-sm text-gray-900">
                    {bookFlight.paymentStatus === 'pending' ? <span className="text-red-500">Not Verified</span> : 
                    bookFlight.paymentStatus === 'paid' ? <span className="text-green-500">Verified</span> : 
                    bookFlight.paymentStatus === 'failed' ? <span className="text-red-500">Failed</span> : null}
                </td>
                <td className="border py-2 text-center whitespace-nowrap text-sm text-gray-900 ">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => handleEdit(bookFlight._id)}>
                    Edit
                  </button>
                </td>
                <td className="border py-2 text-center whitespace-nowrap text-sm text-gray-900 ">
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => handleDelete(bookFlight._id)}>
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