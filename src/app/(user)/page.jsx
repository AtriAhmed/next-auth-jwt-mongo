"use client";
import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  
    if (status == "loading") return "Loading";
  
  return (
    <main className="">
      {session?.user?.name ? (
        <div className="text-black">{session?.user?.name}</div>
      ) : (
        <div>No user connected</div>
      )}
    </main>
  );
}
