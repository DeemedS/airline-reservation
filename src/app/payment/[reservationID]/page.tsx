"use client";
import React, { use } from 'react'
import Nav from '@/components/nav/nav'
import { useQRCode } from 'next-qrcode';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';

interface GuestInfo {
    firstName?: string;
    lastName?: string;
    middleName?: string;
    birthday?: string;
    age?: string;
    nationality?: string;
    gender?: string;
    email?: string;
    phone?: string;
    secondaryPhone?: string;
    addressline1?: string;
    addressline2?: string;
    city?: string;
    region?: string;
    zip?: string;
  }
  
  interface BookingData {
    selectedPackage?: string;
    packageCost?: number;
    referenceNumber?: string;
  }
  
  interface BookFlight {
    _id?: string;
    departureFlightId?: string;
    returnFlightId?: string;
    seatCode?: string;
    guestInfo?: GuestInfo;
    bookingData?: BookingData;
    paymentStatus?: string;
    bookedDate?: Date;
  }

  interface DepartureFlight {
    from: string;
    to: string;
    date: Date;
    arrival: Date;
    departure: Date;
    code: string;
    fare: number;
  }

  interface ReturnFlight {
    from: string;
    to: string;
    date: Date;
    arrival: Date;
    departure: Date;
    code: string;
    fare: number;
  }


const page = () => {  

    const { Canvas } = useQRCode();
    const { reservationID } = useParams();
    const router = useRouter();
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const [bookingData, setBookingData] = useState<BookFlight>();
    const [departureFlight, setDepartureFlight] = useState<DepartureFlight>(
      {
        from: '',
        to: '',
        date: new Date(),
        arrival: new Date(),
        departure: new Date(),
        code: '',
        fare: 0,
      }
    );
    const [returnFlight, setReturnFlight] = useState<ReturnFlight>(
      {
        from: '',
        to: '',
        date: new Date(),
        arrival: new Date(),
        departure: new Date(),
        code: '',
        fare: 0,
      }
    );

    const getBookingData = async () => {
        try {
            console.log(reservationID);
            const res = await axios.post(`/api/track`, { reservationID });
            setBookingData(res.data);
            fetchDepartureFlight(res.data.departureFlightId);
            fetchReturnFlight(res.data.returnFlightId);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchDepartureFlight = async (departureID: string) => {
        try {
            console.log(departureID);
            const res = await axios.post(`/api/findFlight`, { flightID: departureID });
            setDepartureFlight(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    
    const fetchReturnFlight = async (returnID: string) => {
        try {
            console.log(returnID);
            const res = await axios.post(`/api/findFlight`, { flightID: returnID });
            setReturnFlight(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        getBookingData();
    }, []);

    const handleFileChange = (event: any) => {
        setSelectedFile(event.target.files[0]);
        console.log(event.target.files[0]);
      };


      const handleFileUpload = async () => {
        setLoading(true);
        if (!selectedFile) return;
    
        const formData = new FormData();
        formData.append('file', selectedFile);
    
        try {
            const response = await axios.post('/api/upload', formData, {
            params: {
              bookingDataId: bookingData?._id,
              amount: (departureFlight?.fare || 0) + (returnFlight?.fare || 0) + (bookingData?.bookingData?.packageCost || 0) || (departureFlight?.fare || 0) + (bookingData?.bookingData?.packageCost || 0),
              reference: bookingData?.bookingData?.referenceNumber,
            }
            });
    
          console.log('File uploaded:', response.data);
          router.push('/confirmation/' + bookingData?.bookingData?.referenceNumber);
          
        } catch (error) {
          console.error('Error uploading file:', error);
        } finally {
            setLoading(false);
        }
      };

  return (
    <>
    <Nav />

    <div className="flex flex-col">
    <div className="mt-[90px] lg:mt-[100px]">
    </div>
    </div>


    <div className="flex flex-col mx-[5%] md:mx-[10%] xl:mx-[25%] list-none justify-center p-3 rounded-lg bg-white mt-5">
        <p className="text-lg font-semibold text-center p-3">Pay Reservation</p>

        <hr className='my-2 border border-black-300'></hr>

        <div className="flex flex-col gap-4 mt-5 text-center">

        <div className="flex flex-col">
        <p className="text-xs font-semibold">Total Amount</p>
        <p className="text-2xl font-semibold">PHP 
        {((departureFlight?.fare || 0) + (returnFlight?.fare || 0) + (bookingData?.bookingData?.packageCost || 0)) || ((departureFlight?.fare || 0) + (bookingData?.bookingData?.packageCost || 0))}
        </p>
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
            <p className="text-lg font-semibold">{bookingData?.bookingData?.referenceNumber}</p>
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


        <input
          type="file"
          className="border border-black-300 rounded-lg p-2 mt-2"
          onChange={handleFileChange}
        />

    <div className='flex flex-row my-5 gap-5 '>
    <button className='flex bg-lime-200 rounded-lg p-2 w-full justify-center'
    onClick={handleFileUpload}
    >
    {loading ? 'Uploading...' : 'Pay now'}
    </button>
    </div>

        

    </div>


    </>
  )
}

export default page