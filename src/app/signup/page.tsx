"use client";

import React, { useEffect } from 'react'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import axios from 'axios';
import nationalities from '@/helpers/nationalities';

export const Signup = () => {

  const router = useRouter();

  const [user, setUser] = React.useState({
    firstname: "",
    lastname: "",
    middlename: "",
    birthday: "",
    nationality: "",
    gender: "male",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  })


  const [loading, setLoading] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [passwordMatch, setPasswordMatch] = React.useState(false);

  const onSignup = async (e: any) => {
    try {
      e.preventDefault()
      setLoading(true);
      setError(false);

      if (user.password !== user.confirmpassword) {
        setPasswordMatch(true);
        return;
      }
      const response = await axios.post("/api/user/signup" , user);
      
      router.push("/login" + '?' + 'message=signup_success');

    } catch (err: any) {
      console.log(err.response.data.message);
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    } 
  }

useEffect(() => {
    if (
      user.firstname.length > 0 && 
      user.lastname.length > 0 && 
      user.username.length > 0 && 
      user.email.length > 0 && 
      user.password.length > 0 
      && user.confirmpassword.length > 0
      && user.birthday.length > 0 
      && user.nationality.length > 0 
      && user.gender.length > 0) {
      setButtonDisabled(false);
    }  else {
      setButtonDisabled(true);
    }  
}, [user]);

  
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <Link href="/">
        <h1 className="text-3xl font-bold text-center text-gray-700">FLIGHT RESERVATION</h1>
        </Link>

        <p className="text-sm text-center text-red-700">{error}</p>


        <form className="mt-6">

          <div className="flex flex-wrap mb-4 gap-5">

            <div>
            <label htmlFor="firstname" className="block text-sm font-semibold text-gray-800">First Name</label>
            <input id="firstname" name='firstname'
            type="text" 
            value={user.firstname}
            onChange={(e) => setUser({...user, firstname: e.target.value})}
            placeholder='First Name'
            className="w-50% px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40" />
            </div>
            
            <div>
            <label htmlFor="lastname" className="block text-sm font-semibold text-gray-800">Last Name</label>
            <input id='lastname' name='lastname'
            type="text" 
            value={user.lastname}
            onChange={(e) => setUser({...user, lastname: e.target.value})}
            placeholder='Last Name'
            className="w-50% px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40" />
            </div>

            <div>
              <label htmlFor="middlename" className="block text-sm font-semibold text-gray-800">Middle Name</label>
              <input id='middlename' name='middlename'
              type="text"
              placeholder='Middle Name'
              value={user.middlename}
              onChange={(e) => setUser({...user, middlename: e.target.value})}
              className="w-50% px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40" />
            </div>

          </div>

          <div className="flex flex-wrap mb-4 gap-5">
              
              <div>
              <label htmlFor="birthday" className="block text-sm font-semibold text-gray-800">Birthday</label>
              <input id='birthday' name='birthday'
              type="date"
              value={user.birthday}
              onChange={(e) => setUser({...user, birthday: e.target.value})}
              placeholder='Birthday'
              className="w-50% px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <div>
                <label htmlFor="gender"className="block text-sm font-semibold text-gray-800">Gender</label>
                <select id='gender' name='gender'
                onChange={(e) => setUser({...user, gender: e.target.value})}
                className='w-50% px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40'
                >
                  <option value='' disabled >Select Gender</option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                </select>
              </div>

              <div>
                <label htmlFor='nationality' className="block text-sm font-semibold text-gray-800">Nationality</label>
                <select id='nationality' name='nationality' 
                onChange={(e) => setUser({...user, nationality: e.target.value})}
                className='w-50% px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40'
                >
                    <option value="" disabled selected>Select Nationality</option>
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

          <div className="mb-2">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-800">Password</label>
            <input id='password'  name='password'
            type="password" 
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder='Password'
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
          </div>

          <div className="mb-2">
            <label htmlFor="confirmpassword" className="block text-sm font-semibold text-gray-800">Confirm Password</label>
            <input id='confirmpassword'   name='confirmpassword'
            type="password"
            value={user.confirmpassword}
            onChange={(e) => setUser({...user, confirmpassword: e.target.value})} 
            placeholder='Confirm Password'
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
          </div>

          {passwordMatch && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">password does not match</span>}

          <div className="mt-10">
            <button  onClick={onSignup}
            disabled={buttonDisabled}
            className="disabled:cursor-not-allowed w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              {loading ? "Pocessing..." : "Sign Up"}
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-center text-gray-700"> Already have an account?{" "}
        <Link href="/login" className="font-medium text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
        
      </div>
    </div>
  )
}

export default Signup