import React, { useEffect } from 'react';
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

const Form = async() => {
  
  const router = useRouter();
  const [destinations, setDestinations] = React.useState<Destination[]>([]);

  const [flight, setFlight] = React.useState({
    type: "one-way",
    from: "",
    to: "",
    date: "",
  });

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

  const onSearch = async (e: any) => {
    e.preventDefault();
  
    try {

      console.log(flight);

      if (flight.from === '' || flight.to === '' || flight.date === '') {
        throw new Error('Please fill in all required fields');
      }

      if (flight.type === 'round-trip') {
        
        const url = '/search-flight/round-trip' + `?from=${flight.from}&to=${flight.to}&departureDate=${flight.date}`;
        router.push(url);
      }

      if (flight.type === 'one-way') {
        const url = '/search-flight/one-way' + `?from=${flight.from}&to=${flight.to}&departureDate=${flight.date}`;
        router.push(url);
      }
      
    } catch (err: any) {
      console.log(err.message);
    }
  };


  return (
    <>
        <div  className="absolute inset-x-0 bottom-10 z-[2] mx-[15%] m-auto flex list-none justify-center p-8 rounded-lg bg-teal-700" data-te-carousel-indicators>
          <form>

          
            <div className="relative">

              <div className="flex text-center text-black justify-start">
                <select name='type' id='type'  defaultValue='one-way'
                onChange={(e) => setFlight({...flight, type: e.target.value})}
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

                  <select className='w-[200px] p-2 border rounded-md ' name='from' id='from' 
                  onChange={(e) => setFlight({...flight, from: e.target.value})}
                  >
                    <option value='' disabled>Select Destination</option>
                    {destinations.map((d:any) => (
                    <option value={d.City}>
                      {d.City}
                    </option>
                    ))}
                  </select>

                  <button type="button" data-te-ripple-init data-te-ripple-color="light" className='outline outline-offset-4 outline-white rounded-full w-4 h-4 m-3'>
                    <ArrowsRightLeftIcon className="h-4 w-4 text-white hover:text-gray-400" />
                  </button>

                    <select data-te-select-init data-te-select-placeholder="Select Destination" name='to' id='to'
                    onChange={(e) => setFlight({...flight, to: e.target.value})}
                    >
                      {destinations.map((d:any) => (
                      <option value={d.City}>
                        {d.City}
                      </option>
                      ))}
                    </select>


                          
                    <div className="relative" data-te-datepicker-init data-te-inline="true" data-te-input-wrapper-init> 
                    <label htmlFor="date" className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-white-200 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">
                      Select a date</label>

                    <input type="text" className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0" id="date" name="date"
                    data-te-datepicker-input-init
                    onChange={(e) => setFlight({...flight, date: e.target.value})}
                    /> 
                    </div>


                  <button 
                  onClick={onSearch}
                  className="rounded-md border-2 p-3 text-white">Search Flight</button>
                  </div>

            </div>
          </form>
        </div>
    </>
  );
};

export default Form;