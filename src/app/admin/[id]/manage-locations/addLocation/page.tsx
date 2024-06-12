"use client";
import nationalities from '@/helpers/nationalities';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';



interface Destination {
        Name: string;
        Code: string;
        Abv: string;
        City: string;
    }

const Page = () => {

    const [saveLoading, setSaveLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [destination, setDestination] = useState<Destination>({
        Name: '',
        Code: '',
        Abv: '',
        City: '',
      });
    
    const Router = useRouter();
  

    const handleSave = async (e: any) => {
        e.preventDefault()
        setSaveLoading(true);
        try {
        const res = await axios.post("/api/admin/addDestination", destination)
        console.log(res);
        if (res.status === 201) {
          window.alert('Destination created successfully');
        }
        Router.push(`/admin/manage/manage-locations`);
      }
        catch (error) {
          console.log(error);
        }
        finally {
          setSaveLoading(false);
        }
      };




    return (
        <div className="lg:ml-64 px-6 py-8">
            <div className="relative bg-white rounded-md border-none p-10 mb-4 shadow-md h-[800px]">
            <form className="mt-6">
                <div className="flex flex-wrap mb-4 gap-5">
                    <div className='w-[25%]'>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-800">Name</label>
                    <input id="name" name='name'
                    type="text" 
                    value={destination.Name}
                    onChange={(e) => setDestination({...destination, Name: e.target.value})}
                    placeholder='First Name'
                    className="w-[100%] px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>
                </div>
                <div className="flex flex-wrap mb-4 gap-5">
                    <div className='w-[25%]'>
                    <label htmlFor="code" className="block text-sm font-semibold text-gray-800">Code</label>
                    <input id='code' name='code'
                    type="text" 
                    value={destination.Code}
                    onChange={(e) => setDestination({...destination, Code: e.target.value})}
                    placeholder='Code'
                    className="w-[100%] px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>
                </div>
                <div className="flex flex-wrap mb-4 gap-5">
                    <div className='w-[25%]'>
                    <label htmlFor="abv" className="block text-sm font-semibold text-gray-800">Abreviation</label>
                    <input id='abv' name='abv'
                    type="text"
                    placeholder='Abreviation'
                    value={destination.Abv}
                    onChange={(e) => setDestination({...destination, Abv: e.target.value})}
                    className="w-[100%] px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>
                </div>
                <div className="flex flex-wrap mb-4 gap-5">
                    <div className='w-[25%]'>
                    <label htmlFor="city" className="block text-sm font-semibold text-gray-800">City</label>
                    <input id='city' name='city'
                    type="text"
                    placeholder='City'
                    value={destination.City}
                    onChange={(e) => setDestination({...destination, City: e.target.value})}
                    className="w-[100%] px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>
                </div>

                <div className="flex flex-row gap-4 absolute bottom-0 right-0 m-5 w-[50%]">
                                <button
                                        className="w-[100%] px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                                        onClick={handleSave}>
                                        {saveLoading ? "Pocessing..." : "Add Destination"}
                                </button>
                                </div>

            </form> 

             </div>
        </div>
    )                                    
}

export default Page