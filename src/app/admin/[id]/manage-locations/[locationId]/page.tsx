"use client";
import nationalities from '@/helpers/nationalities';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';



interface Destination {
        _id: string;
        Name: string;
        Code: string;
        Abv: string;
        City: string;
    }

const page = () => {

    const [saveLoading, setSaveLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [destination, setDestination] = useState<Destination>({
        _id: '',
        Name: '',
        Code: '',
        Abv: '',
        City: '',
      });
    
    const Router = useRouter();
    const { locationId } = useParams();



  const fetchDestination = async () => {
    try {
      const res = await axios.post("/api/admin/handleLocations", { locationId });
      setDestination(res.data.destination);
    } catch (error) {
      console.log(error)
    }
  }


    

    useEffect(() => {
        fetchDestination()
    }, [])

    const handleEdit = () => {
        setSaveLoading(true);

        axios.put("/api/admin/handleLocations", destination)
        .then(res => {
            window.confirm('Would you like to save changes?');
            setSaveLoading(false);
        })
        .catch(err => {
            console.log(err);
        });
    };

    const handleDelete = async (e : any, locationId: string) => {
        try {
            e.preventDefault()
            setDeleteLoading(true);
            const confirmDelete = window.confirm('Are you sure you want to delete this user?');
            if (confirmDelete) {
                await axios.delete('/api/admin/handleLocations', {
                    data: { locationId }
                });

                
                window.alert('Destination deleted successfully');
            }
            Router.push(`/admin/manage/manage-locations`);
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
                                        className="w-[50%] px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                                        onClick={handleEdit}>
                                                {saveLoading ? "Pocessing..." : "Save Changes"}
                                </button>

                                <button
                                        className="w-[50%] px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                                        onClick={(e) => handleDelete(e, destination._id)}>
                                                {deleteLoading ? "Pocessing..." : "Delete User"}
                                        </button>
                                </div>

            </form> 

             </div>
        </div>
    )                                    
}

export default page