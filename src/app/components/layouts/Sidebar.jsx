
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import {headers} from "next/headers"
import Icon from "../Icon";

export default async function Sidebar() {
  const session = await getServerSession(authOptions)  

  const headersList = headers();
  const pathname = headersList.get("x-invoke-path");

  return (
    <div
      className={`sidebar z-20 max-w-[250px] mt-[4rem] fixed lg:translate-x-0 w-full lg:w-[250px] flex flex-col lg:flex-nowrap flex-wrap overflow-auto h-full shadow bg-gray-800 text-white duration-300`}
    >
      
      <Link href="/admin" className={`flex flex-row gap-4 p-4 duration-150 ${pathname == "/admin" ? "bg-gray-700" : ""}`}>
        <Icon icon="home" styles="block h-6 w-6 flex-start" />
        <span className="flex-end">Accueil</span>
      </Link>
      {session?.user?.accessId >= 3 ? (
        <>
          <Link href="/admin/users" className={`flex flex-row gap-4 p-4 duration-150 ${pathname.startsWith("/admin/users") ? "bg-gray-700" : ""}`}>
            <Icon icon="users" styles="block h-6 w-6 flex-start" />
            <span>Utilisateurs</span>
          </Link>

        </>
      ) : (
        <></>
      )}
    </div>
  );
}
