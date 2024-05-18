import { NextRequest, NextResponse } from "next/server";
import mongodb from '@/lib/mongodb';
import User from '@/models/users';


export async function GET() {
    try {
    
      await mongodb();
      const users = await User.find();
      return NextResponse.json({ users });
      
    } catch (error) {
      return NextResponse.json(error, { status: 500 });
    }
  
  }

  export async function DELETE(request: NextRequest) {
    try {
        await mongodb();
        const reqBody = await request.json();
        const { userId } = reqBody;

      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }
      return NextResponse.json({ message: 'User deleted successfully' });
    } catch (error) {
      return NextResponse.json(error, { status: 500 });
    }
  }

export async function POST(request: NextRequest) {
    try {
        await mongodb();
        const reqBody = await request.json();
        const { userId } = reqBody;

        const user = await User.findById(userId); 

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        return NextResponse.json({ user });

    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        await mongodb();
        const reqBody = await request.json();
        const { _id, firstname, lastname, middlename, nationality, gender, birthday, username, email, password, role } = reqBody;

        const updatedUser = await User 
        .findByIdAndUpdate(_id, { firstname, lastname, middlename, nationality, gender, birthday, username, email, password, role});

        if (!updatedUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        
        return NextResponse.json({ message: 'User updated successfully' });
    }
    catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

