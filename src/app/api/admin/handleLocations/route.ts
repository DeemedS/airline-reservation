import mongodb from '@/lib/mongodb';
import Destinations from '@/models/destination';
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
    
      await mongodb();
      const destinations = await Destinations.find();
      return NextResponse.json({ destinations });
      
    } catch (error) {
      return NextResponse.json(error, { status: 500 });
    }
  
  }

  export async function POST(request: NextRequest) {
    try {
        await mongodb();
        const reqBody = await request.json();
        const { locationId } = reqBody;

        const destination = await Destinations.findById(locationId); 

        if (!destination) {
            return NextResponse.json({ message: 'Destination not found' }, { status: 404 });
        }
        return NextResponse.json({ destination });

    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        await mongodb();
        const reqBody = await request.json();
        const { locationId } = reqBody;

      const deletedDestination = await Destinations.findByIdAndDelete(locationId);
      if (!deletedDestination) {
        return NextResponse.json({ message: 'Destination not found' }, { status: 404 });
      }
      return NextResponse.json({ message: 'Destination deleted successfully' });
    } catch (error) {
      return NextResponse.json(error, { status: 500 });
    }
  }

  export async function PUT(request: NextRequest) {
    try {
        await mongodb();
        const reqBody = await request.json();
        const { _id, Name, Code, Abv, City } = reqBody;

        const updatedDestination = await Destinations 
        .findByIdAndUpdate(_id, { Name, Code, Abv, City});
        return NextResponse.json({ message: 'Flight updated successfully' });

    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
