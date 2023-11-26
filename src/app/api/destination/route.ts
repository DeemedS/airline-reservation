import mongodb from '../../lib/mongodb';
import Destinations from '../../models/destination';
import { NextResponse } from "next/server";



export async function POST(request: Request) {

  try {

  const { Name, Code, Abv, City } = await request.json();

  await mongodb();
  await Destinations.create({ Name, Code, Abv, City });
  return NextResponse.json({ message: "Topic Created" }, { status: 201 });

    
  } catch (error) {

    return NextResponse.json(error, { status: 500 });
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


