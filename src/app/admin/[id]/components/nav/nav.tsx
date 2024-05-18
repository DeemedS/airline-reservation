"use client";

import { useState } from "react"
import { UserIcon, Bars3Icon } from '@heroicons/react/24/solid'
import { usePathname } from 'next/navigation'

const Nav = () => {

    const [nav, setNav] = useState(false)
    const handleClick = () => setNav(!nav)

    const pathname = usePathname()
    const path = pathname.split('/')


    return (
        <div>
            <nav className="bg-white border-b border-gray-300 h-20 ">
                
                <div className="flex justify-between items-center px-9 my-auto">
                    <button id="menu-button" className="lg:hidden" onClick={handleClick}
                    >
                        <Bars3Icon className="h-5 w-5 text-lime-500" />
                    </button>

                    <div className="flex flex-col w-fit my-5">
                        <h1 className="text-2xl font-bold text-gray-700 my-auto ">FLIGHT RESERVATION</h1>
                    </div>

                    <div className="space-x-4">
                        
                        <button className="flex flex-col items-center">
                            <UserIcon className="h-5 w-5 text-lime-500" />
                            <p className="hidden lg:block text-gray-700">Admin</p>
                        </button>
                        
                    </div>
                </div>
            </nav>

            <div id="sidebar" className="lg:block hidden bg-white w-64 h-full absolute rounded-none border-none">

                <div className="p-4 space-y-4">


                    {path[3] === 'home' ? (
                        <a href={`/admin/${path[2]}/home`} aria-label="dashboard" className="relative px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-teal-600 to-emerald-400">
                            <span className="-mr-1 font-medium">Home</span>
                        </a>
                    ) : (
                        <a href={`/admin/${path[2]}/home`} aria-label="dashboard" className="relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
                            <span className="-mr-1 font-medium">Home</span>
                        </a>
                    )}


                    {path[3] === 'manage-users' ? (
                        <a href={`/admin/${path[2]}/manage-users`} className="px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-teal-600 to-emerald-400">
                            <i className="fas fa-gift"></i>
                            <span>Users</span>
                        </a>
                    ) : (

                        <a href={`/admin/${path[2]}/manage-users`} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
                            <span>Users</span>
                        </a>
                    )}

                    {path[3] === 'manage-flights' ? (
                        <a href={`/admin/${path[2]}/manage-flights`} className="px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-teal-600 to-emerald-400">
                            <i className="fas fa-store"></i>
                            <span>Flights</span>
                        </a>
                    ) : (
                        <a href={`/admin/${path[2]}/manage-flights`} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
                            <span>Flights</span>
                        </a>
                    )}

                    {path[3] === 'manage-locations' ? (
                        <a href={`/admin/${path[2]}/manage-locations`} className="px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-teal-600 to-emerald-400">
                            <i className="fas fa-wallet"></i>
                            <span>Locations</span>
                        </a>
                    ) : (
                        <a href={`/admin/${path[2]}/manage-locations`} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
                            <span>Locations</span>
                        </a>
                    )}

                    {path[3] === 'manage-transactions' ? (
                        <a href={`/admin/${path[2]}/manage-transactions`} className="px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-teal-600 to-emerald-400">
                            <i className="fas fa-exchange-alt"></i>
                            <span>Transactions</span>
                        </a>
                    ) : (
                        <a href={`/admin/${path[2]}/manage-transactions`} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
                            <span>Transactions</span>
                        </a>
                    )}  

                    {path[3] === 'manage-bookings' ? (
                        <a href={`/admin/${path[2]}/manage-bookings`} className="px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-teal-600 to-emerald-400">
                            <i className="fas fa-exchange-alt"></i>
                            <span>Bookings</span>
                        </a>
                    ) : (
                        <a href={`/admin/${path[2]}/manage-bookings`} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
                            <span>Bookings</span>
                        </a>
                    )}  
                        
    

                </div>
            </div>

            <div id="sidebar" className={!nav ? "hidden" : "block bg-white w-full absolute  rounded-none border-none"}>

                <div className="p-4 space-y-4">

                {pathname === '/home' ? (
                    <a href={`/admin/${path[2]}/home`} aria-label="dashboard" className="relative px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-teal-600 to-emerald-400">
                        <span className="-mr-1 font-medium">Home</span>
                    </a>
                ) : (
                    <a href={`/admin/${path[2]}/home`}  aria-label="dashboard" className="relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
                        <span className="-mr-1 font-medium">Home</span>
                    </a>
                )}

                {pathname === '/manage-users' ? (
                    <a href={`/admin/${path[2]}/manage-users`} className="px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-teal-600 to-emerald-400">
                        <i className="fas fa-gift"></i>
                        <span>Users</span>
                    </a>
                ) : (
                    <a href={`/admin/${path[2]}/manage-users`} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
                        <span>Users</span>
                    </a>
                )}

                {pathname === '/manage-flights' ? (
                    <a href={`/admin/${path[2]}/manage-flights`} className="px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-teal-600 to-emerald-400">
                        <i className="fas fa-store"></i>
                        <span>Flights</span>
                    </a>
                ) : (
                    <a href={`/admin/${path[2]}/manage-flights`} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
                        <span>Flights</span>
                    </a>
                )}

                {pathname === '/manage-locations' ? (
                    <a href={`/admin/${path[2]}/manage-locations`} className="px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-teal-600 to-emerald-400">
                        <i className="fas fa-wallet"></i>
                        <span>Locations</span>
                    </a>
                ) : (
                    <a href={`/admin/${path[2]}/manage-locations`} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
                        <span>Locations</span>
                    </a>
                )}

                {pathname === '/manage-transactions' ? (
                    <a href={`/admin/${path[2]}/manage-transactions`} className="px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-teal-600 to-emerald-400">
                        <i className="fas fa-exchange-alt"></i>
                        <span>Transactions</span>
                    </a>
                ) : (
                    <a href={`/admin/${path[2]}/manage-transactions`} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
                        <span>Transactions</span>
                    </a>
                )}
                {pathname === '/manage-bookings' ? (
                    <a href={`/admin/${path[2]}/manage-bookings`} className="px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-teal-600 to-emerald-400">
                        <i className="fas fa-exchange-alt"></i>
                        <span>Bookings</span>
                    </a>
                ) : (
                    <a href={`/admin/${path[2]}/manage-bookings`} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
                        <span>Bookings</span>
                    </a>
                )}


                </div>
            </div>
        </div>
    )
}

export default Nav