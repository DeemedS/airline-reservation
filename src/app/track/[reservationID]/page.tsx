"use client";

import React, { use } from 'react'
import Nav from '@/components/nav/nav'
import { useQRCode } from 'next-qrcode';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';
import formatTime from '@/helpers/formatTime';
import convertTo24Hour from '@/helpers/convertTo24Hour';
import formatDate from '@/helpers/formatDate';

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
    packageCost?: string;
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

  interface Payment {
    bookingId: string;
    amount: number;
    reference: string;
    proofOfPayment: string;
    status: string;
    date: Date;
  }

const page = () => {

const { Canvas } = useQRCode();
const router = useRouter();
const { reservationID } = useParams();

const [reservation, setReservation] = useState<BookFlight>();
const [departureFlight, setDepartureFlight] = useState<DepartureFlight>();
const [returnFlight, setReturnFlight] = useState<ReturnFlight>();
const [payment, setPayment] = useState<Payment>();

const fetchReservation = async () => {
    try {
        const res = await axios.post(`/api/track`, { reservationID });
        setReservation(res.data);
        fetchDepartureFlight(res.data.departureFlightId);
        fetchReturnFlight(res.data.returnFlightId);
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
}

const fetchPayment = async () => {
    try {
        const res = await axios.post(`/api/findPayment`, { reservationID });
        setPayment(res.data);
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
        fetchReservation();
        fetchPayment();
    }
    , []);

      return (
        <>
            <Nav />

            <div className="flex flex-col">
            <div className="mt-[90px] lg:mt-[100px]">
            </div>
            </div>
     

            <div className="flex flex-col mx-[5%] md:mx-[10%] xl:mx-[25%] list-none p-5 rounded-lg bg-white mt-5 h-[full]  text-center">
                    
                    <p className="text-lg font-semibold  p-3">Track ID: <span>{reservationID}</span></p>
        
                    <hr className='my-2 border border-black-300'></hr>
        
                    
                    <div className="flex flex-col md:flex-row gap-4 border-2 p-4 m-auto bg-[#ffe39e] text-center w-[70%]">
                        
                        <div className="flex flex-col gap-2 mr-auto ">
                            <div className="flex flex-row text-center">
                            <p className="text-l font-semibold">Departure Flight</p>
                            </div>

                            <div className="flex flex-row text-center">
                                <p className="text-sm font-light">Reservation ID : </p>
                                <p className="text-sm font-semibold ml-2">{reservationID}</p>
                            </div>

                            <div className="flex flex-row text-center">
                                <p className="text-sm font-light">Name :</p>
                                <p className="text-sm font-semibold ml-2">{reservation?.guestInfo?.firstName + ' ' + reservation?.guestInfo?.lastName }</p>
                            </div>

                            <div className="flex flex-row text-center">
                                <p className='text-sm font-light'>Flight</p>
                                <p className="text-sm font-semibold ml-2"><span>{departureFlight?.from}</span> to <span>{departureFlight?.to}</span></p>
                            </div>

                            <div className="flex flex-row text-center">
                                <p className="text-sm font-light">Date :</p>
                                <p className="text-sm font-semibold ml-2">{formatDate(departureFlight?.date?.toString() ?? '')}</p>
                            </div>

                            <div className="flex flex-row text-center">
                                <p className="text-sm font-light">Time :</p>
                                <p className="text-sm font-semibold ml-2">{formatTime(departureFlight?.departure?.toString() ?? '')}</p>
                            </div>

                            <div className="flex flex-row text-center">
                                <p className="text-sm font-light">Seat :</p>
                                <p className="text-sm font-semibold ml-2">{reservation?.seatCode}</p>
                            </div>

                            <div className="flex flex-row text-center">
                                <p className="text-sm font-light">Package :</p>
                                <p className="text-sm font-semibold ml-2">{reservation?.bookingData?.selectedPackage}</p>
                            </div>

                            
                            <div className="flex flex-row text-center">
                                <p className="text-sm font-light">Status :</p>
                                {reservation?.paymentStatus === 'pending' && payment ? <p className="text-sm font-semibold ml-2">Pending Payment Confirmation</p> :
                            reservation?.paymentStatus === 'pending' && !payment ? <p className="text-sm font-semibold ml-2">Pending Payment</p> :
                            reservation?.paymentStatus === 'paid' ? <p className="text-sm font-semibold ml-2 text-green-500">Payment Confirmed</p> : 
                            reservation?.paymentStatus === 'failed' ? <p className="text-sm font-semibold ml-2 text-red-500">Payment Failed</p> : null}
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

                    {returnFlight ? 

                    <div className="flex flex-col md:flex-row gap-4 border-2 p-4 m-auto bg-[#ffe39e] text-center w-[70%] mt-5">
                                        
                    <div className="flex flex-col gap-2 mr-auto ">
                        <div className="flex flex-row text-center">
                        <p className="text-l font-semibold">Return Flight</p>
                        </div>

                        <div className="flex flex-row text-center">
                            <p className="text-sm font-light">Reservation ID : </p>
                            <p className="text-sm font-semibold ml-2">{reservationID}</p>
                        </div>

                        <div className="flex flex-row text-center">
                            <p className="text-sm font-light">Name :</p>
                            <p className="text-sm font-semibold ml-2">{reservation?.guestInfo?.firstName + ' ' + reservation?.guestInfo?.lastName }</p>
                        </div>

                        <div className="flex flex-row text-center">
                            <p className='text-sm font-light'>Flight</p>
                            <p className="text-sm font-semibold ml-2"><span>{returnFlight?.from}</span> to <span>{returnFlight?.to}</span></p>
                        </div>

                        <div className="flex flex-row text-center">
                            <p className="text-sm font-light">Date :</p>
                            <p className="text-sm font-semibold ml-2">{formatDate(returnFlight?.date?.toString() ?? '')}</p>
                        </div>

                        <div className="flex flex-row text-center">
                            <p className="text-sm font-light">Time :</p>
                            <p className="text-sm font-semibold ml-2">{formatTime(returnFlight?.departure?.toString() ?? '')}</p>
                        </div>

                        <div className="flex flex-row text-center">
                            <p className="text-sm font-light">Seat :</p>
                            <p className="text-sm font-semibold ml-2">{reservation?.seatCode}</p>
                        </div>

                        <div className="flex flex-row text-center">
                            <p className="text-sm font-light">Package :</p>
                            <p className="text-sm font-semibold ml-2">{reservation?.bookingData?.selectedPackage}</p>
                        </div>

                        
                        <div className="flex flex-row text-center">
                            <p className="text-sm font-light">Status :</p>
                            {reservation?.paymentStatus === 'pending' && payment ? <p className="text-sm font-semibold ml-2">Pending Payment Confirmation</p> :
                            reservation?.paymentStatus === 'pending' && !payment ? <p className="text-sm font-semibold ml-2">Pending Payment</p> :
                            reservation?.paymentStatus === 'paid' ? <p className="text-sm font-semibold ml-2 text-green-500">Payment Confirmed</p> : 
                            reservation?.paymentStatus === 'failed' ? <p className="text-sm font-semibold ml-2 text-red-500">Payment Failed</p> : null}
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
                    </div> : null

                    }

                {
                    (reservation?.paymentStatus === 'pending' || reservation?.paymentStatus === 'failed' && !payment) || (reservation?.paymentStatus === 'failed' && payment) ? 
                    <button className="bg-[#ff7e67] text-white rounded-lg p-2 mt-5" onClick={() => router.push(`/payment/${reservationID}`)}>Proceed to Payment</button> : null
                }


            </div>


        </>
      )
    }

    export default page
