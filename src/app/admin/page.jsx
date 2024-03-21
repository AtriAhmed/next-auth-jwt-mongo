// 'use client'
// import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import isAuthorized from "../utils/isAuthorized";
import { redirect } from "next/navigation";
// import ProtectedRoute from "../components/ProtectedRoute";

export default async function AdminDashboard() {
    // const { data: session, status } = useSession();
  
    // if (status == "loading") return "Loading";

    const session = getServerSession(authOptions);
  
    const isAuth = await isAuthorized([3]);

    if(!isAuth) {
        redirect('/');
    }

    return (
        // <ProtectedRoute roles={[3]}>
        <div>
            <div className=''>admin dashboard</div>
            <div className=''>wecome {session?.user?.name}</div>
        </div>
        // </ProtectedRoute>
    )
}
