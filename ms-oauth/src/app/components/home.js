import SignIn from "./signIn";
import { SIGN_IN_METHODS } from "../constants";
import Link from "next/link";

export default function HomeComponent() {
  return (
    <div className="w-full h-screen bg-white flex flex-col items-center justify-center border-4 border-orange-600">
      <header className="font-bold text-2xl text-black">Welcome to the Demo application of Microsoft AD Authentication using NextAuth & MSAL !</header>
      <p className="m-4 text-xl text-black">Click the buttons below to trigger the authentication flow </p>
      <div className="flex flex-row items-center justify-evenly w-1/3">
        {SIGN_IN_METHODS.map((method,index) => {
          return <SignIn key={index} title={method} />;
        })}
      </div>
      <Link href="/restricted" className="underline text-black m-8">Try to go to a restricted page →</Link>
    </div>
  );
}
