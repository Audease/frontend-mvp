import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-bgDefault h-screen w-full flex flex-row justify-center m-auto">
      <div>
        <Link href="/signup">
          <button>Sign up </button>
        </Link>
      </div>
      <div>
      <Link href="/signup">
          <button>Log in</button>
        </Link>
      </div>
    </div>
  );
}
