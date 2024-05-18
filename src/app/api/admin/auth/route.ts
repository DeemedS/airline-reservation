import mongodb from '@/lib/mongodb';
import User from '@/models/users';
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";



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

        if (user.role === "user") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        

        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
       

        //assign token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login successful",
            userId: user._id,
            success: true,
        })
        response.cookies.set("adminToken", token, {
            httpOnly: true,
        })
        return response

    }

    catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

