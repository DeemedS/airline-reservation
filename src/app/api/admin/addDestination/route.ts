import { NextRequest, NextResponse } from "next/server";
import mongodb from '@/lib/mongodb';
import Destinations from "@/models/destination";


export async function POST(request: NextRequest) {
  try {

    //connect to database
    await mongodb();
    
    //get data from request body
    const reqBody = await request.json()
    const {Name, Code, Abv, City} = reqBody
 
    //create new Destination

    const Destination = new Destinations ({
        Name,
        Code,
        Abv,
        City
    })

    console.log(Destination)

    //save Destination
    const saveDestination = await Destination.save();

    console.log(saveDestination._doc);

    //return success message
    return NextResponse.json( {message: "Destination created successfully", success: true}, {status: 201})


  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500})
  }

}


