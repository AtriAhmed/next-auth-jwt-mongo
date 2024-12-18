
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import AvatarDropdown from '../../AvatarDropdown'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

export default async function AdminNavbar() {

    const session = await getServerSession(authOptions)  

  return (
    <nav className="bg-gray-800 fixed z-50 w-full">
    
            <div className="mx-auto px-2 sm:px-6 lg:px-8 navbar">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <strong className='text-white'>Admin interface</strong>
                        </div>

                    </div>
                    {session?.user ? <AvatarDropdown />: <Link href="/auth/signin" className='text-white font-bold'>Login</Link> }
                    
                </div>
            </div>
</nav>
  )
}
