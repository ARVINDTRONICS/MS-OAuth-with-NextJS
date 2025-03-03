"use client";

import { signIn } from "next-auth/react";
import { useMsal } from "@azure/msal-react";

export default function SignIn({ title }) {

  const { instance } = useMsal();


  return (
    <>
      <button
        onClick={() => {
          if (title === "NextAuth") {
            signIn("azure-ad", { callbackUrl: "/restricted" }, { prompt: "login" });
          } else {
            instance.loginRedirect({
              scopes: ["User.Read"],
            });
          }
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {`Sign In with ${title}`}
      </button>
    </>
  );
}
