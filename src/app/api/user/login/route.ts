import mongodb from '@/lib/mongodb';
import User from '@/models/users';
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { getTokenData } from "@/helpers/getTokenData";



export async function POST(request: NextRequest) {
    try {
    
        //connect to database
        await mongodb();
        
        //get data from request body
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // check if user exists
        const user = await User.findOne({ email });


        if (!user) {
            return NextResponse.json({ message: "User does not exist" }, { status: 400 });
        }

        // check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ message: "Invalid password" }, { status: 400 });
        }

        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
       

        //assign token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
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
        const tokenData = await getTokenData(request, "token");
        return NextResponse.json({tokenData})
    }
    catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}