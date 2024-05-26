import { NextRequest, NextResponse } from "next/server";
import { getTokenData } from "@/helpers/getTokenData";
import BookFlight from "@/models/bookflights";
import jwt from "jsonwebtoken";
import mongodb from '@/lib/mongodb';

export async function POST(request: NextRequest) {

    try {
        await mongodb();

        const reqBody = await request.json();

        const departureFlightId = reqBody.flightData.departureFlight._id;
        const returnFlightId = reqBody.flightData.returnFlight?._id  || '';
        const seatCode = 'A1';
        const userID = reqBody.userID || '';

        const guestInfo = {
            firstName: reqBody.guestInfo.firstName,
            lastName: reqBody.guestInfo.lastName,
            middleName: reqBody.guestInfo.middleName || '',
            birthday: reqBody.guestInfo.birthday,
            age: reqBody.guestInfo.age,
            nationality: reqBody.guestInfo.nationality,
            gender: reqBody.guestInfo.gender,
            email: reqBody.guestInfo.email,
            phone: reqBody.guestInfo.phone,
            secondaryPhone: reqBody.guestInfo.secondaryPhone || '',
            addressline1: reqBody.guestInfo.addressline1,
            addressline2: reqBody.guestInfo.addressline2|| '',
            city: reqBody.guestInfo.city,
            region: reqBody.guestInfo.region,
            zip: reqBody.guestInfo.zip
        };
        const bookingData = {
            selectedPackage: reqBody.selectedPackage, 
            packageCost: reqBody.packageCost, 
            referenceNumber: reqBody.referenceNumber
        };

        

       


        const newBookFlight = new BookFlight({
            departureFlightId,
            returnFlightId,
            seatCode,
            guestInfo,
            bookingData
        });


        const saveBookFlight = await newBookFlight.save();

        const tokenData = {...reqBody , _id: saveBookFlight._id};

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1h"})


        const response = NextResponse.json({message: "Reservation created successfully", success: true}, {status: 201})

        response.cookies.set("booking", token, {
            httpOnly: true,
        })

        response.cookies.delete("flightData");
        response.cookies.delete("guestInfo");
    
        return response
    }
    catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

export async function GET(request: NextRequest) {
    try {
        const tokenData = await getTokenData(request, "booking");
        return NextResponse.json({tokenData})
    }
    catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}