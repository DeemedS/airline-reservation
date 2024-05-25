"use client";

import React from 'react'
import Nav from '@/components/nav/nav'
import ProgressBar from '@/components/progressBar/progressBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'next/navigation';

const page = () => {

const { reference } = useParams();


  return (
    <>
        <Nav />

        <div className="flex flex-col">
        <div className="mt-[90px] lg:mt-[100px]">
        </div>
        </div>

        <ProgressBar />   

        <div className="flex flex-col mx-[5%] md:mx-[10%] xl:mx-[25%] list-none p-5 rounded-lg bg-white mt-5 h-[650px]  text-center">

            <p className="text-lg font-semibold  p-3">Reservation Confirmed</p>

            <hr className='my-2 border border-black-300'></hr>

            
            <div className="flex flex-col gap-4 m-auto border-2 p-10">

                <FontAwesomeIcon icon={faCheckCircle} className="h-[200px] w-[200px] text-green-400 m-auto mt-5" />
                <div className="flex flex-col mt-5 text-center">
                <p className="text-xl font-semibold">Resevation ID : <span>{reference}</span></p>
                <p className="text-sm font-light">Please save your resevation ID, you will need track your resevation.</p>
                <p className="text-sm font-light"></p>
                </div>
            </div>

            
        </div>

    </>
  )
}

export default page