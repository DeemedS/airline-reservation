import { NextRequest, NextResponse } from "next/server";
import BookFlight from "@/models/bookflights";


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { reservationID } = reqBody;
        console.log(reservationID)

        // check if reservation exists
        const reservation = await BookFlight.findOne({ 'bookingData.referenceNumber': reservationID });

        if (!reservation) {
            return NextResponse.json({ message: "Reservation ID not found" }, { status: 400 });
        }

        return NextResponse.json(reservation, { status: 200 });

    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}