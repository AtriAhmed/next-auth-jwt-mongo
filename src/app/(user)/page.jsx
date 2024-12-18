import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import isAuthorized from "../utils/isAuthorized";


export default async function Home() {
  const isAuth = isAuthorized([1]);

  if(!isAuth) {
      redirect("/");
  }

  const session = await getServerSession(authOptions)  
  
  return (
    <main className="p-4">
      {session?.user?.name ? (
        <div className="text-black">Welcome {session?.user?.name}</div>
      ) : (
        <div>No user connected</div>
      )}
    </main>
  );
}
