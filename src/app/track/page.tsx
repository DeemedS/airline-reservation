"use client";

import React from 'react'
import Nav from '@/components/nav/nav'
import ProgressBar from '@/components/progressBar/progressBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const page = () => {



  return (
    <>
        <Nav />

        <div className="flex flex-col">
        <div className="mt-[90px] lg:mt-[100px]">
        </div>
        </div>
  

        <div className="flex flex-col mx-[5%] md:mx-[10%] xl:mx-[25%] list-none p-5 rounded-lg bg-white mt-5 h-[650px]  text-center">

            <p className="text-lg font-semibold  p-3">Track ID</p>

            <hr className='my-2 border border-black-300'></hr>

            
            <div className="flex flex-col gap-4 m-auto ">
                <div className="flex flex-col mt-5 text-center">
                <p className="text-sm font-light">Please enter your resevation ID to track your resevation.</p>
                <p className="text-sm font-light"></p>
                </div>

                <div className="flex flex-col gap-4 m-auto border-2 p-10 md:w-[500px]">
                <input type="text" className="border-2 border-black-300 rounded-lg p-3 " placeholder="Reservation ID"></input>
                <button className="bg-[#FBBF24] text-white font-semibold p-3 rounded-lg">Track Reservation</button>
                </div>
            </div>

            
        </div>

    </>
  )
}

export default page