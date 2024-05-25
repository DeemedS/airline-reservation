"use client";

import Link from "next/link"
import { useState, useEffect } from "react"
import { Bars3Icon , XMarkIcon } from '@heroicons/react/24/solid';
import { useRouter } from "next/navigation";
import axios from "axios";


const Nav = () => {
    const router = useRouter()

    const [nav, setNav] = useState(false)
    const handleClick = () => setNav(!nav)
    const handleClose =()=> setNav(!nav)


    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {

    const getToken = async () => {
        try {
            const res = await axios.get('/api/user/login');
            console.log(res.data.tokenData);
            if (res.data.tokenData.id) {
                setToken(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    getToken();
       
    }, []);

    const logout = async () => {
        try {
            const res = await axios.get('/api/user/logout');
            console.log(res.data);
            if (res.data.success === true) {
                setToken(null);
            }
            router.push('/');
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <>
   

        <nav className='w-screen h-[80px] z-10 fixed drop-shadow-lg'>

                <div className='flex justify-between items-center px-2  w-full h-full'>
                    <div >
                        <h1 className='text-3xl font-bold mr-4 sm:text-4xl'>FLIGHT RESERVATION</h1>
                    </div>
                    <div className='flex items-center'>
                        <ul className='hidden md:flex md:items-center md:gap-[4vw] gap-8'>

                            <li className='hover:text-gray-500'><Link href="/">Book</Link></li>
                            <li className='hover:text-gray-500'><Link href="/track">Track Reservation</Link></li>
                            <li className='hover:text-gray-500'><Link href="#">Travel Info</Link></li>
                            <li className='hover:text-gray-500'><Link href="#">Explore</Link></li>
                            <li className='hover:text-gray-500'><Link href="#">About</Link></li>

                        </ul>
                    </div>

                    

                    {!token ? (
                        <div className='hidden md:flex pr-4 items-center gap-6'>
                        <button className='bg-[#92ad18] text-white px-5 py-2 rounded-full hover:bg-[#87acec]' onClick={() => {window.location.href = '/login'}}><Link href="/login">Log in</Link></button>
                        </div>
                    ) : (
                        
                        <div className='hidden md:flex pr-4 items-center gap-6'>
                            <button className="bg-[#92ad18] text-white  px-5 py-2 rounded-full hover:bg-[#87acec]" onClick={() => {window.location.href = '/myaccount'}} ><Link href="/myaccount">My Account</Link></button>
                            <button className="bg-[#c25555] text-white  px-5 py-2 rounded-full hover:bg-[#87acec]" onClick={logout}>Log Out</button>
                        </div>
                        
                    )}


                    <div className='md:hidden mr-4' onClick={handleClick}>
                    {!nav ? <Bars3Icon className='w-5 hover:text-gray-500' /> : <XMarkIcon className='w-5 hover:text-gray-500' />}
                    </div>

                </div>

                <ul className={!nav ? 'hidden md:hidden' : 'md:hidden mr-4 text-center absolute bg-zinc-200 w-full px-8 p-4 mx-auto space-y-4'}>
                    <li className='hover:text-gray-500 border-b-2 border-gray-300 w-full'><Link onClick={handleClose} href="/">Book</Link></li>
                    <li className='hover:text-gray-500 border-b-2 border-gray-300 w-full'><Link onClick={handleClose} href="/track">Track Reservation</Link></li>
                    <li className='hover:text-gray-500 border-b-2 border-gray-300 w-full'><Link onClick={handleClose} href="#">Travel Info</Link></li>
                    <li className='hover:text-gray-500 border-b-2 border-gray-300 w-full'><Link onClick={handleClose} href="#">Explore</Link></li>
                    <li className='hover:text-gray-500 border-b-2 border-gray-300 w-full'><Link onClick={handleClose} href="#">About</Link></li>

                    {!token ? (
                        <div className="flex flex-col my-4 items-center">
                            <button className="bg-[#92ad18] text-white w-[70%] px-5 py-2 rounded-full hover:bg-[#87acec]" onClick={() => {window.location.href = '/login'}}>Log in</button>
                        </div>
                    ) : (
                        <div className="flex flex-col my-4 items-center">
                            <button className="bg-[#92ad18] text-white w-[70%] px-5 py-2 rounded-full hover:bg-[#87acec]" onClick={() => {window.location.href = '/myaccount'}}><Link href="/myaccount">My Account</Link></button>
                            <button className="bg-[#c25555] text-white w-[70%] px-5 py-2 rounded-full hover:bg-[#87acec]" onClick={logout}>Log Out</button>
                        </div>
                    )}

                </ul>

        </nav>



        </>
    )

}

export default Nav
