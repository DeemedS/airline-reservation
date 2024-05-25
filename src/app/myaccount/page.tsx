"use client";

import React from 'react'
import Nav from '@/components/nav/nav'
import { useRouter } from 'next/navigation'
import axios from 'axios';
import { set } from 'mongoose';

const page = () => {

  const [reservationID, setReservationID] = React.useState('')
  const [message, setMessage] = React.useState('')
  const router = useRouter()



  return (
    <>
        <Nav />

        <div className="flex flex-col">
        <div className="mt-[90px] lg:mt-[100px]">
        </div>
        </div>
  

        <div className="flex flex-col mx-[5%] md:mx-[10%] xl:mx-[25%] list-none p-5 rounded-lg bg-white mt-5 h-[650px]  text-center">
          


        </div>

    </>
  )
}

export default page