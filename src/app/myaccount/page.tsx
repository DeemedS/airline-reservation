import React from 'react'
import Link from "next/link"
import Nav from '@/components/nav/nav'


const MyAccount = () => {
  return (
    <div>
        <Nav />
        
        <div className="flex flex-col mx-[15%] list-none justify-center py-4 rounded-lg">
        <div className="mt-[60px] lg:mt-[80px]">
            <h1 className="text-2xl font-bold">My Account</h1>
            

        </div>
        </div>
    </div>
  )
}

export default MyAccount
