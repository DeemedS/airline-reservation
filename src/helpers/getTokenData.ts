import { NextRequest } from "next/server";
import  jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

export const getTokenData = async (request: NextRequest, datatoken: string) => {

    try {
        const token = request.cookies.get(datatoken)?.value || ''
        const decoded: JwtPayload = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;
        return decoded;

    } catch (error: any) {
        
        return new Error(error.message);
    }

}