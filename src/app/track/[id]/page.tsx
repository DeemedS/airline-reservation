"use client";

import React from 'react'
import Nav from '@/components/nav/nav'
import ProgressBar from '@/components/progressBar/progressBar'
import { useQRCode } from 'next-qrcode';

const page = () => {

const { Canvas } = useQRCode();

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
    
                
                <div className="flex flex-col md:flex-row gap-4 border-2 p-4 m-auto bg-[#ffe39e] text-center w-[70%]">
                    <div className="flex flex-col gap-2 mr-auto ">
                        <div className="flex flex-row text-center">
                            <p className="text-sm font-light">Reservation ID :</p>
                            <p className="text-sm font-semibold ml-2">123456789</p>
                        </div>

                        <div className="flex flex-row text-center">
                            <p className="text-sm font-light">Name :</p>
                            <p className="text-sm font-semibold ml-2">John Doe</p>
                        </div>

                        <div className="flex flex-row text-center">
                            <p className='text-sm font-light'>Flight</p>
                            <p className="text-sm font-semibold ml-2">Manila to Cebu</p>
                        </div>

                        <div className="flex flex-row text-center">
                            <p className="text-sm font-light">Date :</p>
                            <p className="text-sm font-semibold ml-2">January 1, 2021</p>
                        </div>

                        <div className="flex flex-row text-center">
                            <p className="text-sm font-light">Time :</p>
                            <p className="text-sm font-semibold ml-2">12:00 PM</p>
                        </div>

                        <div className="flex flex-row text-center">
                            <p className="text-sm font-light">Seat :</p>
                            <p className="text-sm font-semibold ml-2">A1</p>
                        </div>

                        <div className="flex flex-row text-center">
                            <p className="text-sm font-light">Package :</p>
                            <p className="text-sm font-semibold ml-2">Basic Package</p>
                        </div>

                        
                        <div className="flex flex-row text-center">
                            <p className="text-sm font-light">Status :</p>
                            <p className="text-sm font-semibold ml-2">Pending Payment Confirmation</p>
                        </div>
                    </div>

                    <div className="flex flex-row my-auto">
                        <div className='border-2 w-fit h-fit'>
                        <Canvas 
                        text={'https://github.com/bunlong/next-qrcode'}
                        options={{
                            errorCorrectionLevel: 'M',
                            margin: 3,
                            scale: 4,
                            width: 170,
                            color: {
                            dark: '#000000',
                            light: '#FFFFFF',
                            },
                        }}
                        />
                        </div>
                    </div>
                </div>
        </div>


    </>
  )
}

export default page