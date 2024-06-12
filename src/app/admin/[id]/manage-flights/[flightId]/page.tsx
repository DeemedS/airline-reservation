"use client";
import nationalities from '@/helpers/nationalities';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import formatTime from '@/helpers/formatTime';
import formatDate from '@/helpers/formatDate';
import convertTo24Hour from '@/helpers/convertTo24Hour';

interface Flight {
        _id: string;
        from: string;
        to: string;
        date: string;
        arrival: string;
        departure: string;
        code: string;
        fare: string;
}

interface Destination {
        _id: string;
        Name: string;
        Code: string;
        Abv: string;
        City: string;
    }

const Page = () => {

    const { flightId } = useParams();
    const [saveLoading, setSaveLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [destinations, setDestinations] = useState<Destination[]>([]);
    
    const Router = useRouter();

const [flight, setFlight] = useState<Flight>({
        _id: '',
        from: '',
        to: '',
        date: '',
        arrival: '',
        departure: '',
        code: '',
        fare: '',
});

const [departureTime, setDepartureTime] = useState('');
const [arrivalTime , setArrivalTime] = useState('');



const handleDepartureChange = (type: string, value: string) => {
    if (type === 'hour') {
        const newTime = `${value}:${departureTime.split(':')[1]?.split(' ')[0]} ${departureTime.split(' ')[1]}`;
        setDepartureTime(newTime);
        const hourformat = convertTo24Hour(newTime);
        const [datePart, _] = flight.date.split('T');
        setFlight({...flight, departure: `${datePart}T${hourformat}:00.000Z`});

    } else if (type === 'minute') {
        const newTime = `${departureTime.split(':')[0]}:${value} ${departureTime.split(' ')[1]}`;
        setDepartureTime(newTime);
        const hourformat = convertTo24Hour(newTime);
        const [datePart, _] = flight.date.split('T');
        setFlight({...flight, departure: `${datePart}T${hourformat}:00.000Z`});

    } else if (type === 'ampm') {
        const newTime = `${departureTime.split(':')[0]}:${departureTime.split(':')[1]?.split(' ')[0]} ${value}`;
        setDepartureTime(newTime);
        const hourformat = convertTo24Hour(newTime);
        const [datePart, _] = flight.date.split('T');
        setFlight({...flight, departure: `${datePart}T${hourformat}:00.000Z`});
    }

};




const handleArrivalChange = (type: string, value: string) => {
        if (type === 'hour') {
            const newTime = `${value}:${arrivalTime.split(':')[1]?.split(' ')[0]} ${arrivalTime.split(' ')[1]}`;
            setArrivalTime(newTime);
            const hourformat = convertTo24Hour(newTime);
            const [datePart, _] = flight.date.split('T');
            const newDateTime = `${datePart}T${hourformat}:00.000Z`;
            setFlight({...flight, arrival: newDateTime});
        }
        else if (type === 'minute') {
            const newTime = `${arrivalTime.split(':')[0]}:${value} ${arrivalTime.split(' ')[1]}`;
            setArrivalTime(newTime);
            const hourformat = convertTo24Hour(newTime);
            const [datePart, _] = flight.date.split('T');
            const newDateTime = `${datePart}T${hourformat}:00.000Z`;
            setFlight({...flight, arrival: newDateTime});
        }
        else if (type === 'ampm') {
            const newTime = `${arrivalTime.split(':')[0]}:${arrivalTime.split(':')[1]?.split(' ')[0]} ${value}`;
            setArrivalTime(newTime);
            const hourformat = convertTo24Hour(newTime);
            const [datePart, _] = flight.date.split('T');
            const newDateTime = `${datePart}T${hourformat}:00.000Z`;
            setFlight({...flight, arrival: newDateTime});
        }
    }



    useEffect(() => {

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
    
        const fetchFlights = async () => {
            try {
                const res = await axios.post("/api/admin/handleFlights", { flightId });
                setFlight(res.data.flight);
                setDepartureTime(formatTime(res.data.flight.departure));
                setArrivalTime(formatTime(res.data.flight.arrival));
            } catch (error) {
                console.log(error)
            }
        }

        fetchFlights()
        fetchDestinations()
    }, [flightId])

    const handleEdit = (e : any) => {
        e.preventDefault();
        setSaveLoading(true);

        console.log(flight);

        axios.put("/api/admin/handleFlights", flight)
        .then(res => {
            window.confirm('Would you like to save changes?');
            setSaveLoading(false);
            Router.push(`/admin/manage/manage-flights`);
        })
        .catch(err => {
            console.log(err);
        });
    };

    const handleDelete = async (e : any, flightId: string) => {
        try {
            setDeleteLoading(true);
            const confirmDelete = window.confirm('Are you sure you want to delete this user?');
            if (confirmDelete) {
                await axios.delete('/api/admin/handleFlights', {
                    data: { flightId }
                });
                window.alert('User deleted successfully');
            }
            Router.push(`/admin/manage/manage-flights`);
        } catch (error) {
            console.log(error);
        } finally {
            setDeleteLoading(false);
        }
    };



    return (
        <div className="lg:ml-64 px-6 py-8">
            <div className="relative bg-white rounded-md border-none p-10 mb-4 shadow-md h-[800px]">
            <form className="mt-6">

                    <div className="flex flex-wrap mb-4 gap-5">
                

                    <div className='flex flex-col w-[25%] mx-2'>
                            <label htmlFor='from' className='text-black'>Origin</label>
                            <select
                                id='from'
                                name='from'
                                className='text-black w-[75%] h-10 text-center rounded-md border'
                                placeholder='Select Origin'
                                value={flight.from}
                                onChange={(e) => {setFlight({...flight, from: e.target.value});}}
                                >
                                <option value=''>Select Origin</option>
                                {destinations.map((d:any) => (
                                        <option value={d.Abv} key={d._id}>
                                                {d.City}
                                        </option>
                                ))}
                                </select>
                                </div>

                                <div className='flex flex-col w-[25%] mx-2'>
                                        <label htmlFor='to' className='text-black'>To</label>
                                        <select id='to' name='to' className='text-black w-[75%] h-10 text-center rounded-md border'
                                        onChange={(e) => setFlight({...flight, to: e.target.value})}
                                        value={flight.to}
                                        >
                                        <option value=''>Select Destination</option>
                                        {destinations.map((d:any) => (
                                                        <option value={d.Abv} key={d._id}>
                                                                {d.City}
                                                        </option>
                                                         ))}
                                        </select>
                                </div>


                                </div>

                                <div className='flex flex-col w-[25%] mx-2'>
                                    <label htmlFor="date" className="text-black">Flight Date</label>
                                    <input
                                        id='date'
                                        name='date'
                                        type="date"
                                        value={flight.date ? new Date(flight.date).toISOString().split('T')[0] : ''}
                                        onChange={(e) => setFlight({...flight, date: e.target.value})}
                                        placeholder='Flight Date'
                                        className="w-50% px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>

                                <div className="flex flex-wrap mb-4 gap-5">

                                <div className='flex flex-col w-[25%] mt-5 mx-2'>
                                        <label htmlFor='departureDate' className='text-black'>Departure</label>

                                <div className="container">
                                <div className="inline-flex text-lg border rounded-md p-2">

                                                <select name="" id="" className="px-2 outline-none appearance-none bg-transparent"
                                                value={departureTime.split(':')[0]}
                                                onChange={(e) => handleDepartureChange('hour', e.target.value)}
                                                >
                                                <option value="01">01</option>
                                                <option value="02">02</option>
                                                <option value="03">03</option>
                                                <option value="04">04</option>
                                                <option value="05">05</option>
                                                <option value="06">06</option>
                                                <option value="07">07</option>
                                                <option value="08">08</option>
                                                <option value="09">09</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                </select>

                                                <span className="px-2">:</span>
                                                <select
                                                    name=""
                                                    id=""
                                                    className="px-2 outline-none appearance-none bg-transparent"
                                                    value={departureTime.split(':')[1]?.split(' ')[0]}
                                                    onChange={(e) => handleDepartureChange('minute', e.target.value)}
                                                >
                                                    <option value="00">00</option>
                                                    <option value="15">15</option>
                                                    <option value="30">30</option>
                                                    <option value="45">45</option>
                                                </select>
                                                <select name="" id="" className="px-2 outline-none appearance-none bg-transparent"
                                                value={departureTime.split(' ')[1]}
                                                onChange={(e) => handleDepartureChange('ampm', e.target.value)}
                                                >
                                                <option value="AM">AM</option>
                                                <option value="PM">PM</option>
                                                </select>
                                </div>
                                </div>
                                </div>


                                <div className='flex flex-col w-[25%] mt-5 mx-2'>
                                        <label htmlFor='arrivalDate' className='text-black'>Arrival</label>

                                <div className="container">
                                <div className="inline-flex text-lg border rounded-md p-2">

                                                <select name="" id="" className="px-2 outline-none appearance-none bg-transparent"
                                                value={arrivalTime.split(':')[0]}
                                                onChange={(e) => handleArrivalChange('hour', e.target.value)}
                                                >
                                                <option value="01">01</option>
                                                <option value="02">02</option>
                                                <option value="03">03</option>
                                                <option value="04">04</option>
                                                <option value="05">05</option>
                                                <option value="06">06</option>
                                                <option value="07">07</option>
                                                <option value="08">08</option>
                                                <option value="09">09</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                </select>

                                                <span className="px-2">:</span>
                                                <select
                                                    name=""
                                                    id=""
                                                    className="px-2 outline-none appearance-none bg-transparent"
                                                    value={arrivalTime.split(':')[1]?.split(' ')[0]}
                                                    onChange={(e) => handleArrivalChange('minute', e.target.value)}
                                                >
                                                    <option value="00">00</option>
                                                    <option value="15">15</option>
                                                    <option value="30">30</option>
                                                    <option value="45">45</option>
                                                </select>
                                                <select name="" id="" className="px-2 outline-none appearance-none bg-transparent"
                                                value={arrivalTime.split(' ')[1]}
                                                onChange={(e) => handleArrivalChange('ampm', e.target.value)}
                                                >
                                                <option value="AM">AM</option>
                                                <option value="PM">PM</option>
                                                </select>
                                </div>
                                </div>
                                </div>
                                        
                                </div>

                                <div className="flex flex-wrap mb-4 gap-5 ">
                                    <div className='flex flex-col w-[25%] mt-5 mx-2'>
                                        
                                    <label htmlFor='code' className='text-black'>Flight Code</label>
                                    <input id='code' name='code' type='text' value={flight.code} 
                                    onChange={(e) => setFlight({...flight, code: e.target.value})}
                                    placeholder='Flight Code'
                                    className="px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    </div>

                                    <div className='flex flex-col w-[25%] mt-5 mx-2'>
                                        
                                    <label htmlFor='fare' className='text-black'>Fare</label>
                                    <input id='fare' name='fare' type='text' value={flight.fare} 
                                    onChange={(e) => setFlight({...flight, fare: e.target.value})}
                                    placeholder='Fare'
                                    className="px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    </div>

                                    
                                </div>  


                                <div className="flex flex-row gap-4 absolute bottom-0 right-0 m-5 w-[50%]">
                                <button
                                        className="w-[50%] px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                                        onClick={handleEdit}>
                                                {saveLoading ? "Pocessing..." : "Save Changes"}
                                </button>

                                <button
                                        className="w-[50%] px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                                        onClick={(e) => handleDelete(e, flight._id)}>
                                                {deleteLoading ? "Pocessing..." : "Delete User"}
                                        </button>
                                </div>

                                </form> 

                                </div>
                                </div>
    )                                    
}

export default Page