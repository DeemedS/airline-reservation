import { NextRequest, NextResponse } from "next/server";
import { getTokenData } from "@/helpers/getTokenData";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
    try {
        const tokenData = await getTokenData(request, "booking");
        return NextResponse.json({tokenData})
    }
    catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}