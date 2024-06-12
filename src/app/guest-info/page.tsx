"use client";

import React, { useEffect } from 'react'
import Nav from '@/components/nav/nav'
import { useState } from 'react'
import ProgressBar from '@/components/progressBar/progressBar'
import formatTime  from '@/helpers/formatTime'
import calculateDuration from '@/helpers/calculateDuration'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlane } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation';
import nationalities from '@/helpers/nationalities';
import axios from 'axios';

interface TokenData {
  departureFlight: {
    id: string;
    date: string;
    from: string;
    to: string;
    arrival: string;
    code: string;
    departure: string;
    fare: number;
  },
  returnFlight: {
    id: string;
    date: string;
    from: string;
    to: string;
    arrival: string;
    code: string;
    departure: string;
    fare: number;
  },
  flightType: string;
}


const Page = () => {

  const router = useRouter();
  const [processing, setProcessing] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  const [flightData , setFlightData] = useState<TokenData>({
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


      useEffect(() => {
        if (
          guestInfo.firstName?.length > 0 &&
          guestInfo.lastName?.length > 0 &&
          guestInfo.birthday?.length > 0 &&
          guestInfo.nationality?.length > 0 &&
          guestInfo.age?.length > 0 &&
          guestInfo.gender?.length > 0 &&
          guestInfo.email?.length > 0 &&
          guestInfo.phone?.length > 0 &&
          guestInfo.addressline1?.length > 0 &&
          guestInfo.city?.length > 0 &&
          guestInfo.region?.length > 0 &&
          guestInfo.zip?.length > 0
        ) {
          setButtonDisabled(false);
        } else {
          setButtonDisabled(true);
        }
      }, [guestInfo]);


    useEffect(() => {
      const getFlightData = async () => {
        try {
          const res = await axios.get('/api/flightData');
          setFlightData(res.data.tokenData);
        } catch (error) {
          console.log(error);
        }
      };
  
      const getGuestInfo = async () => {
        try {
          const res = await axios.get('/api/guestInfo');
          setGuestInfo(res.data.tokenData);
        } catch (error) {
          console.log(error);
        }
      };
  
      getFlightData();
      getGuestInfo();
  
    }, []);
  
  const handleChangeFlight = () => {
    if (flightData.flightType === 'one-way') {
      router.push('/search-flight/one-way?' + 'from=' + flightData.departureFlight.from + '&to=' + flightData.departureFlight.to + '&departureDate=' + flightData.departureFlight.date.split('T')[0]);
    }
    else {
      router.push('/search-flight/round-trip?' + 'from=' + flightData.departureFlight.from + '&to=' + flightData.departureFlight.to + '&departureDate=' + flightData.departureFlight.date.split('T')[0] + '&returnDate=' + flightData.returnFlight.date.split('T')[0]);
    }
    
  }


  const handleSubmit = async () => {

    setProcessing(true);

    const combinedObject = {
      ...flightData,
      ...guestInfo
    };
    

    try {

        const res = await axios.post('/api/guestInfo', combinedObject);
        if (res.status === 200) {
          router.push('/add-ons');
      }

    } catch (error) {
      console.log(error);
    } finally {
      setProcessing(false);
    }

  }

  return (
   <>
  <Nav />

  <div className="flex flex-col mx-[5%] md:mx-[25%] py-4 rounded-lg">

  <div className="mt-[60px] lg:mt-[80px]">
  </div>
  
  {/* Departing Flight */}

  <div className="hidden flex-col gap-4 lg:flex text-center p-5">

  <h6 className='text-start text-sm font-bold'>Departing Flight</h6>

  <div className='flex flex-row border-2 p-5'>

  <div className='flex flex-col'>
    <h6 className='text-md font-bold'>{formatTime(flightData.departureFlight.departure)}</h6>
    <p className='text-xs'>Depart - <span>{flightData.departureFlight.from}</span></p>
  </div>

  <div className='flex m-auto'>
  <FontAwesomeIcon icon={faPlane} className='w-4 h-4'/></div>

  <div className='flex flex-col'>
    <h6 className='text-md font-bold'>{formatTime(flightData.departureFlight.arrival)}</h6>
    <p className='text-xs'>Arrive - <span>{flightData.departureFlight.to}</span></p>
  </div>

  <div className='flex flex-col m-auto'>
  <p className='text-xs mb-2'>Duration</p>
  <h5 className='text-md'>{calculateDuration(flightData.departureFlight.departure, flightData.departureFlight.arrival)}</h5>
  </div>

  <div className='flex flex-col m-auto'>
  <p className='text-xs mb-2'>Fare/guest</p>
  <h5 className='text-sm font-bold'>{flightData.departureFlight.fare} PHP</h5>
  </div>

  <div className="flex flex-col m-auto">
  <button className="p-2 rounded-lg border-white border-2 bg-lime-50"
  onClick={handleChangeFlight}
  >Change Flight</button>
  </div>
  </div>
  </div>

{/* Returning Flight */}

{flightData.flightType === 'round-trip' && (



<div className="hidden flex-col gap-4 lg:flex text-center p-5">

<h6 className='text-start text-sm font-bold'>Returning Flight</h6>

<div className='flex flex-row border-2 p-5'>

<div className='flex flex-col'>
  <h6 className='text-md font-bold'>{formatTime(flightData.returnFlight.departure)}</h6>
  <p className='text-xs'>Depart - <span>{flightData.returnFlight.from}</span></p>
</div>

<div className='flex m-auto'>
<FontAwesomeIcon icon={faPlane} className='w-4 h-4'/></div>

<div className='flex flex-col'>
  <h6 className='text-md font-bold'>{formatTime(flightData.returnFlight.arrival)}</h6>
  <p className='text-xs'>Arrive - <span>{flightData.returnFlight.to}</span></p>
</div>

<div className='flex flex-col m-auto'>
<p className='text-xs mb-2'>Duration</p>
<h5 className='text-md'>{calculateDuration(flightData.returnFlight.departure, flightData.returnFlight.arrival)}</h5>
</div>

<div className='flex flex-col m-auto'>
<p className='text-xs mb-2'>Fare/guest</p>
<h5 className='text-sm font-bold'>{flightData.returnFlight.fare} PHP</h5>
</div>

<div className="flex flex-col m-auto">
<button className="p-2 rounded-lg border-white border-2 bg-lime-50"
onClick={handleChangeFlight}
>Change Flight</button>
</div>
</div>
</div>
  
)}



  </div>



  <ProgressBar />
  
  <div className="flex flex-col mx-[5%] md:mx-[25%] list-none justify-center p-10 rounded-lg bg-white mt-5">
    <p className="text-2xl font-semibold text-center">Guest Information</p>

    <hr className='my-2 border border-black-300'></hr>

    <div className="flex flex-col md:flex-row gap-4 mt-5">

      <div className="flex flex-col gap-4 md:w-[30.5%] xl:w-[33%]">
      <label className="text-lg font-semibold">First Name<span className='text-red-500'>*</span></label>
      <input
        type="text"
        className="border-2 border-gray-300 rounded-lg p-2"
        onChange={(e) => setGuestInfo({...guestInfo, firstName: e.target.value})}
        value={guestInfo?.firstName || ''}
      />
      </div>

      <div className="flex flex-col gap-4 md:w-[30.5%] xl:w-[33%]">
      <label className="text-lg font-semibold">Last Name<span className='text-red-500'>*</span></label>
      <input type="text" className="border-2 border-gray-300 rounded-lg p-2"
      onChange={(e) => setGuestInfo({...guestInfo, lastName: e.target.value})}
      value={guestInfo?.lastName || ''}
       />
      </div>

      <div className="flex flex-col gap-4 md:w-[30.5%] xl:w-[33%]">
      <label className="text-lg font-semibold">Middle Name</label>
      <input type="text" className="border-2 border-gray-300 rounded-lg p-2" 
      onChange={(e) => setGuestInfo({...guestInfo, middleName: e.target.value})}
      />
      </div>
    </div>

    <div className="flex flex-col md:flex-row gap-4 mt-5">

      <div className="flex flex-col gap-4 md:w-[30.5%] xl:w-[33%]">
        <label className="text-lg font-semibold">Birthday<span className='text-red-500'>*</span></label>
        <input type="date" className="border-2 border-gray-300 rounded-lg p-2" 
        onChange={(e) => setGuestInfo({...guestInfo, birthday: e.target.value})}
        value={guestInfo?.birthday || ''}
        />
      </div>

      <div className="flex flex-col gap-4 md:w-[30.5%] xl:w-[33%]">
        <label className="text-lg font-semibold">Age<span className='text-red-500'>*</span></label>
        <input type="number" className="border-2 border-gray-300 rounded-lg p-2" 
        onChange={(e) => setGuestInfo({...guestInfo, age: e.target.value})}
        value={guestInfo?.age || ''}
        />
      </div>

      <div className="flex flex-col gap-4 md:w-[30.5%] xl:w-[33%]">
        <label className="text-lg font-semibold">Nationality<span className='text-red-500'>*</span></label>
        <select id='national ' className="border-2 border-gray-300 rounded-lg p-2"
        onChange={(e) => setGuestInfo ({...guestInfo, nationality: e.target.value})}
        value={guestInfo?.nationality || ''}
        >
          <option value='' disabled >Select Nationality</option>
          {nationalities.map((nationality, index) => (
            <option key={index} value={nationality}>
                {nationality}
            </option>
          ))}
        </select>
      </div>


    </div>


    <div className="flex flex-col md:flex-row gap-4 mt-5">

    <div className="flex flex-col gap-4 md:w-[30.5%] xl:w-[33%]">
      <label className="text-lg font-semibold">Gender<span className='text-red-500'>*</span></label>
      <select id='gender' className="border-2 border-gray-300 rounded-lg p-2" 
      onChange={(e) => setGuestInfo({...guestInfo, gender: e.target.value})}
      value={guestInfo?.gender || ''}
      >
        <option value='' disabled >Select Gender</option>
        <option value='Male'>Male</option>
        <option value='Female'>Female</option>
      </select>
    </div>
      
    </div> 
  </div>

  <div className="flex flex-col mx-[5%] md:mx-[25%] list-none justify-center rounded-lg bg-white mt-5 p-10">
    <p className="text-2xl font-semibold text-center">Contact Information</p>

    <hr className='my-2 border border-black-300'></hr>

    <div className="flex flex-col md:flex-row gap-4 mt-5">

      <div className="flex flex-col gap-4 md:w-[30.5%] xl:w-[33%]">
      <label className="text-lg font-semibold">Email Address<span className='text-red-500'>*</span></label>
      <input type="email" className="border-2 border-gray-300 rounded-lg p-2"
      onChange={(e) => setGuestInfo({...guestInfo, email: e.target.value})}
      value={guestInfo?.email || ''}
       />
      </div>

      <div className="flex flex-col gap-4 md:w-[30.5%] xl:w-[33%]">
      <label className="text-lg font-semibold">Phone Number<span className='text-red-500'>*</span></label>
      <input type="text" className="border-2 border-gray-300 rounded-lg p-2"
      onChange={(e) => setGuestInfo({...guestInfo, phone: e.target.value})}
      value={guestInfo?.phone || ''}
      />
      </div>

      <div className="flex flex-col gap-4 md:w-[30.5%] xl:w-[33%]">
        <label className="text-lg font-semibold">Seconday Phone Number</label>
        <input type="text" className="border-2 border-gray-300 rounded-lg p-2" 
        onChange={(e) => setGuestInfo({...guestInfo, secondaryPhone: e.target.value})}
        value={guestInfo?.secondaryPhone || ''}
        />
      </div>

    </div>

    <div className="flex flex-col gap-4 mt-5">
      <label className="text-lg font-semibold">Address Line 1<span className='text-red-500'>*</span></label>
      <input type="text" className="border-2 border-gray-300 rounded-lg p-2"
      onChange={(e) => setGuestInfo({...guestInfo, addressline1: e.target.value})}
      value={guestInfo?.addressline1 || ''}
       />
    </div>

    <div className="flex flex-col gap-4 mt-5">
      <label className="text-lg font-semibold">Address Line 2</label>
      <input type="text" className="border-2 border-gray-300 rounded-lg p-2" 
      onChange={(e) => setGuestInfo({...guestInfo, addressline2: e.target.value})}
      value={guestInfo?.addressline2 || ''}
      />
    </div>

    <div className="flex flex-col md:flex-row gap-4 mt-5">

      <div className="flex flex-col gap-4 md:w-[30.5%] xl:w-[33%]">
        <label className="text-lg font-semibold">City<span className='text-red-500'>*</span></label>
        <input type="text" className="border-2 border-gray-300 rounded-lg p-2" 
        onChange={(e) => setGuestInfo({...guestInfo, city: e.target.value})}
        value={guestInfo?.city || ''}
        />
      </div>

      <div className="flex flex-col gap-4 md:w-[30.5%] xl:w-[33%]">
        <label className="text-lg font-semibold">Region<span className='text-red-500'>*</span></label>
        <input type="text" className="border-2 border-gray-300 rounded-lg p-2" 
        onChange={(e) => setGuestInfo({...guestInfo, region: e.target.value})}
        value={guestInfo?.region || ''}
        />
      </div>

      <div className="flex flex-col gap-4 md:w-[30.5%] xl:w-[33%]">
        <label className="text-lg font-semibold">Zip Code<span className='text-red-500'>*</span></label>
        <input type="text" className="border-2 border-gray-300 rounded-lg p-2" 
        onChange={(e) => setGuestInfo({...guestInfo, zip: e.target.value})}
        value={guestInfo?.zip || ''}
        />
      </div>
    </div>

  </div>


<div className='flex flex-row my-5 gap-5 md:mx-[25%] mx-[5%] justify-end'>

<button className='flex bg-red-200 rounded-lg p-2 w-20'
onClick={handleChangeFlight}
>Back</button>

<button className='flex bg-lime-200 rounded-lg p-2 w-20 disabled:opacity-50 disabled:cursor-not-allowed'
onClick={handleSubmit} 
disabled={buttonDisabled}
> { processing ? 'Processing...' : 'Continue'}
</button>
</div>


   </>
  )
}

export default Page