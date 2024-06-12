"use client";

import React, { use } from 'react'
import Nav from '@/components/nav/nav'
import { useRouter } from 'next/navigation'
import axios from 'axios';
import { set } from 'mongoose';
import formatTime from '@/helpers/formatTime';
import formatDate from '@/helpers/formatDate';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft, faPlane } from '@fortawesome/free-solid-svg-icons'
import cookie from 'cookie';
import { Booking, Flight, Reservation, User, DepartureFlight, ReturnFlight  } from '@/helpers/interface';


const Page = () => {

  
  const router = useRouter()

  const [userID, setUserID] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [bookingData, setBookingData] = useState<Booking[]>([]);


  


  const fetchDepartureFlight = async (departureID: string) => {
    try {
        const res = await axios.post(`/api/findFlight`, { flightID: departureID });
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

const fetchReturnFlight = async (returnID: string) => {
    try {
        const res = await axios.post(`/api/findFlight`, { flightID: returnID });
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

const cancelReservation = async (bookingId: string) => {
  try {

    const confirmDelete = window.confirm('Are you sure you want to cancel this reservation?');
    if (confirmDelete) {
      await axios.delete('/api/user/reservation', {
        data: { bookingId }
      });
      setBookingData(bookingData.filter(booking => booking.reservation._id !== bookingId));
      window.alert('Reservation cancelled successfully'); 
    }
  } catch (error) {
    console.log(error);
  }
}


  useEffect(() => {

    const fetchUserId = async () => {
      try {
        const res = await axios.get('/api/user')
        const id = res.data.tokenData.id
        setUserID(id);
        fetchUserInfo(id)
        fetchReservations(id)
        
      } catch (error) {
          console.log(error)
        }
      }

      const fetchUserInfo = async (userId: string) => {
        try {
          const res = await axios.post('/api/user', { userId })
          setUserInfo(res.data)
        } catch (error) {
          console.log(error)
        }
      }
    
      const fetchReservations = async (userId: string) => {
        try {
          const res = await axios.post('/api/user/reservation', { userId })
          res.data.forEach(async (reservation: Reservation) => {
            const departure = await fetchDepartureFlight(reservation.departureFlightId);
            const returnFlight = await fetchReturnFlight(reservation.returnFlightId);
            setBookingData(prevData => [...prevData, { departureFlight: departure, returnFlight: returnFlight, reservation: reservation }]);
          });
        } catch (error) {
          console.log(error);
        }
      }

    fetchUserId()
  }, [])

  return (
    <>
        <Nav />

        <div className="flex flex-col">
        <div className="mt-[90px] lg:mt-[100px]">
        </div>
        </div>
  

        <div className="flex flex-col mx-[5%] md:mx-[10%] xl:mx-[25%] list-none p-5 rounded-lg bg-white mt-5 h-[650px]  ">
          
        <div className="text-3xl font-bold mt-5 text-center">My Account</div>

          <div className="flex flex-col w-1/2 md:mx-10 mt-3">
            <h5 className="text-sm font-bold">Name : {userInfo?.firstname + ' ' + userInfo?.lastname}</h5>
          </div>

          <div className="flex flex-col w-1/2 md:mx-10 mt-3">
            <h5 className="text-sm font-bold">Username : {userInfo?.username}</h5>
          </div>

          <div className="flex flex-col w-1/2 md:mx-10 mt-3">
            <h5 className="text-sm font-bold">Email : {userInfo?.email}</h5>
          </div>

          <div className="flex flex-col w-1/2 md:mx-10 mt-3">
            <a href={'myaccount/edit/' + userID} className="text-xs font-bold text-blue-400 underline">Edit Profile</a>
          </div>

        <hr className="border border-zinc-100 mt-5"/>

          <div className="flex flex-col w-1/2 md:mx-10 mt-3">
            <h5 className="text-md font-bold">My Reservations</h5>
          </div>
          

        <div className='overflow-y-scroll h-[500px]'>
          
          {!bookingData ? <div className='text-center'>No reservations found</div> : bookingData.map((res, index) => (
            <div key={res.reservation.bookingData.referenceNumber}  className='border-2 border-black-200 p-2'>
            <h1 className='text-sm font-bold md:mx-[5%] mt-5'>Reservation ID: {res.reservation.bookingData.referenceNumber}</h1>
            <h1 className='text-sm font-bold md:mx-[5%] mt-5'>Departure Flight</h1>
            <div className='flex flex-col gap-1 text-center p-5 md:mx-[5%] rounded-lg border border-zinc-100 bg-slate-200'
              style={{ cursor: 'pointer' }}>

              <div className='flex flex-row'>
                <div className='flex flex-col'>
                  <h6 className='text-md font-bold'>Departure</h6>
                  <p className='text-xs'>{formatTime(res.departureFlight.departure.toString())}</p>
                </div>
                <div className='flex m-auto'>
                  <FontAwesomeIcon icon={faPlane} className='w-4 h-4'/>
                </div>
                <div className='flex flex-col'>
                  <h6 className='text-md font-bold'>Arrival</h6>
                  <p className='text-xs'>{formatTime(res.departureFlight.arrival.toString())}</p>
                </div>
                <div className='hidden md:flex flex-col m-auto'>
                  <p className='text-xs mb-2'>Flight Code</p>
                  <h5 className='text-md'>{res.departureFlight.code} </h5>
                </div>
                <div className='hidden md:flex flex-col m-auto'>
                  <p className='text-xs mb-2'>Date</p>
                  <h5 className='text-md'>{formatDate(res.departureFlight.date.toString())} </h5>
                </div>
                <div className='flex flex-row m-auto gap-4'>
                <button className='text-md bg-yellow-400 text-white rounded-lg p-1'
                    onClick={() => {router.push(`/track/${res.reservation.bookingData.referenceNumber}`)}}
                    >Track</button>
                    {res.reservation.paymentStatus === 'pending' || res.reservation.paymentStatus === 'failed' && (
                      <button className='text-md bg-red-400 text-white rounded-lg p-1'
                        onClick={() => cancelReservation(res.reservation._id)}
                        >Cancel</button>
                    )}
                    {res.reservation.paymentStatus === 'paid' && (
                      <button className='text-md bg-green-400 text-white rounded-lg p-1 disabled:cursor-not-allowed' disabled
                        >Verified</button>
                    )}
                </div>
              </div>
            </div>
            {res.returnFlight && (
              <div>
              <h1 className='text-sm font-bold md:mx-[5%] mt-5'>Return Flight</h1>
              <div key={res.reservation.bookingData.referenceNumber} className='flex flex-col gap-1 text-center p-5 md:mx-[5%] rounded-lg border border-zinc-100 bg-slate-200'
                style={{ cursor: 'pointer' }}>

                <div className='flex flex-row'>
                  <div className='flex flex-col'>
                    <h6 className='text-md font-bold'>Departure</h6>
                    <p className='text-xs'>{formatTime(res.returnFlight.departure.toString())} </p>
                  </div>
                  <div className='flex m-auto'>
                    <FontAwesomeIcon icon={faPlane} className='w-4 h-4'/>
                  </div>
                  <div className='flex flex-col'>
                    <h6 className='text-md font-bold'>Arrival</h6>
                    <p className='text-xs'>{formatTime(res.returnFlight.arrival.toString())}</p>
                  </div>
                  <div className='hidden md:flex flex-col m-auto'>
                    <p className='text-xs mb-2'>Flight Code</p>
                    <h5 className='text-md'>{res.returnFlight.code}</h5>
                  </div>
                  <div className='hidden md:flex flex-col m-auto'>
                  <p className='text-xs mb-2'>Date</p>
                  <h5 className='text-md'>{formatDate(res.returnFlight.date.toString())} </h5>
                </div>
                  <div className='flex flex-row m-auto gap-4'>
                    <button className='text-md bg-yellow-400 text-white rounded-lg p-1'
                    onClick={() => {router.push(`/track/${res.reservation.bookingData.referenceNumber}`)}}
                    >Track</button>
                    {res.reservation.paymentStatus === 'pending' || res.reservation.paymentStatus === 'failed' && (
                      <button className='text-md bg-red-400 text-white rounded-lg p-1'
                        onClick={() => cancelReservation(res.reservation._id)}
                        >Cancel</button>
                    )}
                    {res.reservation.paymentStatus === 'paid' && (
                      <button className='text-md bg-green-400 text-white rounded-lg p-1 disabled:cursor-not-allowed' disabled
                        >Verified</button>
                    )}
                  </div>
                </div>
              </div>
              </div>
              )}
            </div>
          ))}


        </div>
        </div>

    </>
  )
}

export default Page