"use client";

import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <>
      <button
        onClick={() => {
          signIn("azure-ad", { callbackUrl: "/restricted" }, { prompt: "login" });
        }}
      >
        Sign In
      </button>
    </>
  );
}
