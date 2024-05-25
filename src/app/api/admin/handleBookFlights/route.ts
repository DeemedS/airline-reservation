import { NextRequest, NextResponse } from "next/server";
import mongodb from '@/lib/mongodb';
import BookFlight from '@/models/bookflights';

export async function GET() {
    try {
    
      await mongodb();
      const bookFlights = await BookFlight.find();
      return NextResponse.json({ bookFlights });
      
    } catch (error) {
      return NextResponse.json(error, { status: 500 });
    }
  
  }

  export async function DELETE(request: NextRequest) {
    try {
        await mongodb();
        const reqBody = await request.json();
        const { bookingId } = reqBody;

      const deletedBooking = await BookFlight.findByIdAndDelete(bookingId);
      if (!deletedBooking) {
        return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
      }
      return NextResponse.json({ message: 'Booking deleted successfully' });
    } catch (error) {
      return NextResponse.json(error, { status: 500 });
    }
  }

  export async function POST(request: NextRequest) {
    try {
        await mongodb();
        const reqBody = await request.json();
        const { bookingId } = reqBody;

        const bookFlight = await BookFlight.findById(bookingId); 

        if (!bookFlight) {
            return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
        }
        return NextResponse.json({ bookFlight });

    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
  try {
      await mongodb();
      const reqBody = await request.json();
      const bookFlight = reqBody;
      console.log(bookFlight)

      const updatedBookFlight = await BookFlight 
      .findByIdAndUpdate(bookFlight._id, { ...bookFlight });
      return NextResponse.json({ message: 'Booking updated successfully' });

  } catch (error) {
      return NextResponse.json(error, { status: 500 });
  }
}