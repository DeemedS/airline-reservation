import { NextRequest, NextResponse } from "next/server";
import mongodb from '@/lib/mongodb';
import Flight from "@/models/flight";


export async function GET() {
    try {
    
      await mongodb();
      const flight = await Flight.find();
      return NextResponse.json({ flight });
      
    } catch (error) {
      return NextResponse.json(error, { status: 500 });
    }
  
  }

  export async function DELETE(request: NextRequest) {
    try {
        await mongodb();
        const reqBody = await request.json();
        const { flightId } = reqBody;

      const deletedFlight = await Flight.findByIdAndDelete(flightId);
      if (!deletedFlight) {
        return NextResponse.json({ message: 'Flight not found' }, { status: 404 });
      }
      return NextResponse.json({ message: 'Flight deleted successfully' });
    } catch (error) {
      return NextResponse.json(error, { status: 500 });
    }
  }

  export async function POST(request: NextRequest) {
    try {
        await mongodb();
        const reqBody = await request.json();
        const { flightId } = reqBody;

        const flight = await Flight.findById(flightId); 

        if (!flight) {
            return NextResponse.json({ message: 'flight not found' }, { status: 404 });
        }
        return NextResponse.json({ flight });

    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        await mongodb();
        const reqBody = await request.json();
        const { _id, from, to, date, arrival, departure, code, fare } = reqBody;

        const updatedFlight = await Flight 
        .findByIdAndUpdate(_id, { from, to, date, arrival, departure, code, fare});
        return NextResponse.json({ message: 'Flight updated successfully' });

    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
