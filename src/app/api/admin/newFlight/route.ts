import { NextRequest, NextResponse } from "next/server";
import mongodb from '@/lib/mongodb';
import Flight from "@/models/flight";


export async function POST(request: NextRequest) {
  try {

    //connect to database
    await mongodb();
    
    //get data from request body
    const reqBody = await request.json()
    const {from, to, date, arrival, departure, code, fare} = reqBody
 
    //create new flight

    const newFlight = new Flight ({
        from,
        to,
        date,
        arrival,
        departure,
        code,
        fare
    })

    

    //save flight
    const saveFlight = await newFlight.save();

    console.log(saveFlight._doc);

    //return success message
    return NextResponse.json( {message: "Flight created successfully", success: true}, {status: 201})


  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500})
  }

}


