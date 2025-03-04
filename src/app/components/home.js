"use client";
import SignIn from "./signIn";
import { SIGN_IN_METHODS } from "../constants";
import Link from "next/link";
import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
export default function HomeComponent() {
  const { instance, accounts, inProgress } = useMsal();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (accounts.length > 0) {
      setUserName(accounts[0].name);
    }
  }, [accounts]);

  return (
    <div className="w-full h-screen bg-white flex flex-col items-center justify-center border-4 border-orange-600">
      {accounts && accounts.length ? (
        <>
          <div className="flex flex-col items-center text-black m-4 justify-center">{`Signed in as ${userName}`}</div>
          <button
            onClick={() => {
              const logoutRequest = {
                account: instance.getAccountByHomeId(accounts[0].homeAccountId),
              };

              instance.logoutRedirect(logoutRequest);
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          <header className="font-bold text-2xl text-black">Welcome to the Demo application of Microsoft AD Authentication using NextAuth & MSAL !</header>
          <p className="m-4 text-xl text-black">Click the buttons below to trigger the authentication flow </p>

          <div className="flex flex-row items-center justify-evenly w-1/3">
            {SIGN_IN_METHODS.map((method, index) => {
              return <SignIn key={index} title={method} />;
            })}
          </div>
        </>
      )}
      <Link href="/restricted" className="underline text-black m-8">
        Try to go to a restricted page →
      </Link>
    </div>
  );
}
