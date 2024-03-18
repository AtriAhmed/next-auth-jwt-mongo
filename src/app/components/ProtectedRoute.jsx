import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const ProtectedRoute = ({ children, accessId }) => {
    const router = useRouter();
    const { data: session, status } = useSession({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (status != "loading") {
            if (!session || session?.user?.accessId < accessId) {
                // Redirect the user if not authenticated or doesn't have admin role
                router.push('/'); // Replace '/login' with the desired redirect path
            }else{
                setLoading(false)
            }
        }
    }, [session, router]);


    if (loading) return <div>loading</div>
    // Render children if user is authenticated and has admin role
    return <>{children}</>;
};

export default ProtectedRoute;