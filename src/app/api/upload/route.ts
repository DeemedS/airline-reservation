import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import Payments from "@/models/payments";



export async function POST(request: NextRequest) {


    try {
        const formdata = await request.formData();
        const params = await request.nextUrl.searchParams;
        const file = formdata.get("file") as File;
        const buffer = await file.arrayBuffer();

        const newPayment = new Payments({
            bookingId: params.get("bookingDataId"),
            amount: params.get("amount"),
            reference: params.get("reference"),
            proofOfPayment: file.name
        });

        await newPayment.save();

        await fs.promises.writeFile(`public/payments/${file.name}`, Buffer.from(buffer));

        const response = NextResponse.json({message: "Payment created successfully", success: true})

        response.cookies.delete("booking");
    
        return response

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 200 });
    }

}