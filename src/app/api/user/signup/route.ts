import mongodb from '@/lib/mongodb';
import User from '@/models/users';
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";



export async function POST(request: NextRequest) {
  try {

    //connect to database
    await mongodb();
    
    //get data from request body
    const reqBody = await request.json()
    const {firstname, lastname, middlename, gender, nationality, birthday, username, email, password} = reqBody
    console.log(reqBody);


    //check if user already exists
    const user = await User.findOne({email})

    if(user){
        return NextResponse.json({message: "User already exists"}, {status: 400})
    }

    //pass encryption
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)


    //create new user
    const newUser = new User ({
        firstname,
        lastname,
        username,
        email,
        middlename,
        gender,
        nationality,
        birthday,
        password: hashedPassword
    })

    //save user
    const saveUser = await newUser.save();

    console.log(saveUser._doc);

    //return success message
    return NextResponse.json( {message: "User created successfully", success: true}, {status: 201})

  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500})
  }

}


