"use client"
import axios from "axios";
import { ArrowUturnLeftIcon, ExclamationTriangleIcon, EyeIcon, EyeSlashIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function ResetPassword() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [input, setInput] = useState({
    password: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState(false);
  const { token } = useParams();
  const [sending, setSending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (sending) return;

    if (success) router.push('/');

    error && setError("");

    if (!input.password || !input.confirmPassword) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    if (input.password !== input.confirmPassword) {
      setError("Veuillez confirmer votre mot de passe correctement");
      return;
    }

    setSending(true);
    try {
      console.log(token)
      await axios.post("/api/auth/reset-password", { token, password: input.password });

      setSuccess(true);
    } catch (err) {
      setSending(false);
      const message = err.response?.data;
      if (message === "invalid or expired token") {
        setError("Votre lien est invalide ou expiré, veuillez obtenir un autre");
        return;
      }

      setError("Une erreur s'est produite");
    }
    setSending(false);
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative scr600:w-full scr600:max-w-[500px] py-8 px-6 scr600:rounded-[50px] bg-white text-left transform overflow-hidden shadow-xl transition-all">
        <header>
          <Link className="flex justify-center items-center gap-1" href="/">
            NEXTAUTH
          </Link>
          <h3 className="mt-4 font-semibold text-center text-2xl text-black">Réinitialiser votre mot de passe</h3>
        </header>
        <form className="mt-10" onSubmit={handleSubmit}>
          {!success ? (
            <>
              <div className="relative mt-2">
                <input
                  placeholder="Mot de passe"
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  onChange={(e) => setInput((prev) => ({ ...prev, password: e.target.value }))}
                  value={input.password}
                  className="py-3 pl-4 pr-11 rounded-xl text-slate-900 text-xl outline-none focus:ring-2 focus:ring-cyan-300 border border-slate-300 w-full font-rubik"
                />
                <i
                  className="absolute top-1/2 -translate-y-1/2 right-4 flex items-center justify-center cursor-pointer"
                  onClick={() => setPasswordVisible((visibility) => !visibility)}
                >
                  {passwordVisible ?   <EyeSlashIcon className="h-6 w-6" />:<EyeIcon className="h-6 w-6" /> }
                </i>
              </div>
              <input
                placeholder="Confirmer mot de passe"
                type={passwordVisible ? "text" : "password"}
                name="password"
                onChange={(e) => setInput((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                value={input.confirmPassword}
                className="mt-2 py-3 pl-4 pr-11 rounded-xl text-slate-900 text-xl outline-none focus:ring-2 focus:ring-cyan-300 border border-slate-300 w-full font-rubik"
              />
              {error && (
                <div className="mt-2 py-3 px-4 rounded-xl text-red-500 bg-red-100 border border-red-500 w-full flex items-center gap-4">
                  <ExclamationTriangleIcon className="h-8 w-8" />
                  {error}
                </div>
              )}
              <div className="relative mt-6">
                <button
                  type="submit"
                  className="self-center w-full bg-black hover:bg-gray-800 text-white rounded-xl py-3  font-bold"
                >{sending ? "Sending" : "Réinitialiser"}</button>
              </div>
              <div className="flex justify-center pt-3">
                <Link href="/" className="text-blue-500 hover:underline">
                  Page d'accueil
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className="max-w-[400px] mx-auto font-medium text-center text-lg text-black">
                <div className="flex justify-center"> <ShieldCheckIcon className="h-12 w-12 text-primary" /></div>
                Votre mot de passe a été réintialisé avec success.
              </p>
              <button
                type="submit"
                className="flex items-center justify-center gap-3 w-full py-2 px-3 mt-6 rounded-full bg-black hover:bg-gray-800 text-white font-medium text-lg cursor-pointer transition duration-300"
                autoFocus
              >
                <div><ArrowUturnLeftIcon className="h-8 w-8" /> </div>
                Retourner à l'accueil
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}