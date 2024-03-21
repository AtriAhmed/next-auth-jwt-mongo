import { NextResponse } from 'next/server'
import User from "../../../../../models/User";
import dbConnect from "../../../../../lib/dbConnect";
import bcrypt from "bcrypt"

const saltRounds = 10;

export async function POST(request) {
    await dbConnect();
    const reqData = await request.json()

    const { token, password } = reqData

    try {
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpires: { $gt: Date.now() }
        });
     
        if (!user) {
            return NextResponse.json("Invalid or expired token", { status: 400 });
        }
     
        const hash = await bcrypt.hash(password, saltRounds);
     
        user.password = hash;
        user.resetToken = null;
        user.resetTokenExpires = null;
     
        await user.save();
     
        return NextResponse.json("success", { status: 201 })
      } catch (error) {
        console.error(error);
        return NextResponse.json(error, { status: 400 })
      }

}