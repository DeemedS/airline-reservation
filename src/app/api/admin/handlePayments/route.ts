import mongodb from '@/lib/mongodb';
import Payments from '@/models/payments';
import { NextRequest, NextResponse } from "next/server";
import BookFlight from '@/models/bookflights';

export async function GET() {
    try {
    
      await mongodb();
      const payments = await Payments.find();
      return NextResponse.json({ payments });
      
    } catch (error) {
      return NextResponse.json(error, { status: 500 });
    }
  
  }

  export async function POST(request: NextRequest) {
    try {
        await mongodb();
        const reqBody = await request.json();
        const { paymentId } = reqBody;

        const payment = await Payments.findById(paymentId); 

        if (!payment) {
            return NextResponse.json({ message: 'Transation not found' }, { status: 404 });
        }
        return NextResponse.json({ payment });

    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

  export async function DELETE(request: NextRequest) {
    try {
        await mongodb();
        const reqBody = await request.json();
        const { paymentId } = reqBody;

      const deletedTransaction = await Payments.findByIdAndDelete(paymentId);
      if (!deletedTransaction) {
        return NextResponse.json({ message: 'Transaction not found' }, { status: 404 });
      }
      return NextResponse.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
      return NextResponse.json(error, { status: 500 });
    }
  }

  export async function PUT(request: NextRequest) {
    try {
        await mongodb();
        const reqBody = await request.json();
        const { _id, status, bookingId} = reqBody;

        const updatedDTransaction = await Payments 
        .findByIdAndUpdate(_id, { status });

        const updatedBooking = await BookFlight
        .findByIdAndUpdate(bookingId, { paymentStatus: status});

        return NextResponse.json({ message: 'Transaction updated successfully' });

    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
