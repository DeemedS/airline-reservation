"use client";

import React from 'react'
import Nav from '@/components/nav/nav'
import { useRouter } from 'next/navigation'
import axios from 'axios';
import { set } from 'mongoose';

const Page = () => {

  const [reservationID, setReservationID] = React.useState('')
  const [message, setMessage] = React.useState('')
  const router = useRouter()

  const handleClick = async () => {
    try {
      const res = await axios.post('/api/track', { reservationID })
      if (res.status === 200) {
        router.push(`/track/${reservationID}`)
      }
    } catch (error: any) {
      setMessage(error.response.data.message)
    }
  }

  return (
    <>
        <Nav />

        <div className="flex flex-col">
        <div className="mt-[90px] lg:mt-[100px]">
        </div>
        </div>
  

        <div className="flex flex-col mx-[5%] md:mx-[10%] xl:mx-[25%] list-none p-5 rounded-lg bg-white mt-5 h-[650px]  text-center">

            <p className="text-lg font-semibold  p-3">Track Reservation</p>

            <hr className='my-2 border border-black-300'></hr>

            <p className="text-sm font-light text-red-500">{message}</p>

            <div className="flex flex-col gap-4 m-auto ">
                <div className="flex flex-col mt-5 text-center">
                <p className="text-sm font-light">Please enter your resevation ID to track your resevation.</p>
                <p className="text-sm font-light"></p>
                </div>

                <div className="flex flex-col gap-4 m-auto border-2 p-10 md:w-[500px]">
                <input type="text" className="border-2 border-black-300 rounded-lg p-3 " placeholder="Reservation ID"
                onChange={(e) => setReservationID(e.target.value)}
                >
                </input>
                <button className="bg-[#FBBF24] text-white font-semibold p-3 rounded-lg"
                onClick={handleClick}
                >Track Reservation</button>
                </div>
            </div>

            
        </div>

    </>
  )
}

export default Page