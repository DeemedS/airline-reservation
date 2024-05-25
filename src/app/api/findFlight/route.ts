import { NextRequest, NextResponse } from "next/server";
import Flight from "@/models/flight";


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { flightID } = reqBody;
        console.log(flightID)

        // check if reservation exists
        const flight = await Flight.findOne({ '_id': flightID });

        if (!flight) {
            return NextResponse.json({ message: "Flight ID not found" }, { status: 400 });
        }

        return NextResponse.json(flight, { status: 200 });

    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}