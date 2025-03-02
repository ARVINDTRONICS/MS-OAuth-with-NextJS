import SignIn from "./components/signIn";

export default function Home() {
  return (
    <div className="w-full h-10 flex flex-col items-center justify-center border-2 border-gray-200">
      <h1>Home Page</h1>
      <SignIn/>
    </div>
  );
}
