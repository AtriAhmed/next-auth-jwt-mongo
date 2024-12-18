"use client";

import Loading from "@/app/components/Loading";
import { ArrowUturnLeftIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [sent, setSent] = useState(false);
    const [sending, setSending] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (sending) return;

        if (!email) {
            setError("Veuillez spécifier un email");
            return;
          }

          setSending(true);
        try {
            await axios.post("/api/auth/forgot-password", { email });

            setSent(true);
        } catch (err) {
            setSending(false);
      const message = err.response?.data;
      if (message === "user not found") {
        setError("Cet email n'est pas associé à aucun compte");
        return;
      }

      setError("Une erreur s'est produite");
        }
        setSending(false);
    };

    const input_style =
        "w-full px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded transition duration-300 focus:ring-2 focus:ring-orange-400 focus:border-none outline-none";

        if(sending) return <Loading />
    return (
        <div className="flex min-h-screen justify-center items-center">
        {!sent ? (
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
            {error && (
                <p className="text-center bg-red-300 py-4 rounded">{error}</p>
            )}
            <div className="">
                <input
                    required
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder="Email address"
                    className={`${input_style}`}
                />
            </div>
            <button
                type="submit"
                className="w-full py-2 bg-orange-500 text-white font-bold text-sm uppercase rounded-full shadow-md hover:bg-orange-700 transition duration-150"
                disabled={sending}
            >
                {sending ? "sending..." : "Reset Password"}
            </button>

            <div className="border-t justify-center pt-4 items-center flex gap-4 w-full">
                or <Link
                href="/auth/signup"
                className="px-5 py-2 bg-orange-500 text-white font-bold text-sm uppercase rounded-full shadow-md hover:bg-orange-700 transition duration-150"
                disabled={sending}
            >
                {sending ? "sending..." : "Sign Up"}
            </Link>
            </div>

        </form>
        ) : (
            <div className="flex flex-col shadow-xl p-10">
            <p className="mt-10 font-medium text-center text-black">
              <div className="flex justify-center"> <EnvelopeIcon className="h-12 w-12 text-primary" /> </div>
              Un e-mail a été envoyé à '{email}',
              <br />
              veuillez vérifier votre boîte de réception pour réinitialiser votre mot de passe.
            </p>
            <Link
              href="/"
              className="flex items-center justify-center gap-3 w-full py-2 px-3 mt-6 rounded-full bg-primary hover:bg-primaryHovered font-medium text-lg  cursor-pointer transition duration-300"
            >
              <div><ArrowUturnLeftIcon className="h-8 w-8" /> </div>
              Retourner à l'accueil
            </Link>
          </div>
        )}

        </div>
    );
};
