"use client";
import Loading from "@/app/components/Loading";
import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function RegisterForm() {
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post("/api/auth/register", formValues);

            setLoading(false);
            setFormValues({ name: "", email: "", password: "" });
            setError("")
            signIn(undefined, { callbackUrl: "/" });
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const input_style =
    "w-full px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded transition duration-300 focus:ring-2 focus:ring-orange-400 focus:border-none outline-none";

    if(loading) return <Loading />
    return (
        <div className="flex min-h-screen justify-center items-center">
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
            {error ?
                <p className="text-center bg-red-300 py-4  rounded">{error.message}</p>
                : ""}
            <div className="">
                <input
                    required
                    type="name"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className={`${input_style}`}
                />
            </div>
            <div className="">
                <input
                    required
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className={`${input_style}`}
                />
            </div>
            <div className="">
                <input
                    required
                    type="password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className={`${input_style}`}
                />
            </div>
            <button
                type="submit"
                className="w-full py-2 bg-orange-500 text-white font-bold text-sm uppercase rounded-full shadow-md hover:bg-orange-700 transition duration-150"
                disabled={loading}
            >
                {loading ? "loading..." : "Sign Up"}
            </button>

            <div className="border-t justify-center pt-4 items-center flex gap-4 w-full">
                or <Link
                href="/auth/signin"
                className="px-5 py-2 bg-orange-500 text-white font-bold text-sm uppercase rounded-full shadow-md hover:bg-orange-700 transition duration-150"
                disabled={loading}
            >
                {loading ? "loading..." : "Sign In"}
            </Link>
            </div>
        </form>
        </div>
    );
};
