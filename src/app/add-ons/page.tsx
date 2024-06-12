"use client";

import Nav from '@/components/nav/nav'
import ProgressBar from '@/components/progressBar/progressBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSuitcase } from '@fortawesome/free-solid-svg-icons'
import { faChair } from '@fortawesome/free-solid-svg-icons'
import { faSuitcaseRolling, faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import formatTime  from '@/helpers/formatTime'
import formatDate from '@/helpers/formatDate';
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'
import generate10DigitNumber from '@/helpers/generate10DigitNumber'


interface Destination {
    _id: string;
    Name: string;
    Code: string;
    Abv: string;
    City: string;
  }


const Page = () => {

    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
    const router = useRouter();
    const [userID, setUserID] = useState<string | null>(null);

    const fetchUserId = async () => {
        try {
          const res = await axios.get('/api/user')
          const id = res.data.tokenData.id
          setUserID(id);
        } catch (error) {
            console.log(error)
          }
        }

    const handlePackageSelection = (packageName: string) => {
      setSelectedPackage(prevSelectedPackage =>
        prevSelectedPackage === packageName ? null : packageName
      );
    };
    
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
    }
  );

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
        const getFlightData = async () => {
            try {
                const res = await axios.get('/api/flightData');
                setFlightData(res.data.tokenData);
            } catch (error) {
                console.log(error);
            }
            }
        
        const getGuestInfo = async () => {
            try {
                const res = await axios.get('/api/guestInfo');
                setGuestInfo(res.data.tokenData);
            } catch (error) {
                console.log(error);
            }
            }

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
              
            fetchDestinations();
            getGuestInfo();
            getFlightData();
            fetchUserId();
        }
        ,[])

    const getDestinationFromName = () => {
    const filteredDestinations = destinations.filter((destination) => destination.Code === flightData.departureFlight.from);
     const destinationName = filteredDestinations.map((d) => d.Name);
    return destinationName;
    }
          
    const getDestinationToName = () => {
    const filteredDestinations = destinations.filter((destination) => destination.Code === flightData.departureFlight.to);
    const destinationName = filteredDestinations.map((d) => d.Name);
    return destinationName;
    }

    const handleContinue = async (e : any) => {
      e.preventDefault();
      setLoading(true);
      
      if (!selectedPackage) {
        alert('Please select a package');
        return;
      }


      // Save the selected package to the server
      try {
  
        if (selectedPackage) {

          let packageCost = 0;
          
          if (selectedPackage === 'premium') {
            packageCost = 1000;
          } else if (selectedPackage === 'vip') {
            packageCost = 2000;
          } else {
            packageCost = 0;
          }

          const res = await axios.post('/api/addons', {
            flightData: flightData,
            guestInfo: guestInfo,
            selectedPackage,
            packageCost,
            referenceNumber: '2024' +  '-' + generate10DigitNumber(),
            userID
          });

          console.log(res.status);

          if (res.status === 201) {
            window.alert('Your reservation has been successfully saved');
          }


        }
        router.push('/payment');


      } catch (error) {
        console.error('Error saving selected package:', error);
      } finally {
        setLoading(false);
      }

    }

    


  return (
   <>
  <Nav />

  <div className="flex flex-col">
  <div className="mt-[90px] lg:mt-[100px]">
  </div>
  </div>

  <ProgressBar />

  <div className="flex flex-col mx-[5%] md:mx-[10%] xl:mx-[25%] list-none justify-center p-3 rounded-lg bg-white mt-5">
    <p className="text-lg font-semibold">Guest Information</p>
    
    <div className="flex flex-col mt-2">
        <div className="flex flex-row">
        <p className="text-xs font-semibold">Name :</p>

        <p className="text-xs font-light ml-2">{guestInfo.firstName + ' ' + (guestInfo.middleName ? guestInfo.middleName + ' ' : '') + guestInfo.lastName}</p>
        </div>

        <div className="flex flex-row">
        <p className="text-xs font-semibold">Departure Flight:</p>
        <p className="text-xs font-light ml-2">{getDestinationFromName() +  ' '  + flightData.departureFlight.from  + ' - ' + getDestinationToName() + ' ' + flightData.departureFlight.to
           + ' ' + formatDate(flightData.departureFlight.date) + ' ' + formatTime(flightData.departureFlight.departure)} </p>
        </div>

        {flightData.flightType === "one-way" ? '' : 
        <div className="flex flex-row">
        <p className="text-xs font-semibold">Return Flight:</p>
        <p className="text-xs font-light ml-2">{getDestinationToName() + ' ' + flightData.departureFlight.to  + ' - ' + getDestinationFromName() + ' ' + flightData.departureFlight.from
           + ' ' + formatDate(flightData.returnFlight.date) +' '+ formatTime(flightData.returnFlight.departure)} </p>
        </div>
        }

        

        <Link className='mt-4 text-xs underline' href='/guest-info'>Edit information</Link>
    </div>

  </div>
  
  <div className="flex flex-col mx-[5%] md:mx-[10%] xl:mx-[25%] list-none justify-center p-3 rounded-lg bg-white mt-5">
    <p className="text-2xl font-semibold text-center">Add-ons</p>

    <div className='flex flex-col lg:flex-row gap-4 m-auto p-4'>

        <div className='flex flex-col gap-5 my-5 bg-blue-100 p-5 border border-gray-500'>

            <div className='flex flex-col'>
            <p className='text-lg font-semibold'>Basic Package</p>
            <p className='text-xs font-light'>No Additional Charges.</p>
            <hr className='mt-2 border border-black'></hr>
            </div>

            <div className='flex flex-col'> 
            <div className='flex flex-row gap-2'>
            <FontAwesomeIcon icon={faSuitcase} className='w-4 h-4 my-auto'/>
            <p className='text-sm font-bold'>1pc hand-carry bag</p>
            </div>

            <p className='text-xs font-light'>max. weight of 7kg</p>
            </div>  

            <div className='flex flex-col'>
            <div className='flex flex-row gap-2'>
            <FontAwesomeIcon icon={faChair} className='w-4 h-4 my-auto'/>
            <p className='text-sm font-bold'>Random Seat</p>
            </div>
            
            <p className='text-xs font-light'>assigned upon check-in</p>
            </div>

            <div className='flex flex-col'>
            <button
              className={`flex rounded-lg p-2 justify-center mt-[137px] w-[180px] border border-black ${
                selectedPackage === 'basic' ? 'bg-green-400' : 'bg-lime-200'
              }`}
              onClick={() => handlePackageSelection('basic')}
            >
              Fare Only
            </button>

            </div>
            
        </div>

        <div className='flex flex-col gap-5 my-5 bg-blue-100 p-5 border border-gray-500'>

            <div className='flex flex-col'>
            <p className='text-lg font-semibold'>Premium Package</p>
            <p className='text-xs font-light'>Buy for Additional 1000 PHP</p>
            <hr className='mt-2 border border-black'></hr>
            </div>

            <div className='flex flex-col'> 
            <div className='flex flex-row gap-2'>
            <FontAwesomeIcon icon={faSuitcase} className='w-4 h-4 my-auto'/>
            <p className='text-sm font-bold'>1pc hand-carry bag</p>
            </div>

            <p className='text-xs font-light'>max. weight of 7kg</p>
            </div>

            <div className='flex flex-col'> 
            <div className='flex flex-row gap-2'>
            <FontAwesomeIcon icon={faSuitcaseRolling} className='w-4 h-4 my-auto'/>
            <p className='text-sm font-bold'>1pc checked baggage</p>
            </div>

            <p className='text-xs font-light'>max. weight of 20kg</p>
            </div>

            <div className='flex flex-col'>
            <div className='flex flex-row gap-2'>
            <FontAwesomeIcon icon={faChair} className='w-4 h-4 my-auto'/>
            <p className='text-sm font-bold'>Random Seat</p>
            </div>
            
            <p className='text-xs font-light'>assigned upon check-in</p>
            </div>

            <div className='flex flex-col '>
            <button
              className={`flex rounded-lg p-2 justify-center mt-[80px] w-[180px] border border-black ${
                selectedPackage === 'premium' ? 'bg-green-400' : 'bg-lime-200'
              }` }
              onClick={() => handlePackageSelection('premium')}
            >
              Additional Baggage
            </button>
            </div>
            
        </div>

        <div className='flex flex-col gap-5 my-5 bg-blue-100 p-5 border border-gray-500'>

            <div className='flex flex-col'>
            <p className='text-lg font-semibold'>VIP Package</p>
            <p className='text-xs font-light'>Buy for Additional 2000 PHP</p>
            <hr className='mt-2 border border-black'></hr>
            </div>

            <div className='flex flex-col'> 
            <div className='flex flex-row gap-2'>
            <FontAwesomeIcon icon={faSuitcase} className='w-4 h-4 my-auto'/>
            <p className='text-sm font-bold'>1pc hand-carry bag</p>
            </div>

            <p className='text-xs font-light'>max. weight of 7kg</p>
            </div>  

            <div className='flex flex-col'> 
            <div className='flex flex-row gap-2'>
            <FontAwesomeIcon icon={faSuitcaseRolling} className='w-4 h-4 my-auto'/>
            <p className='text-sm font-bold'>1pc checked baggage</p>
            </div>

            <p className='text-xs font-light'>max. weight of 20kg</p>
            </div>

            <div className='flex flex-col'>
            <div className='flex flex-row gap-2'>
            <FontAwesomeIcon icon={faChair} className='w-4 h-4 my-auto'/>
            <p className='text-sm font-bold'>Preferred Seat</p>
            </div>
            
            <p className='text-xs font-light'>seat of your choice</p>
            </div>

            <div className='flex flex-col'>
            <button
              className={`flex rounded-lg p-2 justify-center mt-[80px] w-[180px] border border-black ${
                selectedPackage === 'vip' ? 'bg-green-400' : 'bg-lime-200'
              }`}
              onClick={() => handlePackageSelection('vip')}
            >
              Baggage and Seat
            </button>
            </div>
            
        </div>
    </div>


  </div>

<div className='flex flex-row my-5 gap-5 md:mx-[25%] mx-[5%] justify-end'>

<button className='flex bg-red-200 rounded-lg p-2 w-20'
onClick={(e) => {
  e.preventDefault();
  router.push('/guest-info');
}}>Back</button>

<button className='flex bg-lime-200 rounded-lg p-2 w-35'
onClick={handleContinue}>{loading ? 'Processing...' : 'Reserve Ticket' }</button>

</div>


   </>
  )
}

export default Page