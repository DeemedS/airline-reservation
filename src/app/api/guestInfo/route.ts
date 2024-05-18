import { NextRequest, NextResponse } from "next/server";
import { getTokenData } from "@/helpers/getTokenData";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { 
        firstName, lastName, middleName, birthday, age, nationality, gender, email, phone,
        secondaryPhone, addressline1, addressline2, city, region, zip
         } = reqBody;

        const tokenData = {
            firstName: firstName,
            lastName: lastName,
            middleName: middleName,
            birthday: birthday,
            age: age,
            nationality: nationality,
            gender: gender,
            email: email,
            phone: phone,
            secondaryPhone: secondaryPhone,
            addressline1: addressline1,
            addressline2: addressline2,
            city: city,
            region: region,
            zip: zip
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1h"})

        const response = NextResponse.json({
            message: "successful",
            success: true,
        })

        response.cookies.set("guestInfo", token, {
            httpOnly: true,
        })
    
        return response
    }
    catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

export async function GET(request: NextRequest) {
    try {
        const tokenData = await getTokenData(request, "guestInfo");
        return NextResponse.json({tokenData})
    }
    catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}