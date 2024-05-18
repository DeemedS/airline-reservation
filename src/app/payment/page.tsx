"use client";
import React, { use } from 'react'
import Nav from '@/components/nav/nav'
import ProgressBar from '@/components/progressBar/progressBar'
import { useQRCode } from 'next-qrcode';
import { getTokenData } from '@/helpers/getTokenData';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { set } from 'mongoose';

const page = () => {

    const { Canvas } = useQRCode();
  
    const [flightData , setFlightData] = useState({
        departureFlight: {
        id: '',
        date: '',
        from: '',
        to: '',
        arrival: '',
        code: '',
        departure: '',
        fare: 0,
      },
      returnFlight: {
        id: '',
        date: '',
        from: '',
        to: '',
        arrival: '',
        code: '',
        departure: '',
        fare: 0,
      },
      flightType: ''
    });

    const [guestInfo, setGuestInfo] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        birthday: '',
        age: '',
        nationality: '',
        gender: '',
        email: '',
        phone: '', 
        secondaryPhone: '',
        addressline1: '',
        addressline2: '',
        city: '',
        region: '',
        zip: ''
      });

      const [bookingData, setBookingData] = useState({
        selectedPackage: '',
        packageCost: 0,
        referenceNumber: '',
    });
    
    useEffect(() => {
        const getBookingsData = async () => {
          try {
            const res = await axios.get('/api/addons');
            console.log(res.data.tokenData);
            setBookingData(res.data.tokenData.reqBody);
            setFlightData(res.data.tokenData.reqBody.flightData);
            setGuestInfo(res.data.tokenData.reqBody.guestInfo);
          } catch (error) {
            console.log(error);
          }
        };

        getBookingsData();
    
      }, []);





  return (
    <>
    <Nav />

    <div className="flex flex-col">
    <div className="mt-[90px] lg:mt-[100px]">
    </div>
    </div>

    <ProgressBar />

    <div className="flex flex-col mx-[5%] md:mx-[10%] xl:mx-[25%] list-none justify-center p-3 rounded-lg bg-white mt-5">
        <p className="text-lg font-semibold text-center p-3">Pay Reservation</p>

        <hr className='my-2 border border-black-300'></hr>

        <div className="flex flex-col gap-4 mt-5 text-center">

        <div className="flex flex-col">
        <p className="text-xs font-semibold">Total Amount</p>
        <p className="text-2xl font-semibold">PHP {flightData.departureFlight.fare + flightData.returnFlight?.fare + bookingData.packageCost || flightData.departureFlight.fare + bookingData.packageCost}</p>
        </div>

        
        <div className="flex flex-col m-auto">
            <div className="flex flex-col border-2 p-4 lg:w-[500px]">
            <div className="flex flex-col">
            <p>Please pay the at the bank using the information below:</p>
            <p className="text-xs font-semibold mt-5">Bank Name</p>
            <p className="text-lg font-semibold">BDO</p>
            </div>

            <div className="flex flex-col">
            <p className="text-xs font-semibold">Account Name</p>
            <p className="text-lg font-semibold">Flight Reservation</p>
            </div>

            <div className="flex flex-col">
            <p className="text-xs font-semibold">Account Number</p>
            <p className="text-lg font-semibold">1234567891</p>
            </div>

            <div className="flex flex-col">
            <p className="text-xs font-semibold">Reference no.</p>
            <p className="text-lg font-semibold">{bookingData.referenceNumber}</p>
            </div>
            

            <div className="flex flex-row justify-center mt-5">
                <div className='border-2'>
                <Canvas 
                text={'https://github.com/bunlong/next-qrcode'}
                options={{
                    errorCorrectionLevel: 'M',
                    margin: 3,
                    scale: 4,
                    width: 200,
                    color: {
                    dark: '#000000',
                    light: '#FFFFFF',
                    },
                }}
                />
                </div>
            </div>

             <p className='text-xs font-light'>Scan QR code to pay reservation</p>
            </div>
        </div>
        
       
  
        </div>

        <div className="flex flex-col gap-4 my-5">
        <p className="text-xs font-semibold">Upload your payment receipt</p>
        <input type="file" className="border border-black-300 rounded-lg p-2"></input>
        </div>

        

    </div>

    <div className='flex flex-row my-5 gap-5 md:mx-[25%] mx-[5%] justify-end'>

    <button className='flex bg-red-200 rounded-lg p-2 w-25'
    onClick={() => {
      if (window.confirm(`Please save your reference number:  ${bookingData.referenceNumber}`)) {
          window.location.href = '/';
      }
  }}>Pay Later</button>

    <button className='flex bg-lime-200 rounded-lg p-2 w-20'>Continue</button>

    </div>
    </>
  )
}

export default page