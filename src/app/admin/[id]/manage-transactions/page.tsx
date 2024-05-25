"use client";

import { useState, useEffect } from 'react'
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { set } from 'mongoose';

interface Payments {
    _id: string;
    bookingId: string;
    amount: string;
    reference: string;
    proofOfPayment: string;
    status: string;
    date: Date;
}

const page = () => {
  
  const [payments, setPayments] = useState<Payments[]>([]);
  const [loading, setLoading] = useState(true)
  const Router = useRouter();

  const fetchPayments = async() => {
    try {
      const res = await axios.get('/api/admin/handlePayments');
      console.log(res.data.payments)
        setPayments(res.data.payments);

        setLoading(false);

    } catch (error) {
        console.error('Error loading payments', error);
    }
    };


  useEffect(() => {
    fetchPayments();
  }, [])

  const handleEdit = (id: string) => {
    Router.push(`/admin/manage/manage-transactions/${id}`)
  }

  const handleDelete = async (paymentId: string) => {
    try {

      const confirmDelete = window.confirm('Are you sure you want to delete this Destination?');
      if (confirmDelete) {
        await axios.delete('/api/admin/handlePayments', {
          data: { paymentId }
        });
        setPayments(payments.filter((payment) => payment._id !== paymentId));
        window.alert('Transaction deleted successfully');
      }
    } catch (error) {
      console.log(error);
    }
  };




  return (
    <div className="lg:ml-64 px-6 py-8">
      <div className="bg-white rounded-md border-none p-10 mb-4 shadow-md h-[800px] overflow-x-scroll">
      <h1 className="text-2xl font-semibold mb-4">Manage Transactions</h1>

      <table className="min-w-full divide-y divide-gray-200 border-collapse border ">
          <thead className="bg-blue-500">
            <tr>
              <th scope="col" className="border px-3 py-3">
                <span className="block py-3 text-xs font-medium text-white uppercase tracking-wider items-center">ID</span>
              </th>
              <th scope="col" className="border px-3 py-3">
                <span className="block py-3 text-xs font-medium text-white uppercase tracking-wider items-center">Reference</span>
              </th>
              <th scope="col" className="border  px-3 py-3">
                <span className="block py-3 text-xs font-medium text-white uppercase tracking-wider items-center">Amount</span>
              </th>
                <th scope="col" className="border  px-3 py-3 ">
                    <span className="block py-3 text-xs font-medium text-white uppercase tracking-wider items-center">Status</span>
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
            {payments.length === 0 && !loading && <tr><td>No flights found</td></tr>}
            {loading ? <tr><td>Loading...</td></tr> : payments.map((payment, index) => (
              <tr key={index}>
                <td className="border py-2 text-center whitespace-nowrap text-sm text-gray-900">
                  {index + 1}
                </td>
                <td className="border py-2 text-center whitespace-nowrap text-sm text-gray-900">
                  {payment.reference}
                </td>
                <td className="border py-2 text-center whitespace-nowrap text-sm text-gray-900">
                  {payment.amount}
                </td>
                <td className="border py-2 text-center whitespace-nowrap text-sm text-gray-900">
                    {payment.status === 'pending' ? <span className="text-red-500">Not Verified</span> : 
                    payment.status === 'paid' ? <span className="text-green-500">Verified</span> : 
                    payment.status === 'failed' ? <span className="text-red-500">Failed</span> : null}
                    
                </td>
                <td className="border py-2 text-center whitespace-nowrap text-sm text-gray-900 ">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => handleEdit(payment._id)}>
                        Edit
                    </button>
                </td>
                <td className="border py-2 text-center whitespace-nowrap text-sm text-gray-900 ">
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => handleDelete(payment._id)}>
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