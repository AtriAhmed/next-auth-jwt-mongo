import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function isAuthorized(roles) {
    const session = await getServerSession(authOptions)  

    if(roles.includes(session?.user?.accessId)) return true
    else return false
}
