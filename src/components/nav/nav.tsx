"use client";

import { Link, animateScroll as scroll, } from 'react-scroll'
import { useState } from "react"
import { Bars3Icon , XMarkIcon } from '@heroicons/react/24/solid';

const Nav = () => {

    const [nav, setNav] = useState(false)
    const handleClick = () => setNav(!nav)

    const handleClose =()=> setNav(!nav)


    return (
        <>
   

        <nav className='w-screen h-[80px] z-10 fixed drop-shadow-lg'>

                <div className='flex justify-between items-center px-2  w-full h-full'>
                    <div >
                        <h1 className='text-3xl font-bold mr-4 sm:text-4xl'>FLIGHT RESERVATION</h1>
                    </div>
                    <div className='flex items-center'>
                        <ul className='hidden md:flex md:items-center md:gap-[4vw] gap-8'>

                            <li className='hover:text-gray-500'><Link to="login" smooth={true} duration={500}>Book</Link></li>
                            <li className='hover:text-gray-500'><Link to="home" smooth={true} duration={500}>Manage</Link></li>
                            <li className='hover:text-gray-500'><Link to="home" smooth={true} duration={500}>Travel Info</Link></li>
                            <li className='hover:text-gray-500'><Link to="home" smooth={true} duration={500}>Explore</Link></li>
                            <li className='hover:text-gray-500'><Link to="home" smooth={true} duration={500}>About</Link></li>

                        </ul>
                    </div>

                    <div className='hidden md:flex pr-4 items-center gap-6'>
                    <button className='bg-[#92ad18] text-white px-5 py-2 rounded-full hover:bg-[#87acec]'>Log in</button>
                    </div>


                    <div className='md:hidden mr-4' onClick={handleClick}>
                    {!nav ? <Bars3Icon className='w-5 hover:text-gray-500' /> : <XMarkIcon className='w-5 hover:text-gray-500' />}
                    </div>

                </div>

                <ul className={!nav ? 'hidden md:hidden' : 'md:hidden mr-4 text-center absolute bg-zinc-200 w-full px-8 p-4 mx-auto space-y-4'}>
                <li className='hover:text-gray-500 border-b-2 border-gray-300 w-full'><Link onClick={handleClose} to="home" smooth={true} duration={500}>Book</Link></li>
                <li className='hover:text-gray-500 border-b-2 border-gray-300 w-full'><Link onClick={handleClose} to="about" smooth={true} duration={500}>Manage</Link></li>
                <li className='hover:text-gray-500 border-b-2 border-gray-300 w-full'><Link onClick={handleClose} to="support" smooth={true}  duration={500}>Travel Info</Link></li>
                <li className='hover:text-gray-500 border-b-2 border-gray-300 w-full'><Link onClick={handleClose} to="support" smooth={true} duration={500}>Explore</Link></li>
                <li className='hover:text-gray-500 border-b-2 border-gray-300 w-full'><Link onClick={handleClose} to="support" smooth={true}  duration={500}>About</Link></li>


                <div className='flex flex-col my-4 items-center'>
                <button className='bg-[#92ad18] text-white w-[70%] px-5 py-2 rounded-full hover:bg-[#87acec]'>Log in</button>
                </div>
                </ul>

        </nav>

{/* LOGIN MODAL */}


        </>
    )

}

export default Nav
