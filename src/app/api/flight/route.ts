import mongodb from '@/lib/mongodb';
import Flight from '@/models/flight';
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await mongodb(); // Connect to MongoDB

        const reqBody = await request.json()
        const { from, to, departureDate, returnDate } = reqBody;

        console.log("Request body:", reqBody);

        const departureFlights = await Flight.find({ from, to, date: departureDate }).sort({ departure: 1 });
        const returnFlights = await Flight.find({ from: to, to: from, date: returnDate }).sort({ departure: 1 });

        return NextResponse.json({ departureFlights, returnFlights });
        
    } catch (error) {
        console.error("Error in GET request:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 200 });
    }
}