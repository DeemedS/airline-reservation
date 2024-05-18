"use client";

import { useState, useEffect } from 'react'
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';

interface User {
  _id: string;
  firstname: string;
  lastname: string;
  middlename: string;
  nationality: string;
  gender: string;
  birthday: string;
  username: string;
  email: string;
  password: string;
  role: string;
  __v: number;
}

const page = () => {
  
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true)
  const Router = useRouter();
  const { id } = useParams();

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/admin/handleUser');
      setUsers(res.data.users);
      setLoading(false);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleEdit = (userId: string) => {
    Router.push(`/admin/${id}/manage-users/editUser/${userId}`);
  };

  const handleDelete = async (userId: string) => {
    try {

      const confirmDelete = window.confirm('Are you sure you want to delete this user?');
      if (confirmDelete) {
        await axios.delete('/api/admin/handleUser', {
          data: { userId }
        });
        setUsers(users.filter(user => user._id !== userId));
        window.alert('User deleted successfully');
      }
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="lg:ml-64 px-6 py-8">
      <div className="bg-white rounded-md border-none p-10 mb-4 shadow-md h-[800px] overflow-scroll">
        <h1 className="text-2xl font-semibold mb-4">Manage Users</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mb-4"
        onClick={() => Router.push(`/admin/${id}/manage-users/adduser`)}>
          Add User
        </button>

      <table className="min-w-full divide-y divide-gray-200 border-collapse border ">
          <thead className="bg-blue-500">
            <tr>
              <th scope="col" className="border px-3 py-3">
                <span className="block py-3 text-xs font-medium text-white uppercase tracking-wider items-center">ID</span>
              </th>
              <th scope="col" className="border px-3 py-3">
                <span className="block py-3 text-xs font-medium text-white uppercase tracking-wider items-center">Username</span>
              </th>
              <th scope="col" className="border  px-3 py-3">
                <span className="block py-3 text-xs font-medium text-white uppercase tracking-wider items-center">Email</span>
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
            {users.length === 0 && !loading && <tr><td>No users found</td></tr>}
            {loading ? <tr><td>Loading...</td></tr> : users.map((user, index) => (
              <tr key={index}>
                <td className="border py-2 text-center whitespace-nowrap text-sm text-gray-900">
                  {index + 1}
                </td>
                <td className="border py-2 text-center whitespace-nowrap text-sm text-gray-900">
                  {user.username}
                </td>
                <td className="border py-2 text-center whitespace-nowrap text-sm text-gray-900">
                  {user.email}
                </td>
                <td className="border py-2 text-center whitespace-nowrap text-sm text-gray-900 ">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => handleEdit(user._id)}>
                    Edit
                  </button>
                </td>
                <td className="border py-2 text-center whitespace-nowrap text-sm text-gray-900 ">
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => handleDelete(user._id)}>
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