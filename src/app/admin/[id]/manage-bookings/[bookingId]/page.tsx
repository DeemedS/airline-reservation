"use client";
import nationalities from '@/helpers/nationalities';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
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

const Page = () => {
    
  const [bookFlight, setBookFlight] = useState<BookFlight | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const router = useRouter();
  const { bookingId } = useParams();



  const handleEdit = (e: any) => {
    e.preventDefault();
    setSaveLoading(true);
    console.log(bookFlight);

    axios.put("/api/admin/handleBookFlights", bookFlight)
    .then(res => {
        window.confirm('Would you like to save changes?');
        setSaveLoading(false);
        router.push(`/admin/manage/manage-bookings`);
    })
    .catch(err => {
        console.log(err);
    });
  };

  const handleDelete = async (e : any, bookingId: string) => {
    try {
        e.preventDefault()
        setDeleteLoading(true);
        const confirmDelete = window.confirm('Are you sure you want to delete this Booking?');
        if (confirmDelete) {
            await axios.delete('/api/admin/handleBookFlights', {
                data: { bookingId }
            });
            window.alert('Destination deleted successfully');
            router.push(`/admin/manage/manage-bookings`);
        }
        
    } catch (error) {
        console.log(error);
    } finally {
        setDeleteLoading(false);
    }
};


    useEffect(() => {

        const fetchBooking = async () => {
            try {
              const res = await axios.post("/api/admin/handleBookFlights", { bookingId });
              setBookFlight(res.data.bookFlight);
            } catch (error) {
              console.log(error);
            }
          };

        fetchBooking();
    }, [bookingId]);


  return (
    <div className="lg:ml-64 px-6 py-8 max-h-[100vh] overflow-y-scroll overflow-hidden">
        

        
        <form className="flex flex-col list-none justify-center p-10 rounded-lg bg-white mt-5">

        <h1 className="text-2xl font-semibold">Manage Reservation: <span>{bookFlight?.bookingData?.referenceNumber}</span> </h1>
        <h2 className="text-l">Booked Date: <span>{formatDate(bookFlight?.bookedDate?.toString() ?? null)}</span></h2>
        <h2 className="text-l">Selected Package: <span>{bookFlight?.bookingData?.selectedPackage}</span></h2>
        <h2 className="text-l">Payment Status: <span>{bookFlight?.paymentStatus}</span></h2>

        
        <div className="flex flex-row gap-4 mt-2">
            <div className="flex flex-col gap-4 w-[200px]">
                <label className="text-lg font-semibold">Seat Code</label>
                <input
                type="text"
                name="seatCode"
                className="border-2 border-gray-300 rounded-lg p-2"
                value={bookFlight?.seatCode || ""}
                onChange={(e) => setBookFlight({...bookFlight, seatCode: e.target.value})}
                />
            </div> 
        </div>

            <div className="flex flex-col list-none justify-center rounded-lg bg-white mt-5 p-10">

            <p className="text-2xl font-semibold text-center">Guest Information</p>
        
            <div className="flex flex-row  gap-4 mt-5">

                <div className="flex flex-col gap-4 md:w-[30.5%] xl:w-[33%]">
                    <label className="text-lg font-semibold">First Name<span className='text-red-500'>*</span></label>
                    <input
                    type="text"
                    name="firstName"
                    className="border-2 border-gray-300 rounded-lg p-2"
                    value={bookFlight?.guestInfo?.firstName || ""}
                    onChange={(e) => setBookFlight({...bookFlight, guestInfo: {...bookFlight?.guestInfo, firstName: e.target.value}})}
                    />
                </div>

                <div className="flex flex-col gap-4 md:w-[30.5%] xl:w-[33%]">
                    <label className="text-lg font-semibold">Last Name<span className='text-red-500'>*</span></label>
                    <input
                    type="text"
                    name="lastName"
                    className="border-2 border-gray-300 rounded-lg p-2"
                    value={bookFlight?.guestInfo?.lastName || ""}
                    onChange={(e) => setBookFlight({...bookFlight, guestInfo: {...bookFlight?.guestInfo, lastName: e.target.value}})}
                    />
                </div>

                <div className="flex flex-col gap-4 md:w-[30.5%] xl:w-[33%]">
                    <label className="text-lg font-semibold">Middle Name</label>
                    <input
                    type="text"
                    name="middleName"
                    className="border-2 border-gray-300 rounded-lg p-2"
                    value={bookFlight?.guestInfo?.middleName || ""}
                    onChange={(e) => setBookFlight({...bookFlight, guestInfo: {...bookFlight?.guestInfo, middleName: e.target.value}})}
                    />
                </div>
            </div>

            
            <div className="flex flex-col md:flex-row gap-4 mt-5">

                <div className="flex flex-col gap-4 md:w-[30.5%] xl:w-[33%]">
                <label className="text-lg font-semibold">Birthday<span className='text-red-500'>*</span></label>
                <input type="date" className="border-2 border-gray-300 rounded-lg p-2" 
                onChange={(e) => setBookFlight({...bookFlight, guestInfo: {...bookFlight?.guestInfo, birthday: e.target.value}})}
                value={bookFlight?.guestInfo?.birthday || ''}
                />
                </div>

                <div className="flex flex-col gap-4 md:w-[30.5%] xl:w-[33%]">
                <label className="text-lg font-semibold">Age<span className='text-red-500'>*</span></label>
                <input type="number" className="border-2 border-gray-300 rounded-lg p-2" 
                onChange={(e) => setBookFlight({...bookFlight, guestInfo: {...bookFlight?.guestInfo, age: e.target.value}})}
                value={bookFlight?.guestInfo?.age || ''}
                />
                </div>

                <div className="flex flex-col gap-4 md:w-[30.5%] xl:w-[33%]">
                <label className="text-lg font-semibold">Nationality<span className='text-red-500'>*</span></label>
                <select id='national ' className="border-2 border-gray-300 rounded-lg p-2"
                onChange={(e) => setBookFlight({...bookFlight, guestInfo: {...bookFlight?.guestInfo, nationality: e.target.value}})}
                value={bookFlight?.guestInfo?.nationality || ''}
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
            </div>

            <div className="flex flex-col list-none justify-center rounded-lg bg-white mt-5 p-10">

                <p className="text-2xl font-semibold text-center">Contact Information</p>

                <hr className='my-2 border border-black-300'></hr>

                <div className="flex flex-col md:flex-row gap-4 mt-5">

                <div className="flex flex-col gap-4 md:w-[30.5%] xl:w-[33%]">
                <label className="text-lg font-semibold">Email Address<span className='text-red-500'>*</span></label>
                <input type="email" className="border-2 border-gray-300 rounded-lg p-2"
                onChange={(e) => setBookFlight({...bookFlight, guestInfo: {...bookFlight?.guestInfo, email: e.target.value}})}
                value={bookFlight?.guestInfo?.email || ''}
                />
                </div>

                <div className="flex flex-col gap-4 md:w-[30.5%] xl:w-[33%]">
                <label className="text-lg font-semibold">Phone Number<span className='text-red-500'>*</span></label>
                <input type="text" className="border-2 border-gray-300 rounded-lg p-2"
                onChange={(e) => setBookFlight({...bookFlight, guestInfo: {...bookFlight?.guestInfo, phone: e.target.value}})}
                value={bookFlight?.guestInfo?.phone || ''}
                />
                </div>

                <div className="flex flex-col gap-4 md:w-[30.5%] xl:w-[33%]">
                    <label className="text-lg font-semibold">Seconday Phone Number</label>
                    <input type="text" className="border-2 border-gray-300 rounded-lg p-2" 
                    onChange={(e) => setBookFlight({...bookFlight, guestInfo: {...bookFlight?.guestInfo, secondaryPhone: e.target.value}})}
                    value={bookFlight?.guestInfo?.secondaryPhone || ''}
                    />
                </div>

                </div>

                <div className="flex flex-col gap-4 mt-5">
                <label className="text-lg font-semibold">Address Line 1<span className='text-red-500'>*</span></label>
                <input type="text" className="border-2 border-gray-300 rounded-lg p-2"
                onChange={(e) => setBookFlight({...bookFlight, guestInfo: {...bookFlight?.guestInfo, addressline1: e.target.value}})}
                value={bookFlight?.guestInfo?.addressline1 || ''}
                />
                </div>

                <div className="flex flex-col gap-4 mt-5">
                <label className="text-lg font-semibold">Address Line 2</label>
                <input type="text" className="border-2 border-gray-300 rounded-lg p-2" 
                onChange={(e) => setBookFlight({...bookFlight, guestInfo: {...bookFlight?.guestInfo, addressline2: e.target.value}})}
                value={bookFlight?.guestInfo?.addressline2 || ''}
                />
                </div>

                <div className="flex flex-col md:flex-row gap-4 mt-5">

                <div className="flex flex-col gap-4 md:w-[30.5%] xl:w-[33%]">
                    <label className="text-lg font-semibold">City<span className='text-red-500'>*</span></label>
                    <input type="text" className="border-2 border-gray-300 rounded-lg p-2" 
                    onChange={(e) => setBookFlight({...bookFlight, guestInfo: {...bookFlight?.guestInfo, city: e.target.value}})}
                    value={bookFlight?.guestInfo?.city || ''}
                    />
                </div>

                <div className="flex flex-col gap-4 md:w-[30.5%] xl:w-[33%]">
                    <label className="text-lg font-semibold">Region<span className='text-red-500'>*</span></label>
                    <input type="text" className="border-2 border-gray-300 rounded-lg p-2" 
                    onChange={(e) => setBookFlight({...bookFlight, guestInfo: {...bookFlight?.guestInfo, region: e.target.value}})}
                    value={bookFlight?.guestInfo?.region || ''}
                    />
                </div>

                <div className="flex flex-col gap-4 md:w-[30.5%] xl:w-[33%]">
                    <label className="text-lg font-semibold">Zip Code<span className='text-red-500'>*</span></label>
                    <input type="text" className="border-2 border-gray-300 rounded-lg p-2" 
                    onChange={(e) => setBookFlight({...bookFlight, guestInfo: {...bookFlight?.guestInfo, zip: e.target.value}})}
                    value={bookFlight?.guestInfo?.zip || ''}
                    />
                </div>
                </div>
            </div>

            <div className="flex flex-row gap-4 bottom-0 right-0 m-5 w-[50%]">
                <button
                    className="w-[50%] px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                    onClick={handleEdit}>
                    {saveLoading ? "Pocessing..." : "Save Changes"}
                </button>

                <button
                    className="w-[50%] px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                    onClick={(e) => handleDelete(e, bookFlight?._id ?? '')}>
                    {deleteLoading ? "Pocessing..." : "Delete User"}
                </button>
            </div>
        </form>
      </div>
  );
};

export default Page;
