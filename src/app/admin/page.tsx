'use client';
 
import React from 'react'
import Link from "next/link"
import axios from 'axios';
import { useRouter } from 'next/navigation'


const AdminPage = () => {

  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const router = useRouter()

  const [isloading, setIsloading] = React.useState(false)

  const onLogin = async (e: any) => {
    try {
      e.preventDefault()
      setIsloading(true)
      const response = await axios.post("/api/admin/auth", { email, password })
      if (response.status === 200) {
        router.push(`/admin/manage/manage-users`) 
      }
      } catch (err: any) {
    }
    finally {
      setIsloading(false)
    }
  } 



  return (
    <>
      <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-700">ADMININSTRATOR</h1>
  
        <form className="mt-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-800">Email</label>
            <input type="email" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            value={email}
            onChange={(e) => setEmail(e.target.value)}>
            </input>
          </div>

          <div className="mb-2">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-800">Password</label>
            <input type="password" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>

          <Link href="/forget" className="text-xs text-blue-600 hover:underline">
            Forget Password?
          </Link>

          <div className="mt-2">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            onClick={onLogin}>
              {isloading ? "Processing.." : "Login"}
            </button>
          </div>
        </form>
        
      </div>
    </div>
    </>
  )
}

export default AdminPage