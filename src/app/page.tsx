import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-bgDefault font-switzer h-screen w-full flex flex-row justify-center items-center m-auto space-x-10">
      <div>
        <Link href="/signup">
          <button>Sign up</button>
        </Link>
      </div>
      <div>
      <Link href="signIn">
          <button>Log in</button>
      </Link>
      </div>
    </div>
  );
}
