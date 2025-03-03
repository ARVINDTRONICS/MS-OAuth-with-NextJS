"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";
export default function Restricted() {
  const { data: session, status } = useSession();


  async function handleLogoutNextAuth() {
    await signOut({ redirect: false, callbackUrl: "/" });
  }

  if (status === "unauthenticated") {
    redirect("/");
  }

  return (
    <div className="w-full h-screen bg-white flex flex-col items-center justify-center border-4 border-orange-600">
      <h1 className="text-3xl text-black">This is a Restricted Page which the user will see after login</h1>
      <p className="text-2xl m-4 text-black">{`Name of the Signed In User is ${session?.user?.name}`} </p>
      <button
        onClick={() => {
          if (session?.user?.name) {
            handleLogoutNextAuth();
          }
        }}
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Sign Out
      </button>
    </div>
  );
}
