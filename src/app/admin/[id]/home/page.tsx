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

const page = () => {
  
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
      <div className='flex justify-center items-center p-10 m-auto'>
      <h1 className="text-4xl font-semibold mb-4">WELCOME ADMINSTRATOR</h1>
      </div>
      </div>
    </div>
  )
}

export default page