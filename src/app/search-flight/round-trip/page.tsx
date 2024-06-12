'use client';

import React, { useCallback, useMemo } from 'react'
import Nav from '@/components/nav/nav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlane } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import ProgressBar from '@/components/progressBar/progressBar'
import formatTime from '@/helpers/formatTime'
import calculateDuration from '@/helpers/calculateDuration'
import formatDate from '@/helpers/formatDate'
import axios from 'axios'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { set } from 'mongoose';

interface Flight {
  _id: string;
  from: string;
  to: string;
  date: Date;
  arrival: string;
  departure: string;
  code: string;
}

interface Destination {
  _id: string;
  Name: string;
  Code: string;
  Abv: string;
  City: string;
}

const Page = () => {

  const searchParams = useSearchParams();
  
  const [departureData, setDepartureData] = useState<Flight[]>([]);
  const [returnData, setReturnData] = useState<Flight[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);

  const [selectedDepartureDate, setSelectedDepartureDate] = useState<string | null>(searchParams.get('departureDate') || null);
  const [selectedDeparture, setSelectedDeparture] = useState<Flight | null>(null);

  const [selectedReturnDate, setSelectedReturnDate] = useState<string | null>(searchParams.get('returnDate') || null);
  const [selectedReturn, setSelectedReturn] = useState<Flight | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const flight = useMemo(() => ({
    from: searchParams.get('from'),
    to: searchParams.get('to'),
    departureDate: selectedDepartureDate || searchParams.get('departureDate'),
    returnDate: selectedReturnDate || searchParams.get('returnDate'),
}), [searchParams, selectedDepartureDate, selectedReturnDate]);


  const fetchFlights = async (updatedDepartureDate: string, updatedReturnDate: string) => {
    setIsLoading(true);

    try {
      const updatedFlight = {
        ...flight,
        departureDate: updatedDepartureDate,
        returnDate: updatedReturnDate,
      };

      const res = await axios.post('/api/flight', updatedFlight);
      const data = res.data;

      if (Array.isArray(data.departureFlights)) {
        setDepartureData(data.departureFlights);
        setReturnData(data.returnFlights);

      } else {
        console.error('Data received from the API is not an array:', data);
      }
    } catch (error) {
      console.error('Error loading flights', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getflight = useCallback(async () => {
    try {
      const res = await axios.post('/api/flight', flight);
      return res.data;
    } catch (error) {
      console.error('Error loading flights', error);
    }
  }
  , [flight]);

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

  useEffect(() => {
    const fetchFlights = async () => {
      setIsLoading(true);

      try {
        const data = await getflight();
  
        if (Array.isArray(data.departureFlights)) {
          setDepartureData(data.departureFlights);
          setReturnData(data.returnFlights);
        } else {
          console.error('Data received from the API is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching destinations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchDestinations = async () => {
      try {
        const data = await getDestinations();

        if (Array.isArray(data.destinations)) {
          setDestinations(data.destinations);
        } else {
          console.error('Data received from the API is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    };

    const getTokenFlightData = async () => {
      try {
        const res = await axios.get('/api/flightData');
        setSelectedDeparture(res.data.tokenData.departureFlight);
        setSelectedReturn(res.data.tokenData.returnFlight);
      } catch (error) {
        console.log(error);
      }
    };

    getTokenFlightData();

    fetchFlights();
    fetchDestinations();
  }, [getflight]);


  const getDestinationFromName = () => {
    const filteredDestinations = destinations.filter((destination) => destination.Abv === flight.from);
    const destinationName = filteredDestinations.map((d) => d.City);
    return destinationName;
    }
  
    const getDestinationToName = () => {
    const filteredDestinations = destinations.filter((destination) => destination.Abv === flight.to);
    const destinationName = filteredDestinations.map((d) => d.City);
    return destinationName;
    }

    const generateDates = (startDate: Date, count: number) => {
      const dates = [];
      for (let i = 0; i < count; i++) {
        const currentDate = flight.departureDate ? new Date(flight.departureDate) : new Date();
        currentDate.setDate(startDate.getDate() + i);
        dates.push(currentDate);
      }
      return dates;
    };
  
    const departuredates = generateDates(selectedDepartureDate ? new Date(selectedDepartureDate) : new Date(), 3);
    const returndates = generateDates(selectedReturnDate ? new Date(selectedReturnDate) : new Date(), 3);
  
    const handleDepartureDateChange = async (increment: number) => {
      const newDate = new Date(selectedDepartureDate || new Date());
      newDate.setDate(newDate.getDate() + increment);
      setSelectedDepartureDate(newDate.toISOString());
      setSelectedDeparture(null);
  
      await fetchFlights(newDate.toISOString(), new Date(selectedReturnDate || new Date()).toISOString());
    };
  
    const handleDepartureDateClick = async (clickedDate: Date) => {
      setSelectedDepartureDate(clickedDate.toISOString());
      setSelectedDeparture(null);
  
      await fetchFlights(clickedDate.toISOString(), new Date(selectedReturnDate || new Date()).toISOString());
    };

    const handleDepartureSelect = (flight: Flight) => {
      setSelectedDeparture((prevSelectedDeparture) =>
      prevSelectedDeparture?._id === flight._id ? null : flight
    );
  };

  const handleReturnDateChange = async (increment: number) => {
    const newDate = new Date(selectedReturnDate || new Date());
    newDate.setDate(newDate.getDate() + increment);
    setSelectedReturnDate(newDate.toISOString());
    setSelectedReturn(null)

    await fetchFlights(new Date(selectedDepartureDate || new Date()).toISOString(), newDate.toISOString());
  };

  const handleReturnDateClick = async (clickedDate: Date) => {
    setSelectedReturnDate(clickedDate.toISOString());
    setSelectedReturn(null);
    await fetchFlights(new Date(selectedDepartureDate || new Date()).toISOString(), clickedDate.toISOString());
  };

    const handleReturnSelect = (flight: Flight) => {
      setSelectedReturn((prevSelectedReturn) =>
      prevSelectedReturn?._id === flight._id ? null : flight
    );
  };

  const handleContinue = async() => {
    try {
    const newFlightData = {
        departureFlight: selectedDeparture,
        returnFlight: selectedReturn,
        flightType: 'round-trip',
      };

      const res = await axios.post('/api/flightData', newFlightData);
      if (res.status === 200){
        router.push('/guest-info');
      }
    
    } catch (error) {
      
    }
  };
    



  return (
    <>
        <Nav />

        <div className="flex flex-col mx-[15%] list-none justify-center py-4 rounded-lg">

            <div className="mt-[60px] lg:mt-[80px]">
            </div>

            <div className="hidden flex-row gap-[100px] py-2 justify-center lg:flex">
              
              <div className="w-auto p-2 text-left text-xs">
                <p className="mb-2">Departing Flight</p>
                <h6 className="text-sm">
                  <span className="font-semibold"> {getDestinationFromName()} </span>-<span className=""> {flight.from} </span>
                  TO
                  <span className="font-semibold"> {getDestinationToName()} </span>-<span className=""> {flight.to} </span>
                </h6>
                <p className="">{formatDate(flight.departureDate)}</p>
              </div>

              <div className="w-auto p-2 text-left text-xs">
                <p className="mb-2">Returning Flight</p>
                <h6 className="text-sm">
                  <span className="font-semibold"> {getDestinationToName()} </span>-<span className=""> {flight.to} </span>
                  TO
                  <span className="font-semibold"> {getDestinationFromName()} </span>-<span className=""> {flight.from} </span>
                </h6>
                <p className="">{formatDate(flight.returnDate)}</p>
              </div>

              <div className="w-auto p-2 text-left text-xs">
                <p className="mb-2">Passengers</p>
                <h6 className="text-sm">1 Adult</h6>
              </div>

            </div>

        
        </div>

        {/* Booking Progress */}

        <ProgressBar />

        {/* DEPARTING */}

        <div className='flex flex-col mt-5'>

          <h2 className='text-lg text-gray-700 my-auto md:mx-[25%]'>Select your Return Flight</h2>

          <div className='flex flex-row justify-center bg-white md:mx-[25%] rounded-xl mt-5'>
          <button className='flex my-auto' onClick={() => handleDepartureDateChange(-1)}>
            <FontAwesomeIcon icon={faChevronLeft} className='w-4 h-4' />
          </button>

          {departuredates.map((date, index) => (
            <div
              key={index}
              className={`flex flex-col p-5 my-auto border ${selectedDepartureDate && new Date(selectedDepartureDate).getTime() === date.getTime() ? 'bg-yellow-100 cursor-pointer border-green-400' : 'border-green-200 cursor-pointer'} text-center md:w-[25%]`}
              onClick={() => handleDepartureDateClick(date)}
            >
              <h6 className='text-xs'>{date.toLocaleDateString('en-US', { weekday: 'long' })}</h6>
              <h6 className='text-xs'>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</h6>
              {/* Add your custom logic for the monetary value */}
            </div>
          ))}

          <button className='flex my-auto' onClick={() => handleDepartureDateChange(1)}>
            <FontAwesomeIcon icon={faChevronRight} className='w-4 h-4' />
          </button>
        </div>

          {/* FLIGHT CARDS */}

          <div className='flex flex-col mt-5'>

          {isLoading && <div className='flex p-5 m-auto text-lg'>SEARCHING AVAILABLE FLIGHTS...</div>}

          {!isLoading && departureData.length === 0 && (
            <div className='flex p-5 m-auto text-lg'>NO FLIGHTS AVAILABLE</div>
          )}

            {departureData.filter((d: any) => selectedReturn?._id !== d._id).map((d:any) => (
            

              <div key={d._id} className={`flex flex-col mt-5 gap-1 text-center ${selectedDeparture?._id === d._id ? 'bg-green-100' : 'bg-white'} p-5 md:mx-[25%] rounded-lg border border-zinc-100`}
              onClick={() => handleDepartureSelect(d)}
              style={{ cursor: 'pointer' }}>
                          
              <div className='flex flex-row'>

                <div className='flex flex-col'>
                  <h6 className='text-md font-bold'>{formatTime(d.departure)}</h6>
                  <p className='text-xs'>Depart - <span>{d.from}</span></p>
                </div>

              <div className='flex m-auto'>
              <FontAwesomeIcon icon={faPlane} className='w-4 h-4'/></div>

                <div className='flex flex-col'>
                  <h6 className='text-md font-bold'>{formatTime(d.arrival)}</h6>
                  <p className='text-xs'>Arrive - <span>{d.to}</span></p>
                </div>

              <div className='flex flex-col m-auto'>
              <p className='text-xs mb-2'>Duration</p>
              <h5 className='text-md'>{calculateDuration(d.departure, d.arrival)}</h5>
              </div>

              <div className='hidden md:flex flex-col m-auto'>
              <p className='text-xs mb-2'>Flight Code</p>
              <h5 className='text-md'>{d.code}</h5>
              </div>

              <div className='flex flex-col m-auto'>
              <p className='text-xs mb-2'>Fare/guest</p>
              <h5 className='text-sm font-bold'>{d.fare} PHP</h5>
              </div>

              </div>
              </div>
             
          ))}


        </div>

        </div>

        {/* RETURNING */}

        <div className='flex flex-col mt-5'>

          <h2 className='text-lg text-gray-700 my-auto md:mx-[25%]'>Select your Return Flight</h2>

            
          <div className='flex flex-row justify-center bg-white md:mx-[25%] rounded-xl mt-5'>
          <button className='flex my-auto' onClick={() => handleReturnDateChange(-1)}>
            <FontAwesomeIcon icon={faChevronLeft} className='w-4 h-4' />
          </button>

          {returndates.map((date, index) => (
            <div
              key={index}
              className={`flex flex-col p-5 my-auto border ${selectedReturnDate && new Date(selectedReturnDate).getTime() === date.getTime() ? 'bg-yellow-100 cursor-pointer border-green-400' : 'border-green-200 cursor-pointer'} text-center md:w-[25%]`}
              onClick={() => handleReturnDateClick(date)}
            >
              <h6 className='text-xs'>{date.toLocaleDateString('en-US', { weekday: 'long' })}</h6>
              <h6 className='text-xs'>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</h6>
              {/* Add your custom logic for the monetary value */}
            </div>
          ))}

          <button className='flex my-auto' onClick={() => handleReturnDateChange(1)}>
            <FontAwesomeIcon icon={faChevronRight} className='w-4 h-4' />
          </button>
        </div>

          {/* FLIGHT CARDS */}

          <div className='flex flex-col mt-5'>

          {isLoading && <div className='flex p-5 m-auto text-lg'>SEARCHING AVAILABLE FLIGHTS...</div>}

          {!isLoading && departureData.length === 0 && (
            <div className='flex p-5 m-auto text-lg'>NO FLIGHTS AVAILABLE</div>
          )}
          

          {returnData.map((d:any) => (
            
            <div key={d._id} className={`flex flex-col mt-5 gap-1 text-center ${selectedReturn?._id === d._id ? 'bg-green-100' : 'bg-white'} p-5 md:mx-[25%] rounded-lg border border-zinc-100`}
              onClick={() => handleReturnSelect(d)}
              style={{ cursor: 'pointer'}}>
                          
              <div className='flex flex-row'>

                <div className='flex flex-col'>
                  <h6 className='text-md font-bold'>{formatTime(d.departure)}</h6>
                  <p className='text-xs'>Depart - <span>{d.from}</span></p>
                </div>

              <div className='flex m-auto'>
              <FontAwesomeIcon icon={faPlane} className='w-4 h-4'/></div>

                <div className='flex flex-col'>
                  <h6 className='text-md font-bold'>{formatTime(d.arrival)}</h6>
                  <p className='text-xs'>Arrive - <span>{d.to}</span></p>
                </div>

              <div className='flex flex-col m-auto'>
              <p className='text-xs mb-2'>Duration</p>
              <h5 className='text-md'>{calculateDuration(d.departure, d.arrival)}</h5>
              </div>

              <div className='hidden md:flex flex-col m-auto'>
              <p className='text-xs mb-2'>Flight Code</p>
              <h5 className='text-md'>{d.code}</h5>
              </div>

              <div className='flex flex-col m-auto'>
              <p className='text-xs mb-2'>Fare/guest</p>
              <h5 className='text-sm font-bold'>{d.fare} PHP</h5>
              </div>

              </div>
              </div>
            
          ))}


          </div>
      
        </div>

        <div className='md:mx-[25%] border-t border-zinc-100 mt-5'>
        </div>

        {/* Continue Buttons */}

        <div className='flex flex-row my-5 gap-5 xs:mr-2 md:mx-[25%] justify-end'>

          <button className='flex bg-red-200 rounded-lg p-2 w-20'
          onClick={() => {window.location.href = '/'}}>Back</button>

          <button className='flex bg-lime-200 rounded-lg p-2 w-20'
          onClick={handleContinue}
          >Continue</button>

        </div>

    </>
  )
}

export default Page