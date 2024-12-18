import { NextResponse } from 'next/server'
import User from "../../../models/User";
import dbConnect from "../../../lib/dbConnect";

export async function GET() {
    await dbConnect();
    const data = await User.find()
    return NextResponse.json(data)
}