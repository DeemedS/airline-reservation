'use client'
 
import { useSearchParams } from 'next/navigation'
import React from 'react'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import axios from 'axios';

const Login = () => {

  const router = useRouter()

  const searchParams = useSearchParams()
  const message = searchParams.get("message")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [err, setErr] = React.useState("")
  const [isloading, setIsloading] = React.useState(false)

  const onLogin = async (e: any) => {
    try {
      e.preventDefault()
      setIsloading(true)
      const response = await axios.post("/api/user/login", { email, password })
      if (response.status === 200) {
        router.push("/myaccount")
      }
      } catch (err: any) {
      setErr(err.response.data.message)
    }
    finally {
      setIsloading(false)
    }
  } 

  return (
    <>
      <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-700">FLIGHT RESERVATION</h1>

        {message === "signup_success" && !err && (
          <p className="mt-2 text-sm text-center text-green-600">Signup successful. Please login.</p>
        )}

        {err && (
          <p className="mt-2 text-sm text-center text-red-700">{err}</p>
        )}

        <form className="mt-6">

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-800">Email</label>
            <input id='email' name='email'
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40" />
          </div>

          <div className="mb-2">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-800">Password</label>
            <input id='password' name='password'
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
          </div>

          <Link href="/forgot-password" className="text-xs text-blue-600 hover:underline">
            Forget Password?
          </Link>

          <div className="mt-2">
            <button onClick={onLogin}
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              {isloading ? "Processing.." : "Login"}
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-center text-gray-700"> Don&apos;t have an account?{" "}
        <Link href="/signup"className="font-medium text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
        
      </div>
    </div>
    </>
    
  )
}

export default Login