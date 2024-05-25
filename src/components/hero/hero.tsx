"use client";
import Image from "next/image";
import img1 from '@/images/img2.jpg'
import img2 from '@/images/carousel-img-1.jpg'
import img3 from '@/images/img3.jpg'
import React, { useEffect, useState } from 'react';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useRouter } from 'next/navigation'

interface Destination {
  _id: string;
  Name: string;
  Code: string;
  Abv: string;
  City: string;
}


import {
    Carousel,
    initTE,
    Select,
    Datepicker,
    Input,
    Modal,
    Ripple,
  } from "tw-elements";
import { get } from "http";
  

const Hero = () => {

  const router = useRouter();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [toDestination, setToDestination] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(false);

  const [flight, setFlight] = React.useState({
    type: "one-way",
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
  });

  const switchValues = () => {
    const from = flight.from;
    const to = flight.to;
    setFlight({...flight, from: to, to: from});
    getToDestination(to);
  };

 
    useEffect(() => {
        const init = async () => {
          const { Select, Carousel, Datepicker,
            Input, Modal, Ripple,  initTE } = await import("tw-elements");
          initTE({ Select, Carousel, Datepicker, Input, Modal, Ripple });
        };

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

        init();
        fetchDestinations();
      }, []);


    

      
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

      const getToDestination = (from: string) => {
        const toDestination = destinations.filter((d: any) => d.Abv !== from);
        setToDestination(toDestination);
        return true;
      }
    
      const onSearch = async (e: any) => {
        setLoading(true);
        e.preventDefault();
        
        try {
    
          if (flight.from === '' || flight.to === '' || flight.departureDate === '') {
            throw new Error('Please fill in all required fields');
          }
    
          if (flight.type === 'round-trip') {
            
            const url = '/search-flight/round-trip' + `?from=${flight.from}&to=${flight.to}&departureDate=${flight.departureDate}&returnDate=${flight.returnDate}`;
            router.push(url);
          }
    
          if (flight.type === 'one-way') {
            const url = '/search-flight/one-way' + `?from=${flight.from}&to=${flight.to}&departureDate=${flight.departureDate}`;
            router.push(url);
          }
          
        } catch (err: any) {
          console.log(err.message);
        }
        finally {
          setLoading(false);
        }
      };

    return (
        <>
        
        <div id="carouselExampleCrossfade" className="relative" data-te-carousel-init data-te-ride="carousel" >

        <div className="absolute inset-x-0 bottom-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0" data-te-carousel-indicators>
            <button type="button" data-te-target="#carouselExampleCrossfade" data-te-slide-to="0" data-te-carousel-active
            className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
            aria-current="true" aria-label="Slide 1"></button>

            <button type="button" data-te-target="#carouselExampleCrossfade" data-te-slide-to="1"
            className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
            aria-label="Slide 2"></button>

            <button type="button" data-te-target="#carouselExampleCrossfade" data-te-slide-to="2"
            className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
            aria-label="Slide 3"></button>
        </div>

        <div  className="absolute inset-x-0 bottom-10 z-[2] mx-[15%] m-auto flex list-none justify-center p-8 rounded-lg bg-teal-700" data-te-carousel-indicators>
          <form>

          
            <div className="relative">

              <div className="flex text-center text-black justify-start">
                <select name='type' id='type'  defaultValue='one-way'
                onChange={(e) => setFlight({...flight, type: e.target.value, returnDate: ''})}
                >
                  <option value='' disabled>Select Trip Type</option>
                  <option value='one-way' >
                    One Way
                  </option>
                  <option value='round-trip'>
                    Round Trip
                  </option>
                </select>
              </div>


                  <div className='flex flex-wrap items-center gap-3'>

                  <div className="relative flex flex-col"  >
                  <label htmlFor="from" className="text-white ">Origin</label>
                  <select className='border rounded-md w-[200px] p-2' name='from' id='from' 
                  onChange={(e) => {
                    setFlight({...flight, from: e.target.value});
                    getToDestination(e.target.value);
                  }} value={flight.from}
                  >
                    <option value='' disabled>Select Origin</option>
                    {destinations.map((d:any) => (
                    <option value={d.Abv}>
                      {d.City}
                    </option>
                    ))}
                  </select>
                  </div>

                  <button type="button" data-te-ripple-init data-te-ripple-color="light" className='outline outline-offset-4 outline-white rounded-full w-4 h-4 m-3'
                  onClick={switchValues}>
                    <ArrowsRightLeftIcon className="h-4 w-4 text-white hover:text-gray-400" />
                  </button>
                    
                    <div className='flex flex-col'  >
                    <label htmlFor="to" className="text-white ">Destination</label>
                    <select className='border rounded-md w-[200px] p-2 ' name='to' id='to'
                    onChange={(e) => setFlight({...flight, to: e.target.value})} value={flight.to}
                    >
                      <option value='' disabled>Select Destination</option>
                      {toDestination.map((d:any) => (
                      <option value={d.Abv}>
                        {d.City}
                      </option>
                      ))}
                    </select>
                    </div>


                          
                    <div className="relative flex flex-col"  > 
                    <label htmlFor="departureDate" className="text-white ">Departure Date</label>
                    <input type="date" className="border rounded-md w-[200px] p-2"
                    onChange={(e) => setFlight({...flight, departureDate: e.target.value})}
                    /> 
                    </div>

                    <div className={flight.type === 'round-trip' ? 'flex flex-col' : 'hidden'}  > 
                    <label htmlFor="returnDate" className="text-white ">Return Date</label>
                    <input type="date" className="border rounded-md w-[200px] p-2"
                    onChange={(e) => setFlight({...flight, returnDate: e.target.value})}
                    /> 
                    </div>


                  <button 
                    onClick={onSearch}
                    className="rounded-md border-2 p-3 text-white"
                  >
                    {loading ? (
                      <div>Loading...</div>
                    ) : (
                      <span>Search Flight</span>
                    )}
                  </button>

                  </div>

            </div>
          </form>
        </div>
            
        <div className="relative w-full overflow-hidden after:clear-both after:block after:content-[''] h-[50rem]">

            <div className="relative float-left -mr-[100%] w-full !transform-none opacity-0 transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none"
            data-te-carousel-fade data-te-carousel-item data-te-carousel-active>
            <Image src={img1} className="block w-full h-screen"  alt="Wild Landscape" />
            </div>

            <div className="relative float-left -mr-[100%] hidden w-full !transform-none opacity-0 transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none"
            data-te-carousel-fade data-te-carousel-item>
            <Image src={img2} className="block w-full h-screen"  alt="Wild Landscape" />
            </div>

            <div className="relative float-left -mr-[100%] hidden w-full !transform-none opacity-0 transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none"
            data-te-carousel-fade data-te-carousel-item>
            <Image src={img3} className="block w-full h-screen"  alt="Wild Landscape" />
            </div>

        </div>

        </div>


        </>
    )

}

export default Hero
