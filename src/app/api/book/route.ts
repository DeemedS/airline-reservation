import mongodb from '../../lib/mongodb';
import Flight from '../../models/flight';
import { NextResponse } from "next/server";


export async function POST(request: Request) {

  try {

    const { From, To, date } = await request.json();

  await mongodb();
  await Flight.create({ From, To, date });
  return NextResponse.json({ message: "Topic Created" }, { status: 201 });

    
  } catch (error) {

    return NextResponse.json(error, { status: 500 });
  }

  
}

export async function GET(request: Request) {
  try {
      
      await mongodb();
      const flight = await Flight.find();
      return NextResponse.json(flight)
    
  } catch (error) {
      return NextResponse.json(error, { status: 500 });
  }

}

