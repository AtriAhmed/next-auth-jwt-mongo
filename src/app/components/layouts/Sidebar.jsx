'use client'
import React, { useState } from "react";
import {
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Sidebar() {
  const { data: session, status } = useSession({})
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()
  
  if (status == "loading") return "";

  return (
    <div
      className={`sidebar z-20 max-w-[250px] mt-[4rem] fixed lg:translate-x-0 w-full lg:w-[250px] flex flex-col lg:flex-nowrap flex-wrap overflow-auto h-full shadow bg-gray-800 text-white duration-300`}
    >
      
      <Link href="/admin" className={`flex flex-row gap-4 p-4 duration-150 ${pathname === "/admin" ? "bg-gray-700" : ""}`}>
        <HomeIcon className="block h-6 w-6 flex-start" aria-hidden="true" />
        <span className="flex-end">Accueil</span>
      </Link>
      {session?.user?.accessId >= 3 ? (
        <>
          <Link href="/admin/users" className={`flex flex-row gap-4 p-4 duration-150 ${pathname?.startsWith("/admin/users") ? "bg-gray-700" : ""}`}>
            <UsersIcon className="block h-6 w-6 flex-start" aria-hidden="true" />
            <span>Utilisateurs</span>
          </Link>

        </>
      ) : (
        <></>
      )}
    </div>
  );
}
