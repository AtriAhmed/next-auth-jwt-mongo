import { NextResponse } from 'next/server'
import User from "../../../../models/User";
import dbConnect from "../../../../lib/dbConnect";
import crypto from "crypto";

export async function GET() {
    await dbConnect();
    
    const  email  = "contact@ahmedatri.com";
    try {
        const user = await User.findOne({ email });
    
        if (!user) {
          return NextResponse.json("user not found", { status: 404 })
        }
    
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpires = Date.now() + 3600000 * 2; // 1 hour from now
    
        await User.updateOne(
            { email }, 
            { 
              resetToken,
              resetTokenExpires
            } 
          );
    
        try {
          return NextResponse.json("updated", { status: 200 })
        } catch (err) {
          console.log(err);
          return NextResponse.json(err.message, { status: 400 })
        }
      } catch (error) {
        console.error(error);
        return NextResponse.json(error.message, { status: 400 })
      }

}
