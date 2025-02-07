import Image from "next/image";
import Link from "next/link";
import { auth, signIn, signOut } from "../../auth";

export async function Navbar() {
  const session = await auth();

  return (
    <div className="navbar max-w-6xl mx-auto px-4 sm:px-6">
      <div className="flex-1">
        <Link href={"/"} className="btn btn-ghost text-xl gap-2">
          <Image src="/icon.svg" alt="SSSpots" width={30} height={30} />
          SSpots
        </Link>
      </div>
      <div className="flex-none gap-2">
        {session?.user?.image ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 relative rounded-full">
                <Image
                  alt="Tailwind CSS Navbar component"
                  src={session.user.image}
                  sizes="30x30"
                  fill
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <div className="font-bold px-3 py-2">{session.user.name}</div>
              <li>
                <Link href="/dashboard">Profile</Link>
              </li>
              <li>
                <button
                  onClick={async () => {
                    "use server";
                    await signOut();
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <button className="btn btn-outline">Sign in</button>
          </form>
        )}
      </div>
    </div>
  );
}
