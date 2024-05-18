"use client";
import nationalities from '@/helpers/nationalities';
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
}

const page = () => {

  const { userId } = useParams();
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  
  const Router = useRouter();

  const [user, setUser] = useState<User>({
    _id: '',
    firstname: '',
    lastname: '',
    middlename: '',
    nationality: '',
    gender: '',
    birthday: '',
    username: '',
    email: '',
    password: '',
    role: '',
  });

  const fetchUser = async () => {
    try {
      const res = await axios.post("/api/admin/handleUser", { userId });
      setUser(res.data.user);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const handleEdit = () => {
    setSaveLoading(true);
    axios.put("/api/admin/handleUser", user)
      .then(res => {
        window.confirm('Would you like to save changes?');
        setSaveLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleDelete = async (e : any, userId: string) => {
    try {
      setDeleteLoading(true);
      const confirmDelete = window.confirm('Are you sure you want to delete this user?');
      if (confirmDelete) {
        await axios.delete('/api/admin/handleUser', {
          data: { userId }
        });
        window.alert('User deleted successfully');
        Router.push(`/admin/manage/manage-users`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteLoading(false);
    }
  };



  return (
    <div className="lg:ml-64 px-6 py-8">
      <div className="relative bg-white rounded-md border-none p-10 mb-4 shadow-md h-[800px]">
      <form className="mt-6">

          <div className="flex flex-wrap mb-4 gap-5">

            <div className='w-[25%]'>
            <label htmlFor="firstname" className="block text-sm font-semibold text-gray-800">First Name</label>
            <input id="firstname" name='firstname'
            type="text" 
            value={user.firstname}
            onChange={(e) => setUser({...user, firstname: e.target.value})}
            placeholder='First Name'
            className="w-[100%] px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40" />
            </div>
            
            <div className='w-[25%]'>
            <label htmlFor="lastname" className="block text-sm font-semibold text-gray-800">Last Name</label>
            <input id='lastname' name='lastname'
            type="text" 
            value={user.lastname}
            onChange={(e) => setUser({...user, lastname: e.target.value})}
            placeholder='Last Name'
            className="w-[100%] px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40" />
            </div>

            <div className='w-[25%]'>
              <label htmlFor="middlename" className="block text-sm font-semibold text-gray-800">Middle Name</label>
              <input id='middlename' name='middlename'
              type="text"
              placeholder='Middle Name'
              value={user.middlename}
              onChange={(e) => setUser({...user, middlename: e.target.value})}
              className="w-[100%] px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40" />
            </div>

          </div>

          <div className="flex flex-wrap mb-4 gap-5">
              
              <div className='w-[25%]'>
              <label htmlFor="birthday" className="block text-sm font-semibold text-gray-800">Birthday</label>
              <input id='birthday' name='birthday'
              type="date"
              value={user.birthday}
              onChange={(e) => setUser({...user, birthday: e.target.value})}
              placeholder='Birthday'
              className="w-50% px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <div className='w-[25%]'>
                <label htmlFor="gender"className="block text-sm font-semibold text-gray-800">Gender</label>
                <select id='gender' name='gender'
                onChange={(e) => setUser({...user, gender: e.target.value})}
                value={user.gender}
                className='w-50% px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40'
                >
                  <option value='' disabled >Select Gender</option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                </select>
              </div>

              <div className='w-[25%]'>
                <label htmlFor='nationality' className="block text-sm font-semibold text-gray-800">Nationality</label>
                <select id='nationality' name='nationality' 
                onChange={(e) => setUser({...user, nationality: e.target.value})}
                value={user.nationality}
                className='w-50% px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40'
                >
                <option value="" disabled>Select Nationality</option>
                {nationalities.map((nationality, index) => (
                      <option key={index} value={nationality}>
                        {nationality}
                      </option>
                    ))}

                </select>
              </div>


          </div>

          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-semibold text-gray-800">Username</label>
            <input id='username' name='username'
            type="username"
            value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value})}
            placeholder='Username'
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40" />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-800">Email</label>
            <input id='email' name='email'
            type="email"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder='Email'
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40" />
          </div>

          <div className="mb-4">

          <div className='w-[25%]'>
                <label htmlFor='role' className="block text-sm font-semibold text-gray-800">Role</label>
                <select id='role' name='role' 
                onChange={(e) => setUser({...user, role: e.target.value})}
                value={user.role}
                className='w-50% px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40'
                >
                <option value="" disabled>Select Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                </select>
              </div>
          </div>

          <div className="flex flex-row gap-4 absolute bottom-0 right-0 m-5 w-[50%]">
            <button
              className="w-[50%] px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
              onClick={handleEdit}>
                {saveLoading ? "Pocessing..." : "Save Changes"}
            </button>

            <button
              className="w-[50%] px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
              onClick={(e) => handleDelete(e, user._id)}>
                {deleteLoading ? "Pocessing..." : "Delete User"}
              </button>
          </div>

          </form> 

      </div>
    </div>
  )
}

export default page