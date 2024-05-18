import mongodb from '@/lib/mongodb';
import Destinations from '@/models/destination';
import { NextRequest, NextResponse } from "next/server";



export async function POST(request: NextRequest) {

  try {
  await mongodb();

  const reqBody = await request.json()
  const { Name, Code, Abv, City } = reqBody;

  const destination = await Destinations.findOne({ Name, Code, Abv, City});

  if (destination) {
    return NextResponse.json({ message: "Destination is already in the database" }, { status: 400 });
  }

  await Destinations.create({ Name, Code, Abv, City });

  return NextResponse.json({ message: "Destination Created" }, { status: 201 });

    
  } catch (error) {

    return NextResponse.json(error, { status: 400 });
  }

  
}

export async function GET() {
  try {
  
    await mongodb();
    const destinations = await Destinations.find();
    return NextResponse.json({ destinations });
    
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }

}


