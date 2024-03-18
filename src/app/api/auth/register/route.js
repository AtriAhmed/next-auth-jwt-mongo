import { NextResponse } from 'next/server'
// import { v4 as uuidv4 } from 'uuid';
import User from "../../../../../models/User";
import AccessId from "../../../../../models/AccessId";
import dbConnect from "../../../../../lib/dbConnect";

export async function POST(request) {
    await dbConnect();
    const reqData = await request.json()

    const { name, email, password } = reqData

    try {
        // const id = uuidv4()
        const accessId = await AccessId.findOne({permissionLevel: 1});
        const user = await User.create({ name, email, password, accessId })
        return NextResponse.json(user, { status: 201 })
    } catch (error) {
        // Handle any errors that occur during user creation
        return NextResponse.json(error.message, { status: 400 })
    }

}