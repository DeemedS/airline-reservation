import { NextRequest, NextResponse } from "next/server";
import { getTokenData } from "@/helpers/getTokenData";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();  
        const token = jwt.sign(reqBody, process.env.TOKEN_SECRET!, {expiresIn: "1h"})

        const response = NextResponse.json({
            message: "successful",
            success: true,
        })

        response.cookies.set("flightData", token, {
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
        const tokenData = await getTokenData(request, "flightData");
        return NextResponse.json({tokenData})
    }
    catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}