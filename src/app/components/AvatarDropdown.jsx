"use client"
import { useEffect, useRef, useState } from "react";
import Avatar from "react-avatar";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function AvatarDropdown() {
  const dropdownRef = useRef(null);

  const [show, setShow] = useState(false);

  function handleLogout(){
    signOut().then(res=>{
        toast.success("Signed out successfully", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
    })
}

const { data: session, status } = useSession({})

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShow(false);
    }
  };

  // Attach click event listener to the document when the component mounts
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-20" ref={dropdownRef}>
      <div
        onClick={() => {
          setShow(!show);
        }}
        className="absolute h-full w-full hover:bg-[rgba(0,0,0,0.1)] z-20 rounded-full transition"
      ></div>
      <Avatar
        name={session?.user?.name}
        src={""} // Use null if picture is not available
        size="40" // Adjust the size as needed
        round={true}
      />
      <div
        className={`${
          show ? "" : "pointer-events-none opacity-0"
        } dark:text-white dark:bg-gray-800 z-20 transition font-normal text-sm absolute bg-white right-0 p-2 rounded-lg top-[55px] flex flex-col justify-start min-w-[150px]`}
      >
        {session?.user?.accessId < 3 ? (
          <Link
            href="/user/profile"
            className="py-2 px-3 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg"
          >
            Profile
          </Link>
        ) : (
          ""
        )}
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg py-2 px-3 hover:bg-gray-200 dark:hover:bg-gray-600 text-start"
        >
          Logout
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}
