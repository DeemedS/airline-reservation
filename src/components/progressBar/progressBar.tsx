import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlane } from '@fortawesome/free-solid-svg-icons'
import { faIdCard } from '@fortawesome/free-solid-svg-icons' 
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { set } from 'mongoose'

const ProgressBar = () => {

  const router = useRouter()
  const pathname = usePathname()

  const [flightDisabled, setFlightDisabled] = useState(true)
  const [guestDisabled, setGuestDisabled] = useState(true)
  const [addOnsDisabled, setAddOnsDisabled] = useState(true)
  const [paymentDisabled, setPaymentDisabled] = useState(true)
  const [confirmationDisabled, setConfirmationDisabled] = useState(true)

  const [flightData, setFlightData] = useState({
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
  })


useEffect(() => {
    const getFlightData = async () => {
      try {
        const res = await axios.get('/api/flightData');
        if (Object.keys(res.data.tokenData).length !== 0) {
          setFlightData(res.data.tokenData);
          setFlightDisabled(false);
        }
        else {
          setFlightDisabled(true);
        }
      } catch (error) {
        console.log(error);
      }
    };


    const getGuestInfo = async () => {
      try {
        const res = await axios.get('/api/guestInfo');
        if (Object.keys(res.data.tokenData).length !== 0) {
          setGuestDisabled(false);
        } else {
          setGuestDisabled(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getAddOns = async () => {
      try {
        const res = await axios.get('/api/guestInfo');
        if (Object.keys(res.data.tokenData).length !== 0) {
          console.log(res.data.tokenData);
          setAddOnsDisabled(false);
        } else {
          setAddOnsDisabled(true);
        }
  
      } catch (error) {
        console.log(error);
      }
    }

    const getPayment = async () => {
      try {
        const res = await axios.get('/api/addons');
        if (Object.keys(res.data.tokenData).length !== 0) {
          setPaymentDisabled(false);
        } else {
          setPaymentDisabled(true);
        }
      } catch (error) {
        console.log(error);
      }
    }

    const getConfirmation = async () => {
      try {
        const res = await axios.get('/api/payment');
      } catch (error) {
        console.log(error);
      }
    }

    getFlightData();
    getGuestInfo();
    getAddOns();
    getPayment();
    getConfirmation();
    
  }, [])


  return (
    <div className='flex flex-col w-screen h-[100px] bg-lime-200 '>

    <div className='flex lg:hidden justify-center mt-2'>
    <h2 className='text-lg font-bold text-gray-700 my-auto'>Booking Progress</h2>
    </div>

    <div className='flex flex-row justify-center my-auto'>

    {pathname === '/search-flight/one-way' || pathname === '/search-flight/round-trip' ? (
      <div className='flex flex-col p-2 my-auto'>
          <button className='disabled:cursor-not-allowed' onClick={() => {
            
            if (flightData.flightType === 'one-way') {
              router.push('/search-flight/one-way?' + 'from=' + flightData.departureFlight.from + '&to=' + flightData.departureFlight.to + '&departureDate=' + flightData.departureFlight.date.split('T')[0]);
            }
            else {
              router.push('/search-flight/round-trip?' + 'from=' + flightData.departureFlight.from + '&to=' + flightData.departureFlight.to + '&departureDate=' + flightData.departureFlight.date.split('T')[0] + '&returnDate=' + flightData.returnFlight.date.split('T')[0]);
            }

          }}
          disabled={flightDisabled}>
          <div className='mx-auto bg-blue-300 rounded-full border border-black p-2 w-[35px] h-[35px]' >
            <FontAwesomeIcon icon={faPlane} className='w-4 h-4 mb-1'/>
          </div>
        </button>
        <h6 className='hidden lg:block'>Flights</h6>
      </div>
    ) : (

    <div className='flex flex-col p-2 my-auto'>
      <button  className='disabled:cursor-not-allowed'
      onClick={() => {

          if (flightData.flightType === 'one-way') {
            router.push('/search-flight/one-way?' + 'from=' + flightData.departureFlight.from + '&to=' + flightData.departureFlight.to + '&departureDate=' + flightData.departureFlight.date.split('T')[0]);
          }
          else {
            router.push('/search-flight/round-trip?' + 'from=' + flightData.departureFlight.from + '&to=' + flightData.departureFlight.to + '&departureDate=' + flightData.departureFlight.date.split('T')[0] + '&returnDate=' + flightData.returnFlight.date.split('T')[0]);
          } 
      }}
      disabled={flightDisabled}>
      <div className='mx-auto bg-slate-100 rounded-full border border-black p-2 w-[35px] h-[35px] '>
      <FontAwesomeIcon icon={faPlane} className='w-4 h-4 mb-1'/>
      </div>
      </button>
      <h6 className='hidden lg:block'>Flights</h6>
    </div>
      )}


    <div className='w-8 h-0 border my-auto lg:my-7 border-black border-dashed'></div>

    {pathname === '/guest-info' ? (
      <div className='flex flex-col p-2 my-auto'>
      <button className='disabled:cursor-not-allowed'
      onClick={() => {
        router.push('/guest-info');
      }}
      disabled={guestDisabled} >
      <div className='mx-auto bg-blue-300 rounded-full border border-black p-2 w-[35px] h-[35px]'>
        <FontAwesomeIcon icon={faIdCard} className='w-4 h-4 mb-1'/></div>
      </button>
      <h6 className='hidden lg:block'>Guest Details</h6>
      </div>
    ) : (
      <div className='flex flex-col p-2 my-auto'>
      <button className='disabled:cursor-not-allowed'
      onClick={() => {
        router.push('/guest-info');
      }}
      disabled={guestDisabled}>
      <div className='mx-auto rounded-full border border-black p-2 w-[35px] h-[35px] bg-slate-100'>
        <FontAwesomeIcon icon={faIdCard} className='w-4 h-4 mb-1'/></div>
      </button>
      <h6 className='hidden lg:block'>Guest Details</h6>
      </div>
    )}
  


    <div className='w-8 h-0 border my-auto lg:my-7 border-black border-dashed'></div>

    {pathname === '/add-ons' ? (
      <div className='flex flex-col p-2 my-auto'>
      <button className='disabled:cursor-not-allowed'
      onClick={() => {
        router.push('/add-ons');
      }}
      disabled={addOnsDisabled}>
      <div className='mx-auto bg-blue-300 rounded-full border border-black p-2  w-[35px] h-[35px]'>
        <FontAwesomeIcon icon={faCartPlus} className='w-4 h-4 mb-1'/>
      </div>
      </button>
      <h6 className='hidden lg:block'>Add-ons</h6>
      </div>

    ) : (
      <div className='flex flex-col p-2 my-auto'>
      <button className='disabled:cursor-not-allowed'
      onClick={() => {
        router.push('/add-ons');
      }}
      disabled={addOnsDisabled}>
      <div className='mx-auto bg-slate-100 rounded-full border border-black p-2  w-[35px] h-[35px]'>
        <FontAwesomeIcon icon={faCartPlus} className='w-4 h-4 mb-1'/>
      </div>
      </button>
      <h6 className='hidden lg:block'>Add-ons</h6>
      </div>
    )}

    <div className='w-8 h-0 border my-auto lg:my-7 border-black border-dashed'></div>

    {pathname === '/payment' ? (
      <div className='flex flex-col p-2 my-auto'>
      <button className='disabled:cursor-not-allowed'
      onClick={() => {
        router.push('/payment');
      }}
      disabled={paymentDisabled}>
      <div className='mx-auto bg-blue-300 rounded-full border border-black p-2  w-[35px] h-[35px]'>
        <FontAwesomeIcon icon={faMoneyBill} className='w-4 h-4 mb-1'/></div>
      </button>
      <h6 className='hidden lg:block'>Payment</h6>
      </div>
    ) : (
      <div className='flex flex-col p-2 my-auto'>
      <button className='disabled:cursor-not-allowed'
      onClick={() => {
        router.push('/payment');
      }}
      disabled={paymentDisabled}>
      <div className='mx-auto bg-slate-100 rounded-full border border-black p-2  w-[35px] h-[35px]'>
        <FontAwesomeIcon icon={faMoneyBill} className='w-4 h-4 mb-1'/></div>
      </button>
      <h6 className='hidden lg:block'>Payment</h6>
      </div>
    )}

    <div className='w-8 h-0 border my-auto lg:my-7 border-black border-dashed'></div>

    {pathname === '/confirmation' ? (
      <div className='flex flex-col p-2 my-auto'>
      <button className='disabled:cursor-not-allowed'
      onClick={() => {
        router.push('/confirmation');
      }}
      disabled={confirmationDisabled}>
      <div className='mx-auto bg-blue-300 rounded-full border border-black p-2  w-[35px] h-[35px] '>
        <FontAwesomeIcon icon={faCheck} className='w-4 h-4 mb-1'/></div>
      </button>
      <h6 className='hidden lg:block'>Confirmation</h6>
      </div>
    ) : (
      <div className='flex flex-col p-2 my-auto'>
      <button className='disabled:cursor-not-allowed'
      onClick={() => {
        router.push('/confirmation');
      }}
      disabled={confirmationDisabled}>
      <div className='mx-auto bg-slate-100 rounded-full border border-black p-2  w-[35px] h-[35px] '>
        <FontAwesomeIcon icon={faCheck} className='w-4 h-4 mb-1'/></div>
      </button>
      <h6 className='hidden lg:block'>Confirmation</h6>
      </div>
    )}
    
    </div>
    
  </div>
  )
}

export default ProgressBar