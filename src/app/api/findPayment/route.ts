import { NextRequest, NextResponse } from "next/server";
import Payments from "@/models/payments";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { reservationID } = reqBody;
        console.log(reservationID)

        // check if payment exists
        const payment = await Payments.findOne({ 'reference': reservationID });

        if (!payment) {
            return NextResponse.json({ message: "Payment ID not found" }, { status: 400 });
        }

        return NextResponse.json(payment, { status: 200 });

    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}