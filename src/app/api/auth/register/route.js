import { NextResponse } from 'next/server'
import User from "../../../../../models/User";
import dbConnect from "../../../../../lib/dbConnect";

export async function POST(request) {
    await dbConnect();
    const reqData = await request.json()

    const { name, email, password } = reqData

    try {
        const user = await User.create({ name, email, password, accessId : 1 })
        return NextResponse.json(user, { status: 201 })
    } catch (error) {
        // Handle any errors that occur during user creation
        return NextResponse.json(error.message, { status: 400 })
    }

}