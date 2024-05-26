import mongodb from '@/lib/mongodb';
import BookFlight from '@/models/bookflights';
import { NextRequest, NextResponse } from "next/server";
import Payments from '@/models/payments';


export async function POST(request: NextRequest) {
    try {
        //connect to database
        await mongodb();
        
        //get data from request body
        const reqBody = await request.json();
        const { userId } = reqBody;


        // check if flight exists
        const booking = await BookFlight.find({ userID: userId });

        if (!booking) {
            return NextResponse.json({ message: "Booking does not exist" }, { status: 400 });
        }

        return NextResponse.json(booking)

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}

export async function DELETE(request: NextRequest) {
    try {
        await mongodb();
        const reqBody = await request.json();
        const { bookingId } = reqBody;
    
      const deletePayment = await Payments.findOneAndDelete({bookingId: bookingId});
      const deletedBooking = await BookFlight.findByIdAndDelete(bookingId);
      
      if (!deletedBooking) {
        return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
      }
      return NextResponse.json({ message: 'Booking deleted successfully' }, { status: 200 });
    } catch (error) {
      return NextResponse.json(error, { status: 500 });
    }
  }
