"use client";

import React from 'react'
import Nav from '@/components/nav/nav'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Destination {
  _id: string;
  Name: string;
  Code: string;
  Abv: string;
  City: string;
}



const getDestinations = async() => {
  try {
    const res = await fetch('/api/destination', { cache: 'no-store' });

    if (!res.ok) {
      throw new Error('Failed to fetch destinations');
    }
    return res.json();
  } catch (error) {
    console.error('Error loading destinations', error);
  }
};



const page = () => {

  const router = useRouter();
  
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [toDestination, setToDestination] = useState<Destination[]>([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await getDestinations();
  
        console.log('Received data from the API:', data);
  
        if (Array.isArray(data.destinations)) {
          setDestinations(data.destinations);
        } else {
          console.error('Data received from the API is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    };
  
    fetchDestinations();
  }, []);

  const getToDestination = (from: string) => {
    const toDestination = destinations.filter((d: any) => d.Abv !== from);
    setToDestination(toDestination);
  }


  const [flight, setFlight] = React.useState({
    tripType: 'oneWay',
    from: '',
    to: '',
    departureDate: '',
    returnDate: '', 
  })

  const onSearch = async (e: any) => {
    e.preventDefault();
  
    try {


      if (flight.from === '' || flight.to === '' || flight.departureDate === '') {
        throw new Error('Please fill in all required fields');
      }

      if (flight.tripType === 'roundTrip') {
        
        const url = '/search-flight/round-trip' + `?from=${flight.from}&to=${flight.to}&departureDate=${flight.departureDate}&returnDate=${flight.returnDate}`;
        router.push(url);
      }

      if (flight.tripType === 'oneWay') {
        const url = '/search-flight/one-way' + `?from=${flight.from}&to=${flight.to}&departureDate=${flight.departureDate}`;
        router.push(url);
      }
      
    } catch (err: any) {
      console.log(err.message);
    }
  };

  



  return (
    <>
        <Nav />

        <div className="flex flex-col md:mx-[25%] list-none py-4 rounded-lg">

          <div className="mt-[80px] lg:mt-[180px]">
          </div>

          <div className="flex flex-col p-5 bg-lime-200 rounded-lg">
          <h1 className='font-bold text-2xl text-black'>WHERE WOULD YOU LIKE TO GO?</h1>
          
          <div className='flex items-center mt-5'>
    
          <select id='tripType' name='tripType' className='bg-transparent border-transparent text-md text-black'
          onChange={(e) => setFlight({...flight, tripType: e.target.value, returnDate: ''})}>
            <option value='oneWay'>One Way</option>
            <option value='roundTrip'>Round Trip</option>
          </select>
          </div>

          <div className='flex flex-row mt-5 gap-10 '>

            <div className='flex flex-col w-[35%] mx-2'>
              <label htmlFor='from' className='text-black'>From</label>
              <select
                id='from'
                name='from'
                className='text-black w-[100%] h-10 text-center rounded-md'
                placeholder='Select Origin'
                onChange={(e) => {
                  setFlight({...flight, from: e.target.value});
                  getToDestination(e.target.value);
                }}
              >
                <option value=''>Select Origin</option>
                {destinations.map((d:any) => (
                  <option value={d.Abv}>
                    {d.City}
                  </option>
                ))}
              </select>
            </div>

            <div className='flex flex-col w-[35%] mx-2'>
              <label htmlFor='to' className='text-black'>To</label>
              <select id='to' name='to' className='text-black w-[100%] h-10 text-center rounded-md'
              onChange={(e) => setFlight({...flight, to: e.target.value})}
              >
              <option value=''>Select Destination</option>
              {toDestination.map((d:any) => (
                  <option value={d.Abv}>
                    {d.City}
                  </option>
                   ))}
              </select>
            </div>

          </div>
          
          <div className='flex flex-row mt-5 gap-10 '>

          <div className='flex flex-col w-[35%] mt-5 mx-2'>
              <label htmlFor='departureDate' className='text-black'>Departure</label>
              <input type='date' id='departureDate' name='departureDate' className='text-black w-[100%] h-10 text-center rounded-md'
              value={flight.departureDate}
              onChange={(e) => setFlight({...flight, departureDate: e.target.value})}
              />

          </div>
  
            <div className={flight.tripType === 'roundTrip' ? 'flex flex-col w-[35%] mt-5 mx-2' : 'hidden'}>
              <label htmlFor='flightReturn' className='text-black'>Return</label>
              <input type='date' id='flightReturn' name='flightReturn' placeholder='Select a Return Date' className='text-black w-[100%] h-10 text-center rounded-md'
              value={flight.returnDate}
              onChange={(e) => setFlight({...flight, returnDate: e.target.value})}
              />
            </div>
          

          </div>
          

          <div className='flex justify-start mx-2 mt-5'>
          <button className='bg-[#92ad18] rounded-md p-3 border border-[#e5fd5b]'
          onClick={onSearch}
          >Search Flight</button>
          </div>
          
          </div>
          
        </div>
    </>
  )
}

export default page