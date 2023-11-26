import mongodb from '../../../lib/mongodb';
import Flight from '../../../models/flight';
import { NextResponse } from "next/server";


export const GET = async( req: Request, { params }: { params: { id: string } })  => {
    try {
        
        const id = params.id;
        await mongodb();
        const flight = await Flight.findOne({_id : id});
        return NextResponse.json(flight)
      
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
  
  }

