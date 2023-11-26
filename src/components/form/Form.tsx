import React, { useEffect, useState } from 'react';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/solid';

interface Destination {
  _id: string;
  Name: string;
  Code: string;
  Abv: string;
  City: string;
}

const getDestinations = async() => {
  try {
    const res = await fetch('http://localhost:3000/api/destination', { cache: 'no-store' });

    if (!res.ok) {
      throw new Error('Failed to fetch destinations');
    }
    return res.json();
  } catch (error) {
    console.error('Error loading destinations', error);
  }
};

const Form = async() => {

  
  const [destinations, setDestinations] = useState<Destination[]>([]);

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





  return (
    <>
        <div  className="absolute inset-x-0 bottom-10 z-[2] mx-[15%] m-auto flex list-none justify-center p-8 rounded-lg bg-teal-700" data-te-carousel-indicators>
          <form>

          
            <div className="relative">
              <div className='flex flex-wrap items-center gap-3'>

                <select data-te-select-init data-te-select-placeholder="Select Origin" name='From' id='From' >
                  {destinations.map((d:any) => (
                  <option value={d.City}>
                    {d.City}
                  </option>
                   ))}
                </select>

                <button type="button" data-te-ripple-init data-te-ripple-color="light" className='outline outline-offset-4 outline-white rounded-full w-4 h-4 m-3'>
                  <ArrowsRightLeftIcon className="h-4 w-4 text-white hover:text-gray-400" />
                </button>

                  <select data-te-select-init data-te-select-placeholder="Select Destination" name='To' id='To'>
                    {destinations.map((d:any) => (
                    <option value={d.City}>
                      {d.City}
                    </option>
                    ))}
                  </select>
  

                         
                  <div className="relative" data-te-datepicker-init data-te-inline="true" data-te-input-wrapper-init> 
                  <input type="text" className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0" 
                  placeholder="Select a date" /> 
                  <label htmlFor="floatingInput" className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-white-200 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">
                    Select a date</label>
                  </div>

                <button className="rounded-md border-2 p-3">Search Flight</button>
              </div>
            </div>
          </form>
        </div>
    </>
  );
};

export default Form;