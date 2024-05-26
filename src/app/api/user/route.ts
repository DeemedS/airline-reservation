import mongodb from '@/lib/mongodb';
import User from '@/models/users';
import { NextRequest, NextResponse } from "next/server";
import { getTokenData } from "@/helpers/getTokenData";

export async function GET(request: NextRequest) {
    try {
        const tokenData = await getTokenData(request, "token");
        return NextResponse.json({tokenData})
    }
    catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

export async function POST(request: NextRequest) {
    try {
        //connect to database
        await mongodb();
        
        //get data from request body
        const reqBody = await request.json();
        const { userId } = reqBody;

        // check if user exists
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return NextResponse.json({ message: "User does not exist" }, { status: 400 });
        }

        return NextResponse.json(user)
    }
    catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}