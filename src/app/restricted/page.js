"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";
import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";

export default function Restricted() {
  const { data: session, status } = useSession();
  const { instance, accounts, inProgress } = useMsal();

  const [userName, setUserName] = useState("");

  async function handleLogoutNextAuth() {
    await signOut({ redirect: false, callbackUrl: "/" });
  }

  useEffect(() => {
    if (session && session.user) {
      setUserName(session?.user?.name);
    } else if (accounts && accounts.length > 0) {
      setUserName(accounts[0].name);
    }
  }, [session, accounts]);

  if (status === "unauthenticated" && accounts?.length === 0) {
    redirect("/");
  }

  return (
    <div className="w-full h-screen bg-white flex flex-col items-center justify-center border-4 border-orange-600">
      <h1 className="text-3xl text-black">This is a Restricted Page which the user will see after login</h1>
      <p className="text-2xl m-4 text-black">{`Name of the Signed In User is ${userName}`} </p>
      <button
        onClick={() => {
          if (session?.user?.name) {
            handleLogoutNextAuth();
          } else {
            instance.logoutRedirect();
          }
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Sign Out
      </button>
    </div>
  );
}
